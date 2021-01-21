const path = require('path')

const vueSrc = './src'
const stylesLink = './src/assets/sass'

module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, vueSrc),
                styles: path.join(__dirname, stylesLink)
            },
            symlinks: false
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "~@/assets/sass/_variables.sass"'
            }
        }
    }
}
