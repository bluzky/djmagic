import { build, context } from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';
import sassPlugin from 'esbuild-plugin-sass';
import postCssPlugin from 'esbuild-style-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const isProdBuild = process.argv.includes('--prod');
const watch = process.argv.includes('--watch');

main();

async function main() {
  let commonConfig = {
    outbase: './src',
    platform: 'browser',
    external: [],
    bundle: true,
    sourcemap: !isProdBuild,
    minify: isProdBuild,
    tsconfig: './tsconfig.json',
    drop: isProdBuild ? ['console'] : undefined,
    mainFields: ['svelte', 'module', 'main', 'browser'],
    conditions: ['svelte', 'browser'],
    loader: {
      '.ts': 'ts',
      '.js': 'jsx',
      '.svg': 'dataurl',
      '.html': 'text'
    },
    alias: {
      $lib: './src/lib',
      '$lib/components': './src/lib/components'
    },
    logLevel: 'info',

    plugins: [
      sassPlugin(),
      postCssPlugin({
        postcss: {
          plugins: [tailwindcss, autoprefixer]
        }
      }),

      sveltePlugin({
        preprocess: sveltePreprocess()
      })
    ]
  };

  if (watch) {
    commonConfig = {
      ...commonConfig,
      sourcemap: 'inline'
    };
  }

  const contentJob = {
    ...commonConfig,
    entryPoints: ['./src/content.ts'],
    outfile: './dist/content.js'
  };

  const popupJob = {
    ...commonConfig,
    entryPoints: ['./src/popup/popup.ts'],
    outbase: './src/popup',
    outdir: './dist'
  };

  const settingsJob = {
    ...commonConfig,
    entryPoints: ['./src/settings/settings.ts'],
    outbase: './src/settings',
    outdir: './dist'
  };

  const allJobs = [contentJob, popupJob, settingsJob];

  if (watch) {
    allJobs.map(job => {
      context(job).then(context => {
        context.watch();
      });
    });
    console.log('👀 Watching for changes...');
  } else {
    return Promise.all(allJobs.map(job => build(job))).then(() =>
      console.log('⚡ Compiled')
    );
  }
}
