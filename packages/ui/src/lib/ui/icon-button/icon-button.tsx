import { Tooltip } from '@components/tooltip';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React from 'react';

const iconButton = cva('fp-IconButton', {
  variants: {
    size: {
      small: 'fp-size-small',
      medium: 'fp-size-medium',
    },
    activeAppearance: {
      subtle: 'fp-active-appearance-subtle',
      solid: 'fp-active-appearance-solid',
    },
  },
  defaultVariants: {
    size: 'small',
    activeAppearance: 'subtle',
  },
});

type IconButtonElement = React.ElementRef<'button'>;
type IconButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof iconButton> & {
    'aria-label': string;
    tooltipContent?: React.ReactNode;
    disableTooltip?: boolean;
  };

const IconButton = React.forwardRef<IconButtonElement, IconButtonProps>((props, ref) => {
  const { className, size, activeAppearance, 'aria-label': ariaLabel, tooltipContent, disableTooltip, ...iconButtonProps } = props;
  const buttonElement = <button ref={ref} className={iconButton({ className, size, activeAppearance })} aria-label={ariaLabel} {...iconButtonProps} />;

  return disableTooltip ? buttonElement : <Tooltip content={tooltipContent ?? ariaLabel}>{buttonElement}</Tooltip>;
});

IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps };
