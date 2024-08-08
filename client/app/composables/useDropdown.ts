export default function useDropdown(props: any) {
  const open = useState('show_dropdown', () => false);

  const toggleDropdown = () => {
    open.value = !open.value;
  };

  const closeOnEscape = (e: KeyboardEvent) => {
    if (open.value && e.key === 'Escape') {
      open.value = false;
    }
  };

  const dropdownWidthClass = computed(() => {
    return {
      '36': 'w-36',
      '40': 'w-40',
      '48': 'w-48',
      '64': 'w-64',
      '80': 'w-80',
    }[props.width];
  });

  const alignmentXClasses = computed(() => {
    return props.alignX === 'left' ? 'origin-top-left left-0' : 'origin-top-right right-0';
  });

  const alignmentYClasses = computed(() => {
    return props.alignY === 'top'
      ? 'origin-top-left top-[-50%] translate-y-[-100%]'
      : 'origin-top-right mt-2 bottom-0 translate-y-[100%]';
  });

  return {
    open,
    toggleDropdown,
    closeOnEscape,
    dropdownWidthClass,
    alignmentXClasses,
    alignmentYClasses,
  };
}
