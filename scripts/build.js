const { build, context } = require('esbuild');
const sveltePlugin = require('esbuild-svelte');
const sveltePreprocess = require('svelte-preprocess');

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
    drop: isProdBuild ? ['console'] : undefined
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
    outfile: './dist/content.js',
    mainFields: ['svelte', 'module', 'main', 'browser'],
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess()
      })
    ]
  };

  const popupJob = {
    ...commonConfig,
    entryPoints: ['./src/popup/popup.ts'],
    outbase: './src/popup',
    outdir: './dist',
    mainFields: ['svelte', 'module', 'main', 'browser'],
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess()
      })
    ]
  };

  const settingsJob = {
    ...commonConfig,
    entryPoints: ['./src/settings/settings.ts'],
    outbase: './src/settings',
    outdir: './dist',
    mainFields: ['svelte', 'module', 'main', 'browser'],
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess()
      })
    ]
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
