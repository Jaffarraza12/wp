
jQuery(function($){

    $(document).ready(function(){


        if($('.recsside').length){
            $('.recsside').html($('.recsfull').html()).find('.swiper-wrapper').removeClass('swiper-wrapper');
        }

        if($('body').hasClass('js-items-lazy-load')){

            const LayzrAll = Layzr({
                normal: 'data-src'
            });
            LayzrAll
                .update()           // track initial elements
                .check()            // check initial elements
                .handlers(true);    // bind scroll and resize handlers
        }

        $('.scope').on('click',function() {
            $('.js-autocomplete-search').focus();
        });

        $('.scope2').on('mousedown',function() {
            $(this).parents('form').submit();
        });

        $('.clearsearch').on('click',function() {
            if(document.body.clientWidth<1290){
                var thisinput=$('.js-autocomplete-search');
                if(!thisinput.val().length){
                    $('.searchcont').fadeOut(300);
                    thisinput.val('');
                }else{
                    thisinput.val('').focus();
                }
                $('.ads-search-product').hide();
            }
        }).on('mousedown',function() {
            if(document.body.clientWidth>1289){
                var thisinput=$('.js-autocomplete-search');
                thisinput.val('').focus();
                $('.ads-search-product').hide();
            }
        });

        $('.sizelist').on('click','span',function() {
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active')
        });

        /*$('.sku-img').on('click','span.meta-item-img',function() {
            $('.sku-img a').fadeOut(300);
            if($(this).next('a').length==0){
                $(this).after('<a style="display:none;" data-lity href="'+$(this).find('img').data('img')+'"><i class="fas fa-search"></i></a>');
            }
            $(this).next().fadeIn(300);
        });*/

        $('.goldstars_set').on('click', 'span', function() {
            var that=$(this),thats=$(this).parent().find('span')
            thats.removeClass('star_full');
            thats.each(function(){
                if(thats.index($(this))<=thats.index(that)){
                    $(this).addClass('star_full');
                }
            });
        });

        //fix menu height
        function catnavheight(){
            if(document.body.clientWidth>1289){
                $('.categorynav').height($('.upheader .mainnav').height()+60);
            }else{
                $('.categorynav').height(0);
            }
        }

        if($('.catfilters').length){
            catnavheight();
            $(window).resize(function(){
                catnavheight();
            });
        }

        $('#tracking-form').on('submit',function () {
            return false;
        })


        if($('#clock').length){
            var clock = $('#clock');
            if (clock.length != 0 && clock.data('time').length != 0) {

                var timeend = clock.data('time');
                var template = $("#clock-template").html();
                clock.countdown(timeend).on('update.countdown', function (event) {
                    var $this = $(this).html(event.strftime(template));
                });
            }
        }

        $('.adapsearch .scope').on('click',function(){
            $('.searchcont').fadeIn(300);
            $('.searchcont input').focus();
        });

        if($('.errorcheck').length){
            $('.addReviewForm').on('submit',function () {
                if(!$('#terms').is(':checked')){
                    $('.errorcheck').show();
                    return false;
                }else{
                    $('.errorcheck').hide();
                }
            });
        }

        if($('.mainslider .swiper-wrapper').attr('data-auto')=='true' && $('.mainslider .swiper-wrapper').attr('data-time').length){
            mainslider = new Swiper('.mainslider .swiper-container', {
                slidesPerView: 1,
                loop: true,
                autoplay: {
                    delay: parseInt($('.mainslider .swiper-wrapper').attr('data-time')),
                },
                pagination: {
                    el: '.mainslider .swiper-pagination',
                    type: 'bullets',
                    clickable:true,
                },
            });
        }else{
            mainslider = new Swiper('.mainslider .swiper-container', {
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: '.mainslider .swiper-pagination',
                    type: 'bullets',
                    clickable:true,
                },
            });
        }


        if($('.itemadapslider .swiper-slide').length>1) {
            itemadapslider = new Swiper('.itemadapslider .swiper-container', {
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: '.itemadapslider .swiper-pagination',
                    type: 'bullets',
                    clickable:true,
                },
            });
        }

        //item
        if($('.recs').length){
            $('.recsfull .item-sp').addClass('swiper-slide');
            if($('.recsfull .item-sp').length>1){
                owlrecs='';
                function owlrecsinit(){
                    owlrecs = new Swiper('.recsfull', {
                        slidesPerView: 3,
                        loop: true,
                        spaceBetween: 20,
                        pagination: {
                            el: '.recsfull .swiper-pagination',
                            type: 'bullets',
                            clickable:true,
                        },
                        breakpoints: {
                            1290: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            767: {
                                slidesPerView: 1,
                            }
                        }
                    });
                }
                owlrecsinit();
                $(window).resize(function(){
                    setTimeout(function(){
                        owlrecs.destroy(true,true);
                        owlrecsinit();
                    },50)
                });
            }
        }

        //item
        if($('.recents').length){
            $('.recents .item-sp').addClass('swiper-slide');
            if($('.recents .item-sp').length>1){
                owlrecents='';
                function owlrecentsinit(){
                    owlrecents = new Swiper('.recents', {
                        slidesPerView: 4,
                        loop: false,


                        breakpoints: {
                            1290: {
                                slidesPerView: 4,
                                spaceBetween: 0,
                                pagination:false,
                            },
                            1280: {
                                slidesPerView: 3,
                                pagination: {
                                    el: '.recents .swiper-pagination',
                                    type: 'bullets',
                                    clickable:true,
                                },
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                pagination: {
                                    el: '.recents .swiper-pagination',
                                    type: 'bullets',
                                    clickable:true,
                                },
                                spaceBetween: 20,
                            },
                            767: {
                                slidesPerView: 1,
                                pagination: {
                                    el: '.recents .swiper-pagination',
                                    type: 'bullets',
                                    clickable:true,
                                },
                            }
                        }
                    });
                }
                owlrecentsinit();
                $(window).resize(function(){
                    setTimeout(function(){
                        owlrecents.destroy(true,true);
                        owlrecentsinit();
                    },50)
                });
            }
        }

        if($('.benscont_swiper').length){
            owlbens='';
            function owlbensinit(){
                owlbens = new Swiper('.benscont_swiper', {
                    slidesPerView: 5,
                    loop: false,
                    pagination: {
                        el: '.benscont_swiper .swiper-pagination',
                        type: 'bullets',
                        clickable:true,
                    },
                    breakpoints: {
                        1000: {
                            slidesPerView: 3,
                            slidesPerColumn: 2,
                            spaceBetween:30,

                        },
                        768: {
                            slidesPerView: 3,
                            slidesPerColumn: 2,
                            spaceBetween:30,
                        },
                        480: {
                            slidesPerView: 1,
                            slidesPerColumn: 1
                        }
                    }
                });
            }
            owlbensinit();
            $(window).resize(function(){
                setTimeout(function(){
                    owlbens.destroy(true,true);
                    owlbensinit();
                },50)
            });
        }

        //rating stars
        $('.goldstars_set').on('click', 'span', function() {
            var that=$(this),thats=$(this).parent().find('span')
            thats.removeClass('star_full');
            thats.each(function(){
                if(thats.index($(this))<=thats.index(that)){
                    $(this).addClass('star_full');
                }
            });
            $(this).parent().next().val(thats.index(that)+1);

        });

        //rating stars
        $('.nicelabel').on('change input', 'input,textarea,select', function() {
            if($(this).val().length){
                $(this).parent().addClass('is-not-empty').removeClass('is-empty');
            }else{
                $(this).parent().removeClass('is-not-empty').addClass('is-empty');
            }
        });

        //to reviews
        $('.toreview').on('click', function() {
            $('html,body').scrollTop($('.fullreviews').offset().top-30);
        });

        //readmore
        $('.adapmore').on('click', function() {
            $('p,table,ul,ol,img','.homearticle').slideDown();
            $(this).hide();
        });

        //footer accordion
        $('.footone').on('click','h5' ,function() {
            if(document.body.clientWidth<768){
                if(!$(this).parent().is('.footone_soc')){
                    $(this).next().slideToggle().parent().toggleClass('adapactive');
                }
            }
        });

        if($('.mainhome').length){
            $('body').addClass('homepage')
        }
        if($('.categorynav').length){
            $('body').addClass('categorypage')
        }

        //adapmenu
        $('.upheader').on('click','ul .arrright' ,function() {
            $(this).parent().toggleClass('opened');
            $(this).next().slideToggle(500);
        });

        $('.adapmainnav').on('click',function() {
            $(this).toggleClass('opened');
            $(this).next().slideToggle();
        });

        //adapmenu burger
        $('.adapmenu').on('click',function() {
            $('body').addClass('adapopened');
            $('.shade').fadeIn(500)
        });

        //adapmenu  close
        $('.closemenu').on('click',function() {
            $('body').removeClass('adapopened');
            $('.shade').fadeOut(500);
        });

        //adapmenu  close
        $('.shade').on('click',function() {
            $('body').removeClass('adapopened');
            $('.shade').fadeOut(500);
        });

        //fancy miniatures
        $(".revpics a").simpleLightbox();

        //lity for new wp gallery
        $(".content .gallery a").attr('data-lity','');

        //adap youtube video iframe to 16:9 rate
        if($('.youtubeadap').length){
            function youtubeadap(){
                $('.youtubeadap').each(function(){
                    $(this).css('height',$(this).width()*(9/16));
                });
            }
            $(window).resize(function(){
                youtubeadap();
            });
            youtubeadap();
        }

        //fotorama
        if($("#productSlider").length){
            fotoacted=0;
            function fotoswitch(){
                if(document.body.clientWidth>1290){
                    var fotorama = $("#productSlider.fotorama").fotorama({
                        minwidth:"100%",
                        height:"400px",
                        width:"100%",
                        maxwidth:"400px",
                        margin:0,
                        navwidth:364,
                        thumbmargin:10,
                        shadows:!0,
                        allowfullscreen:!0,
                        nav:"thumbs",
                        fit:"scaledown",
                        loop:!0,
                        thumbborderwidth:2,
                        thumbwidth:83,
                        thumbheight:83
                    }).data('fotorama');
                }else if(document.body.clientWidth>1024){
                    var fotorama = $("#productSlider.fotorama").fotorama({
                        minwidth:"100%",
                        height:"468px",
                        width:"100%",
                        maxwidth:"468px",
                        margin:0,
                        navwidth:322,
                        thumbmargin:15,
                        shadows:!0,
                        allowfullscreen:!0,
                        nav:"thumbs",
                        fit:"scaledown",
                        loop:!0,
                        thumbborderwidth:2,
                        thumbwidth:70,
                        thumbheight:70
                    }).data('fotorama');
                }else if(document.body.clientWidth>767){
                    var fotorama = $("#productSlider.fotorama").fotorama({
                        minwidth:"100%",
                        height:"384px",
                        width:"100%",
                        maxwidth:"384px",
                        margin:0,
                        navwidth:322,
                        thumbmargin:15,
                        shadows:!0,
                        allowfullscreen:!0,
                        nav:"thumbs",
                        fit:"scaledown",
                        loop:!0,
                        thumbborderwidth:2,
                        thumbwidth:70,
                        thumbheight:70
                    }).data('fotorama');
                }

                if(document.body.clientWidth>767){
                    if(!fotoacted){
                        fotoinit(fotorama);
                    }
                    fotoacted=1;
                }

            }
            fotoswitch();
            $(window).resize(function(){
                setTimeout(fotoswitch,100);

            });
            $(window).load(function () {
                if($("#productSlider").html()==""){
                    $('.meta-item-img.active img').trigger('click');
                }
            });

        }


        //up button fade
        $(window).scroll(function(){
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

        if($('.meta-item-img').length){
            $("body").on("click", function(e) {
                if (!$(e.target).closest(".sku-img").length) {
                    $('.sku-img a').fadeOut(300);
                }
            });
        }

        //category sort
        $( '.js-select_sort' ).on( 'change', function () {
            var url = jQuery( this ).val();
            if ( url ) {
                window.location = url;
            }
            return false;
        } );

//content tables
        $('.content table').each(function(){
            $(this).wrap('<div style="max-width:100%;overflow:auto;"></div>');
        });


        $('.tab-content').each(function(){
            if(!$(this).find('.show').length){
                $(this).find('.tab-pane:first').addClass('active show');
                $('[href="#'+$(this).find('.tab-pane:first').attr('id')+'"]').addClass('active show');
            }
        });

    });

    function fotoinit(fotorama){
        $("body").on("mouseup", ".fotorama--fullscreen .fotorama__stage__frame", function(e) {
            if(!$('.fotorama__grabbing').length){
                "IMG" !== e.target.nodeName && fotorama && fotorama.cancelFullScreen()
            }

        });


        $('.meta-item-img').on('click','img',function(){
            if(document.body.clientWidth>767){
                console.log(123);
                if(!$(this).is('.added')){
                    fotorama.unshift({img: $(this).attr('data-img'), thumb: $(this).attr('src')});
                    fotorama.show(0);
                }else{
                    fotorama.show($('.fotorama__nav__frame img[src*="'+$(this).attr('data-img')+'"]').parents('.fotorama__nav__frame').index('.fotorama__nav__frame'));
                }
                $(this).addClass('added');
            }
        });

    }

    $('.meta-item-img').on('click','img',function(){
        if(document.body.clientWidth<768){
            if(!$(this).is('.added')){
                itemadapslider.removeSlide(0);
                itemadapslider.prependSlide('<div class="swiper-slide"><img src="'+$(this).attr('data-img')+'" class="img-responsive" alt="" /></div>')

                itemadapslider.slideTo(1,0);
            }
        }
    });

    function scrollupdate(){
        $(window).scrollTop($(window).scrollTop()+1);
        $(window).scrollTop($(window).scrollTop()-1);
    }

    $(window).load(function(){
        scrollupdate();
    });


    $('.chart_modal').on('click',function(e){
        if (!$(e.target).closest('table').length) {
            $(this).fadeOut(500);
        }
    });

    $('.chart_close').on('click',function(e){
        $('.chart_modal').fadeOut(500);
    });

    $('.size_chart_btn').on('click',function(e){
        $('.chart_modal').fadeIn(500);
        return false;
    });

});