export default function useBtnStyles() {
  // TODO - Hydration children mismatch

  const ripple = ref(false);

  function setSize(size: string, square: boolean, block: boolean, variant: string) {
    if (variant === 'link') {
      return {
        'default': 'text-base font-semibold',
        'xs': 'text-xs font-semibold',
        'sm': 'text-sm font-semibold',
        'md': 'text-md font-semibold',
        'lg': 'text-lg font-semibold',
        'xl': 'text-xl font-semibold',
      }[size]
    }

    if (block) {
      return {
        'default': 'text-md font-semibold  w-full py-2',
        'xs': 'text-xs font-semibold  w-full py-2',
        'sm': 'text-sm font-semibold  w-full py-2',
        'md': 'text-md font-semibold  w-full py-3',
        'lg': 'text-lg font-semibold  w-full py-4',
        'xl': 'text-xl font-semibold  w-full py-4',

      }[size];
    }

    if (square) {
      return {
        'default': 'text-base font-semibold w-9 h-9',
        'xs': 'text-xs font-semibold w-7 h-7',
        'sm': 'text-sm font-semibold w-8 h-8',
        'md': 'text-md font-semibold w-9 h-9',
        'lg': 'text-lg font-semibold w-11 h-11',
        'xl': 'text-xl font-semibold w-12 h-12',
      }[size];
    }

    return {
      'default': 'text-base font-semibold py-2 px-4',
      'xs': 'text-xs font-semibold py-1 px-2',
      'sm': 'text-sm font-semibold py-1 px-2',
      'md': 'text-md font-semibold py-1 px-3',
      'lg': 'text-lg font-semibold py-2 px-4',
      'xl': 'text-xl font-semibold py-2 px-4',
    }[size];
  }

  function useSizeIcon(size: string) {
    return {
      'default': 'text-xl',
      'xs': 'text-lg',
      'sm': 'text-lg',
      'md': 'text-xl',
      'lg': 'text-2xl',
      'xl': 'text-2xl',
    }[size];
  }

  function setVariant(variant: string, color: string, disabled: boolean) {
    if (disabled) {
      return 'cursor-not-allowed bg-slate-200 text-slate-400';
    }

    return {
      'default': useColor(color),
      'solid': useColor(color),
      'outline': useColor(color + '-outline'),
      'link': useColor(color + '-link'),
      'ghost': useColor(color + '-ghost'),
      'light': useColor(color + '-light'),
    }[variant];
  }

  function setRounded(rounded: string) {
    return {
      'default': 'rounded-md',
      'none': 'rounded-none',
      'sm': 'rounded-ms',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      'full': 'rounded-full',
    }[rounded];
  }

  function setIconPosition(params: string) {
    return {
      'default': 'flex-row',
      'left': 'flex-row',
      'right': 'flex-row-reverse',
    }[params];
  }

  function setColorForRipple(color: string) {
    return useColor(color + '-ripple');
  }

  function rippleClick() {
    ripple.value = !ripple.value;

    setTimeout(() => {
      ripple.value = !ripple.value;
    }, 300);
  }

  return {
    ripple,
    rippleClick,
    setVariant,
    setSize,
    useSizeIcon,
    setRounded,
    setIconPosition,
    setColorForRipple,
  };
}

