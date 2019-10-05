import addressAuto from './addressAuto.js';

function in_array( args, str ) {

    return args.join(',').indexOf(str)>=0;
}

function serialize_this($el) {
    let serialized = $el.serialize();
    if (!serialized)
        serialized = $el.find('input[name],select[name],textarea[name]').serialize();
    return serialized;
}


jQuery(function($){

    const checkout = ($('form#form_delivery').length);

    if( checkout ) {

        if(window.checkoutSettings && window.checkoutSettings.address_autocomplete)
            addressAuto.init();

        let steps = (function () {

            let obj = {
                data : {},
                stp : 1
            };

            let st = {
                btnStep1: '.js-save-step1',
                btnStep2: '.js-save-step2',
                hClass : 'box-hidden'
            };

            const objTotmpl = function ( tmpl, data ) {
                if ( typeof window.Handlebars === 'undefined' ) {
                    return false
                }
                const template = window.Handlebars.compile( tmpl );
                return template( data );
            };

            function setStep(stp) {

                obj.stp = stp;

                $.ajax({
                    url: alidAjax.ajaxurl,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'ads_save_checkout_form',
                        ads_action: 'step_checkout',
                        args: '',
                        step: stp
                    },
                    success: function (data) {
                        if (data.hasOwnProperty('error')) {
                            return;
                        }
                        $(window).trigger('cart:step');
                        render(stp, data);
                    }
                });
            }

            function render(stp, data) {
                renderPageEmpty(data);
                renderDiscount(data);
                if(!data.basket){
                    return;
                }

                obj.data = data;
                obj.stp = stp;

                if(window.ADS.Dispatcher){
                    window.ADS.Dispatcher.trigger('cart:render', data)
                }

                renderListOrders(data);

                $('.steps').addClass(st.hClass);
                $('.steps.step-' + data.step).removeClass(st.hClass);

                var basket = data.basket;

                $('.js-sub_total').text(basket.sub_total);
                $('.js-shipping_total').text(basket.shipping_total);
                if($('.js-cart-info-value').length)
                    $('.js-cart-info-value').text(basket.info.value);
                $('.js-total').html(basket.total);

                var box = $('.box-informer-cart'),
                    box2 = $('.box-step-2'),
                    box3 = $('.box-step-3');

                if (data.step === 1) {
                    box.addClass(st.hClass);
                    box2.addClass(st.hClass);
                    box3.addClass(st.hClass);
                } else if (data.step === 2) {
                    box.removeClass(st.hClass);
                    box2.removeClass(st.hClass);
                    box3.addClass(st.hClass);
                    $('.js-cartInfo-email').text(data.email);
                    $('.js-cartInfo-address').text(data.address);
                } else if (data.step === 3) {
                    box.removeClass(st.hClass);
                    box2.removeClass(st.hClass);
                    box3.removeClass(st.hClass);
                    $('.js-cartInfo-shipping').html(data.shipping_text);
                }

                $('.step1', '.link-step').toggleClass('active', data.step1 === 1);
                $('.step2', '.link-step').toggleClass('active', data.step2 === 1);
                $('.step3', '.link-step').toggleClass('active', data.step3 === 1);

                $('.step1, .step2, .step3', '.link-step').removeClass('current');
                $('.step' + data.step, '.link-step').addClass('current');

                if($('#shipping-template').length){
                    var $tmpl = $('#shipping-template').html();
                    $( '.box-shipping-cart' ).html( objTotmpl( $tmpl, data.basket ) );

                    $( '.box-shipping-cart' ).find('[value="'+data.shipping_cart+'"]').prop('checked', true);
                }

                if($('#tax-apply-tmp').length && data.basket.taxesRatesApply && !data.basket.isTaxIncluding){
                    let $tmpl = $('#tax-apply-tmp').html();
                    $( '.js-box-tax' ).html( objTotmpl( $tmpl, data.basket ) );
                }

                if($('#save-apply-tmp').length && data.basket.save){
                    let $tmpl = $('#save-apply-tmp').html();
                    console.log($tmpl);
                    console.log(data.basket);
                    $( '.js-box-save' ).html( objTotmpl( $tmpl, data.basket ) );
                }

            }

            function btnLock( $el ) {
                $el.addClass('checkout-spinner').attr('disabled', true);
            }

            function btnUnLock( $el ) {
                setTimeout(function(){
                    if($el.length)
                        $el.removeClass('checkout-spinner').attr('disabled', false);
                },300);
            }

            function selectedShippingOrder() {
                $('.js-order-shipping').selectpicker();

                $('.js-order-shipping').on('change', function () {
                    var shipping = $(this).val();
                    var order_id = $(this).closest('.shipping-item').data('id');

                    $.ajax({
                        url: alidAjax.ajaxurl,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            action: 'ads_save_checkout_form',
                            ads_action: 'shipping_order',
                            shipping: shipping,
                            order_id: order_id
                        },
                        success: function (data) {

                            if (data.hasOwnProperty('error')) {
                                //todo чтото вывести
                            } else {
                                $(window).trigger('cart:shipping');
                                render(obj.stp, data);
                            }

                        }
                    });
                });
            }

            function dis(discount){
                $('[name="discount"]').val(discount).change();

                btnLock($( '.discount-apply') );

                $.ajax({
                    url: alidAjax.ajaxurl,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'ads_save_checkout_form',
                        ads_action: 'coupon',
                        discount: discount
                    },
                    success: function (data) {
                        if (data.hasOwnProperty('error')) {
                            //todo чтото вывести
                        } else {
                            $(window).trigger('cart:discount');
                            render(data.step, data)
                        }

                        btnUnLock($( '.discount-apply') );
                    }
                });

            }

            function renderDiscount(data) {
                $('[name="discount"]').val(data.discount).parent().addClass('is-not-empty');
                if(data.discount){
                    $('[name="discount"]').parent().addClass('is-not-empty');
                }

                if(data.layout.type == 'DiscountTrue'){
                    $('.help-discount').removeClass('error').show().text(data.layout.message).parent().removeClass('is-empty').addClass('is-not-empty');
                }else if(data.layout.type == 'DiscountFalse'){
                    $('.help-discount').addClass('error').show().text(data.layout.message).parent().removeClass('is-empty').addClass('is-not-empty');
                }else{
                    $('.help-discount').hide();
                }
            }

            var tmp_cart_list = $('#order-item-tmp').html();

            function renderListOrders(data) {
                if(!data.basket.items.length){
                    return;
                }

                $( '.orders-list' ).html( objTotmpl( tmp_cart_list, data.basket ) );
            }

            function renderPageEmpty(data) {
                if(data.basket && data.basket.items.length){
                    $('.checkout-container-no').hide();
                    $('#form_delivery').show();
                }else{
                    $('.checkout-container-no').show();
                    $('#form_delivery').hide();
                }
            }

            return {
                init: function () {

                    var $d = $(document);

                    this.register();
                    this.post_code();
                    selectedShippingOrder();

                    $(document).on('click', '.order-item-remove',function () {
                        var th = $(this).closest('.order-item');
                        th.remove();

                        $.ajax({
                            url: alidAjax.ajaxurl,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                action: 'ads_save_checkout_form',
                                ads_action: 'remove_oder',
                                order_id: th.attr('data-id')
                            },
                            success: function (data) {
                                if (data.hasOwnProperty('error')) {
                                    //todo чтото вывести
                                } else {
                                    $(window).trigger('cart:remove');
                                    render(obj.stp, data);
                                }
                            }
                        });

                    });

                    obj.stp = $('.link-step .current a').data('step') || 1;

                    $d.on('click', 'img.js-complete_order', function () {
                        $('.wrap-btn-pay').trigger('click');
                        $('[name="ads_checkout"]').trigger('click');
                    });

                    $d.on('click', st.btnStep1, function (e) {
                        e.preventDefault();

                        var $el = $(this).parents('form');
                        if(!validStateSelect()){
                            $el.trigger({type: 'cart:check'});
                            return false;
                        }

                        btnLock($( this) );

                        $el.trigger({type: 'cart:check', step: 1});
                    });

                    function validStateSelect(){

                        var error = false;

                        $('#js-cart-stateSelect, #js-billing_cart-stateSelect').each(function () {
                            var stateSelect = $(this);
                            stateSelect.closest('.field').removeClass('error-empty');
                            if(stateSelect.closest('.hasSelect').is(':visible') && stateSelect.closest('.hasSelect').length && !stateSelect.val()){
                                stateSelect.closest('.field').addClass('error-empty');
                                error = true;
                            }
                        });

                        return !error;
                    }

                    $('body').on('change', '#js-cart-stateSelect, #js-billing_cart-stateSelect', function(){
                        validStateSelect();
                    });

                    $d.on('click', st.btnStep2, function (e) {
                        e.preventDefault();

                        var $el = $(this).parents('form');


                        $('.box-shipping-cart').removeClass('error');
                        if($('.box-shipping-cart').length && !$('[name="shipping_cart"]:checked').val()){
                            $('.box-shipping-cart').addClass('error');
                            $el.trigger({type: 'cart:check'});
                            return false;
                        }

                        if(!validStateSelect()){
                            $el.trigger({type: 'cart:check'});
                            return false;
                        }

                        btnLock($( this) );

                        $el.trigger({type: 'cart:check', step: 2});
                    });

                    $d.on('click', '.move-step, .link-step li.active a, .box-informer-cart .edit a', function (e) {
                        e.preventDefault();
                        var step = $(this).attr('data-step');
                        if(obj.stp !== 1){
                            setStep(step);
                            return;
                        }

                        var $el = $(this).parents('form');
                        $el.trigger({type: 'cart:check', setStep: step});

                    });

                    $('[name="discount"]').keyup(function(e){
                        if(e.keyCode === 13) {
                            e.preventDefault();
                            var discount = $(this).val();
                            dis(discount);
                        }
                    });

                    $('#form_delivery').keydown(function(event) {
                        if(event.keyCode == 13) {
                            event.preventDefault();
                        }
                    });

                    $d.on('click', '[name="type"]', function(){
                        $.ajax({
                            url: alidAjax.ajaxurl,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                action: 'ads_save_checkout_form',
                                ads_action: 'save_payment',
                                type: $(this).val()
                            },
                            success: function (data) {
                                if (data.hasOwnProperty('error')) {
                                    //todo чтото вывести
                                }
                            }
                        });
                    });

                    $d.on('change', '[name="shipping_cart"]', function(){

                        $.ajax({
                            url: alidAjax.ajaxurl,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                action: 'ads_save_checkout_form',
                                ads_action: 'save_shipping',
                                shipping_cart: $(this).val()
                            },
                            success: function (data) {
                                if (data.hasOwnProperty('error')) {
                                    //todo чтото вывести
                                } else {
                                    render(1, data);
                                }
                            }
                        });
                    });


                    $d.on('click', '.discount-apply', function () {
                        var discount = $(this).parent().find('[name="discount"]').val();
                        dis(discount);
                    });

                    $d.on('form:validated', function (e) {
                        //todo если step > 2 то не отправлять запрос, там уже редирект на чекаут идёт или оплата
                        btnUnLock($( '.js-save-step1, .js-save-step2') );
                        if (!e.error && e.step) {

                            var stp = e.step;

                            $.ajax({
                                url: alidAjax.ajaxurl,
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    action: 'ads_save_checkout_form',
                                    ads_action: 'save_checkout',
                                    args: serialize_this($('.steps.step-' + e.step)),
                                    step: e.step
                                },
                                success: function (data) {
                                    if (data.hasOwnProperty('error')) {
                                        //todo чтото вывести
                                    } else {
                                        $(window).trigger('cart:shipping');
                                        render(stp, data);
                                    }
                                }
                            });
                        }
                    });


                    $d.on('form:validated', function (e) {
                        if (!e.error && e.params.setStep) {
                            var step = e.params.setStep;
                            setStep(step);
                        }
                    });

                    $('#form_delivery').on('submit', function () {
                        $('[name="ads_checkout"]').addClass('btn-processed');
                    });

                },
                post_code : function(){
                    $('[name="no_zip"]').on('change', function () {

                        var disable_block = $( '.no-zip-over' );
                        var input_postal_code = $( 'input#postal_code' );

                        if ($(this).prop('checked')) {
                            disable_block.css({ 'display' : 'block' });
                            input_postal_code.val('None').change();
                        } else {
                            disable_block.css({ 'display' : 'none' });
                            input_postal_code.val('').change();
                           // input_postal_code.closest('.field').addClass('is-empty').removeClass('is-not-empty, js-valid');
                        }

                        input_postal_code.trigger('blur');


                    });
                },
                register: function () {
                    var registerBox = $('input[name="register"]');
                    var country = $('select[name="country"]');
                    var that = this;

                    if (registerBox.length == 0) {
                        if (typeof country.attr('data-country-value') != 'undefined') {
                            $('select[name="country"] option[value="' + country.attr('data-country-value') + '"]').prop('selected', 'selected');
                        }
                    }

                    registerBox.on('change', function () {
                        var emailField = $('input[name="email"]');
                        $('.userExistsMessage').remove();
                        if (this.checked) {
                            that.checkUser(emailField.val());
                        } else {
                            that.hidePassword();
                        }
                    });
                },
                checkUser: function (email) {
                    var that = this;
                    if (email.length == 0) {
                        that.showPassword();
                        return false;
                    }

                    $.ajax({
                        url: alidAjax.ajaxurl,
                        type: "POST",
                        dataType: "json",
                        async: true,
                        data: {
                            action: "ads_validate_email",
                            email: email
                        },
                        success: function (xhr) {
                            if (xhr.result == false) {
                                that.showPassword();
                            } else {
                                var registerInput = $('input[name="register"]');
                                registerInput.parent()
                                    .append('<p class="userExistsMessage" style="display:inline;margin-left: 10px;color: red;">' + xhr.message + '</p>');
                            }
                        }
                    });
                },
                showPassword: function () {
                    $('.password_fields').prop('required', 'required');
                    $('#password-block').fadeIn('slow');
                },
                hidePassword: function () {
                    $('.password_fields').removeProp('required');
                    $('#password-block').fadeOut('slow');
                }
            };
        })();

        steps.init();

        var readonly_checkbox = (function () {
            return {
                init: function () {
                    var box = $('.conditions');
                    if (box.length == 0) {
                        $('.wrap-btn-pay').hide();
                        return;
                    }

                    $('.wrap-btn-pay').show();

                    $('[name="ads_checkout"]').attr('disabled', true);
                    $('#conditions').on('change', function (e) {
                        var check = $('#conditions').is(':checked');
                        $('[name="ads_checkout"]').attr('disabled', !check);
                        $('.conditions-help').text('');
                        $('.wrap-btn-pay').toggle(!check);
                    });

                    $('.wrap-btn-pay').on('click', function () {
                        if ($('.js-btn-pay').find('[name="ads_checkout"][disabled="disabled"]').length) {
                            $('.conditions-help').text($('#readonly_text').text());
                        }
                    });
                }
            }
        })();
        readonly_checkbox.init();

        var selectRegion = (function () {

            var $this;
            var state = {
                boostrap: true,
                country: '',
                countryBind: '.js-country-stateSelect',
                regionList: false,
                region: ''
            };

            function renderRegion() {

                if (state.regionList) {
                    renderSelectRegion();
                } else {
                    renderInputRegion();
                }

                renderfindFields(state.country);
            }

            function renderInputRegion() {
                var stateText = $('#js-cart-stateText');
                var select = $('#js-cart-stateSelect');
                var dataState = stateText.attr('data-state-value');

                select.html('').selectpicker('refresh').attr('name', '');
                select.closest('.field').removeClass('hasSelect').find('.bootstrap-select').hide();
                stateText.show().attr('name', 'state');
                if( dataState === 'None'){
                    stateText.val('');
                    stateText.attr('data-state-value', '');
                    stateText.parents('.field').addClass('js-valid');
                }

            }

            function renderSelectRegion() {
                var stateText = $('#js-cart-stateText');
                var select = $('#js-cart-stateSelect');
                var dataState = select.attr('data-state-value');

                select.attr('name', 'state');

                if (!dataState || dataState === 'None'){
                    dataState = '';
                    stateText.attr('data-state-value', '');
                }

                stateText
                    .attr('name', '')
                    .hide()
                    .closest('div')
                    .removeClass('js-valid js-invalid js-invalid_empty');

                $('#js-cart-stateText + span').hide();


                var options = '';
                for (var key in state.regionList) {
                    options += '<option value="' + key + '">' + state.regionList[key] + '</option>';
                }

                select.html(options);

                if ($('#js-cart-stateSelect option').length > 20){
                    $('#js-cart-stateSelect').data('live-search', 'true');
                }

                if (state.boostrap) {
                    select.closest('.field').addClass('hasSelect').find('.bootstrap-select').show();
                    if (dataState.length > 0) {
                        $('#js-cart-stateSelect option:contains("' + dataState + '")')
                            .prop('selected', 'selected');
                        select.selectpicker('refresh');
                    } else {
                        select.selectpicker('refresh');
                    }
                }
                //stateText.val(dataState);
            }

            function setRegion() {

                state.regionList = false;

                $.ajax({
                    url: alidAjax.ajaxurl,
                    type: "POST",
                    dataType: "json",
                    async: true,
                    data: {
                        action: "ads_rg_list",
                        country: state.country
                    },
                    success: function (data) {
                        state.regionList = !$.isArray(data) ? data : false;
                        renderRegion();
                    }
                });
            }

            function setData() {
                state.country = $(state.countryBind + ' option:selected').val();
                setRegion();
            }

            function findFields( country ) {

                var args   = window.fieldsAccess;
                var fields = args[ 'fields' ][ 'default' ];

                $.each(args['countries'], function(k,v) {
                    if( in_array( v, country ) ) {
                        fields = args[ 'fields' ][ k ];
                    }
                });

                return fields;
            }

            function renderfindFields(country){
                var fileds       = findFields(country),
                    $stateSelect = $('#js-cart-stateSelect'),
                    $stateText   = $('#js-cart-stateText'),
                    $postalCode  = $('#postal_code');

                var $box_state     = $stateText.parent();
                var $box_post_code = $postalCode.parent();

                if( ! fileds.state ) {
                    $stateSelect.attr('name','');
                    $stateText.attr('name','state').val('None');
                    $box_state.addClass('box-hidden')
                } else {

                    if( $stateText.val() === 'None' )
                        $stateText.val('');

                    $box_state.removeClass('box-hidden');
                    $box_state.find('label').text(fileds.state);
                }

                if( ! fileds.postal_code ) {
                    $postalCode.val('None');
                    $box_post_code.addClass('box-hidden')
                } else {

                    if( $postalCode.val() === 'None' )
                        $postalCode.val('');

                    $box_post_code.removeClass('box-hidden');
                    $box_post_code.find('label[for="postal_code"]').text(fileds.postal_code);
                }
            }

            return {
                init: function () {
                    $this = this;

                    var $d = $(document);

                    $('.js-country-stateSelect').selectpicker('destroy');
                    $('#js-cart-stateSelect').selectpicker('destroy');

                    if(window.navigator.userAgent.indexOf("Edge") > -1){
                        if ($('#js-cart-stateSelect option').length > 20){
                            $('#js-cart-stateSelect').data('live-search', 'true');
                        }

                        $('#js-cart-stateSelect').selectpicker({size: 'auto', enableCaseInsensitiveFiltering: true});

                        $d.find(state.countryBind).each(function (e) {
                            if ($(this).find('option').length > 20)
                                $(this).data('live-search', 'true');
                        }).selectpicker({size: 'auto', enableCaseInsensitiveFiltering: true});
                    }else{
                        $d.find(state.countryBind).each(function (e) {
                            if ($(this).find('option').length > 20)
                                $(this).data('live-search', 'true');
                        }).selectpicker({enableCaseInsensitiveFiltering: true});
                    }

                    state.country = $(state.countryBind + ' option:selected').val();

                    setData();

                    $(state.countryBind).on('change', function () {
                        setData();
                    });
                }
            };
        })();

        selectRegion.init();

        var billing_selectRegion = (function () {

            var $this;
            var state = {
                boostrap: true,
                country: '',
                countryBind: '.js-billing_country-stateSelect',
                regionList: false,
                region: ''
            };

            function renderRegion() {

                if (state.regionList) {
                    renderSelectRegion();
                } else {
                    renderInputRegion();
                }

                renderfindFields(state.country);
            }

            function renderInputRegion() {
                var stateText = $('#js-billing_cart-stateText');
                var select = $('#js-billing_cart-stateSelect');
                var dataState = stateText.attr('data-state-value');

                select.html('').selectpicker('refresh').attr('name', '');
                select.closest('.field').removeClass('hasSelect').find('.bootstrap-select').hide();
                stateText.show().attr('name', 'billing_state');
                if( dataState === 'None'){
                    stateText.val('');
                    stateText.attr('data-state-value', '')
                }

            }

            function renderSelectRegion() {
                var stateText = $('#js-billing_cart-stateText');
                var select = $('#js-billing_cart-stateSelect');
                var dataState = select.attr('data-state-value');

                select.attr('name', 'billing_state');

                if (!dataState || dataState === 'None'){
                    dataState = '';
                    stateText.attr('data-state-value', '');
                }

                stateText
                    .attr('name', '')
                    .hide()
                    .closest('div')
                    .removeClass('js-valid js-invalid js-invalid_empty');

                $('#js-billing_cart-stateText + span').hide();


                var options = '';
                for (var key in state.regionList) {
                    options += '<option value="' + key + '">' + state.regionList[key] + '</option>';
                }

                select.html(options);

                if ($('#js-billing_cart-stateSelect option').length > 20){
                    $('#js-billing_cart-stateSelect').data('live-search', 'true');
                }

                if (state.boostrap) {
                    select.closest('.field').addClass('hasSelect').find('.bootstrap-select').show();
                    if (dataState.length > 0) {
                        $('#js-billing_cart-stateSelect option:contains("' + dataState + '")')
                            .prop('selected', 'selected');
                        select.selectpicker('refresh');
                    } else {
                        select.selectpicker('refresh');
                    }
                }
                //stateText.val(dataState);
            }

            function setRegion() {

                state.regionList = false;

                $.ajax({
                    url: alidAjax.ajaxurl,
                    type: "POST",
                    dataType: "json",
                    async: true,
                    data: {
                        action: "ads_rg_list",
                        country: state.country
                    },
                    success: function (data) {
                        state.regionList = !$.isArray(data) ? data : false;
                        renderRegion();
                    }
                });
            }

            function setData() {
                state.country = $(state.countryBind + ' option:selected').val();
                setRegion();
            }

            function findFields( country ) {

                var args   = window.fieldsAccess;
                var fields = args[ 'fields' ][ 'default' ];

                $.each(args['countries'], function(k,v) {
                    if( in_array( v, country ) ) {
                        fields = args[ 'fields' ][ k ];
                    }
                });

                return fields;
            }

            function renderfindFields(country){
                var fileds       = findFields(country),
                    $stateSelect = $('#js-billing_cart-stateSelect'),
                    $stateText   = $('#js-billing_cart-stateText'),
                    $postalCode  = $('#billing_postal_code');

                var $box_state     = $stateText.parent();
                var $box_post_code = $postalCode.parent();

                if( ! fileds.state ) {
                    $stateSelect.attr('name','');
                    $stateText.attr('name','state').val('None');
                    $box_state.addClass('box-hidden')
                } else {

                    if( $stateText.val() === 'None' )
                        $stateText.val('');

                    $box_state.removeClass('box-hidden');
                    $box_state.find('label').text(fileds.state);
                }

                if( ! fileds.postal_code ) {
                    $postalCode.val('None');
                    $box_post_code.addClass('box-hidden')
                } else {

                    if( $postalCode.val() === 'None' )
                        $postalCode.val('');

                    $box_post_code.removeClass('box-hidden');
                    $box_post_code.find('label[for="postal_code"]').text(fileds.postal_code);
                }
            }

            return {
                init: function () {
                    $this = this;

                    var $d = $(document);

                    $('.js-billing_country-stateSelect').selectpicker('destroy');
                    $('#js-billing_cart-stateSelect').selectpicker('destroy');

                    if(window.navigator.userAgent.indexOf("Edge") > -1){
                        if ($('#js-billing_cart-stateSelect option').length > 20){
                            $('#js-billing_cart-stateSelect').data('live-search', 'true');
                        }

                        $('#js-billing_cart-stateSelect').selectpicker({size: 'auto', enableCaseInsensitiveFiltering: true});

                        $d.find(state.countryBind).each(function (e) {
                            if ($(this).find('option').length > 20)
                                $(this).data('live-search', 'true');
                        }).selectpicker({size: 'auto', enableCaseInsensitiveFiltering: true});
                    }else{
                        $d.find(state.countryBind).each(function (e) {
                            if ($(this).find('option').length > 20)
                                $(this).data('live-search', 'true');
                        }).selectpicker({enableCaseInsensitiveFiltering: true});
                    }

                    state.country = $(state.countryBind + ' option:selected').val();

                    setData();

                    $(state.countryBind).on('change', function () {
                        setData();
                    });
                }
            };
        })();

        billing_selectRegion.init();

        $('#enabled_billing_address').on('change', function () {
            if(!$(this).prop('checked'))
                $('.box_billing_address').fadeIn();
            else
                $('.box_billing_address').fadeOut();
        });

        var observe;

        if (window.attachEvent) {
            observe = function (element, event, handler) {
                element.attachEvent('on' + event, handler);
            };
        } else {
            observe = function (element, event, handler) {
                element.addEventListener(event, handler, false);
            };
        }

        (function () {
            var text = document.getElementById('description');

            function resize() {
                text.style.height = 'auto';
                text.style.height = text.scrollHeight + 'px';
            }

            /* 0-timeout to get the already changed text */
            function delayedResize() {
                window.setTimeout(resize, 0);
            }

            observe(text, 'change', resize);
            observe(text, 'cut', delayedResize);
            observe(text, 'paste', delayedResize);
            observe(text, 'drop', delayedResize);
            observe(text, 'keydown', delayedResize);

            //text.focus();
            //text.select();
            resize();
        })();

        var payments = (function () {
            var $this;
            return {
                init: function () {
                    $this = this;
                    $('.payment-box .payment-item-radio').on('click', function () {
                        var payments = $('input[type="radio"]', this).prop('checked', true).val();
                        $this.activeTab(payments);
                    });

                    var payments = $('input[type="radio"]:checked', '.payment-box .payment-item-radio').val();
                    $this.activeTab(payments);
                },
                activeTab: function (payments) {
                    if ($('.payment-fields.' + payments + ':hidden').length) {
                        $('.payment-fields').hide(200);
                        $('.payment-fields.' + payments).slideDown(300);
                    }
                }
            }
        })();

        payments.init();

        $('.mobile-summary').on('click', function () {
            $('.mobile-summary').toggleClass('show');
        });


        $('.get_discount_field').on('click', 'a', function () {
            $('.box-discount').toggleClass('discount_disabled');
        });







