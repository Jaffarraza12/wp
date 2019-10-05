/**
 * Created by pavel on 18.04.2016.
 */

jQuery( function ( $ ) {

    var Rounding = (function(){

        var $obj = {
            currencyForm : $('#setting_currency-form')
        };

        function checkRounding() {

            if( $obj.currencyForm.find('#rounding').is(':checked') ) {

                var cents = $obj.currencyForm.find('#assignCents'),
                    p = cents.parent();

                cents.val('');
                p.hide();
            }
        }

        return {
            init: function(){

                $(document).on('request:done', function(e) {
                    if( e.obj === '#setting_currency-form') {
                        checkRounding();
                    }
                });

                $obj.currencyForm.on('click', '#rounding', function(){

                    var cents = $obj.currencyForm.find('#assignCents'),
                        p = cents.parent();

                    if( ! $(this).is(':checked') ) {
                        p.show();
                    } else {
                        cents.val('');
                        p.hide();
                    }
                });
            }
        };
    })();
    Rounding.init();

    var Pricing = (function(){
        var $this;

        var obj = {
            countItemPage : 20,
            tmpl : {
                pricing: '#pricing',
                more: '#formula-more'
            },
            target : {
                pricing: '#p-pricing'
            },
            args : {},
            add: {
                selectCat : '.js-select-cat',
                applyto : '[name="applyto"]',
            }
        };

        function renderDiscount($el) {
            if( $el.find('#set_discount').is(':checked') ) {
                $el.find('.box-discount').slideDown(200);
            } else {
                $el.find('.box-discount').hide();
            }
        }


        function _sign(sign) {

            var foo = {
                plus     : '+',
                multiply : '*',
                none     : '='
            };
           return foo.hasOwnProperty( sign ) ? foo[ sign ] : '';
        }

        function renderSelectApplyTo() {
            var selectedValues = [];
            $('option:selected', obj.add.selectCat).each(function() {
                selectedValues.push($(this).val());
            });
            $(obj.add.applyto).val(selectedValues.join());
        };


        return {
            init: function(){
                if($this)return;
                $this = this;

                $this.render();

                $this.handler();

                $('body').on('click', '#set_discount', function () {
                    renderDiscount($(this).closest('.pricing-edit'));
                });

                return $this;
            },
            request: function (action, args, callback) {

                $.ajaxQueue({
                    url: ajaxurl,
                    data: {action: 'ads_pricing', ads_actions: action, args: args},
                    type: 'POST',
                    dataType: 'json',
                    success: callback
                });
            },


            handler: function () {

                var $this = this,
                    $d = $(document);

                $d.on('click', '.js-delete', function(){
                    var id = $(this).closest('.table-item').attr('data-id');
                    window.ADS.btnLock($(this));
                    $this.delete(id);
                });

                $d.on('click', '.js-save', function(e){
                    e.preventDefault();
                    var $el = $(this).closest('.pricing-edit');

                    window.ADS.btnLock($('.js-save'));

                    $.ajaxQueue( {
                        url     : ajaxurl,
                        dataType : 'json',
                        data    : {
                            action : 'ads_save_pricing_markup_formula', //todo
                            rows   : window.ADS.serialize($el)
                        },
                        type    : "POST",
                        success : function ( response ) {
                            window.ADS.notify( response.message, 'success' );
                            window.ADS.btnUnLock($('.js-save'));

                            $(obj.target.pricing).html(window.ADS.objTotmpl($(obj.tmpl.pricing).html(), $this.formatRender(response.item)));

                            if(typeof response.open !== 'undefined'){
                                $this.editRender(response.open);
                            }

                        }
                    } );
                });

                $d.on('click', '.js-edit', function (e) {
                    e.preventDefault();
                    var id = $(this).closest('.table-item').attr('data-id');
                    $this.editRender(id);
                });

                $d.on('click', '#js-recommended', function (e) {
                    window.ADS.btnLock($('#js-recommended'));

                    $.ajaxQueue( {
                        url      : ajaxurl,
                        dataType : 'json',
                        data     : {
                            action : 'ads_set_recommended_pricing_markup_formula'
                        },
                        type     : "POST",
                        success  : function ( response ) {
                            window.ADS.notify( response.message, 'success' );
                            window.ADS.btnUnLock($('#js-recommended'));

                            $(obj.target.pricing).html(window.ADS.objTotmpl($(obj.tmpl.pricing).html(), $this.formatRender(response.item)));

                            $this.initSorting();

                            if(typeof response.open !== 'undefined'){
                                $this.editRender(response.open);
                            }
                        }
                    } );
                });

                $d.on('click', '#js-add-new', function (e) {
                    window.ADS.btnLock($(this));
                    $this.new_selection(0, 'plus');
                });


                $d.on('click', '#js-new-selection-2', function (e) {
                    window.ADS.btnLock($(this));
                    $this.new_selection(2, 'multiply');
                });

                $d.on('click', '#js-new-selection-3', function (e) {
                    window.ADS.btnLock($(this));
                    $this.new_selection(3, 'multiply');
                });
                $d.on('click', '#js-new-selection-4', function (e) {
                    window.ADS.btnLock($(this));
                    $this.new_selection(4, 'multiply');
                });

                $('body').on('change', obj.add.selectCat, function(){
                    renderSelectApplyTo();
                });

            },

            editRender: function (id) {
                var item = obj.args[id];
                var tmpl = $(obj.tmpl.more).html();
                var $el = $('.pricing-edit-' + id);

                var isEdit = !$el.html();

                $('[data-id="'+id+'"]').removeClass('edit');

                $('.pricing-edit').html('');

                if(!isEdit){
                    return;
                }

                $('[data-id="'+id+'"]').addClass('edit');

                $el.html(window.ADS.objTotmpl(tmpl, $this.formatEdit(item)));

                $el.find('[name="sign"]').selectpicker('select', item['sign']);

                $el.find( '.uniform-checkbox, .uniform-radio' ).uniform();

                $el.find( '[multiple="multiple"]' ).multiselect( {
                    nonSelectedText: window.pricing_localize.all_product_categories,
                    includeSelectAllOption : true,
                    enableFiltering        : true,
                    templates              : {
                        filter : '<li class="multiselect-item multiselect-filter"><i class="fa fa-search"></i> <input class="form-control" type="text"></li>'
                    },
                    onSelectAll            : function () {
                        $.uniform.update();
                    },
                    onDeselectAll          : function () {
                        $.uniform.update();
                    },
                    onChange : function( obj ) {
                        //var btn = obj.parent().find('button');
                        //btn.attr( 'title', btn.attr('title').replace(/(\r\n|\n|\r|\t)/gm,"") );
                    },
                    onInitialized : function (obj) {
                        var btn = obj.parent().find('button');

                        btn.attr( 'title', btn.attr('title').replace(/(\r\n|\n|\r|\t)/gm,"") );
                    }
                } ).parent().find( '.multiselect-container input[type="checkbox"]' ).uniform();

                var select = $(obj.add.applyto).val();
                select = select ? select.split(','): [];

                $el.find('[multiple="multiple"]').multiselect('select', select);

                $('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});

                renderDiscount($el);

                window.ADS.switchery($el);
                window.ADS.scrollToNode('[data-id="'+id+'"]', 50, 200);

            },
            formatEdit: function (item) {
                return item;
            },

            new_selection: function (formula , sign) {

                $.ajaxQueue( {
                    url      : ajaxurl,
                    dataType : 'json',
                    data     : {
                        action : 'ads_set_new_selection_pricing_markup_formula',
                        formula : formula,
                        sign : sign
                    },
                    type     : "POST",
                    success  : function ( response ) {
                        window.ADS.notify( response.message, 'success' );
                        window.ADS.btnUnLock($('.js-new-selection'));
                        $(obj.target.pricing).html(window.ADS.objTotmpl($(obj.tmpl.pricing).html(), $this.formatRender(response.item)));

                        $this.initSorting();

                        if(typeof response.open !== 'undefined'){
                            $this.editRender(response.open);
                        }
                    }
                } );
            },

            delete: function (id) {
                $.ajaxQueue( {
                    url     : ajaxurl,
                    data    : {
                        action : 'ads_delete_pricing_markup_formula',
                        id   : id
                    },
                    dataType : 'json',
                    type    : "POST",
                    success : function ( response ) {
                        window.ADS.notify( response.message, 'success' );
                        window.ADS.btnUnLock($('.js-delete'));
                        $this.render();
                    }
                } );
            },

            render: function (open) {

                $.ajaxQueue( {
                    url      : ajaxurl,
                    dataType : 'json',
                    data     : {
                        action : 'ads_options_pricing_markup_formula'
                    },
                    type     : "POST",
                    success  : function ( response ) {

                        $(obj.target.pricing).html(window.ADS.objTotmpl($(obj.tmpl.pricing).html(), $this.formatRender(response)));

                        $this.initSorting();

                        if(typeof response.open !== 'undefined'){
                            $this.editRender(response.open);
                        }
                    }
                } );
            },
            formatRender: function (response) {
                obj.args = response;

                var items = response,
                    num = 1;

                for ( var i in items ) {
                    var item =items[i];
                    item[ 'minRow' ]     = item[ 'min' ] && item[ 'min' ] > 0 ? item[ 'f_min' ] : 0;
                    item[ 'maxRow' ]     = item[ 'max' ] ? item[ 'f_max' ] : '∞';
                    item[ 'signSymbol' ] = _sign(item[ 'sign' ]);
                    item[ 'num' ] = num++;
                    items[i] = item;
                }

                return {items: items};

            },
            initSorting: function(){
                $(".table-container.sortable").sortable({
                    items:".sortable-item",
                    handle: ".js-sort",
                    update: function( event, ui ) {
                        window.ADS.btnLock($('.js-sort'));
                        $this.saveSorting( event, ui.item );
                    }
                });
            },
            saveSorting: function(event, item){


                var table = item.closest('.table-container');
                var sorting = [];

                table.find('.sortable-item .table-item').each(function(){
                    sorting.push($(this).data('id'));
                });

                $.ajaxQueue( {
                    url      : ajaxurl,
                    dataType : 'json',
                    data     : {
                        action : 'ads_sorting_pricing_markup_formula',
                        sorting: sorting,
                    },
                    type     : "POST",
                    success  : function ( response ) {
                        $this.render();
                        window.ADS.notify( response.message, 'success' );
                    },
                    error : function(error){
                    }
                } );

            }


        }
    })();
    Pricing.init();

    $('#ads_price_active-form').html($('#ali-ads_price_active-field').html());

    var resetPrice = (function () {
        var $this,
            $body   = $( 'body' ),
            storage = {
                active : false
            };

        var obj = {
            'btn_start' : '#js-reset-price',
            'action'    : 'ads_reset_pricing'
        };

        var data = {
            "count"   : 0,
            "current" : 0,
            "update"  : 0,
            "product" : {},
            "info"    : {}
        };

        function setData( name, value, trigger ) {

            if ( typeof name === "string" ) {
                data[ name ] = value;
            } else {
                for ( var i in name ) {
                    data[ i ] = name[ i ];
                }
                trigger = value;
            }

            if ( trigger !== true ) return;

            $body.trigger( {
                type  : "update:data",
                info  : data,
                chage : {
                    name  : name,
                    value : value
                }
            } );
        }

        function getInfo() {
            $.ajaxQueue( {
                url     : ajaxurl,
                data    : {
                    action      : obj.action,
                    ads_actions : 'info'
                },
                type    : "POST",
                success : function ( response ) {
                    response = ADS.tryJSON( response );
                    response.current = 0;
                    setData( response, true );
                }
            } );
        }

        function send( post_id ) {

            $.ajaxQueue( {
                url     : ajaxurl,
                data    : {
                    action      : obj.action,
                    ads_actions : 'apply',
                    post_id     : post_id
                },
                type    : "POST",
                success : function ( response ) {
                    response = ADS.tryJSON( response );
                    setData( response, true );
                    upload();
                }
            } );

        }

        function getNextProduct() {
            $.ajaxQueue( {
                url      : ajaxurl,
                data     : {
                    action      : obj.action,
                    ads_actions : 'next'
                },
                type     : "POST",
                success  : function ( response ) {
                    response     = ADS.tryJSON( response );
                    data.current = response.current;
                    if ( data.current != -1 ) {

                        data.product[ response.post_id ] = {
                            post_id : response.post_id
                        };
                        send( response.post_id );

                    } else {
                        data.product = {};
                        storage.active = false;
                        window.ADS.btnUnLock($(obj.btn_start));
                    }

                },
                complete : function () {

                }
            } );
        }

        function upload() {

            if ( storage.active && data.current != -1 ) {
                window.ADS.btnLock($(obj.btn_start));
                getNextProduct();
            }else{
                window.ADS.btnUnLock($(obj.btn_start));
            }

        }

        return {
            init : function () {

                var $this = this;
                $body.on( 'click', obj.btn_start, function () {

                    if ( storage.active || updatePrice.active()) {
                        window.ADS.btnUnLock($(obj.btn_start));
                        storage.active = false;
                    } else {
                        window.ADS.btnLock($(obj.btn_start));
                        storage.active = true;
                        upload();
                    }
                } );

                getInfo();
            },
            active: function () {
                return storage.active;
            }
        }
    })();
    resetPrice.init();

    var updatePrice = (function () {
        var $this,
            $body   = $( 'body' ),
            storage = {
                active : false
            };

        var obj = {
            'btn_start' : '#js-update-price'
        };

        var data = {
            "count"   : 0,
            "current" : 0,
            "update"  : 0,
            "product" : {},
            "info"    : {}
        };

        function setData( name, value, trigger ) {

            if ( typeof name === "string" ) {
                data[ name ] = value;
            } else {
                for ( var i in name ) {
                    data[ i ] = name[ i ];
                }
                trigger = value;
            }

            if ( trigger !== true ) return;

            $body.trigger( {
                type  : "update:data",
                info  : data,
                chage : {
                    name  : name,
                    value : value
                }
            } );
        }

        function getInfo() {
            $.ajaxQueue( {
                url     : ajaxurl,
                data    : {
                    action      : 'ads_update_pricingMarkupFormula',
                    ads_actions : 'info'
                },
                type    : "POST",
                success : function ( response ) {
                    response = ADS.tryJSON( response );
                    response.current = 0;
                    setData( response, true );
                }
            } );
        }

        function send( post_id ) {

            $.ajaxQueue( {
                url     : ajaxurl,
                data    : {
                    action      : 'ads_update_pricingMarkupFormula',
                    ads_actions : 'apply',
                    post_id     : post_id
                },
                type    : "POST",
                success : function ( response ) {
                    response = ADS.tryJSON( response );
                    setData( response, true );
                    upload();
                }
            } );
        }

        function getNextProduct() {
            $.ajaxQueue( {
                url      : ajaxurl,
                data     : {
                    action      : 'ads_update_pricingMarkupFormula',
                    ads_actions : 'next'
                },
                type     : "POST",
                success  : function ( response ) {
                    response     = ADS.tryJSON( response );
                    data.current = response.current;
                    if ( data.current != -1 ) {

                        data.product[ response.post_id ] = {
                            post_id : response.post_id
                        };
                        send( response.post_id );

                    } else {
                        data.product = {};
                        window.ADS.btnUnLock($(obj.btn_start));
                        storage.active = false;
                    }

                },
                complete : function () {

                }
            } );
        }

        function upload() {

            if ( storage.active && data.current != -1 ) {
                window.ADS.btnLock($(obj.btn_start));
                getNextProduct();
            }else{
                window.ADS.btnUnLock($(obj.btn_start));
            }

        }

        return {
            init : function () {

                var $this = this;
                $body.on( 'click', obj.btn_start, function () {
                    if(storage.active || resetPrice.active()){
                        window.ADS.btnUnLock($(obj.btn_start));
                        storage.active = false;
                    }else{
                        window.ADS.btnLock($(obj.btn_start));
                        storage.active = true;
                        upload();
                    }
                } );

                getInfo();
            },
            active: function () {
                return storage.active;
            }
        }
    })();
    updatePrice.init();

    /**
     * title +count
     * @type {{init}}
     */
   var  progress = (function () {
        var $this;
        var $body = $( 'body' );

        var data = {
            list : []
        };

        var obl  = {
            $list : $( '#ads_activities-list' )
        };
        var tmpl = {
            list : $( '#tmpl-activities-list' ).html()
        };


        return {
            init           : function () {
                $this = this;

                $( 'body' ).on( 'update:data', function ( e ) {

                    if ( e.info.hasOwnProperty( 'list' ) ) {
                        $this.setList( e.info.list );
                        $this.renderList();
                    }

                    $this.renderProgress( e.info );
                } );
            },
            renderProgress : function ( info ) {
                var c  = info.current,
                    i  = parseInt( info.count );

                window.ADS.progress($('#activity-list'), i, c);

            },
            renderList     : function () {
                data.list.reverse();
               // obl.$list.html( ADS.objTotmpl( tmpl.list, data ) );
                data.list.reverse();
            },
            setList        : function ( list ) {

                data.list.push( {
                    title   : list.title,
                    img     : list.img,
                    caption : list.caption
                } );

                if ( data.list.length > 10 )
                    data.list.splice( 0, 1 );

            }
        }
    })();

    progress.init();

} );