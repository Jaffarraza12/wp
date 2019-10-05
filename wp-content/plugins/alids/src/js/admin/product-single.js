jQuery(function ($) {

    var productSingle = (function () {
        var $this;

        var form = [
            '#ads-form-box-callGeneral',
            '#ads-form-box-callInventory',
            '#ads-form-box-callVariation',
            '#ads-form-box-callShipping',
            '#ads-form-box-callAttributes',
            '#ads-form-box-callPackaging',
            '#ads-form-box-callSupplier',
            '#ads-form-box-callGallery',
            '#ads-form-box-callCrossSelling',
            '#ads-form-box-callReviews',
            '#ads-form-box-callSeo'

        ];



        function isChangeFormFilds( el ) {
            if(!$(el).data('hash')){
                return false;
            }

            return $(el).data('hash') !== $(el).find("input, textarea, select" ).not('.not-hash').serialize();
        }

        return {
            init: function () {

                if ($this) return;
                $this = this;

                $(document).on('request:done', function (e) {

                });


                $('body').on('click', '#publish', function (  ) {
                    if(!$('#ads-product-single-options').length){
                        return;
                    }
                    for(var i in form){
                        if(isChangeFormFilds( form[i] )){
                            var save = confirm($('.confirm-text').val() );
                            if(save){
                                for(var x in form) {
                                    if (isChangeFormFilds(form[x])) {
                                        $(form[x]).closest('.body-panel').find('.foot-panel [name="save"]').click();
                                    }
                                }
                                return false;
                            }
                            break;
                        }else{
                            $('#ads-product-single-options').remove();
                        }
                    }

                });


            }
        }
    })().init();

    var ItemSpecific = (function () {
        var $this;
        var obj = {
            check: '#checkAll-Attributes',
            'bulk-apply': '#bulk-apply-attributes',
            'bulk-action': '#bulk-action-attributes',
        };

        function renderChecker() {

            var u = $('#ads-form-callAttributes').find('.table-container [id^="check-item-"]:not(:checked)');

            if (u.length && $(obj.check).prop("checked")) {
                $(obj.check).prop("checked", false);
            } else if (u.length === 0 && !$(obj.check).prop("checked")) {
                $(obj.check).prop("checked", true);
            }
            $.uniform.update(obj.check);
        }

        function checker() {

            $(document).on('change', obj.check, function () {
                $(this).closest('.table-container').find('[id^="check-item-"]').prop('checked', $(this).is(':checked'));
                $.uniform.update();
            });

            $('body').on('click', '.table-container .attr-item-line', renderChecker);

        };

        function bulk() {
            $('body').on('click', obj['bulk-apply'], function (e) {
                e.preventDefault();

                var value = $(obj['bulk-action']).val();

                var items = $('#ads-form-callAttributes').find('.table-container [id^="check-item-"]:checked')
                    .closest('.attr-item-line');

                if(!items.length){
                    window.ADS.notify($('.select-element-text').val());
                    return false;
                }

                switch (value) {
                    case 'delete':
                        items.remove();
                        $('[data-for="#ads-form-callAttributes"]').click();

                        break;
                }
                return false;
            })
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', '#ads-form-callAttributes .js-add-attributes', function (e) {
                    var tmpl = $('#ads-tmpl-attributes-row').html();
                    $('#ads-form-callAttributes .table-container').append(window.ADS.objTotmpl(tmpl, {
                        name: '',
                        value: ''
                    }));
                    $('#ads-form-callAttributes .table-container').find('.uniform-checkbox, .uniform-radio').uniform();
                    renderChecker();
                    //$('[data-for="#ads-form-callAttributes"]').click();
                    return false;
                });

                $('body').on('click', '#ads-form-callAttributes .js-remove', function (e) {
                    $(this).closest('.attr-item-line').remove();
                    renderChecker();
                    $('[data-for="#ads-form-callAttributes"]').click();
                    return false;
                });

                $('body').on('click', '#ads-form-callAttributes .js-reset-attributes', function (e) {
                    e.preventDefault();
                    var _this = this;
                    window.ADS.btnLock($(_this));
                    window.ADS.product($('[name="post_id"]').val(), ['productUrl'])
                        .then(function(product){
                            var productUrl = product.productUrl;
                            return window.ADS.aliExtension.productAli(productUrl).then(function(params){return params.product});

                        }).then(function (product) {
                        var params = {attributes:product.params};
                        var tmpl = $('#ads-tmpl-callAttributes').html();
                        $('#ads-form-box-callAttributes').html(window.ADS.objTotmpl(tmpl, params));
                        $('#ads-form-box-callAttributes').find('.uniform-checkbox, .uniform-radio').uniform();
                        renderChecker();
                        $('[data-for="#ads-form-callAttributes"]').click();
                        window.ADS.btnUnLock($(_this));
                    });
                });

                checker();
                bulk();
            }
        }
    })().init();

    var callGallery = (function () {
        var $this;

        var obj = {
            row: '#tmpl-row-edit',
            img: '#tmpl-item-media',
            gallery: '#ads-gallery',
            sku: '#ads-sku'
        };

        function manageGallery() {

            var el = obj.gallery;
            var item = '.image-item';

            $(el).sortable({
                items: ".image-item:not(#ads-upload-image)"
            });

            $(el).on('click', '[data-toggle="remove"]', function () {
                $(this).parents(item).remove();
                return false;
            });

            $(el).on('click', '[data-toggle="move-left"]', function () {
                var $th = $(this).parents(item);
                if ($th.prev().length) {
                    $th.prev().before($th);
                }
                return false;
            });

            $(el).on('click', '[data-toggle="move-right"]', function () {
                var $th = $(this).parents(item);
                if ($th.next().length) {
                    $th.next().after($th);
                }
                return false;
            });
        };

        function checkExistingId(id) {

            var el = $(obj.gallery).find('.image-item');

            if (!el.length) return false;

            id = id.toString();

            var res = false;
            el.each(function () {

                var value = $(this).find('[name="gallery[]"]').val();

                if (value == id)
                    res = true;
            });

            return res;
        }

        function renderMediaUploader() {

            var file_frame;

            if (undefined !== file_frame) {
                file_frame.open();
                return;
            }

            file_frame = wp.media.frames.file_frame = wp.media({
                frame: 'post',
                state: 'insert',
                multiple: true
            });

            file_frame.on('insert', function () {

                file_frame.state().get('selection').each(function (image) {
                    var id = image.id;
                    if (!checkExistingId(image.id)) {
                        $.ajax({
                            url: ajaxurl,
                            data: {
                                action: 'ads_get_image',
                                id: id,
                                size: 'ads-medium'
                            },
                            type: "POST",
                            success: function (response) {

                                response = {value: id, url: response};
                                $(obj.gallery).find('#ads-upload-image').before(window.ADS.objTotmpl($(obj.img).html(), response))
                            }
                        });
                    }
                });

            });

            file_frame.open();
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', '#ads-upload-image', function (e) {
                    e.preventDefault();
                    renderMediaUploader();

                });

                $(document).on('request:done', function (e) {

                    if ('#ads-form-box-callGallery' == e.obj) {
                        manageGallery();
                    }
                });

            }
        }
    })().init();

    var Attributes = (function () {
        var $this;

        var obj = {
            head: {
                edit: '.attr-head .js-edit',
                remove: '.attr-head .js-remove',
            },
            sku: {
                remove: '.row-sku .js-remove',
            },
            addAttributes: '.js-add-attributes',
            addSku: '.js-add-item',
            root: '.product-sku',
            rootSku: '.attr-sku',
            template: {
                prop: $('#ads-tmpl-callInventory-prop').html(),
                sku: $('#ads-tmpl-callInventory-sku').html(),
                img: $('#ads-tmpl-callInventory-sku-img').html()
            }
        };

        function renderMediaUploader(cb) {

            var file_frame;

            if (undefined !== file_frame) {
                file_frame.open();
                return;
            }

            file_frame = wp.media.frames.file_frame = wp.media({
                frame: 'post',
                state: 'insert',
                multiple: false
            });

            file_frame.on('insert', function () {

                file_frame.state().get('selection').each(function (image) {
                    var id = image.id;
                    $.ajax({
                        url: ajaxurl,
                        data: {
                            action: 'ads_get_image',
                            id: id,
                            size: 'ads-medium'
                        },
                        type: "POST",
                        success: function (response) {
                            response = {value: id, url: response};
                            cb(response);
                        }
                    });
                });

            });

            file_frame.open();
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', obj.head.edit, function () {
                    var i = $(this).closest('.attr-head').find('.attr-title input');
                    var len = i.val().length * 2;
                    i.focus();
                    i[0].setSelectionRange(len, len);
                });

                $('body').on('click', obj.head.remove, function (e) {
                    e.preventDefault();
                    $(this).closest('.row-attr').remove();
                });

                $('body').on('click', obj.sku.remove, function (e) {
                    e.preventDefault();
                    $(this).closest('.row-sku').remove();
                });

                $('body').on('click', obj.addAttributes, function (e) {
                    e.preventDefault();
                    var inventory = [];

                    var key_prop = (function () {
                        var prop = [],
                            max = 0;

                        $('.product-sku .row-attr').find('input[name="key_prop"]').each(function (e, i) {
                            prop.push($(this).val());
                        });

                        if (prop.length)
                            max = Math.max.apply(null, prop);

                        return max + 1;
                    })();

                    inventory[key_prop] = {title: ''};
                    $(obj.root).prepend(window.ADS.objTotmpl(obj.template.prop, {inventory: inventory}));

                });

                $('body').on('click', obj.addSku, function (e) {
                    e.preventDefault();
                    var $root = $(this).closest(obj.rootSku).find('.list-sku');


                    var key_sku = (function () {
                        var sku = [],
                            max = 0;
                        $root.find('input[name="key_sku"]').each(function (e, i) {
                            sku.push($(this).val());
                        });

                        if (sku.length)
                            max = Math.max.apply(null, sku);

                        return max + 1;
                    })();

                    var key_prop = $(this).closest('.row-attr').find('input[name="key_prop"]').val();

                    var inventory = [];
                    inventory[key_prop] = {
                        title: '',
                        sku: []
                    };

                    inventory[key_prop]['sku'][key_sku] = {title: ''};

                    $root.append(window.ADS.objTotmpl('{{#each inventory}}' + obj.template.sku + '{{/each}}', {inventory: inventory}));
                });

                $('body').on('click', '.js-add-img', function (e) {
                    e.preventDefault();
                    var $root = $(this).closest('.row-sku');
                    renderMediaUploader(function (response) {
                        $root.find('.js-img-value').val(response.value);
                        $root.find('.js-sku-img').html(window.ADS.objTotmpl(obj.template.img, {
                            img_url: response.url
                        }))
                    });

                });

                $('body').on('click', '.js-delete-img', function (e) {
                    e.preventDefault();
                    var $root = $(this).closest('.row-sku');
                    $root.find('.js-img-value').val('');
                    $root.find('.js-sku-img').html(window.ADS.objTotmpl(obj.template.img, {
                        img_url: false
                    }))

                });
            }
        }
    })().init();

    var Variations = (function () {
        var $this;

        var obj = {
            'bulk-apply': '#bulk-apply-variation',
            'bulk-action': '#bulk-action-variation'
        };

        function renderEdit(enable) {
            $('#bulk-edit').toggle(enable);
        }

        function checker(root) {
            var checkerObj = {
                all: '.checkAll',
                item: '.check-item'
            };

            function renderChecker() {

                var u = $(root).find(checkerObj.item).not(':checked');
                if (u.length && $(checkerObj.all).prop("checked")) {
                    $(root +' '+ checkerObj.all).prop("checked", false);
                } else if (u.length === 0 && !$(checkerObj.all).prop("checked")) {
                    $(root +' '+ checkerObj.all).prop("checked", true);
                }
                $.uniform.update(root +' '+ checkerObj.all);
            }

            $(document).on('change', root +' '+ checkerObj.all, function () {
                $(this).closest(root).find(checkerObj.item).prop('checked', $(this).is(':checked'));
                $.uniform.update();
            });

            $('body').on('click', root +' '+'.table-item', renderChecker);

        };

        function bulk() {
            $('body').on('click', obj['bulk-apply'], function (e) {
                e.preventDefault();

                var value = $(obj['bulk-action']).val();

                var $root = $('#ads-form-callVariation').find('.table-container .check-item:checked').closest('.table-item');

                if(!$root.length){
                    window.ADS.notify($('.select-element-text').val());
                    return false;
                }

                window.ADS.btnLock($(obj['bulk-apply']));

                switch (value) {
                    case 'delete':

                        $root.each(function () {
                            var id = $(this).data('id');
                            $('.edit-variation.edit-' + id).remove();
                        });

                        $root.remove();
                        $('[data-for="#ads-form-callVariation"]').click();
                        break;
                    case 'edit':
                        var price = $('[name="bulk[price]"]').val();
                        var salePrice = $('[name="bulk[salePrice]"]').val();
                        var quantity = $('[name="bulk[quantity]"]').val();

                        $root.each(function () {
                            var id = $(this).data('id');
                            var $item = $('.edit-variation.edit-' + id);

                            if(price !==''){
                                $item.find('[name="variation[price][]"]').val(price);
                                $('[name="bulk[price]"]').val('');
                            }
                            if(salePrice !==''){
                                $item.find('[name="variation[salePrice][]"]').val(salePrice);
                                $('[name="bulk[salePrice]"]').val('');
                            }
                            if(quantity !==''){
                                $item.find('[name="variation[quantity][]"]').val(quantity);
                                $('[name="bulk[quantity]"]').val('');
                            }
                        });

                        $('[data-for="#ads-form-callVariation"]').click();
                        break;
                    case 'split':

                        var selectSkuAttr = [];
                        $root.each(function () {
                            selectSkuAttr.push($(this).data('key'));
                        });

                        if(!selectSkuAttr){
                            return;
                        }

                        $.ajaxQueue( {
                            url      : ajaxurl,
                            dataType : 'json',
                            data     : {
                                action      : 'ads_action_split_variations',
                                skuAttr : selectSkuAttr,
                                post_ID : $('#post_ID').val()
                            },
                            type     : "POST",
                            success  : function (response) {
                                window.ADS.btnUnLock($(obj['bulk-apply']));
                                window.ADS.notify( response.message, 'success' );
                            }

                        } );

                        break;
                    default:
                        window.ADS.btnUnLock($(obj['bulk-apply']));
                        break;
                }
                return false;
            });

            $('body').on('change', $(obj['bulk-action']), function(){
                var value = $(obj['bulk-action']).val();

                renderEdit(value === 'edit');

            });
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $(document).on('request:done', function (e) {
                    if(e.obj !== '#ads-form-box-callVariation'){
                        return;
                    }

                    window.ADS.btnUnLock($(obj['bulk-apply']));
                });

                $('body').on('click', '.row-variation .js-edit', function (e) {
                    e.preventDefault();
                    var $root = $(this).closest('.row-variation');
                    $root.toggleClass('open');
                });

                $('body').on('click', '.js-split', function (e) {
                    e.preventDefault();
                    var _self = this;
                    window.ADS.btnLock($(_self));
                    $.ajaxQueue( {
                        url      : ajaxurl,
                        dataType : 'json',
                        data     : {
                            action      : 'ads_action_split_attr',
                            prop_id : $(this).data('prop_id'),
                            post_ID : $('#post_ID').val()
                        },
                        type     : "POST",
                        success  : function (response) {
                            window.ADS.btnUnLock($(_self));
                            window.ADS.notify( response.message, 'success' );
                        }

                    } );

                });

                $('body').on('click', '.row-variation .js-delete', function (e) {
                    e.preventDefault();
                    var $root = $(this).closest('.row-variation');
                    var id = $root.data('id');
                    $('.edit-variation.edit-' + id).remove();
                    $root.remove();
                    $('[data-for="#ads-form-callVariation"]').click();
                });

                checker('#ads-form-box-callVariation');
                bulk();
            }
        }
    })().init();

    var VariationsAdd = (function () {
        var $this;

        var obj = {
            root: '.select-sku',
            row: '.js-list-sku-row',
            sku: '.js-select-sku-item',
            value: '#js-new_sku_item',
            addBtn: '#js-variations-add',
        };

        var params= {
            skuAttr : {},
            sku : {},
            variation : [],
            skuRender : []
        };

        function getSelectSku() {
            var foo = [];
            $(obj.sku+'.active').each(function (i, e) {
                foo.push($(this).data('key'));
            });

            if($(obj.row).length !== foo.length)
                return [];

            return foo;
        }

        function renderSku() {

            var foo = [];
            $(obj.sku+'.active').each(function (i, e) {
                foo.push($(this).data('key'));
            });

            var l = foo.length;

            $(obj.sku ).addClass( 'disabled' );

            $.each( params.generateVariation, function ( i, skuAttrName ) {

                if(typeof params.skuAttr[skuAttrName] !== 'undefined'){
                    return;
                }

                var sku = skuAttrName.split( ';' );
                var count = 0;
                for ( var k in foo ) {
                    if ( foo[ k ] == sku[ k ] ) {
                        count++;
                    }
                }

                if ( count >= l - 1 ) {
                    $.each(sku, function (i) {
                        $(obj.sku + '[data-key="' + sku[i] + '"]').removeClass('disabled');
                    });
                }

            });

            $(obj.sku+'.active.disabled' ).removeClass('active');
        }

        function setActiveDefault(  ) {
            for(var i in params.generateVariation){
                var skuAttrName = params.generateVariation[i];
                if(typeof params.skuAttr[skuAttrName] !== 'undefined'){
                    continue;
                }
                var sku = skuAttrName.split( ';' );

                $.each(sku, function (i) {
                    $(obj.sku + '[data-key="' + sku[i] + '"]').addClass('active');
                });

                break;
            }
            return skuAttrName;
        }

        function setValue() {
            $(obj.value).val(getSelectSku().join(';'));
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $(document).on('request:done', function (e) {
                    if(e.obj !== '#ads-form-box-callVariation'){
                        return;
                    }

                    var response = e.response;

                    params.skuAttr = response.skuAttr;
                    params.variation = response.variation;
                    params.skuRender = response.skuRender;
                    params.sku = response.sku;
                    params.generateVariation = response.generateVariation;
                    setActiveDefault();
                    setValue();
                    renderSku();
                });

                $('body').on('click', obj.sku+':not(.disabled)', function () {
                    $(this).closest(obj.row).find(obj.sku).removeClass('active');
                    $(this).addClass('active');
                    setValue();
                    renderSku();
                });

            }
        }
    })().init();


    var Shipping = (function () {
        var $this;

        var active = false;

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body #ads-form-callShipping').on('click', '.checkbox:not(.disabled) input[type="checkbox"]', function () {
                    if(active){
                        return;
                    }
                    active = true;
                    $('[data-for="#ads-form-callShipping"]').click();
                    $('input[type="checkbox"]', 'body #ads-form-callShipping').prop( "disabled", true );
                });

                $(document).on('request:done', function (e) {

                    if(e.obj !== '#ads-form-box-callShipping'){
                        return;
                    }

                    $('.checkbox:not(.disabled) input[type="checkbox"]', 'body #ads-form-callShipping').prop( "disabled", false );

                    active = false;
                });

            }
        }
    })().init();

    var CrossSelling = (function () {
        var $this;

        var obj = {
            addProductBtn: '#js-cross-selling-add-product',
            targetValue: '#js-cross-selling-applyto',
            bulk : {
                apply : '#bulk-apply-crossSelling',
                value: '#bulk-action-crossSelling'
            }
        };

        function bulk() {
            $('body').on('click', obj.bulk.apply, function (e) {
                e.preventDefault();

                var value = $('body').find(obj.bulk.value).val();

                var $items = $('body').find('.check-item:checked').closest('.table-item');

                if(!$items.length){
                    window.ADS.notify($('.select-element-text').val());
                    return false;
                }

                switch (value) {
                    case 'delete':

                        var targetValue = $(obj.targetValue).val();

                        targetValue = targetValue ? targetValue.split(','): [];

                        $items.each(function () {
                            var id = $(this).data('id');
                            targetValue.splice(targetValue.indexOf(id), 1);

                        });

                        $(obj.targetValue).val(targetValue.join(','));
                        $('[data-for="#ads-form-callCrossSelling"]').click();
                        break;
                }

                return false;
            });

        }

        function getApply(){
            var targetValue = $(obj.targetValue).val();
            return targetValue ? targetValue.split(','): [];
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $(document).on('request:done', function (e) {

                    if (e.obj !== '#ads-form-box-callCrossSelling') {
                        return;
                    }

                    $( obj.addProductBtn ).selectProductsAds(function(data){

                        var post_ids = data.join(',');

                        $(obj.targetValue).val(post_ids);

                        $('[data-for="#ads-form-callCrossSelling"]').click();

                    }, { list : getApply });

                    if(getApply().length)
                    window.ADS.createJQPagination( '#ads-form-box-callCrossSelling', getApply().length, $('.bulk-crossSelling .page').val());

                    window.checker('#ads-form-box-callCrossSelling');

                    $('#ads-form-box-callCrossSelling').on('pagination:click', function (e) {
                        $('.bulk-crossSelling .page').val(e.page);

                        window.sendOptionsProduct('callCrossSelling', {
                            page: e.page,
                            post_id: $('[name="post_id"]').val(),

                        }, function ( response ) {
                            $('.cross-product-list').html( window.ADS.objTotmpl( $('#ads-tmpl-cross-product-list').html(), response ) )
                            .find( '.uniform-checkbox, .uniform-radio' ).uniform();
                            $('.table-item').click();
                        });

                    });

                });

                bulk();

            }
        }
    })().init();

});

