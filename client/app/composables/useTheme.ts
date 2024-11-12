interface Theme {
  colors: {
    primary: string;
    secondary: string;
    [key: string]: string;
  }
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      lg: string;
      xl: string;
      [key: string]: string;
    }
  }
}

export const useTheme = () => {
  const colorMode = useColorMode()
  const theme = ref<Theme>({
    colors: {
      primary: '#1e1b4b',
      secondary: '#172554',
      // ... inne kolory
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: {
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem'
      }
    }
  })

  const setTheme = (mode: 'light' | 'dark') => {
    colorMode.preference = mode
    // Logika zmiany motywu
  }

  return {
    theme,
    setTheme
  }
} 