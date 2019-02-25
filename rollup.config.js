import babel from 'rollup-plugin-babel'
import standard from 'rollup-plugin-standard'

export default {
  input: 'src/index.js',
  output: {
    name: 'DSAutocomplete',
    file: 'dist/autocomplete.dist.js',
    format: 'iife'
  },
  plugins: [
    standard({
      exclude: ['dist/*']
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ['@babel/preset-env']
    })
  ]
}
