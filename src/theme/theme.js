export const theme = {
  colors: {
    background: {
      primary: '#0A0A0A',
      secondary: '#1E3A8A',
      surface: 'rgba(255, 255, 255, 0.03)',
      surfaceHover: 'rgba(255, 255, 255, 0.08)'
    },
    text: {
      primary: '#F3F4F6',
      secondary: 'rgba(243, 244, 246, 0.9)'
    },
    accent: {
      primary: '#60A5FA',
      secondary: '#3B82F6'
    },
    border: {
      primary: 'rgba(96, 165, 250, 0.1)',
      hover: 'rgba(96, 165, 250, 0.2)'
    }
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      none: 1,
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 4px 6px rgba(0, 0, 0, 0.1)',
    md: '0 8px 24px rgba(0, 0, 0, 0.2)',
    lg: '0 16px 32px rgba(0, 0, 0, 0.3)',
  },
  transitions: {
    base: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.45s ease',
  },
  gradients: {
    primary: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
    background: 'linear-gradient(to bottom, #0A0A0A, #1E3A8A)',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  mixins: {
    glassmorphism: `
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(96, 165, 250, 0.1);
    `,
    textGradient: `
      background: linear-gradient(45deg, #60A5FA, #3B82F6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `,
    flexCenter: `
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    absoluteCenter: `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  }
}; 