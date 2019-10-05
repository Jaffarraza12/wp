/**
 * Created by pavel on 30.05.2016.
 */
jQuery( function ( $ ) {
    if(typeof aliExtensionAjax !== 'undefined'){
        ajaxurl = aliExtensionAjax.ajaxurl;
    }

    if(!window.ajaxurl){
        window.ajaxurl = window.location.origin +'/wp-admin/admin-ajax.php';
    }

    if ( typeof window.ADS === 'undefined' ) {
        window.ADS = {};
    }

    if( !window.ADS.Dispatcher ){
        window.ADS.Dispatcher = {
            subscribers : [],

                /**
                 *
                 * @param {string} event
                 * @param {function} observer
                 * @param {object} context
                 * @param info
                 * @param {boolean} one
                 *
                 * @example
                 * Dispatcher.on('adsGoogleExtension:name', function(e){}, this, {a1:123})
                 */
                on: function( event, observer, context, info, one ) {

                context = context || null;
                info = info || null;
                one = one || false;

                var handler = {
                    observer:observer,
                    context: context,
                    info: info,
                    one: one
                };

                if ( this.subscribers.hasOwnProperty( event ) ) {
                    this.subscribers[ event ].push( handler );
                } else {
                    this.subscribers[ event ] = [ handler ];
                }
            },
            one: function( event, observer, context, info ) {
                context = context || null;
                info = info || null;
                this.on( event, observer, context, info, true );
            },

            trigger: function( event, data ) {
                for ( var ev in this.subscribers ) {
                    if ( ev !== event ) {
                        continue;
                    }
                    if ( this.subscribers.hasOwnProperty( ev ) ) {
                        var _self = this;
                        this.subscribers[ ev ].forEach( function( handler, i ){
                            handler.observer.call( handler.context, data, handler.info );
                            if ( handler.one ) {
                                _self.subscribers[ ev ].splice( i, 1 );
                            }
                        } );
                    }
                }
            }

        };
    }

    if( !window.ADS.serialize ){
        window.ADS.serialize = function ( $el ) {
            var serialized = $el.serialize();
            if ( !serialized )
                serialized = $el.find( 'input[name],select[name],textarea[name]' ).serialize();
            return serialized;
        }
    }

    window.Base64 = {

        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode : function ( input ) {

            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i      = 0;

            if(!input){
                return input;
            }

            input = window.Base64._utf8_encode( input );

            while ( i < input.length ) {

                chr1 = input.charCodeAt( i++ );
                chr2 = input.charCodeAt( i++ );
                chr3 = input.charCodeAt( i++ );

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if ( isNaN( chr2 ) ) {
                    enc3 = enc4 = 64;
                } else if ( isNaN( chr3 ) ) {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt( enc1 ) + this._keyStr.charAt( enc2 ) +
                    this._keyStr.charAt( enc3 ) + this._keyStr.charAt( enc4 );

            }

            return output;
        },

        // public method for decoding
        decode : function ( input ) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i      = 0;

            if(!input){
                return input;
            }

            input = input.replace( /[^A-Za-z0-9\+\/\=]/g, "" );

            while ( i < input.length ) {

                enc1 = this._keyStr.indexOf( input.charAt( i++ ) );
                enc2 = this._keyStr.indexOf( input.charAt( i++ ) );
                enc3 = this._keyStr.indexOf( input.charAt( i++ ) );
                enc4 = this._keyStr.indexOf( input.charAt( i++ ) );

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode( chr1 );

                if ( enc3 !== 64 ) {
                    output = output + String.fromCharCode( chr2 );
                }
                if ( enc4 !== 64 ) {
                    output = output + String.fromCharCode( chr3 );
                }

            }

            output = Base64._utf8_decode( output );

            return output;

        },

        // private method for UTF-8 encoding
        _utf8_encode : function ( string ) {
            string      = string.replace( /\r\n/g, "\n" );
            var utftext = "";

            for ( var n = 0; n < string.length; n++ ) {

                var c = string.charCodeAt( n );

                if ( c < 128 ) {
                    utftext += String.fromCharCode( c );
                }
                else if ( (c > 127) && (c < 2048) ) {
                    utftext += String.fromCharCode( (c >> 6) | 192 );
                    utftext += String.fromCharCode( (c & 63) | 128 );
                }
                else {
                    utftext += String.fromCharCode( (c >> 12) | 224 );
                    utftext += String.fromCharCode( ((c >> 6) & 63) | 128 );
                    utftext += String.fromCharCode( (c & 63) | 128 );
                }

            }

            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode : function ( utftext ) {
            var string = '', i = 0, c = 0, c1 = 0, c2 = 0;

            while ( i < utftext.length ) {

                c = utftext.charCodeAt( i );

                if ( c < 128 ) {
                    string += String.fromCharCode( c );
                    i++;
                }
                else if ( (c > 191) && (c < 224) ) {
                    c2 = utftext.charCodeAt( i + 1 );
                    string += String.fromCharCode( ((c & 31) << 6) | (c2 & 63) );
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt( i + 1 );
                    c1 = utftext.charCodeAt( i + 2 );
                    string += String.fromCharCode( ((c & 15) << 12) | ((c2 & 63) << 6) | (c1 & 63) );
                    i += 3;
                }

            }

            return string;
        }

    };


     window.ADS.aliExtension = (function () {
        var $this;

        var options = {
            sleep : 5000,
            method : 'iframe'
        };

        var stageLoderPages = {
            active : false,
            stack : [],
            _observers : [],
            current : null
        };

        function formatJSON(data) {

            if(typeof data === "object"){
                return data;
            }

            try { data=JSON.parse(data); } catch (e) {
                var from = data.search('{');

                if (from === -1) {
                    console.log("not JSON");
                    return false;
                }
                data = data.substring(from+1);

                return formatJSON('{'+data);
            }

            return data;
        }

         function tryJSON( data ) {
            try {
                var response = $.parseJSON( data );
            }
            catch ( e ) {
                return false;
            }

            return response;
        }


        function htmlToObj( html ) {
            var div = $( '<div></div>' );
            return $( div ).append( html );
        }

        function b64EncodeUnicode( str ) {
            return btoa( encodeURIComponent( str ).replace( /%([0-9A-F]{2})/g, function ( match, p1 ) {
                return String.fromCharCode( '0x' + p1 );
            } ) );
        }

        function getPage( link ) {
            window.postMessage( { type : "requestHtml", method: options.method, url : link }, "*" );
        }

        function b64DecodeUnicode( str ) {
            return str ? window.Base64.decode( str ) : false;
        }


        function addStack( link, observer, context, index ) {
            var is_context = context || null;
            if ( typeof stageLoderPages._observers[ link ] === 'undefined' )stageLoderPages._observers[ link ] = [];
            stageLoderPages._observers[ link ].push( { observer : observer, context : is_context, index : index } );
            stageLoderPages.stack.push( link );
        }

        function getStack() {
             stageLoderPages.current = stageLoderPages.stack.pop()
            return stageLoderPages.current;
        }

        function notify( link, data ) {
            if ( Object.keys( stageLoderPages._observers ).length ) {

                var cb = stageLoderPages._observers[ link ],
                    i;

                for ( i in cb ) {
                    var item        = cb[ i ];
                    data[ 'index' ] = item.index;
                    data[ 'notifyLink' ] = link;
                    item.observer.call( item.context, data );
                }
                delete stageLoderPages._observers[ link ];
            }
        }

        /**
         * отправляет  background Dispatcher.on('action', response.info)
         * @param action
         * @param info
         */
        function sendToBg( action, info ) {

            info = info || {};

            window.postMessage( {
                source : 'NAME_SOURCE_BG',
                action : action,
                info   : info
            }, "*" );

        }

        function importProduct( productOriginal ) {


            var form_Data     = new FormData();

            form_Data.append('action', 'ads_product_ali');
            form_Data.append('product', b64EncodeUnicode( JSON.stringify( productOriginal ) ) );

            $.ajax( {
                url      : ajaxurl,
                dataType : 'json',
                data     : form_Data,
                contentType:false,
                processData:false,
                type     : "POST",
                success  : function ( response ) {

                    response = formatJSON(response);

                   if(response.success){

                       window.imagesProduct.upload(response.success, {
                           product: productOriginal,
                           response : response
                       });

                   }else{

                       sendToBg('toBg:resultPublishProduct', {
                           product: productOriginal,
                           response : response
                       });
                   }

                }
            } );
        }

        function publicProduct( info ) {
            var product  = info.product;

            var form_Data     = new FormData();

            form_Data.append('action', 'ads_google_extension');
            form_Data.append('ads_actions', 'publicProduct');
            form_Data.append('product_id', product.product_id);


            for ( var key in info ) {
                var value = info[key];

                if(typeof value === 'object')
                    value = JSON.stringify(value);

                form_Data.append(key, value);
            }

            $.ajax( {
                url      : ajaxurl,
                dataType : 'json',
                data     : form_Data,
                contentType:false,
                processData:false,
                type     : "POST",
                success  : function ( response ) {

                    response = formatJSON(response);

                    if(response.success){

                        window.imagesProduct.upload(response.success, {
                            product: product,
                            response : response
                        });

                    }else{

                        sendToBg('toBg:resultPublishProduct', {
                            product: product,
                            response : response
                        });
                    }

                }
            } );
        }

        function eventAdsGoogleExtension( data ) {
            var info          = data.info;
            var dataInActions = info.data;
            var form_Data     = new FormData();

            form_Data.append('action', 'ads_google_extension');
            form_Data.append('ads_actions', info.ads_actions);

            //TODO удалить используется только в getInfoProductShop
            if(typeof info.productId !== 'undefined'){
                form_Data.append('product_id', info.productId);
            }

            for ( var key in dataInActions ) {
                var value = dataInActions[key];

                if(typeof value === 'object')
                    value = JSON.stringify(value);

                form_Data.append(key, value);
            }

            $.ajax( {
                url      : ajaxurl,
                data     : form_Data,
                contentType:false,
                processData:false,
                type     : "POST",
                success  : function ( response ) {

                    response = formatJSON(response);

                    if( response && response.hasOwnProperty('done') ){

                        if(window.ADS.Dispatcher)
                            window.ADS.Dispatcher.trigger("adsGoogleExtension:"+info.ads_actions, dataInActions);

                        window.postMessage( {
                            type         : "adsGoogleExtension:toBg",
                            data         : {
                                ads_actions : info.ads_actions,
                                callback    : info.callback,
                                response    : response
                            }

                        }, "*" );
                        return;
                    }

                    window.postMessage( {
                        type         : "adsGoogleExtension:toBg",
                        data         : {
                            ads_actions : info.ads_actions,
                            callback    : info.callback,
                            response    : { error : 'not response' }
                        },
                        tabId        : data.tabId

                    }, "*" );

                },
                error    : function () {
                    window.postMessage( {
                        type         : "adsGoogleExtension:toBg",
                        data         : {
                            ads_actions : info.ads_actions,
                            callback    : info.callback,
                            response    : { error : 'error send' }
                        }

                    }, "*" );
                }
            });

        }

        /**
         * Отправляет сообщения в модуль activeStore
         * @param action
         * @param info
         */
        //TODO заменить на sendToBg
        function sendToaliExpansion( action, info ) {

            info = info || {};

            window.postMessage( {
                type         : "adsGoogleExtension:toBg",
                data         : {
                    action  : action,
                    info    : info

                }
            }, "*" );
        }

        return {
            init    : function () {
                $this = this;
                window.addEventListener( "message", function ( event ) {

                    if ( event.source !== window )
                        return;

                    if ( !event.data.type )
                        return;

                    if ( event.data.type === "responseHtml" ) {
                        event.data.info.html = b64DecodeUnicode( event.data.info.html );
                        event.data.info.obj  = htmlToObj( event.data.info.html );

                        notify( event.data.info.url, event.data.info );

                        setTimeout(function (  ) {
                            var linkPages = getStack();
                            if ( linkPages ) {
                                getPage( linkPages );
                            } else {
                                stageLoderPages.active = false;
                            }
                        }, options.sleep);

                        var params = {
                            html : event.data.info.html,
                            error : event.data.info.error,
                            code : event.data.info.code,
                            url  : event.data.info.url
                        };

                        if(window.ADS.Dispatcher)
                            window.ADS.Dispatcher.trigger("responseHtml:"+params.url, params);

                    }

                    if ( event.data.type === "adsGoogleExtension:toShop" && event.data.info.info.ads_actions !== 'toShop:productAli') {
                        eventAdsGoogleExtension( event.data.info );
                    }

                    if ( event.data.type === "adsGoogleExtension:toShop" && event.data.info.info.ads_actions === 'toShop:productAli') {
                        window.ADS.Dispatcher.trigger('productAli:'+event.data.info.info.data.link,
                            {
                                product : event.data.info.info.data.product ,
                                code: event.data.info.info.data.code
                            });
                    }

                    if ( event.data.type === "adsGoogleExtension:parseProductPage" ) {
                        event.data.info.html = b64DecodeUnicode( event.data.info.html );
                        var product = window.ADS.aliParseProduct.parseHtml( event.data.info.html, event.data.info.url );

                        product['post_status']  ='';

                        $.ajax( {
                            url      : ajaxurl,
                            data     : {
                                action : 'ads_google_extension',
                                ads_actions : 'generatePermalink',
                                title : product.title
                            },
                            type     : "POST",
                            success  : function ( response ) {
                                response = formatJSON(response);
                                product.permalink = response.permalink;

                                sendToBg( 'parseProductAli:done', {
                                    product : product,
                                    url     : event.data.info.url
                                } );
                            }
                        });

                    }

                    if ( event.data.type === "adsGoogleExtension:PublicProductHtml") {
                        event.data.info.html = b64DecodeUnicode( event.data.info.html );
                        var product              = window.ADS.aliParseProduct.parseHtml( event.data.info.html, event.data.info.url );
                        importProduct( product );
                    }

                    if ( event.data.type === "adsGoogleExtension:PublicProductObj") {
                        importProduct( event.data.info.product );
                    }

                    if ( event.data.type && (event.data.type === "adsGoogleExtension:PublicProduct") ) {
                        publicProduct(event.data.info)
                    }

                }, false );

                $( 'body' ).on( 'test:extensions', function ( e ) {
                    if ( e.active ) {
                        window.ADS.aliExtension.addWebSite();
                    }
                } );

                $(document).on('imagesProduct:start', function (e) {
                    var obj = e.obj;
                    var params = obj.params;
                    if(obj.total){
                        params['response']['message'] = e.response.message;
                    }
                    sendToBg('toBg:resultPublishProduct',params );
                });
                $(document).on('imagesProduct:next', function (e) {
                    var obj = e.obj;
                    var params = obj.params;
                    if(obj.total){
                        params['response']['message'] = e.response.message;
                    }
                    sendToBg('toBg:resultPublishProduct',params );
                });
                $(document).on('imagesProduct:finish', function (e) {
                    var obj = e.obj;
                    var params = obj.params;
                    if(obj.total){
                        params['response']['message'] = e.response.message;
                    }
                    sendToBg('toBg:resultPublishProduct',params );
                });

            },
            addTask : function ( link, observer, context, index ) {
                addStack( link, observer, context, index );
                if ( !stageLoderPages.active ) {
                    stageLoderPages.active = true;
                    getPage( getStack() );
                }
            },
            reloadTask: function () {
                getPage( stageLoderPages.current );
            },
            startTask: function (link) {
                getPage( link );
            },
            sleepTask: function(time){
                options.sleep = time * 1000;
                return 'set sleep - ' + time + 'sec';
            },
            enableAjax: function(){
                options.method = 'ajax';
                return 'set method - ajax';
            },
            enableIframe: function(){
                options.method = 'iframe';
                return 'set method - iframe';
            },
            productByUrl : function (link) {
               return $this.getPage(link).then(function (e) {
                   return window.ADS.aliParseProduct.parseObj( e.obj, link );
                });
            },
            productAli : function (link) {
                return new Promise(function (resolve, reject) {

                    sendToaliExpansion( 'toBg:productAli',{link : link} );

                    var idResolve = null;

                    window.ADS.Dispatcher.one('productAli:'+link, function (params) {
                        clearTimeout(idResolve);
                        resolve(params);
                    }, this );

                    idResolve = setTimeout(function () {
                        reject( 'fail get page ' + link )
                    }, 120000);


                })
            },
            getPage: function ( link ) {
                return new Promise(function (resolve, reject) {
                    var idResolve = null;
                    $this.addTask(link, function (params) {
                        clearTimeout(idResolve);
                        resolve(params);
                    }, this );

                    idResolve = setTimeout(function () {
                        reject( 'fail get page ' + link )
                    }, 120000);
                });
            },
            /**
             * Получает трекинги по номерам заказа на Али и
             * записывает их всем товарам из заказа
             *
             * @param  {String[] || String} ordersIdAli
             * */
            getTIPOrders: function( ordersIdAli ){
                ordersIdAli =  ordersIdAli.filter(Boolean);
                sendToaliExpansion( 'getTIPOrders', ordersIdAli );
            },
            /**
             * Получает трекинг по номеру заказа на Али и
             * записывает товару с orderIdStore
             *
             * @param  {String | Integer} orderIdStore
             * @param  {String} orderIdAli
             *
             * */
            getTIPOrder: function( orderIdStore, orderIdAli ){
                sendToaliExpansion( 'getTIPOrder', {
                    orderIdStore : orderIdStore,
                    orderIdAli   : orderIdAli
                } )
            },
            /*
             * Получает все трекинги с Али и
             * записывает их всем товарам из заказа
             * */
            getTIPAllOrders: function(){
                sendToaliExpansion( 'getTIPAllOrders' )
            },

            /**
             * ручное размещение заказа
             * расширение создает вкладку и вней отслеживаает покупку
             *
             * @return event adsGoogleExtension:setOrdersIdAli
             */
            placeOrderManually: function ( product_url, product_id, item_id, product_url_origin ) {
                sendToaliExpansion( 'placeOrderManually', {
                    product_url : product_url,
                    product_id : product_id,
                    orderIdStore: item_id,
                    product_url_origin : product_url_origin
                } );
            },
            /**
             * add token key store in google extension
             */
            auth: function () {
                var paramsStore ={
                    store  : {
                        name : store.name,
                        url : store.site_url,
                        linkImportStore : store.site_url
                        }
                };

                $.ajax({
                    url: ajaxurl,
                    data: {action: 'ads_oauth1', ads_action: 'key', args: {}},
                    type: 'POST',
                    dataType: 'json',
                    success: function (params) {
                        params = formatJSON(params);
                        Object.assign(params, paramsStore);
                        sendToBg('toBg:ApiStore:auth', params );
                    }
                });
            },
            /**
             * add link store in google extension
             */

            addWebSite: function () {
                sendToBg('toBg:ApiStore:add', { domain : store.site_url} );
            },
        }
    })();

    window.ADS.aliExtension.init();

    window.imagesProduct = (function(){

        var obj = {};

        function request(action, args, callback) {

            args = args !== '' && args instanceof jQuery ? window.ADS.serialize(args) : args;

            $.ajax({
                url: ajaxurl,
                data: {action: 'ads_uploadExternalImages', ads_actions: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        }

        function uploadImages( response ) {
            obj.links = response.links;
            obj.current_link = response.current_link;

            if ( response.hasOwnProperty( 'error' ) ) {

                    $.event.trigger( {
                        type : "imagesProduct:error",
                        obj  : obj,
                        response  : response
                    } );

                }else if( typeof response.links[response.current_link]  == 'undefined' ) {

                $.event.trigger( {
                    type : "imagesProduct:end",
                    obj  : obj,
                    response  : response
                } );

                request(
                    'apply_post',
                    {post_id: obj.post_id},
                    finish
                );

                } else {

                    $.event.trigger( {
                        type : "imagesProduct:next",
                        obj  : obj,
                        response  : response
                    } );

                    request(
                        'load_image_post',
                        {links:response.links, current_link:response.current_link, post_id: obj.post_id},
                        uploadImages
                    );
                }
        }

        function finish(response) {
            $.event.trigger( {
                type : "imagesProduct:finish",
                obj  : obj,
                response  : response
            } );
        }

        function start(response) {
            obj.total = response.links.length;
            obj.links = response.links;

            $.event.trigger( {
                type : "imagesProduct:start",
                obj  : obj,
                response  : response
            } );
            uploadImages(response);
        }

        return {
            upload: function (post_id, params) {

                obj = {
                    post_id: post_id,
                    total : null,
                    links: [],
                    current_link: null,
                    params: params
                };

                request(
                    'list_images_post',
                    {post_id: obj.post_id},
                    start
                );
            }
        }
    })()

} );
