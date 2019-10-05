jQuery(function($) {

    //todo глобально впилить получение в общих настройках
    let price_format = {
        flag: "US",
        pos: "before",
        symbol: "US $",
        title: "US Dollar ($)"
    };

    let pricesHandlebars = {
        init : function () {

            Handlebars.registerHelper( 'format_price', function( value, options ) {

                value = parseFloat(value);

                let dl = options.hash['decimalLength'] || 2,
                    ts = options.hash['thousandsSep'] || ',',
                    ds = options.hash['decimalSep'] || '.';

                let re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')';
                let num = value.toFixed(Math.max(0, ~~dl));

                let price = (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts);

                return price_format.pos === 'before' ? price_format.symbol + '' + price : price + '' + price_format.symbol;
            });

            Handlebars.registerHelper( 'stars', function ( rate ) {

                let foo = '',
                    r = rate.toString(),
                    n = r.split('.'),
                    h = false;

                for( let i = 1; i <= 5; i++) {

                    if( n[0] >= i ) {
                        foo += '<i class="fa fa-star"></i>';
                    } else if( ! h ) {
                        h = true;
                        if( n[1] > 7 ) {
                            foo += '<i class="fa fa-star"></i>';
                        } else if( n[1] < 3 ) {
                            foo += '<i class="fa fa-star-o"></i>';
                        } else if( n[1] >= 3 && n[1] <= 7 ) {
                            foo += '<i class="fa fa-star-half-o"></i>';
                        } else {
                            foo += '<i class="fa fa-star-o"></i>';
                        }
                    } else {
                        foo += '<i class="fa fa-star-o"></i>';
                    }
                }

                return foo;
            } );
        }
    };
    pricesHandlebars.init();

    let lockBtn = false;

    let ImportReviews = (function(){

        var $this = null;

        function request(action, args, callback) {

            args = args !== '' && typeof args === 'object' ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_action_reviews', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        }

        function send(action, args, callback) {

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_action_reviews', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        }

        function renderApplyto(){

            $('#ads_review-form .js-select-cat').hide();

            let v = $('#ads_review-form [name="prod_type"]').val();

            if( v == 'categories' ){
                let selectedValues = [];
                $('option:selected', '#ads_review-form .js-select-cat').each(function() {
                    selectedValues.push($(this).val());
                });
                $('#ads_review-form [name="applyto"]').val(selectedValues.join());
                $('#ads_review-form .js-select-cat').show();
            }

            $('#apply_min').toggle($('#apply_empty').is(':checked'));

            if(parseInt($('#apply_min').val()) < 1){
                $('#apply_min').val(1);
            }

        }

        function renderReviewForm ( response ) {

            let tmpl = $('#ali-review').html(),
                target = $('#ads_review-form');
            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    target.html(window.ADS.objTotmpl(tmpl, response));
                    setTimeout(window.ADS.switchery(target), 300);

                    let total = parseInt( $('#total_item').val() );
                    let current = parseInt( $('#current_item').val() );

                    if( current > 0 && total > 0 ) {
                        window.ADS.progressText( $('.progress-head'), total, current );
                    }

                    let select = $('#ads_review-form [name="applyto"]').val();
                    select = select ? select.split(','): [];

                    $('#ads_review-form .js-select-cat').find('[multiple="multiple"]').multiselect('select', select);
                    renderApplyto();

                    $.event.trigger( {
                        type : "request:done",
                        obj  : '#ads_review-form'
                    } );

                }
            }
        }

        function parseUrl(url) {

            let chipsUrl = url.split('?'),
                hostName = chipsUrl[0],
                paramsUrl = chipsUrl[1],
                chipsParamsUrl = paramsUrl.split('&'),
                urlArray = {};

            $.each(chipsParamsUrl, function(i, value) {
                let tempChips = value.split('=');
                urlArray[tempChips[0]] = tempChips[1];
            });

            return {
                'hostName' : hostName,
                'urlArray' : urlArray
            };
        }

        function getStar(width) {
            let star;
            width = parseInt( width.replace( /[^0-9]/g, '' ) );

            star = 0;
            if (width > 0) {
                star = parseInt( 5 * width / 100 );
            }

            return star;
        }

        function buildUrl(hostName, urlArray) {
            let url = hostName + '?';
            let urlParams = [];

            $.each(urlArray, function(index, value) {
                if (typeof value === 'undefined') {
                    value = '';
                }
                urlParams.push(index + '=' + value);
            });

            url += urlParams.join('&');
            return url;
        }

        function changeUrl(url, params) {

            if (typeof params === 'undefined') {
                return false;
            }

            let result = parseUrl(url);

            $.each(params, function(key, value) {
                result.urlArray[key] = value;
            });

            return buildUrl(result.hostName, result.urlArray);
        }

        function updateActivity( response ) {

            let post_id = response.post_id,
                th      = $('#ads_activities-list').find('[data-post_id="'+post_id+'"]'),
                item    = th.find('.count-reviews');

            let count = parseInt( item.text() ) + response.count;

            item.text(count);

            if( count < response.count_review && response.page < 30 ) {
                addReview(response.page, post_id, response.feedbackUrl);
            } else {

                th.find('.loader-action').hide();
                th.find('.loader-done').show();

                importReviews(false);
            }
        }

        function sendReview(e) {

            let params = e.index.params;

            let $obj    = e.obj,
                post_id = params.post_id,
                args    = params,
                review  = {
                    'flag'     : '',
                    'author'   : '',
                    'star'     : '',
                    'feedback' : '',
                    'date'     : ''
                },
                $feedbackList = $obj.find( '.feedback-list-wrap .feedback-item' ),
                feedList = [];

            let importedReview = $('#ads_activities-list').find('[data-post_id="'+post_id+'"] .count-reviews').text();
                importedReview = parseInt(importedReview);

            $feedbackList.each( function ( i, e ) {

                let images = [];

                review = {};

                review.feedback = $(this).find('.buyer-feedback').text();
                if($(this).find('.buyer-feedback .r-time-new').length){
                    review.feedback = $(this).find('.buyer-feedback span:not(.r-time-new)').text();
                }

                review.feedback = review.feedback.replace('seller', 'store');
                review.flag     = $(this).find('.css_flag').text();
                review.author   = $(this).find('.user-name').text();
                review.star     = getStar($(this).find('.star-view span').attr('style'));

                $(this).find('.pic-view-item').each(function(index, value) {
                    images.push($(value).data('src'));
                });

                let dateBox = $(this).find('.r-time');

                if($(this).find('.r-time-new').length){
                    dateBox = $(this).find('.r-time-new');
                }
                review.date = dateBox.text();

                review.images = images;
                feedList.push(review);
            });

            if ( $feedbackList.length !== 0 && importedReview <= args.countReviews) {

                let data = {
                    post_id        : post_id,
                    feed_list      : ADS.b64EncodeUnicode(JSON.stringify(feedList)),
                    star_min       : args.star_min,
                    withPictures   : args.withPictures,
                    uploadImages   : args.uploadImages,
                    ignoreImages   : args.ignoreImages,
                    importedReview : importedReview,
                    page           : args.page++,
                    feedbackUrl    : args.feedbackUrl,
                    count_review   : $('#count_review').val(),
                    approved       : args.approved,
                    select_country : JSON.stringify(args.select_country),
                    skip_keywords : args.skip_keywords,
                    select_translate : args.select_translate,
                };

                send( 'upload_review', data, updateActivity );
            } else {
                importReviews(false);
            }
        }

        function getNextProduct( response ) {

            let $progressText = $('.progress-head'),
                $el = $('#ads_activities-list');

            if (response.hasOwnProperty('error')) {

                window.ADS.notify(response.error, 'danger');

                window.ADS.btnUnLock(lockBtn);
                lockBtn = false;
            } else if (response.hasOwnProperty('message')) {

                window.ADS.notify(response.message, 'success');
                window.ADS.progressText($progressText, 10, 10);

                $el.find('.loader-action').hide();
                $el.find('.loader-done').show();

                window.ADS.btnUnLock(lockBtn);
                lockBtn = false;
            } else {

                let tmpl = $('#item-review-template').html();

                if (!$el.find('.table-products').length)
                    $el.html($('<div/>', {class: 'table-products'}));

                $el = $el.find('.table-products');

                window.ADS.progressText($progressText, response.total, response.current);

                let c = $el.find('.review-item');

                if (c.length >= 15) {
                    c.last().remove();
                }

                $el.find('.loader-action').hide();
                $el.find('.loader-done').show();

                $el.prepend(window.ADS.objTotmpl(tmpl, response.row));

                let th = $el.find('div:first');

                th.find('.loader-action').show();

                $('#current_item').val(response.current);

                if(!response.row.feedbackUrl){
                    importReviews();
                }else{
                    addReview(1, response.row.post_id, response.row.feedbackUrl);
                }
            }
        }
        function addReview( page, post_id, feedbackUrl ) {

            $('#ads_activities-list').find('[data-post_id="'+post_id+'"]').find('.loader-action').show();

            let select_translate = $('#select_translate').val();

            let args  = {
                rate              : $('#min_star').val(),
                countReviews      : $('#count_review').val(),
                translate         : select_translate === 'none' ? '+N+' : '+Y+',
                ignoreImages      : $('#ignoreImages').is(':checked'),
                withPictures      : $('#withImage').is(':checked'),
                uploadImages      : $('#uploadImage').is(':checked'),
                approved          : $('#approved').is(':checked'),
                skip_keywords     : $('#skip_keywords').val(),
                select_translate  : select_translate,
                select_country    : $('#select_country').val(),
            };

            let url = changeUrl(
                feedbackUrl,
                {
                    'translate'         : args.translate,
                    'page'              : page,
                    'withPictures'      : args.withPictures,
                }
            );

            let params = {
                post_id        : post_id,
                page           : page,
                feedbackUrl    : feedbackUrl,
                countReviews   : args.countReviews,
                withPictures   : args.withPictures,
                uploadImages   : args.uploadImages,
                ignoreImages   : args.ignoreImages,
                star_min       : args.rate,
                approved       : args.approved,
                skip_keywords     : args.skip_keywords,
                select_translate  : args.select_translate,
                select_country    : args.select_country,
            };
            setTimeout(function() {
                window.ADS.aliExtension.addTask( url, sendReview, $this, {params: params});
            }, 2000);
        }

        function importReviews( first ) {

            let action = first ? 'first_review' : 'next_review';
            $('#product-list').show();
            request( action, $('#ads_review-form'), getNextProduct );
        }

        function checkIgnoreImages() {

            if( $(document).find('#ignoreImages').is(':checked') ) {

                let im   = $('#withImage'),
                    i    = im.parents('.checkbox-switchery'),
                    up   = $('#uploadImage'),
                    u    = up.parents('.checkbox-switchery');

                if( im.prop('checked') ) {
                    im.click();
                }
                if( up.prop('checked') ) {
                    up.click();
                }

                i.hide();
                u.hide();
            }
        }

        function checkLan(country, lan) {
            country = country.toUpperCase();
            lan = lan.toUpperCase();
            let obj = {
                'WWW' :'US',
                'PT' :'BR',
                'RU' :'RU',
                'ES' :'ES',
                'FR':'FR',
                'PL' :'PL',
                'HE' : 'IW',
                'IT' :'IT',
                'TR' :'TR',
                'DE' :'DE',
                'KO' :'KR',
                'AR' :'MA',
            };

           return typeof obj[country] !== "undefined" && obj[country] === lan;
        }

        function setLocationAli() {

            var country = $('#select_translate').val();

            if(country === 'none'){
                return Promise.resolve(true);
            }

            if(country === 'www'){
                window.ADS.aliExtension.enableIframe();
                return window.ADS.aliExtension.getPage('https://www.aliexpress.com/?alidrop=set_global_site').then(function (value) {
                    window.ADS.aliExtension.enableAjax();
                    var headerConfig = value.obj.find( 'script:contains("headerConfig")' ).text();

                    var loc    = headerConfig.match( /locale: "\w+_(\w+)",/im );

                    if(loc === null){
                        return false;
                    }

                    var flagAli = loc[1].toUpperCase();
                    return 'US' === flagAli;
                });
            }

            return window.ADS.aliExtension.getPage('https://www.aliexpress.com').then(function (value) {
                return window.ADS.aliExtension.getPage('https://'+country+'.aliexpress.com').then(function (value) {
                    var headerConfig = value.obj.find( 'script:contains("headerConfig")' ).text();

                    var loc    = headerConfig.match( /locale: "\w+_(\w+)",/im );

                    if(loc === null){
                        return false;
                    }

                    var flagAli = loc[1].toUpperCase();
                    console.log(country);
                    console.log(flagAli);
                    return checkLan(country, flagAli);
                });
            });
        }

        return {
            init: function(){

                $this = this;

                window.ADS.aliExtension.sleepTask(1);
                window.ADS.aliExtension.enableAjax();

                request( 'review_form', '', renderReviewForm );

                $(document).on('click', '#js-reviewImport', function(e){

                    e.preventDefault();

                    $('#js-reviewNext').remove();

                    lockBtn = $(this);
                    window.ADS.btnLock( lockBtn );

                    $('#current_item').val(0);
                    $('#ads_activities-list').html('');

                    window.ADS.progressText( $('.progress-head'), 0, 0 );

                    setLocationAli().then(function (lang) {
                        if(lang){
                            importReviews(true);
                        }else{
                            console.log($('#info-lan').text());
                            window.ADS.notify($('#info-lan').text(), 'danger');
                            window.ADS.btnUnLock( lockBtn );
                        }

                    });


                });

                $(document).on('click', '#js-reviewNext', function(e){

                    e.preventDefault();

                    $(this).remove();
                    lockBtn = $('#js-reviewImport');
                    $('#ads_activities-list').html('');
                    window.ADS.progressText( $('.progress-head'), 0, 0);

                    window.ADS.btnLock(lockBtn);

                    $('#current_item').val(0);

                    setLocationAli().then(function (lang) {
                        if(lang){
                            importReviews(true);
                        }else{
                            console.log($('#info-lan').text());
                            window.ADS.notify($('#info-lan').text(), 'danger');
                            window.ADS.btnUnLock( lockBtn );
                        }
                    });
                });

                $(document).on('request:done', function(e) {
                    if( e.obj === '#ads_review-form') {
                        checkIgnoreImages();
                    }
                });

                $(document).on('click', '#ignoreImages', function(){

                    var $obj = $('#ads_review-form');
                    var im   = $obj.find('#withImage'),
                        i    = im.parents('.checkbox-switchery'),
                        up   = $obj.find('#uploadImage'),
                        u    = up.parents('.checkbox-switchery');

                    if( ! $(this).is(':checked') ) {
                        i.show();
                        u.show();
                    } else {

                        if( im.prop('checked') ) {
                            im.click();
                        }
                        if( up.prop('checked') ) {
                            up.click();
                        }

                        i.hide();
                        u.hide();
                    }
                });

                $(document).on('change', '#ads_review-form [name="prod_type"]', function(){
                    $('#ads_review-form [name="applyto"]').val('');
                    renderApplyto();
                });

                $(document).on('change', '#ads_review-form .js-select-cat', function(){
                    renderApplyto();
                });

                $(document).on('change', '#ads_review-form [name="apply_empty"]', function(){
                    renderApplyto();
                });

                $(document).on('change', '#ads_review-form #apply_min', function(){
                    renderApplyto();
                });
            }
        };
    })();

    ImportReviews.init();
});