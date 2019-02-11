import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    name: 'Autocomplete',
    file: 'dist/autocomplete.dist.js',
    format: 'iife'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ['@babel/preset-env']
    })
  ]
}
