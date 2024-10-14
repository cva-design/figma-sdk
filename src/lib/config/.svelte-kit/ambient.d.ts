
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL: string;
	export const ATUIN_NOBIND: string;
	export const ATUIN_SESSION: string;
	export const AZURE_API_KEY: string;
	export const BATPIPE: string;
	export const BAT_PREVIEW: string;
	export const BAT_THEME: string;
	export const BROWSER: string;
	export const COMMAND_MODE: string;
	export const EDITOR: string;
	export const ELECTRON_RUN_AS_NODE: string;
	export const FAILED_SOUND: string;
	export const FZF_DEFAULT_COMMAND: string;
	export const FZF_DEFAULT_OPTS: string;
	export const GOBIN: string;
	export const GOPATH: string;
	export const GPTR_CODE: string;
	export const GROQ_API_KEY: string;
	export const HF_TOKEN: string;
	export const HISTFILESIZE: string;
	export const HISTSIZE: string;
	export const HOME: string;
	export const HOMEBREW_CELLAR: string;
	export const HOMEBREW_GITHUB_API_TOKEN: string;
	export const HOMEBREW_PREFIX: string;
	export const HOMEBREW_REPOSITORY: string;
	export const HOMIE_DIR: string;
	export const INFOPATH: string;
	export const LANG: string;
	export const LESS: string;
	export const LESSOPEN: string;
	export const LOGNAME: string;
	export const MANPATH: string;
	export const MODS_KEYS_OPENAI: string;
	export const MX_MASTER_ADDR: string;
	export const MallocNanoZone: string;
	export const NATIVEFIER_APPS_DIR: string;
	export const NODE_ENV: string;
	export const OLDPWD: string;
	export const OPENAI_API_KEY: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const PACKEMON_PM: string;
	export const PAGER: string;
	export const PATH: string;
	export const PROTO_APP_LOG: string;
	export const PROTO_DETECTED_FROM: string;
	export const PROTO_HOME: string;
	export const PROTO_NODE_BIN: string;
	export const PROTO_NODE_VERSION: string;
	export const PROTO_OFFLINE_TIMEOUT: string;
	export const PROTO_SHIM_NAME: string;
	export const PROTO_SHIM_PATH: string;
	export const PROTO_VERSION: string;
	export const PWD: string;
	export const SHELL: string;
	export const SHLVL: string;
	export const SPACESHIP_ROOT: string;
	export const SPACESHIP_VERSION: string;
	export const SSH_AUTH_SOCK: string;
	export const SUCCESS_SOUND: string;
	export const TEST: string;
	export const TMPDIR: string;
	export const USER: string;
	export const VISUAL: string;
	export const VITEST: string;
	export const VITEST_VSCODE: string;
	export const VITEST_VSCODE_LOG: string;
	export const VSCODE_AMD_ENTRYPOINT: string;
	export const VSCODE_CODE_CACHE_PATH: string;
	export const VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
	export const VSCODE_CWD: string;
	export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
	export const VSCODE_IPC_HOOK: string;
	export const VSCODE_L10N_BUNDLE_LOCATION: string;
	export const VSCODE_MARKETPLACE: string;
	export const VSCODE_NLS_CONFIG: string;
	export const VSCODE_PID: string;
	export const XDG_CACHE_HOME: string;
	export const XDG_CONFIG_HOME: string;
	export const XDG_DATA_HOME: string;
	export const XDG_PROJECTS_DIR: string;
	export const XDG_STATE_HOME: string;
	export const XPC_FLAGS: string;
	export const XPC_SERVICE_NAME: string;
	export const YSU_VERSION: string;
	export const Z: string;
	export const ZDOTDIR: string;
	export const Z_ALIAS: string;
	export const Z_COMPLETIONS: string;
	export const Z_CONF: string;
	export const Z_FUNCTIONS: string;
	export const Z_PLUGINS: string;
	export const _: string;
	export const __CFBundleIdentifier: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const __HM_SESS_VARS_SOURCED: string;
	export const __fzf_preview_lsd: string;
	export const __fzf_preview_lsd_tree: string;
	export const _hishtory_tui_color: string;
	export const PROD: string;
	export const DEV: string;
	export const BASE_URL: string;
	export const MODE: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL: string;
		ATUIN_NOBIND: string;
		ATUIN_SESSION: string;
		AZURE_API_KEY: string;
		BATPIPE: string;
		BAT_PREVIEW: string;
		BAT_THEME: string;
		BROWSER: string;
		COMMAND_MODE: string;
		EDITOR: string;
		ELECTRON_RUN_AS_NODE: string;
		FAILED_SOUND: string;
		FZF_DEFAULT_COMMAND: string;
		FZF_DEFAULT_OPTS: string;
		GOBIN: string;
		GOPATH: string;
		GPTR_CODE: string;
		GROQ_API_KEY: string;
		HF_TOKEN: string;
		HISTFILESIZE: string;
		HISTSIZE: string;
		HOME: string;
		HOMEBREW_CELLAR: string;
		HOMEBREW_GITHUB_API_TOKEN: string;
		HOMEBREW_PREFIX: string;
		HOMEBREW_REPOSITORY: string;
		HOMIE_DIR: string;
		INFOPATH: string;
		LANG: string;
		LESS: string;
		LESSOPEN: string;
		LOGNAME: string;
		MANPATH: string;
		MODS_KEYS_OPENAI: string;
		MX_MASTER_ADDR: string;
		MallocNanoZone: string;
		NATIVEFIER_APPS_DIR: string;
		NODE_ENV: string;
		OLDPWD: string;
		OPENAI_API_KEY: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		PACKEMON_PM: string;
		PAGER: string;
		PATH: string;
		PROTO_APP_LOG: string;
		PROTO_DETECTED_FROM: string;
		PROTO_HOME: string;
		PROTO_NODE_BIN: string;
		PROTO_NODE_VERSION: string;
		PROTO_OFFLINE_TIMEOUT: string;
		PROTO_SHIM_NAME: string;
		PROTO_SHIM_PATH: string;
		PROTO_VERSION: string;
		PWD: string;
		SHELL: string;
		SHLVL: string;
		SPACESHIP_ROOT: string;
		SPACESHIP_VERSION: string;
		SSH_AUTH_SOCK: string;
		SUCCESS_SOUND: string;
		TEST: string;
		TMPDIR: string;
		USER: string;
		VISUAL: string;
		VITEST: string;
		VITEST_VSCODE: string;
		VITEST_VSCODE_LOG: string;
		VSCODE_AMD_ENTRYPOINT: string;
		VSCODE_CODE_CACHE_PATH: string;
		VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
		VSCODE_CWD: string;
		VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
		VSCODE_IPC_HOOK: string;
		VSCODE_L10N_BUNDLE_LOCATION: string;
		VSCODE_MARKETPLACE: string;
		VSCODE_NLS_CONFIG: string;
		VSCODE_PID: string;
		XDG_CACHE_HOME: string;
		XDG_CONFIG_HOME: string;
		XDG_DATA_HOME: string;
		XDG_PROJECTS_DIR: string;
		XDG_STATE_HOME: string;
		XPC_FLAGS: string;
		XPC_SERVICE_NAME: string;
		YSU_VERSION: string;
		Z: string;
		ZDOTDIR: string;
		Z_ALIAS: string;
		Z_COMPLETIONS: string;
		Z_CONF: string;
		Z_FUNCTIONS: string;
		Z_PLUGINS: string;
		_: string;
		__CFBundleIdentifier: string;
		__CF_USER_TEXT_ENCODING: string;
		__HM_SESS_VARS_SOURCED: string;
		__fzf_preview_lsd: string;
		__fzf_preview_lsd_tree: string;
		_hishtory_tui_color: string;
		PROD: string;
		DEV: string;
		BASE_URL: string;
		MODE: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
