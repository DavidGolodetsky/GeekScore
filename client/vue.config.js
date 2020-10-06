const SWPrecache = require('sw-precache-webpack-plugin')
const path = require('path')

module.exports = {
    outputDir: path.resolve(__dirname, '../public'),
    devServer: {
        proxy: {
            '/api': {
                secure: false,
                target: 'http://' + process.env.VUE_APP_BACKEND_HOST + ':3000'
            }
        }
    },
    "transpileDependencies": [
        "vuetify"
    ],
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/styles/main.scss";`
            }
        }
    },
    pwa: {
        workboxOptions: {
            exclude: [/\.map$/, /_redirects/],
            runtimeCaching: [{
                urlPattern: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg))/g,
                handler: 'networkFirst',
                options: {
                    networkTimeoutSeconds: 20,
                    cacheName: 'img-cache',
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
                {
                    urlPattern: /^https:\/\/(fonts)/,
                    handler: 'networkFirst',
                    options: {
                        networkTimeoutSeconds: 20,
                        cacheName: 'fonts-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                }]
        }
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new SWPrecache({
                        cacheId: "geekscore",
                        filepath: "service-worker.js",
                        staticFileGlobs: [
                            "public/index.html",
                            "public/site.webmanifest",
                            "dist/**/*.{js,css}"
                        ],
                        stripPrefix: "/"
                    })
                ]
            }
        }
    }
}
