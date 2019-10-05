var setting_product = (function ($) {

    function request(ads_action, args) {

        return new Promise(function (resolve, reject) {
            args.post_id = parseInt($('[name="post_id"]').val());

            $.ajax({
                url: alidAjax.ajaxurl,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'ads_product_setting',
                    ads_action: ads_action,
                    args : args
                },
                success: function (data) {

                    if (data.hasOwnProperty('error')) {
                        //todo чтото вывести
                        return reject(data);
                    } else {
                        return resolve(data);
                    }

                }
            });
        })
    }

    function selectpicker() {

        $('#post_status').selectpicker();
        $('#parent_product_category').selectpicker();
        $('#product_category').multiselect( {
            includeSelectAllOption : true,
            enableFiltering        : true,
            enableCaseInsensitiveFiltering : true,
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
            },
            onInitialized : function (obj) {
                var btn = obj.parent().find('button');

                btn.attr( 'title', btn.attr('title').replace(/(\r\n|\n|\r|\t)/gm,"") );
            }
        } ).parent().find( '.multiselect-container input[type="checkbox"]' ).uniform();

    }
    function daterangepicker() {
        var $dp = $('.setting-product-date-published');
        var $inputStart = $('.setting-product-published');

        $dp.daterangepicker( {
                locale: {
                    format: 'YYYY-MM-DD HH:mm'
                },
                autoApply: false,
                autoUpdateInput: true,
                singleDatePicker: true,
                // showDropdowns: true,
                startDate: $inputStart.val(),
                timePicker: true,
                timePicker24Hour: true,
                opens: 'right',
                applyClass: 'btn-small bg-slate',
                cancelClass: 'btn-small btn-default',
                template : '<div class="daterangepicker dropdown-menu ads-daterangepicker-product-settings">' +
                    '<div class="calendars">' +
                    '<div class="calendar left">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="daterangepicker_input">' +
                    '<div class="calendar-time">' +
                    '<div></div>' +
                    '</div>' +
                    '<div class="ranges">' +
                    '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                    '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    '<div class="calendar right">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="daterangepicker_input">' +
                    '<div class="calendar-time">' +
                    '<div></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            },
            function(start, end) {
                $dp.find('span').html(start.format('MMM, DD HH:mm'));
                $inputStart.val(start.format('YYYY-MM-DD HH:mm:ss'));
                request('post_published_set', {
                    time: start.format('YYYY-MM-DD HH:mm:ss')
                })
            }
        );

        $dp.on('show.daterangepicker', function(ev, picker) {
            $('.ads-daterangepicker-product-settings .ranges').show();
        });



    }

    return {
        init: function () {
            // $('body').toggleClass('setting-product--open');
            $('body').on('click', '.setting-product-active, #setting-product-overlay', function () {
                $('body').toggleClass('setting-product--open');
            });

            $('body').on('click', '.js-add-new-cat', function () {
                request('add_new_cat', {
                    name_cat: $('#new_product_category').val(),
                    parent: $('#parent_product_category').val()
                }).then(function (value) {

                    $('#new_product_category').val('');

                    $('#parent_product_category').selectpicker('destroy');
                    $('#product_category').multiselect('destroy');

                    $('select#product_category').html(value.categoryMulti);
                    $('select#parent_product_category').html(value.categories);

                    selectpicker();
                })
            });

            $('body').on('click', '.js-add-tag', function () {
                request('add_tag', {
                    name_tag: $('#add_tag').val(),
                }).then(function (value) {

                })
            });

            $('body').on('click', '.js-toggle-new', function () {
                $('.box-new-cat').toggleClass('hidden');
            });

            $('body').on('click', '.js-new-cat-close', function () {
                $('.box-new-cat').toggleClass('hidden');
            });

            $('body').on('click', '.js-product-trash', function (e) {
                e.preventDefault();

                request('product_trash', {

                }).then(function (value) {
                    location.href = value.category_link;
                })
            });

            $('body').on('change', '#post_status',function () {
                request('post_status_change', {
                    status: $('#post_status').val()
                })
            });

            $('body').on('change', '#product_category',function () {
                request('product_category_change', {
                    category: $('#product_category').val()
                })
            });

            $('body').on('click', '.js-toggle-title',function () {
                request('product_title_change', {
                    title: $('#product_title').val()
                }).then(function (value) {
                    if($('#form_singleProduct [itemprop="name"]', window.parent.document).length){
                        $('#form_singleProduct [itemprop="name"]', window.parent.document).html(value.title)
                    }else{
                        parent.location.reload();
                    }
                })
            });

            $('body').on('click', '.js-toggle-permalink',function () {
                request('product_permalink_change', {
                    permalink: $('#product_permalink').val()
                }).then(function (value) {
                    parent.location.href = value.permalink;
                })
            });

            daterangepicker();

            selectpicker();

            /*       $(document).ready(function(){
                       $('#ff').on('load', function() {
                           $(this).contents().find( "body" ).html('<div class="setting-product-body">'+$('.setting-product-body').html()+'</div>');
                       });
                   });*/


        }
    }
})(jQuery);

var i = setInterval(function () {
    if(jQuery('.setting-product-body').length){
        clearInterval(i);
        setting_product.init();
    }
}, 100);