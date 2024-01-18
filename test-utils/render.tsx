import { ThemeProvider } from '@/providers/theme-provider';
import { render as testingLibraryRender } from '@testing-library/react';
// import { MantineProvider } from '@mantine/core';
// import { theme } from '../theme';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children, ...props }: { children: React.ReactNode }) => (
    <ThemeProvider {...props}>
      <div id='Main' className='Main'>
      {children}
      </div>
      </ThemeProvider>   
    ),
  });
}
