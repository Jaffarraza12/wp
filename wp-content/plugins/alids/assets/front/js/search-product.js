

(function ($) {
    var $this = null;
    
    var timerId = null;

    var obj = {
        active : false,
        categories: [],
        products: [],
        count: 0,
        countShow: false,
        q: '',
    };

    var template = '';
    var name = '';

    var objTotmpl = function ( tmpl, data ) {
        if ( typeof Handlebars === 'undefined' ) {
            return false
        }
        var template = Handlebars.compile( tmpl );
        return template( data );
    };

    function renderActive() {
        if(obj.active){
            $('.ads-search-product').show();
            $('body').addClass('ads-search-product--open');
        }else{
            $('.ads-search-product').hide();
            $('body').removeClass('ads-search-product--open');
        }
    }
    

    function render() {
        renderActive();

        if(!obj.active){
            return;
        }

        $( '.ads-search-product' ).html( objTotmpl( template, obj ) );

    }

    function search(q,size="medium") {

        obj.q = q;

        $.ajax({
            url      : alidAjax.ajaxurl,
            type     : "POST",
            dataType : "json",
            async    : true,
            data     : {
                action  : 'ads_search_product',
                q : q,
                size : size
            },
            success  : function (resp) {
                obj.products = resp.products;
                obj.categories = resp.categories;
                obj.count = resp.count;
                obj.countShow = resp.countShow;

                render();
            }
        });
    }

    function events() {
        $('.js-autocomplete-search').on('keyup', function () {
            clearTimeout(timerId);

            var q = $(this).val();

            if(q.length < 2){
                return;
            }

            timerId = setTimeout(function () {
                obj.active = true;

                search(q,$('.js-autocomplete-search').attr('data-size'));
            }, 300);
        });

        $(document).on('click', function (e) {
            if($(e).closest('.ads-search-product').length){
                return;
            }
            obj.active = false;
            render();
        });
    }

    function addSearch() {
        $('.js-autocomplete-search').parent().append('<div class="ads-search-product" style="display: none"><div>');
    }

    function addTemplate() {
        $.ajax({
            url      : alidAjax.ajaxurl,
            type     : "POST",
            dataType : "json",
            async    : true,
            data     : {
                action  : 'ads_search_product_template',
            },
            success  : function (resp) {
                name = resp.name;
               $('body').addClass(name.toLowerCase());
                template = resp.template;
            }
        });
    }

    return {
        start: function () {
            if($this)return;
            $this = this;
            
            if(!$('.js-autocomplete-search').length){
                return;
            }

            addTemplate();
            addSearch();
            events();

            return this;
        }
    }
})(jQuery).start();