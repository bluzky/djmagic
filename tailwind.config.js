import { join } from 'path';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';

console.log('Tailwind config loaded');

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // 3. Append the path to the Skeleton package
    join(
      require.resolve('@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    )
  ],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {}
  },
  plugins: [
    skeleton({
      theme: {
        preset: ['skeleton']
      }
    })
  ]
};

export default config;