jQuery( function ( $ ) {

    $('.ads-product-options-menu a').click(function (e) {
        // No e.preventDefault() here
        $(this).tab('show');
    });

    $( 'body').on('click', '.go-tab-variation a', function (e) {
        // No e.preventDefault() here
        $(this).tab('show');
    });

    window.checker = function (root) {
        var checkerObj = {
            all: '.checkAll',
            item: '.check-item'
        };

        function renderChecker() {

            var u = $(root).find(checkerObj.item).not(':checked');

            if (u.length && $(root +" "+ checkerObj.all).prop("checked")) {
                $(root +" "+ checkerObj.all).prop("checked", false);
            } else if (u.length === 0 && !$(checkerObj.all).prop("checked")) {
                $(root +" "+ checkerObj.all).prop("checked", true);
            }
            $.uniform.update(root +" "+ checkerObj.all);
        }

        $(document).on('change', root +" "+ checkerObj.all, function () {
            $(this).closest(root).find(checkerObj.item).prop('checked', $(this).is(':checked'));
            $.uniform.update();
        });

        $('body').on('click', root +" "+'.table-item', renderChecker);

    };

    window.sendOptionsProduct = function (action, args, cb) {
        $.ajaxQueue( {
            url      : ajaxurl,
            dataType : 'json',
            data     : {
                action      : 'ads_action_request_post',
                ads_action  : action,
                args 		: args
            },
            type     : "POST",
            success  : cb

        } );
    };

    var Reviews = (function () {
        var $this;

        var _obj = {
            count : 0,
            country : 'US'
        };

        function getStar(width) {
            var star;
            width = parseInt( width.replace( /[^0-9]/g, '' ) );

            star = 0;
            if (width > 0) {
                star = parseInt( 5 * width / 100 );
            }

            return star;
        }

        function buildUrl(hostName, urlArray) {
            var url = hostName + '?';
            var urlParams = [];

            $.each(urlArray, function(index, value) {
                if (typeof value === 'undefined') {
                    value = '';
                }
                urlParams.push(index + '=' + value);
            });

            url += urlParams.join('&');
            return url;
        }

        function parseUrl(url) {

            var chipsUrl = url.split('?'),
                hostName = chipsUrl[0],
                paramsUrl = chipsUrl[1],
                chipsParamsUrl = paramsUrl.split('&'),
                urlArray = {};

            $.each(chipsParamsUrl, function(i, value) {
                var tempChips = value.split('=');
                urlArray[tempChips[0]] = tempChips[1];
            });

            return {
                'hostName' : hostName,
                'urlArray' : urlArray
            };
        }

        function changeUrl(url, params) {

            if (typeof params === 'undefined') {
                return false;
            }

            var result = parseUrl(url);

            $.each(params, function(key, value) {
                result.urlArray[key] = value;
            });

            return buildUrl(result.hostName, result.urlArray);
        }

        function addReview( page, post_id, feedbackUrl ) {

            var select_translate = $('#select_translate').val();

            var args  = {
                rate              : $('#min_star').val(),
                countReviews      : $('#count_review').val(),
                onlyFromMyCountry : false,
                translate         : select_translate === 'none' ? '+N+' : '+Y+',
                ignoreImages      : $('#ignoreImages').is(':checked'),
                withImage         : $('#withImage').is(':checked'),
                uploadImages      : $('#uploadImage').is(':checked'),
                approved          : $('#approved').is(':checked'),
                skip_keywords     : $('#skip_keywords').val(),
                select_translate  : select_translate,
                select_country    : $('#select_country').val(),
            };

            var _c = _obj.count > args.countReviews ? args.countReviews : _obj.count;
            window.ADS.progress($('#activity-list-review'), args.countReviews, _c);

            var url = changeUrl(
                feedbackUrl,
                {
                    'translate'         : args.translate,
                    'page'              : page,
                    'withPictures'      : args.withPictures,
                    'onlyFromMyCountry' : args.onlyFromMyCountry
                }
            );

            var params = {
                post_id        : post_id,
                page           : page,
                feedbackUrl    : feedbackUrl,
                countReviews   : args.countReviews,
                withPictures   : args.withPictures,
                uploadImages   : args.uploadImages,
                ignoreImages   : args.ignoreImages,
                approved       : args.approved,
                star_min       : args.rate,
                skip_keywords     : args.skip_keywords,
                select_translate  : args.select_translate,
                select_country    : args.select_country,
            };

            setTimeout(function() {
                window.ADS.aliExtension.getPage( url).then(function (value) {
                    sendReview(value.obj, params);
                });
            }, 2000);
        }

        function checkIgnoreImages() {

            var im   = $('#withImage'),
                i    = im.parents('.checkbox-switchery'),
                up   = $('#uploadImage'),
                u    = up.parents('.checkbox-switchery');

            if( $(document).find('#ignoreImages').is(':checked') ) {



                if( im.prop('checked') ) {
                    im.click();
                }
                if( up.prop('checked') ) {
                    up.click();
                }

                i.hide();
                u.hide();
            }else{
                i.show();
                u.show();
            }
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

        function sendReview($obj, params) {

            var post_id = params.post_id,
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

            $feedbackList.each( function ( i, e ) {

                var images = [];

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

                var dateBox = $(this).find('.r-time');

                if($(this).find('.r-time-new').length){
                    dateBox = $(this).find('.r-time-new');
                }
                review.date = dateBox.text();
                review.images = images;
                feedList.push(review);
            });

            if ( $feedbackList.length !== 0 && _obj.count <= args.countReviews) {

                console.log(feedList);
                var data = {
                    post_id        : post_id,
                    feed_list      : ADS.b64EncodeUnicode(JSON.stringify(feedList)),
                    star_min       : args.star_min,
                    withPictures   : args.withPictures,
                    uploadImages   : args.uploadImages,
                    ignoreImages   : args.ignoreImages,
                    approved       : args.approved,
                    importedReview : _obj.count,
                    page           : args.page++,
                    feedbackUrl    : args.feedbackUrl,
                    count_review   : $('#count_review').val(),
                    select_country : JSON.stringify(args.select_country),
                    skip_keywords : args.skip_keywords,
                    select_translate : args.select_translate,
                };

                send( 'upload_review', data, updateActivity );
            } else {
                end();
            }
        }

        function updateActivity( response ) {

            var post_id = response.post_id;
            _obj.count += response.count;

            if( _obj.count < parseInt( $('#count_review').val() ) && response.page < 30 ){
                addReview( response.page, post_id, response.feedbackUrl );
            }else{
                end();
            }
        }

        function end() {

            window.ADS.notify( _obj.count + ' ' + $('.info-reviews-text').val(), 'success');

            window.ADS.btnUnLock($('#js-reviewSingleImport'));

            window.ADS.progress($('#activity-list-review'),  100, 100);
        }

        function checkLan(country, lan) {
            country = country.toUpperCase();
            lan = lan.toUpperCase();
            var obj = {
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

        function linkToLocation(url) {

            if(_obj.country === 'none'){
                return url;
            }

            url = url.replace(/\/\/(\w+)\./, '//'+_obj.country+'.');


            return url;
        }

        function setLocationAli() {

            var country=  $('#select_translate').val();

            _obj.country = country;

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

            return window.ADS.aliExtension.getPage('https://www.aliexpress.com/').then(function (value) {
                window.ADS.aliExtension.enableAjax();
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


        function importReviews(post_id) {
            window.ADS.product(post_id, ['productUrl'])
                .then(function(product){
                    if(!product){
                        return
                    }

                    if(!product.productUrl){
                        window.ADS.notify('There is no link for review. Please update product', 'danger');
                        return;
                    }

                    window.ADS.aliExtension.productAli(product.productUrl).then(function (value) {
                        var feedbackUrl = 'https:' + value.product.feedbackUrl.replace(/#038;/g, '').replace(/038;/g, '');
                        return setLocationAli().then(function (lang) {
                            if(lang){
                                addReview(1, post_id, feedbackUrl );
                            }else{
                                console.log($('#info-lan').text());
                                window.ADS.notify($('#info-lan').text(), 'danger');
                                window.ADS.btnUnLock($('#js-reviewSingleImport'));
                            }
                        });
                    });

                });
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', '#js-reviewSingleImport', function (e) {
                    e.preventDefault();

                    window.ADS.btnLock($(this));
                    var post_id = $('[name="post_id"]').val();

                    importReviews(post_id);

                });

                $('body').on('click', '#ignoreImages', function () {
                    checkIgnoreImages();
                });

                $(document).on('request:done', function (e) {

                    if(e.obj !== '#ads-form-box-callReviews'){
                        return;
                    }

                    checkIgnoreImages();
                 });
            }
        }
    })().init();

    var Supplier = (function () {
        var $this;

        var params = {
            post_id : '',
            productUrl : '',
            product_id : ''
        };

        function send(action, args, callback) {

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_update_product', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        }

        function sendResetProduct(e, post_id, product_id) {

            if(e.code === false){
                ADS.notify( 'Unknown error.' );
                ADS.btnUnLock($('#js-update_ali_product_url'));
                return;
            }

            var product = e.product;

            if( e.code && e.code === 404){
                product = {
                    id : product_id,
                };
                product.available_product = false;
            } else {
                product.description = '';
                product.available_product = true;
            }

            sendOptionsProduct('reset_product',
                {
                    post_id : post_id ,
                    product     : ADS.b64EncodeUnicode(JSON.stringify(product))
                },
                function (response) {

                    if( response && typeof response.message !== 'undefined' ) {
                        ADS.notify(response.message, 'success');
                        //TODO reload tabs
                        setTimeout(function(){
                            var url = window.location,
                                path = url.origin+'/wp-admin/post.php?post='+params.post_id+'&action=edit'+url.hash;
                            window.location.replace(path);
                            location.reload();
                        }, 2500);

                    } else if( response && response.error ) {
                        ADS.notify(response.error);
                    } else {
                        ADS.notify( 'Unknown error.' );
                    }
                    ADS.btnUnLock($('#js-update_ali_product_url'));
                });

        }

        function sendResetReviewsLink(e, post_id, product_id) {

            if(e.code === false){
                ADS.notify( 'Unknown error.' );
                ADS.btnUnLock($('#js-update_ali_product_url'));
                return;
            }

            var product = e.product;

            if( e.code && e.code === 404){
                product = {
                    id : product_id,
                };
                product.available_product = false;
            } else {
                product.description = '';
                product.available_product = true;
            }

            sendOptionsProduct('reset_product_reviews_link',
                {
                    post_id : post_id ,
                    product     : ADS.b64EncodeUnicode(JSON.stringify(product))
                },
                function (response) {

                    if( response && typeof response.message !== 'undefined' ) {
                        ADS.notify(response.message, 'success');
                        //TODO reload tabs
                        setTimeout(function(){
                            var url = window.location,
                                path = url.origin+'/wp-admin/post.php?post='+params.post_id+'&action=edit'+url.hash;
                            window.location.replace(path);
                            location.reload();
                        }, 2500);

                    } else if( response && response.error ) {
                        ADS.notify(response.error);
                    } else {
                        ADS.notify( 'Unknown error.' );
                    }
                    ADS.btnUnLock($('#js-update_ali_product_url'));
                });

        }

        function sendUpdate( e, params) {

            var product = e.product,
                post_id = params.post_id,
                product_id = params.product_id;

             if( e.code && e.code === 404){
                product = {
                    id : product_id,
                };
                product.available_product = false;
            } else {
                product.description = '';
                product.available_product = true;
            }

            if(e.code === false){
                ADS.notify( 'Unknown error.' );
                ADS.btnUnLock($('#js-reset_product'));
                return;
            }

            var data = {
                post_id : post_id,
                product : window.ADS.b64EncodeUnicode( JSON.stringify( product ) ),
                setting : {
                    status  : $('#status').val(),
                    variant : $('#variant').val(),
                    cost    : $('#cost').val(),
                    stock   : $('#stock').val()
                }
            };

            send( 'update_product', data, updateActivity );
        }

        function updateActivity( response ) {
            ADS.btnUnLock($('#js-reset_product'));
            //TODO reload tabs
            setTimeout(function(){
                var url = window.location,
                    path = url.origin+'/wp-admin/post.php?post='+response.post_id+'&action=edit'+url.hash;
                window.location.replace(path);
                location.reload();
            }, 2500);
        }

        function getID( linkProduct ) {
            var id = (/\/(\d+_)?(\d+)\.html/).exec( linkProduct );
            return id ? id[ 2 ] : null;
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', '.ads-reset-supplier', function (e) {
                    e.preventDefault();
                    $('#changeProduct').modal('show');
                    window.ADS.switchery( $('#changeProduct') );

                });

                $('body').on('click', '#js-update_ali_product_url', $this.reset);
                $('body').on('click', '#js-reset_product', function (e) {
                    e.preventDefault();

                    ADS.btnLock($('#js-reset_product'));

                    var post_id = $('[name="post_id"]').val(),
                        url = $('#productUrl').val();

                    var params = {
                        post_id : post_id,
                        product_id : getID(url),
                    };

                    window.ADS.aliExtension.productAli( url ).then(function (e) {
                        sendUpdate(e, params)
                    });
                });

                $( '.ads-product-options-item [data-ads_action]' ).each(function(){
                    window.ADS.mainRequest( $(this) );
                });

            },
            reset: function(e) {
                e.preventDefault();

                var productUrl = params.productUrl  = $('#aliLink').val();
                var post_id = params.post_id = $('[name="post_id"]').val();
                var product_id = params.product_id = getID(params.productUrl);

                ADS.btnLock($('#js-update_ali_product_url'));

                sendOptionsProduct('save_productUrl', {post_id : post_id , productUrl : productUrl }, function (response) {
                    if( response ) {

                        if( typeof response.error != 'undefined' ) {
                            ADS.btnUnLock($('#js-update_ali_product_url'));
                            ADS.notify( response.error );
                        } else {
                            if( $('#resetAll').is( ":checked" ) ) {
                                window.ADS.aliExtension.productAli( productUrl ).then(function (params) {
                                    sendResetProduct(params, post_id, product_id)
                                });
                            } else {
                                window.ADS.aliExtension.productAli( productUrl ).then(function (params) {
                                    sendResetReviewsLink(params, post_id, product_id)
                                });
                            }
                        }
                    }
                });

            }
        }
    })().init();

    var Update = (function () {
        var $this;

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', '#needUpdate', function (e) {
                    $('[data-for="#ads-form-callUpdate"]').click();
                });
                $('body').on('click', '#autoUpdatePrice', function (e) {
                    $('[data-for="#ads-form-callUpdate"]').click();
                });

            }
        }
    })().init();




});