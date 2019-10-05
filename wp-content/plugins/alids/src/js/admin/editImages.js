
jQuery(function ($) {

    window.editImages = (function () {

        var obj = {
            src: null,
            type: null,
            active: false,
            $el : null,
            bulk: []
        };

        function show() {
            $('#ads_image_toolbar').show();
        }

        function hide() {
            $('#ads_image_toolbar').hide();
        }

        function getBase64(src) {

            var fullSrc = getFullSrc(src);

            return new Promise(function (resolve) {

                if (getLocation(fullSrc).hostname === getLocation(window.location.href).hostname) {
                    resolve(fullSrc);
                    return;
                }

                return resolve(window.ADS.getBASE64(fullSrc));
            });
        }

        function getLocation(href) {
            var l = document.createElement("a");
            l.href = href;
            return l;
        };

        function getFullSrc(src) {
            return src ? src.replace(/_\d+x\d+\.jpe?g/, '').replace(/-\d+x\d+\./, '.') : src;
        }

        function render_edit_image($this, x,y) {

            x = x || 0;
            y = y || 0;

            if($this !== 'reload'){
                set_params_edit_image($this);
            }

            if ($this) {
                show();

                var o = $(obj.$el).offset();
                o.left += $(obj.$el).width() - $('#ads_image_toolbar').width();

                o.left += x;
                o.top += y;

                o.top = Math.round(o.top);

                $('#ads_image_toolbar').attr('class', obj.type).offset(o);
            } else {
                hide();
            }

        }

        function set_params_edit_image($this) {

            obj.$el = $this;

            if (obj.$el) {

                var src = $(obj.$el).attr('src');
                src = src ? src : $(obj.$el).data('src');

                obj.src = src;
            } else {
                obj.src = null;
            }

        }

        function isHover(event, $this) {

            if(!$this[0] || !event)return;

            var block = $this[0].getBoundingClientRect();

            var p = {
                left: block.x,
                top: block.y,
                right: block.x + block.width,
                bottom: block.y + block.height
            };

            return event.clientX >= p.left && event.clientX <= p.right && event.clientY >= p.top && event.clientY <= p.bottom;
        };

        function editorOpen() {

            new Promise(function (resolve, reject) {

                if (getLocation(getFullSrc(obj.src)).hostname !== getLocation(window.location.href).hostname) {
                    window.ADS.coverShow();
                    return window.ADS.getBASE64(obj.src).then(function (base64) {
                        window.ADS.coverHide();
                        resolve(base64);
                    }).catch(function () {
                        reject();
                    });
                }
                return resolve(getFullSrc(obj.src));

            }).then(function (base64) {
                imager(
                    base64, obj.bulk.length, function (base64, store) {

                        if(!base64){
                            active(false);
                            return;
                        }

                        var post_id = $('#post_ID').val();

                        if (!Array.isArray(base64)) {

                            window.ADS.attachmentImage64(base64, post_id).then(function (response) {

                                setTimeout(function () {
                                    active(false);
                                }, 500);

                                $.event.trigger({
                                    type: "imager:" + obj.type,
                                    src: obj.src,
                                    url: response.url,
                                    id: response.id
                                });

                                editImage(obj.type, {
                                    src: obj.src,
                                    url: response.url,
                                    id: response.id
                                });

                            }).catch(function () {
                                active(false);
                                window.ADS.coverHide();
                                window.ADS.notify('error: attachment image');
                            });

                            return;
                        }

                        var ops = [];

                        for (var i = 0; i < obj.bulk.length; i++) {

                            ops[ops.length] = new Promise(function (resolve, reject) {

                                var $img = $(obj.bulk[i]).find('.cover-image')

                                var src = $img.attr('src');

                                src = src ? src : $img.data('src');

                                getBase64(src)
                                    .then(function (fullSrc) {
                                        return new Promise(function (r) {
                                            imager.applyStore(fullSrc, store, r);
                                        });
                                    })
                                    .then(function (base64) {
                                        return window.ADS.attachmentImage64(base64, post_id);
                                    })
                                    .then(function (response) {

                                        $.event.trigger({
                                            type: "imager:" + obj.type,
                                            src: src,
                                            url: response.url,
                                            id: response.id
                                        });

                                        editImage(obj.type, {
                                            src: src,
                                            url: response.url,
                                            id: response.id
                                        }, $img);

                                        resolve(response);

                                    })
                                    .catch(function (err) {
                                        console.log('getBase64.catch', err);
                                        reject('error: attachment image');
                                    });

                            });
                        }

                        window.ADS.coverShow();

                        return Promise.all(ops)
                            .then(function (base64) {

                                setTimeout(function () {
                                    active(false);
                                    window.ADS.coverHide();
                                }, 500);

                            }, function (reason) {
                                active(false);
                                window.ADS.coverHide();
                                window.ADS.notify(reason);
                            });


                    });
            }).catch(function () {
                active(false);
                window.ADS.coverHide();
            });
        }

        function addToGallery(){
            var args ={
                url: obj.src,
                post_id: $('#post_ID').val()
            };
            $.ajaxQueue({
                url: ajaxurl,
                data: { action: 'ads_actions', ads_action: 'add_image_to_gallery', ads_controller: 'adsProduct', args: args },
                type: "POST",
                dataType: 'json',
                success: function ( response ) {

                    if (response.hasOwnProperty('error')) {
                        window.ADS.notify( response.error, 'danger' );
                    } else {
                        if(response.hasOwnProperty('message')) {

                            $('#ads-gallery').find('#ads-upload-image').before(window.ADS.objTotmpl($('#tmpl-item-media').html(), {value: response.image.id, url: response.image.url}));

                            window.ADS.notify( response.message, 'success' );
                        }
                    }
                }
            });
        }

        function addToDescription() {

            let editor = tinyMCE.get('content');

            if( editor !== null ) {
                editor.dom.add(editor.getBody(), 'img', {'src' : getFullSrc(obj.src) } );
            }
        }

        function editImage(type, data, $el) {

            var item;
            switch (type){
                case 'gallery':
                    item = $($el || obj.$el);
                    item.data('src', data.url);
                    item.attr('data-src', data.url);
                    item.css({'background-image': 'url(' + data.url + ')'});
                    item.closest('.inner-item').find('[name="gallery[]"]').val(data.id);
                    break;
                case 'variations':
                    item = $($el || obj.$el);
                    item.data('src', data.url);
                    item.attr('data-src', data.url);
                    item.css({'background-image': 'url(' + data.url + ')'});
                    item.closest('.row-sku').find('.js-img-value').val(data.id);
                    break;
                case 'featured':
                    item = $(".inside img", "#postimagediv");
                    item.attr('src', data.url);
                    item.removeAttr('srcset');
                    item.removeAttr('sizes');
                    item.closest("#postimagediv").find('#_thumbnail_id').val(data.id);
                    break;
            }
        }

        function active(val) {
            obj.active = val;

            obj.active ? window.ADS.coverShow() : window.ADS.coverHide();
        }

        return {
            init: function () {

                $('body').append('<div id="ads_image_toolbar">'+'' +
                    '<div id="add_to_gallery" class="ads-icon tips" title="Add to gallery">'+
                        '<img src="/wp-content/plugins/alids/src/images/icons/gallery.svg" alt=""/>'+
                    '</div>'+
                    '<div id="add_to_description" class="ads-icon tips" title="Copy image to the product\'s description">'+
                        '<img src="/wp-content/plugins/alids/src/images/icons/description.svg" alt=""/>'+
                    '</div>'+
                    '<div id="edit_image" class="ads-icon tips" title="Edit image">'+
                        '<img src="/wp-content/plugins/alids/src/images/icons/editor.svg" alt=""/>'+
                    '</div>'+
                '</div>');



                $('body').on('click', '#edit_image', function () {
                    if(typeof obj.src === 'undefined')return;
                    if(obj.active)return;
                    active(true);
                    editorOpen();
                });

                $('body').on('click', '#add_to_gallery', function () {
                    if(typeof obj.src === 'undefined')return;
                    if(obj.active)return;
                    addToGallery();
                });

                $('body').on('click', '#add_to_description', function () {
                    if(typeof obj.src === 'undefined')return;
                    if(obj.active)return;
                    addToDescription();
                });

                var mousemoveEvent = null;

                function setParamsEditImages(event) {

                   if($('.supports-drag-drop').is(':visible')){
                        return;
                    }

                    if(obj.active){
                        render_edit_image('reload');
                        return;
                    }
                    var hover = false;

                    $('#ads-gallery .cover-image', 'body').each(function () {

                        if (isHover(event, $(this))) {
                            hover = true;
                            obj.type = 'gallery';
                            obj.bulk = [];
                            render_edit_image(this)
                        }
                    });

                    $('.row-sku .cover-image:not(.no-img)', 'body').each(function () {

                        var $this = $(this);

                        var bulk = $this.closest('.list-sku')
                            .find('.row-sku')
                            .toArray();

                        if (isHover(event, $this)) {
                            hover = true;
                            obj.type = 'variations';
                            obj.bulk = bulk;
                            render_edit_image(this)
                        }
                    });

                    if (isHover(event, $('#set-post-thumbnail img'))) {
                        hover = true;
                        obj.type = 'featured';
                        obj.bulk = [];
                        render_edit_image('#set-post-thumbnail img')
                    }

                    if (isHover(event, $('.featured-custom'))) {
                        hover = true;
                        obj.type = 'featured';
                        obj.bulk = [];
                        render_edit_image('.featured-custom');
                    }

                    if (isHover(event, $('#edit_image'))) {
                        hover = true;
                    }



                    if (!hover && obj.type !=='content') {
                        render_edit_image(false);
                    }
                }

                $(window).mousemove(function(event){mousemoveEvent = event; setParamsEditImages(event)});
                $(window).scroll(function(){setParamsEditImages(mousemoveEvent)});

            },
            render_edit_image: function($el, left, top){
                render_edit_image($el, left, top);
            },
            params: function(src, type){
                obj.src = src;
                obj.type = type;
            },
            show: function () {
                show();
            },
            hide: function () {
                hide();
            },
            get isActive(){
                return obj.active;
            },
            get $el() {
                return obj.$el;
            }
        }

    })();
    window.editImages.init();

});
