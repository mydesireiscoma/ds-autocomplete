import path from 'path'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import standard from 'rollup-plugin-standard'

const formats = ['umd', 'esm']

const basePlugins = [
  standard({
    exclude: ['dist/*']
  }),
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: ['@babel/preset-env']
  })
]

const getOutputsConfig = (formats, folder = 'dist') => {
  const outputs = []

  formats.forEach((format) => {
    const filename = format === 'umd' ? `autocomplete.dist.js` : `autocomplete.${format}.dist.js`

    outputs.push({
      name: 'DSAutocomplete',
      file: path.join(folder, filename),
      format
    })
  })

  return outputs
}

export default [
  {
    input: 'src/index.js',
    output: [
      ...getOutputsConfig(formats),
      ...getOutputsConfig(['umd'], 'docs')
    ],
    plugins: basePlugins
  },
  {
    input: 'docs/docs.js',
    output: {
      file: 'docs/docs.dist.js',
      format: 'iife',
      external: ['prismjs', 'Prism']
    },
    plugins: [
      ...basePlugins,
      json({
        preferConst: true,
        compact: true
      })
    ]
  }
]
