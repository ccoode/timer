module.exports = {
    plugins: [
        require('postcss-import')(),
        require("postcss-cssnext")({
            browsers: ['last 2 versions', 'ie >= 9'],
            compress: true,
        })
    ]
}