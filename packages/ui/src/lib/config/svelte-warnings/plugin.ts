import type { Warning } from 'svelte/types/compiler/interfaces';
import Table, { type Header } from 'tty-table';
import type { Logger, Plugin } from 'vite';
import type {
  SvelteWarningsConfig,
  WarningCounter,
  WarningMatcher,
} from './types';

import type { Options as SveltePluginOptions } from '@sveltejs/vite-plugin-svelte';
import chalk from 'chalk';
import { formatWarningLog } from './log-formatter';

type SveltePlugin = Plugin<SveltePluginOptions> & {
  api: { options: SveltePluginOptions };
};

/**
 * Creates a Vite plugin to manage Svelte compiler warnings.
 *
 * @param config - Configuration options for the plugin.
 * @returns A Vite plugin object.
 * @throws {Error} If both 'disable' and 'only' are specified in the config.
 */
export function svelteWarnings(config: SvelteWarningsConfig): Plugin {
  if (config.disable && config.only) {
    throw new Error(
      "Cannot specify both 'disable' and 'only' in svelteWarnings config",
    );
  }

  const warningCounter: WarningCounter = {};
  const seenCodes: Set<string> = new Set();

  let logger: Logger;

  return {
    name: 'vite-plugin-svelte-warnings',
    enforce: 'pre',
    configResolved(viteConfig) {
      logger = viteConfig.logger;
      const sveltePlugin = viteConfig.plugins?.find(
        (plugin: Plugin): plugin is SveltePlugin => {
          return (<Plugin>plugin)?.name === 'vite-plugin-svelte';
        },
      );

      if (!sveltePlugin) {
        const pluginsList = ((viteConfig.plugins || []) as Plugin[])
          .map((plugin) => plugin?.name)
          .filter((name) => name)
          .sort()
          .join('\n  - ');
        throw new Error(
          `Svelte plugin not found. Plugins list: \n  - ${pluginsList}\n\n`,
        );
      }

      const formatWarning =
        config.formatWarning ?? ((warning: Warning) => warning);

      sveltePlugin.api.options.onwarn = (
        warning: Warning,
        defaultHandler?: (warning: Warning) => void,
      ) => {
        const isMatched = (matchers: WarningMatcher[] | undefined) =>
          matchers?.some(
            (matcher) =>
              (matcher instanceof RegExp && matcher.test(warning.code)) ||
              (typeof matcher === 'function' && matcher(warning)) ||
              (typeof matcher === 'string' && warning.code === matcher),
          ) ?? false;

        const shouldHandle =
          (config.disable && isMatched(config.disable)) ||
          (config.only && !isMatched(config.only));

        const category = warning.code.split(/[-_]/)[0];
        warningCounter[category] ??= { total: 0, ignored: 0 };

        warningCounter[category].total++;
        seenCodes.add(warning.code);

        if (shouldHandle) {
          warningCounter[category].ignored++;
          return; // Skip the warning
        }

        logger.warn(formatWarningLog(formatWarning(warning)));
      };
    },
    closeBundle() {
      if (config.summary) {
        const title =
          config.summary === 'ignored'
            ? 'Svelte Ignored Warnings Summary:'
            : 'Svelte Warnings Summary:';

        const { total, ignored } = Object.values(warningCounter).reduce(
          (acc, { total, ignored }) => ({
            total: acc.total + total,
            ignored: acc.ignored + ignored,
          }),
          { total: 0, ignored: 0 },
        );

        const categories = Object.entries(warningCounter)
          .map(([category, { total }]) => [category, total] as [string, number])
          .sort(([, a], [, b]) => b - a);

        const header: Header[] = [
          { value: 'Category', width: 20, align: 'left' },
          { value: 'Total', width: 10, align: 'center' },
          { value: 'Ignored', width: 10, align: 'center' },
        ];

        const rows = categories.map(([category, categoryTotal]) => [
          category,
          categoryTotal,
          warningCounter[category].ignored,
        ]);

        const footer: Header[] = [
          {
            value: 'total',
            footerAlign: 'right',
          },
          {
            value: total.toString(),
            align: 'center',
          },
          {
            value: ignored.toString(),
            align: 'center',
          },
        ];

        const table = Table(header, rows, footer, {
          borderStyle: 'solid',
          footerColor: 'yellow',
        });

        const summary = [chalk.bold(title), table.render()];

        if (config.listAllCodes) {
          summary.push(
            chalk.gray(
              [
                '',
                'Seen warning codes:',
                '',
                `- ${Array.from(seenCodes).sort().join('\n  - ')}`,
              ].join('\n'),
            ),
          );
        }

        (logger || this).info(`[svelte-warnings] ${summary.join('\n')}`);
      }
    },
  };
}
