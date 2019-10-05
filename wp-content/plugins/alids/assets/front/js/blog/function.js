jQuery(function($){
    $(document).ready(function(){

        $(window).scroll(function(){
            if($(document).height() - $(document).scrollTop() - $(window).height() < $('.footer').outerHeight() + $('.footer').prev().outerHeight()){
                $('.upbutton').addClass('bottom').css('bottom', $('.footer').outerHeight() + $('.footer').prev().outerHeight() + $('.upbutton').height());
            }else{
                $('.upbutton').removeClass('bottom').css('bottom','20px');
            }
            if($(window).height()<=$(window).scrollTop()){
                $('.upbutton').fadeIn(300);
            }else{
                $('.upbutton').fadeOut(300);
            }
        });

        //up button click
        $('.upbutton').on('click',function() {
            $('html,body').animate({scrollTop: 0},1000);
        });

        $('.adapmenu').on('click',function() {
            $('body').addClass('adapopened');
            $('.blog_nav').fadeIn(500);
            $('.close_adapmenu').fadeIn(500).addClass('active');
        });

        $('.close_adapmenu').on('click',function() {
            $('body').removeClass('adapopened');
            $('.blog_nav').fadeOut(500);
            $('.close_adapmenu').fadeOut(500).removeClass('active');
        });

        $('.search_activator').on('click',function() {
            $('.search_form').slideDown(500);
            $(this).fadeOut(500);
            $('.js-posts-search-input').focus();
        });

        $('.scope2').on('click', function() {
            $(this).parents("form").submit();
        });

        $('.clearsearch').on('click',function() {
            var thisinput=$('.js-posts-search-input');
            if(!thisinput.val().length && document.body.clientWidth>767){
                $('.search_form').slideUp(500);
                thisinput.val('');
                $('.search_activator').fadeIn(500);
            }else{
                thisinput.val('').focus();
            }
            $('.search_items').hide();
            $('.search_form').removeClass('have_results');
        });





        //item
        if($('.related_posts').length){
            $('.related_posts .blog_item').addClass('item');
            if($('.related_posts .blog_item').length>1){
                var owlrels = $(".related_posts .owl-carousel");
                function owlrelsinit(){
                    owlrels.owlCarousel({
                        loop:false,
                        margin:0,
                        dots:false,
                        smartSpeed:700,
                        responsiveClass:true,
                        responsive:{
                            0:{
                                items:1,
                                nav:false,
                                dots:true
                            },
                            767:{
                                items:2,
                                nav:false,
                                dots:true,
                                margin:20
                            },
                            1290:{
                                items:4,
                                nav:false,
                                dots:false
                            }
                        }
                    });
                }

                if(document.body.clientWidth<768){
                    owlrelsinit();
                }

                $(window).resize(function(){
                    if(document.body.clientWidth>767){
                        owlrels.trigger('destroy.owl.carousel');
                    }else{
                        owlrelsinit();
                    }
                });
            }
        }

        if($('.blog_goods_cont').length){
            $('.blog_goods_cont .product-item').addClass('item');
            if($('.blog_goods_cont .product-item').length>1){
                var owlrecs = $(".blog_goods_cont .owl-carousel");
                function owlrecsinit(){
                    owlrecs.owlCarousel({
                        loop:false,
                        margin:0,
                        dots:false,
                        smartSpeed:700,
                        responsiveClass:true,
                        responsive:{
                            0:{
                                items:1,
                                nav:false,
                                dots:true
                            },
                            767:{
                                items:2,
                                nav:false,
                                dots:true,
                                margin:20
                            },
                            1290:{
                                items:4,
                                nav:false,
                                dots:false
                            }
                        }
                    });
                }

                if(document.body.clientWidth<768){
                    owlrecsinit();
                }

                $(window).resize(function(){
                    if(document.body.clientWidth>767){
                        owlrecs.trigger('destroy.owl.carousel');
                    }else{
                        owlrecsinit();
                    }
                });
            }
        }

        $('.load_more').click(function(){
            var data = {
                'action': 'loadmore',
                'query': true_posts,
                'page' : current_page
            };
            $.ajax({
                url:ajaxurl,
                data:data,
                type:'POST',
                success:function(data){
                    if( data ) {
                        $('.js-list_product').append(data);
                        current_page++;
                        if (current_page == max_pages) $(".load_more").hide();
                    } else {
                        $(".load_more").hide();
                    }
                }
            });
        });

        $('.load_more_search').click(function(){
            var data = {
                'action': 'loadmore_search',
                'query': true_posts,
                'page' : current_page,
                'search_query': search_query
            };
            $.ajax({
                url:ajaxurl,
                data:data,
                type:'POST',
                success:function(data){
                    if( data ) {
                        $('.js-list_product').append(data);
                        current_page++;
                        if (current_page == max_pages) $(".load_more").hide();
                    } else {
                        $(".load_more").hide();
                    }
                }
            });
        });

        //comments
        function showNotify(message, success) {
            window.toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-full-width",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            if (success) {
                window.toastr.success(message);
            } else {
                window.toastr.error(message);
            }
        }

        $('form.comment-form').submit( function(event) {
            event.preventDefault();
            event.stopPropagation();
            var $form = $(this);
            $.ajax({
                url: $form.attr('action'),
                type: "POST",
                data: $form.serialize(),
                success: function(xhr) {

                    $('#textarea_comm').val('');
                    $('#email_comm').val('');
                    $('#author_comm').val('');
                    showNotify('Message sent successful', true);

                },
                error: function(xhr) {
                    var buffer = $('<div>').append(xhr.responseText);
                    buffer.find('a').replaceWith('');
                    showNotify(buffer.find('p').text(), false);
                }
            });
        });









    });


    if($('.articleR_content').length){
        function fixheight(){
            if($('.articleL').height() < $('.articleR_content').height() && document.body.clientWidth>1289){
                $('.articleL').height($('.articleR_content').height());
            }else{
                $('.articleL').removeAttr('style');
            }
        }

        $(window).resize(function(){
            fixheight();
        });
        fixheight();
    }


    //no search results
    if($('.search_page_results').length){
        if(!$('.search_page_results').html().trim().length){
            function minheight(){
                if($('.subscribe_cont').length){
                    $('.header+.wrap').css('minHeight',$(window).height() - $('.header').outerHeight() - $('.footer').outerHeight() - $('.subscribe_cont').outerHeight());
                }else{
                    $('.header+.wrap').css('minHeight',$(window).height() - $('.header').outerHeight() - $('.footer').outerHeight());
                }


            }

            $(window).resize(function(){
                minheight();
            });
            minheight();
        }
    }


});











