var webpack = require("webpack");
var Path = require("path");
var exec = require('child_process').exec;
exec("find img/* -name '*'", function(err, data){
    var files = data.split("\n").slice(0, -1);
    exec("echo '" + JSON.stringify(files) + "' > src/img.json");
});

module.exports = {
    context: Path.resolve('./'),
    optimize: "uglify",
    entry: {
        'entry': Path.resolve('src/entry.js')
    },
    resolve: {
        root: [
            Path.resolve('./')
        ],
        extensions: ['', '.js', '.json', ".css", ".less", ".html"]
    },
    output: {
        path: Path.resolve("dist"),
        publicPath: '/dist/',
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style/useable!css!postcss-loader!less' },
            { test: /\.css$/, loader: "style/useable!css!postcss-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "url-loader?limit=100000" },
            { test: /\.svg$/, loader: "url-loader?limit=100000" },
            { test: /\.html$/, loader: "raw" },
            { test: /\.json$/, loader: "json" }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }
        ]
    },
    jshint: {
        emitErrors: true,
        failOnHint: false,
    },
    postcss: function () {
        return [require('autoprefixer'), require('precss')];
    }
};
