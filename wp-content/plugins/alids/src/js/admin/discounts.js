/**
 * Created by Vitaly Kukin on 18.04.2016.
 */

jQuery( function ( $ ) {
    var Discounts = (function(){
        var $this;

        var obj = {
            countItemPage : 20,
            countProductPage : 10,
            tmpl : {
                list     : '#coupons',
                more     : '#ali-more-template',
                product : $( '#tmpl-product' ).html(),
                apply   : $( '#tmpl-product-added' ).html(),
                applyEmpty   : $( '#tmpl-product-apply-empty' ).html()
            },
            target : {
                list : '#p-coupons',
                disResult : '#ads-search-results',
            },
            args : {

            },
            add : {
                selectApplyto : '[name="prod_type"]',
                btnProduct : '.js-select-product',
                productBox : '#addProduct',
                selectCat : '.js-select-cat',
                list : '.list-applyto',
                delitem : '.js-delete-product',
                product : '.js-add-product',
                applyto : '[name="applyto"]',
                never_expires : '[name="never_expires"]',
                box_applyto : '.list-applyto-box'
            },
            search : {
                disApply  : '#ads-search-apply',
                disChose  : '#chose',
                disResult : '#ads-search-results',
                categories  : '#addProduct select#product_cat',
                disSearch : '#ads-search',
            }
        };

        function clone( obj ) {
            return $.extend( {}, obj );
        }

        function getApply(){
            var apply = $(document).find(obj.add.applyto);

            var foo = apply.val();

            if( foo != '' )
                foo = foo.split(',');
            else
                foo = [];

            return foo;
        }

        function renderAddProduct(){

            var v = $(obj.add.selectApplyto).val();

            $(obj.add.btnProduct).hide();
            $(obj.add.selectCat).hide();
            $(obj.add.productBox).hide();

            if( v !== 'product' ){
                $(obj.add.list).html('');
            }

            if( v == 'product' ){
                $(obj.add.btnProduct).show();
                applyPagesRender(1);
            } else if( v == 'categories' ){
                $(obj.add.list).html('');
                var selectedValues = [];
                $('option:selected', obj.add.selectCat).each(function() {
                    selectedValues.push($(this).val());
                });
                $(obj.add.applyto).val(selectedValues.join());
                $(obj.add.selectCat).show();
            }
        }
        
        function renderTickbox() {
            var check = $( '#tickbox' ).is( ':checked' );

            $('[name="tickbox_value"]').closest('.tickbox_value_box').toggle(check);
        }

        function renderBtnAddProduct(id){
            $('.product-item-' + id).find(obj.add.product ).hide();
            $('.product-item-' + id).find('.js-delete-product-add' ).show();
        }

        function renderBtnDeleteProduct(id){
            $('.product-item-' + id).find(obj.add.product ).show();
            $('.product-item-' + id).find('.js-delete-product-add' ).hide();
        }

        function isNeverExpires(){
            return $( '#never_expires' ).is( ':checked' );
        }

        function deleteProductApply(id){

            var  apply = $(document).find(obj.add.applyto);

            $(obj.add.list).find('.item-added-'+id).remove();

            var foo = apply.val();

            if( foo != '' )
                foo = foo.split(',');
            else
                foo = [];

            foo = foo.filter(function(elem, index, self) {
                return elem != id;
            });

            apply.val(foo.join());
        }

        function renderPagination_applyto(page){

           var  apply = $(document).find(obj.add.applyto);

            var foo = apply.val();

            if( foo != '' )
                foo = foo.split(',');
            else
                foo = [];

            var total = foo.length;

            if(total > obj.countProductPage){
                $(obj.add.box_applyto).find('.pagination-menu').show();
                window.ADS.createJQPagination( obj.add.box_applyto, total, page, obj.countProductPage);
            }else{
                $(obj.add.box_applyto).find('.pagination-menu').hide();
            }

        }

        function applyPagesRender(page) {
            var item = obj.countProductPage;

            renderPagination_applyto(page);

            var  apply = $(document).find(obj.add.applyto);

            var foo = apply.val();

            if( foo != '' )
                foo = foo.split(',');
            else
                foo = [];

            var start = (page-1) * item;

           var count = foo.slice(start, start+item).length;

            $( obj.add.list ).html( window.ADS.objTotmpl( obj.tmpl.applyEmpty, {count:count} ) );

            $.ajaxQueue( {
                url      : ajaxurl,
                dataType : 'json',
                data     : {
                    action      : 'ads_discount',
                    ads_actions : 'ads_search_ids',
                    post_ids     : foo.slice(start, start+item).join(),
                    args     :     window.ADS.serialize( apply.closest('.discount-edit'))
                },
                type     : "POST",
                success  : function ( response ) {
                    $( obj.add.list ).html( window.ADS.objTotmpl( obj.tmpl.apply, {products: response} ) );
                    $('[data-toggle="tooltip"]').tooltip();
                }
            } );

        }

        return {
            init: function(){
                if($this)return;
                $this = this;

                $this.render();

                $this.handler();
                $this.handlerSearch();

            },
            request: function (action, args, callback) {

                 $.ajaxQueue({
                    url: ajaxurl,
                    data: {action: 'ads_discount', ads_actions: action, args: args},
                    type: 'POST',
                    dataType: 'json',
                    success: callback
                });
            },

            render : function(){
                this.request('ads_get_discount', '', $this.listRender);
            },
            formatRender: function(response){
                var items = response.args,
                num = 1;
                for ( var i in items ) {
                    var item =items[i];
                    item[ 'status' ]           = item[ 'status' ] == 1;
                    item[ 'never_expires' ]    = item[ 'never_expires' ] == 1;
                    item[ 'count' ]            = item[ 'count' ] ? item[ 'count' ] : '0';
                    item[ 'count_max_view' ]   = item[ 'count_max' ] ? item[ 'count_max' ] : '∞';
                    item[ 'date_active_view' ] =  item[ 'date_active' ] === "2038/01/19 03:01:07" || item[ 'never_expires' ] ? '∞' :moment(item[ 'date_active' ]).format('MMM, D HH:mm') ;
                    item[ 'date_view' ]        = moment( item[ 'date' ]).format('MMM, D HH:mm');
                    item[ 'count_max' ]        = item[ 'count_max' ] !== 0 ? item[ 'count_max' ] : '';
                    item[ 'tickbox_value_view' ]  = item[ 'tickbox_value' ];
                    item[ 'tickbox_auto' ]  = item[ 'tickbox_auto' ] == 1;
                    item[ 'num' ] = num++;
                    items[i] = item;
                }

                return {items: items};
            },
            listRender: function (response) {

                var tmpl = $(obj.tmpl.list).html(),
                    target = $(obj.target.list);

                if (response) {

                    if (response.hasOwnProperty('error')) {
                        window.ADS.notify(response.error, 'danger');
                    } else {
                        obj.args = response.args;
                        target.html(window.ADS.objTotmpl(tmpl, $this.formatRender(response)));
                        setTimeout(window.ADS.switchery(target), 300);

                        if(response.open){
                            $this.editRender(response.open);
                            window.ADS.scrollToNode('[data-id="'+response.open+'"]', 50);
                        }

                        if(response.message){
                            window.ADS.notify( response.message, 'success' );
                        }

                    }
                }

                window.ADS.btnUnLock($('.js-delete'));
                window.ADS.btnUnLock($('.js-save'));
                window.ADS.btnUnLock($('#js-add-new-coupons'));
            },
            editRender: function (id) {
                var item = obj.args[id];
                var tmpl = $(obj.tmpl.more).html();
                var $el = $('.discount-edit-' + id);

                var isEdit = !$el.html();

                $('[data-id="'+id+'"]').removeClass('edit');

                $('.discount-edit').html('');
                if(isEdit){
                    $('[data-id="'+id+'"]').addClass('edit');

                    $el.html(window.ADS.objTotmpl(tmpl, $this.formatEdit(item)));

                    $( obj.add.btnProduct, 'body' ).selectProductsAds(function(data){

                        var post_ids = data.join(',');

                        $(document).find(obj.add.applyto).val(post_ids);

                        applyPagesRender(1);

                    }, { list : getApply });

                    $this.daterangepicker($el);
                    setTimeout(window.ADS.switchery( $(obj.target.list)), 300 );

                    var select = $(obj.add.applyto).val();
                    select = select ? select.split(','): [];

                    $el.find('[multiple="multiple"]').multiselect('select', select);

                    renderAddProduct();
                    
                    renderTickbox();

                    applyPagesRender(1);

                    $( obj.search.categories).selectpicker();

                    $('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});

                    window.ADS.scrollToNode('[data-id="'+id+'"]', 50, 200);
                }

            },
            formatEdit: function (item) {
               return item;
            },
            daterangepicker: function ($el) {
                var $dp = $el.find('.daterange-predefined');
                var $inputStart = $el.find('[name="date"]');
                var $inputEnd = $el.find('[name="date_active"]');

                var isNever = isNeverExpires();
                $dp.daterangepicker('remove');
                $dp.daterangepicker( {
                        locale: {
                            format: 'YYYY/MM/DD HH:mm'
                        },
                        autoApply: false,
                        autoUpdateInput: true,
                        singleDatePicker: isNever,
                        startDate: $inputStart.val(),
                        endDate: $inputEnd.val(),
                        timePicker: true,
                        timePicker24Hour: true,
                        opens: 'right',
                        applyClass: 'btn-small bg-slate',
                        cancelClass: 'btn-small btn-default'
                    },
                    function(start, end) {
                        var a = !isNever ? (' &nbsp; - &nbsp; ' + end.format('MMMM D, YYYY') ): '';
                        $dp.find('span').html(start.format('MMMM D, YYYY') + a);
                        $( $dp.data('ads_from') ).val( start.format('YYYY/MM/DD HH:mm:ss') );
                        $( $dp.data('ads_to') ).val( end.format('YYYY/MM/DD HH:mm:ss') );

                        $inputStart.val(start.format('YYYY/MM/DD HH:mm:ss'));
                        $inputEnd.val(end.format('YYYY/MM/DD HH:mm:ss'));

                    }
                );
                var b = !isNever ? (' &nbsp; - &nbsp; ' + moment($inputEnd.val()).format('MMMM D, YYYY')) : '';
                $dp.find('span').html(moment($inputStart.val()).format('MMMM D, YYYY') + b);
            },

            handler: function () {

                var $this = this,
                    $d = $(document);

                $d.on('click', '.js-delete', function(){
                    var id = $(this).closest('.table-item').attr('data-id');
                    window.ADS.btnLock($(this));

                    $this.request('ads_delete_discount', {code: obj.args[id]['code']}, $this.listRender);
                });

                $d.on('click', '.js-edit', function (e) {
                    e.preventDefault();
                    var id = $(this).closest('.table-item').attr('data-id');
                    $this.editRender(id);
                });

                $d.on('click', '#js-add-new-coupons', function (e) {
                    window.ADS.btnLock($('#js-add-new-coupons'));
                    $this.request('ads_add_discount', '', $this.listRender);
                });

                $d.on('click', '.js-cancel', function (e) {
                    e.preventDefault();
                    var id = $(this).closest('.discount-edit').attr('data-id');
                    var $el = $('.discount-edit-' + id);
                    $el.html('');
                });

                $d.on('click', '.js-save', function (e) {
                    e.preventDefault();
                    var $el = $(this).closest('.discount-edit');

                    window.ADS.btnLock($('.js-save'));

                    $this.request('ads_edit_discount', window.ADS.serialize($el), $this.listRender);
                });

                $('body').on('change', '[name="prod_type"]', function(){
                    $(obj.add.applyto).val('');
                    renderAddProduct();
                });

                $('body').on('change', obj.add.selectCat, function(){
                    renderAddProduct();
                });

                $('body').on( 'click', obj.add.product , function () {

                    var id = $(this).data('pid'),
                        apply = $(document).find(obj.add.applyto);

                    var foo = apply.val();

                    if( foo != '' )
                        foo = foo.split(',');
                    else
                        foo = [];

                    foo.push(id);

                    foo = foo.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    apply.val(foo.join());

                    renderBtnAddProduct(id);
                    applyPagesRender(1);
                } );

                $('body').on('click', '#tickbox', function () {
                    renderTickbox();
                });

                $('body').on('change', '#never_expires', function(){
                    var $el = $(this).closest('.discount-edit');
                    $this.daterangepicker($el);
                });

            },

            handlerSearch: function(){


                $('body').on('pagination:click',obj.add.box_applyto, function (e) {
                    applyPagesRender( e.page );
                });

                $('body').on( 'click', obj.add.delitem , function () {

                    var id = $(this).data('pid');
                    deleteProductApply(id);
                    renderAddProduct();

                } );

                $('body').on('click','.js-delete-product-add', function (e) {
                    var id = $(this).data('pid');
                        deleteProductApply(id);
                    renderBtnDeleteProduct(id);
                });
            },
        }
    })();

    Discounts.init();

} );