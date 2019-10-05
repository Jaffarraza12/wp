jQuery(function ($) {

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

$.fn.selectProductsAds = function(cb, options) {
    var settings = $.extend( {
        list         : function (e) {
            return [];
        },
    }, options);

    console.log(settings);

    var params = {active : [], count : false};

    var obj = {
        $box : null,
        page: 1,
        root: '#ads-modal-addProduct',
        template: {
            modalAddProduct : '#ads-modal-addProduct',
            modalProduct : '#ads-tmpl-modal-products'
        },
        search: {
            disApply  : '#ads-search-apply',
            disResult : '#ads-modal-addProduct #ads-search-results',
            categories  : '#ads-modal-addProduct select#product_cat',
            disSearch : '#ads-modal-addProduct #ads-search',
        },
        row: {
            add : '.js-product-add',
            delete : '.js-product-delete',
        },
        bulk: {
            'apply': '.bulk-apply',
            'value': 'select.bulk-value',
        }
    };

    function loadTemplate() {
        return new Promise(function (reject, resolve) {

            if($('#ads-modal-addProduct').length == 1)
                reject();

            $.ajaxQueue( {
                url      : ajaxurl,
                dataType : 'html',
                data     : {
                    action      : 'ads_modal_select_product_tmpl'
                },
                type     : "POST",
                success  : function ( response ) {
                    $('body').append(response);
                    obj.template.modalProduct  = $('#ads-tmpl-modal-products').html();
                    reject();
                },
                beforeSend : function(){

                },
                complete : function () {

                }
            } );

        })
    }


    function renderSelectProduct(){
        $(obj.root + ' .product-item').find(obj.row.add ).show();
        $(obj.root + ' .product-item').find(obj.row.delete).hide();
        for(var id in params.active){
            $(obj.root + ' .product-item-' + params.active[id]).find(obj.row.add ).hide();
            $(obj.root + ' .product-item-' + params.active[id]).find(obj.row.delete).show();
        }
    }

    function disSearch( page ) {

        var ob		 = obj,
            str 	 = $(ob.search.disSearch).val(),
            category = $('option:selected', ob.search.categories).val();

        $(obj.search.disResult).addClass('over');

        $.ajaxQueue( {
            url      : ajaxurl,
            dataType : 'json',
            data     : {
                action      : 'ads_product_search',
                ads_str     : str,
                page		: page,
                category	: category
            },
            type     : "POST",
            success  : function ( response ) {

                $(obj.search.disResult).html( window.ADS.objTotmpl( obj.template.modalProduct, response ) );
                $(obj.search.disResult).find( '.uniform-checkbox, .uniform-radio' ).uniform();

                renderSelectProduct();

                window.ADS.createJQPagination(  obj.root, response.total, response.page);


                setTimeout( window.ADS.switchery( $(obj.root) ), 300 );
            },
            beforeSend : function(){

            },
            complete : function () {
                window.ADS.btnUnLock($(obj.search.disApply));
                $(obj.search.disResult).removeClass('over');
                $('[data-toggle="tooltip"]').tooltip();
            }
        } );
    }

    function bulk($root) {
        $root.off('click', obj.bulk.apply);
        $root.on('click', obj.bulk.apply, function (e) {
            e.preventDefault();

            var value = $root.find(obj.bulk.value).val();

            switch (value) {
                case 'add':
                    var $items = $root.find('.check-item:checked').closest('.table-item');


                    $items.each(function () {
                        var id = $(this).data('id');

                        if(!params.count || params.active.length < params.count){
                            params.active.push(id.toString());
                        }
                    });

                    cb(params.active.slice(0), obj.$box);
                    renderSelectProduct();
                    break;
            }
            $('#ads-search-results .check-item:checked').click();
            return false;
        });

    }

    function handlerSearch($root){

        $root.on('change', obj.search.categories, function(){
            disSearch( 1 );
        });

        $root.on('click', obj.search.disApply, function(e){
            e.preventDefault();
            window.ADS.btnLock($(obj.search.disApply));
            disSearch( 1 );
        });

        $root.on('pagination:click', function (e) {
            disSearch( e.page );
        });

        $root.on('click',obj.row.add, function (e) {
            var id = $(this).closest('.product-item').data('id').toString();

            if(!params.count || params.active.length < params.count){
                params.active.push(id);
                cb(params.active.slice(0), obj.$box);
            }

            renderSelectProduct();
        });

        $root.on('click',obj.row.delete, function (e) {
            var id = $(this).closest('.product-item').data('id').toString();
            params.active.splice(params.active.indexOf(id),1);
            cb(params.active.slice(0), obj.$box);
            renderSelectProduct();
        });

        bulk($root);

    }

    return this.each(function() {
        $(this).off( ".selectProductsAds" );
        $(this).on('click.selectProductsAds', function(e){

            obj.$box = this;
            params.active = settings.list(obj.$box).slice(0);
            params.count = $(obj.$box.closest('.js-ads-select-product')).find('.js-ads-select-product-count').val();

            params.count = parseInt(params.count);
            e.preventDefault();
           $(obj.template.modalAddProduct).remove();
            loadTemplate().then(function(){
                $(obj.template.modalAddProduct).appendTo("body").modal('show');
                handlerSearch($(obj.root));
                checker(obj.root);
                disSearch(1);
            });

        });

    });

};

});