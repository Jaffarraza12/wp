

(function ($) {
    var $this = null;
    
    var timerId = null;

    var obj = {
        active : false,
        posts: 0,
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
            $('.search_items').show();
            $('.search_form').addClass('have_results');
        }else{
            $('.search_items').hide();
            $('.search_form').removeClass('have_results');
        }
    }
    

    function render() {
        renderActive();

        if(!obj.active){
            return;
        }
        $( '.search_items' ).html( objTotmpl( template, obj ) );
        if(!obj.posts.length){
            $('.search_items').hide();
            $('.search_form').removeClass('have_results');
        }

    }

    function search(q) {

        obj.q = q;

        $.ajax({
            url      : '/wp-admin/admin-ajax.php',
            type     : "POST",
            dataType : "json",
            async    : true,
            data     : {
                action  : 'ads_search_post_blog',
                q : q
            },
            success  : function (resp) {
                obj.posts = resp.posts;

                render();
            }
        });
    }

    function events() {
        $('.js-posts-search-input').on('keyup', function () {
            clearTimeout(timerId);

            var q = $(this).val();

            if(q.length < 2){
                return;
            }

            timerId = setTimeout(function () {
                obj.active = true;
                search(q);
            }, 300);
        });

        $(document).on('click', function (e) {
            if($(e).closest('.search_items').length){
                return;
            }
            obj.active = false;
            render();
        });
    }

    function addTemplate() {
        template = $('#tmpl-search_items').html();

    }

    return {
        start: function () {
            if($this)return;
            $this = this;
            if(!$('.js-posts-search-input').length){
                return;
            }

            addTemplate();
            events();

            return this;
        }
    }
})(jQuery).start();