/*        $(document).ready(function () {
            if(!$('.order').length ){
                return;
            }

            function r() {
                var obj = {
                    rh: $('.order').height(),
                    rleft: $('.order').offset().left,
                    lh: $('.inner-step').height(),
                    lleft: $('.inner-step').offset().left,
                    w: $(window).scrollTop()
                };

                if ($(window).height() > obj.lh && obj.lh < obj.rh && obj.rleft > obj.lleft) {
                    var h = obj.w - 68;
                    h = h > 0 ? h : 0;
                    $('.inner-step').css({top: h});
                } else {
                    $('.inner-step').css({top: 0});
                }
            }

            $(window).scroll(function () {
                r();
            });
            $(window).resize(function () {
                r();
            });
            r();
        });*/


        window.Notify = function ( text, style ,callback, close_callback ) {

            var time       = '10000';
            var $container = $( '#ads-notify' );
            var icon       = '<i class="fa fa-info-circle"></i>';

            if ( typeof style === 'undefined' ) style = 'warning';

            var html = $( '<div class="alert alert-' + style + '  hide">' + icon + " " + text + '</div>' );

            $( '<a>', {
                text  : '×',
                class : 'notify-close',
                href  : '#',
                click : function ( e ) {
                    e.preventDefault();
                    close_callback && close_callback();
                    remove_notice()
                }
            } ).prependTo( html );

            $container.prepend( html ).show();

            html.removeClass( 'hide' ).hide().fadeIn( 'slow' );

            function remove_notice() {
                $container.fadeOut( 'slow' );
                html.stop().fadeOut( 'slow' ).remove();
            }

            var timer = setInterval( remove_notice, time );

            $( html ).hover( function () {
                clearInterval( timer );
            }, function () {
                timer = setInterval( remove_notice, time );
            } );

            html.on( 'click', function () {
                clearInterval( timer );
                callback && callback();
                remove_notice();
            } );
        };

        var ads_notify = $('#ads-notify');
        if(ads_notify.length && ads_notify.text()){
            var text = ads_notify.text();
            ads_notify.text('');
            window.Notify(text, 'danger');
        }

    }


    function check_countdown(dateEnd) {
        var timer, days, hours, minutes, seconds;

        dateEnd = new Date(dateEnd);
        dateEnd = dateEnd.getTime();

        if ( isNaN(dateEnd) ) {
            return;
        }

        timer = setInterval(calculate, 1000);

        function calculate() {
            var dateStart = new Date();
            var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

            if ( timeRemaining >= 0 ) {
                days    = parseInt(timeRemaining / 86400);
                timeRemaining   = (timeRemaining % 86400);
                hours   = parseInt(timeRemaining / 3600);
                timeRemaining   = (timeRemaining % 3600);
                minutes = parseInt(timeRemaining / 60);
                timeRemaining   = (timeRemaining % 60);
                seconds = parseInt(timeRemaining);

                $('.hurry-plate span').html(("0" + minutes).slice(-2)+':'+("0" + seconds).slice(-2))
            } else {
                return;
            }
        }
    }

    check_countdown(Date.now() + 15*60000);


});
