import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import standard from 'rollup-plugin-standard'

const formats = ['umd', 'esm']

const babelConfig = babel({
  exclude: 'node_modules/**',
  babelrc: false,
  presets: ['@babel/preset-env']
})

const standardConfig = standard({
  exclude: ['dist/*']
})

const getConfigForFormat = (format) => {
  const file = format === 'umd' ? `dist/autocomplete.dist.js` : `dist/autocomplete.${format}.dist.js`
  return {
    input: 'src/index.js',
    output: {
      name: 'DSAutocomplete',
      file,
      format
    },
    plugins: [
      standardConfig,
      babelConfig
    ]
  }
}

const DSARollupConfigs = []

formats.forEach((format) => {
  DSARollupConfigs.push(getConfigForFormat(format))
})

export default [
  ...DSARollupConfigs,
  {
    input: 'docs/docs.js',
    output: {
      file: 'docs/docs.dist.js',
      format: 'iife',
      external: ['prismjs', 'Prism']
    },
    plugins: [
      standardConfig,
      babelConfig,
      json({
        preferConst: true,
        compact: true
      })
    ]
  }
]
