require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        classy : 'lib/classy',
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        QRCode: "lib/qrcode",
        modernizr: "lib/modernizr",
        'socket.io': "lib/socket.io"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'classy' : {
            exports: 'Class'
        },
        'underscore': {
            exports: '_'
        },
        "socket.io": {
            exports: "io"
        },
        "QRCode": {
            exports: "QRCode"
        },
        "modernizr": {
            exports: "modernizr"
        }
    }
});

define([
    'router'
], function (
    router
) {
    Backbone.history.start();
});
