module.exports = {
  configureWebpack:{
    resolve: {
      alias:{
        "assets": '@/assets',
        "components": '@/components',
        "common": '@/common',
        "network": '@/network',
        "views": '@/views'
      }
    }
  },
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
