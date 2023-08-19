import React from 'react';

import { twMerge } from 'tailwind-merge';

type Intent = 'none' | 'primary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'xl';
type Type = 'label+icon' | 'label-only' | 'icon-only';

const btnClassesByIntent: Record<Intent, string> = {
  none: twMerge(
    'bg-white text-gray-800 hover:bg-gray-100 disabled:bg-gray-200'
  ),
  primary: twMerge(
    'bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-200'
  ),
  success: twMerge(
    'bg-green-600 text-white hover:bg-green-500 disabled:bg-green-200'
  ),
  warning: twMerge(
    'bg-amber-600 text-white hover:bg-amber-500 disabled:bg-amber-200'
  ),
  danger: twMerge('bg-red-600 text-white hover:bg-red-500 disabled:bg-red-200'),
};

const btnClassesBySize: Record<Type, Record<Size, string>> = {
  'label+icon': {
    sm: twMerge('gap-0.5 py-0.5 pl-1 pr-1.5'),
    md: twMerge('gap-1 py-1 pl-1.5 pr-2'),
    lg: twMerge('gap-1 py-2 pl-2 pr-3'),
    xl: twMerge('gap-1 py-3 pl-2.5 pr-4'),
  },
  'label-only': {
    sm: twMerge('py-0.5 px-1.5'),
    md: twMerge('py-1 px-2'),
    lg: twMerge('py-2 px-3'),
    xl: twMerge('py-3 px-4'),
  },
  'icon-only': {
    sm: twMerge('p-1'),
    md: twMerge('p-1.5'),
    lg: twMerge('p-2'),
    xl: twMerge('p-2.5'),
  },
};

const icnClassesBySize: Record<Size, string> = {
  sm: twMerge('!h-3 !w-3'),
  md: twMerge('!h-4 !w-4'),
  lg: twMerge('!h-4 !w-4'),
  xl: twMerge('!h-5 !w-5'),
};

const lblClassesBySize: Record<Size, string> = {
  sm: twMerge('text-sm'),
  md: twMerge('text-base'),
  lg: twMerge('text-lg'),
  xl: twMerge('text-xl'),
};

/**
 * Gets the type of button based on children and icon
 */
const getType = (children: React.ReactNode, icon?: React.ElementType): Type => {
  if (children && icon) {
    return 'label+icon';
  }
  if (icon) {
    return 'icon-only';
  }
  return 'label-only';
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  intent?: Intent;
  size?: Size;
}

export interface ButtonWithIconProps extends ButtonProps {
  icon: React.ElementType;
  children?: React.ReactNode;
}

export interface ButtonWithLabelProps extends ButtonProps {
  icon?: React.ElementType;
  children: React.ReactNode;
}

export const Button = ({
  intent = 'none',
  size = 'lg',
  icon,
  children,
  className,
  ...props
}: ButtonWithIconProps | ButtonWithLabelProps) => {
  const Icon = icon;
  const type = getType(children, icon);

  return (
    <button
      type="button"
      className={twMerge(
        'box-border flex cursor-pointer flex-row items-center justify-center rounded border border-solid border-gray-200 disabled:cursor-not-allowed disabled:opacity-50',
        btnClassesByIntent[intent],
        btnClassesBySize[type][size],
        className
      )}
      {...props}
    >
      {Icon ? (
        <Icon
          className={twMerge(
            'order-none flex-none flex-grow-0',
            icnClassesBySize[size]
          )}
        />
      ) : null}

      {typeof children === 'string' ? (
        <div
          className={twMerge(
            'order-1 flex-none flex-grow-0',
            lblClassesBySize[size]
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
