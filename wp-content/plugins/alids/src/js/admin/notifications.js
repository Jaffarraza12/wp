jQuery(function ($) {

    /**
     * select service notifications*/
    $('#mailing_service_settings').on('change', '#service', function () {
        $('#mailing_service_settings').find('[name="save"]').click();
    });

    $(document).on('request:done', function (e) {
        tinymce.EditorManager.editors = [];

        if (!$(e.obj).find('[name="template"]').length) {
            return;
        }

        var arg = window.ADS.serialize($(e.obj));
        var row = $(e.obj).find('[name="template"]').closest('.form-group');
        var id = $(e.obj).find('[name="template"]').attr('id');
        $(e.obj).find('[name="template"]').remove();

        var init = tinyMCEPreInit.mceInit['template_0'];

        var dataNotify =  {
            full_name: 'full_name',
            address: 'address',
            orderNumber: 'orderNumber',
            time: 'time',
            city: 'city',
            postal_code: 'postal_code',
            state: 'state',
            country: 'country',
            quantity: 'quantity',
            price: 'price',
            save: 'save',
            shipping_price: 'shipping_price',
            total: 'total',
            orders: [
                {
                    title: 'title',
                    imageUrl: 'imageUrl',
                    total: 'total',
                    details: [
                        {
                            img: 'img',
                            prop_title: 'prop_title',
                            title: 'title'
                        }
                    ]
                }
            ],
            topSellingProducts: [
                {
                    thumb: 'thumb',
                    link: 'link',
                    title: 'title',
                    price: 'price',
                    salePrice: 'salePrice',
                },
                {
                    thumb: 'thumb',
                    link: 'link',
                    title: 'title',
                    price: 'price',
                    salePrice: 'salePrice',
                },
                {
                    thumb: 'thumb',
                    link: 'link',
                    title: 'title',
                    price: 'price',
                    salePrice: 'salePrice',
                },

            ]
        };

        $.ajaxQueue({
            url: ajaxurl,
            data: {action: 'ads_action_request', ads_action: 'tinymce', args: arg + '&id=' + id},
            type: "POST",
            dataType: 'json',
            success: function (response) {

                row.append(response.editor);
                tinymce.remove(e.obj + ' [id="' + id + '"]');
                tinymce.init({
                    selector: e.obj + ' [id="' + id + '"]',
                    wp_autoresize_on: true,
                    relative_urls: false,
                    remove_script_host: false,
                    convert_urls: false,
                    forced_root_block: '',
                    force_p_newlines: false,
                    force_br_newlines: false,
                    convert_newlines_to_brs: false,
                    remove_linebreaks: true,
                    menubar: false,
                    formats: init['formats'],
                    toolbar1: init['toolbar1'] + ',hb_tag',
                    toolbar2: init['toolbar2'],
                    plugins: init['plugins'],
                    preview_styles: init['preview_styles'],
                    resize: init['resize'],
                    theme: init['theme'],
                    wpeditimage_html5_captions: init['wpeditimage_html5_captions'],
                    wpautop: false,
                    skin: init['skin'],
                    wp_shortcut_labels: init['wp_shortcut_labels'],
                    setup: function (editor) {
                        editor.on('change', function () {
                            editor.save();

                            var box = $(e.obj).data('ads_preview');
                            if(box)
                                $(box).html(window.ADS.objTotmpl( editor.getContent(), dataNotify ));
                        });

                        editor.addButton('preview', {
                            icon: 'insertdatetime',
                            //image: 'http://p.yusukekamiyamane.com/icons/search/fugue/icons/calendar-blue.png',
                            tooltip: "preview",
                            onclick: function () {
                                var box = $(e.obj).data('ads_preview');
                                if(box){
                                    $(box).closest('.box-preview').show();
                                    $(box).html(window.ADS.objTotmpl( editor.getContent(), dataNotify ));
                                }

                            }
                        });


                        var menu_hb_tag = {
                            template_1 : [
                                {
                                    text: 'Orders',
                                    menu: [
                                        {text: '{{#each orders}}', onclick: function (evt) {editor.insertContent('{{#each orders}}');evt.preventDefault();}},
                                        {
                                            text: 'Details',
                                            menu: [
                                                {text: '{{#each details}}', onclick: function (evt) {editor.insertContent('{{#each details}}');evt.preventDefault();}},
                                                {text: '{{prop_title}}', onclick: function (evt) {editor.insertContent('{{prop_title}}');evt.preventDefault();}},
                                                {text: '{{title}}', onclick: function (evt) {editor.insertContent('{{title}}');evt.preventDefault();}},
                                                {text: '{{img}}', onclick: function (evt) {editor.insertContent('{{img}}');evt.preventDefault();}},
                                                {text: '{{/each}}', onclick: function (evt) {editor.insertContent('{{/each}}');evt.preventDefault();}},
                                            ]
                                        },
                                        {text: '{{permalink}}', onclick: function (evt) {editor.insertContent('{{permalink}}');evt.preventDefault();}},
                                        {text: '{{images}}', onclick: function (evt) {editor.insertContent('{{images}}');evt.preventDefault();}},
                                        {text: '{{title}}', onclick: function (evt) {editor.insertContent('{{title}}');evt.preventDefault();}},
                                        {text: '{{details}}', onclick: function (evt) {editor.insertContent('{{details}}');evt.preventDefault();}},
                                        {text: '{{quantity}}', onclick: function (evt) {editor.insertContent('{{quantity}}');evt.preventDefault();}},
                                        {text: '{{price}}', onclick: function (evt) {editor.insertContent('{{price}}');evt.preventDefault();}},
                                        {text: '{{/each}}', onclick: function (evt) {editor.insertContent('{{/each}}');evt.preventDefault();}},

                                    ]
                                },
                                {text: '{{full_name}}', onclick: function (evt) { editor.insertContent('{{full_name}}');}},
                                {text: '{{address}}', onclick: function (evt) { editor.insertContent('{{address}}');}},
                                {text: '{{city}}', onclick: function (evt) { editor.insertContent('{{city}}');}},
                                {text: '{{postal_code}}', onclick: function (evt) { editor.insertContent('{{postal_code}}');}},
                                {text: '{{state}}', onclick: function (evt) { editor.insertContent('{{state}}');}},
                                {text: '{{country}}', onclick: function (evt) { editor.insertContent('{{country}}');}},
                                {text: '{{orderNumber}}', onclick: function (evt) { editor.insertContent('{{orderNumber}}');}},
                                {text: '{{time}}', onclick: function (evt) { editor.insertContent('{{time}}');}},
                                {text: '{{quantity}}', onclick: function (evt) { editor.insertContent('{{quantity}}');}},
                                {text: '{{total}}', onclick: function (evt) { editor.insertContent('{{total}}');}},
                                {text: '{{price}}', onclick: function (evt) { editor.insertContent('{{price}}');}},
                                {text: '{{save}}', onclick: function (evt) { editor.insertContent('{{save}}');}},
                                {text: '{{shipping_price}}', onclick: function (evt) { editor.insertContent('{{shipping_price}}');}},
                            ],
                            template_2 : [
                                {text: '{{nameClient}}', onclick: function (evt) { editor.insertContent('{{nameClient}}');}},
                                {text: '{{email}}', onclick: function (evt) { editor.insertContent('{{email}}');}},
                                {text: '{{message}}', onclick: function (evt) { editor.insertContent('{{message}}');}},
                            ],
                            template_3 : [
                                {
                                    text: 'Orders',
                                    menu: [
                                        {text: '{{#each orders}}', onclick: function (evt) {editor.insertContent('{{#each orders}}');evt.preventDefault();}},
                                        {
                                            text: 'Details',
                                            menu: [
                                                {text: '{{#each details}}', onclick: function (evt) {editor.insertContent('{{#each details}}');evt.preventDefault();}},
                                                {text: '{{prop_title}}', onclick: function (evt) {editor.insertContent('{{prop_title}}');evt.preventDefault();}},
                                                {text: '{{title}}', onclick: function (evt) {editor.insertContent('{{title}}');evt.preventDefault();}},
                                                {text: '{{img}}', onclick: function (evt) {editor.insertContent('{{img}}');evt.preventDefault();}},
                                                {text: '{{/each}}', onclick: function (evt) {editor.insertContent('{{/each}}');evt.preventDefault();}},
                                            ]
                                        },
                                        {text: '{{permalink}}', onclick: function (evt) {editor.insertContent('{{permalink}}');evt.preventDefault();}},
                                        {text: '{{images}}', onclick: function (evt) {editor.insertContent('{{images}}');evt.preventDefault();}},
                                        {text: '{{title}}', onclick: function (evt) {editor.insertContent('{{title}}');evt.preventDefault();}},
                                        {text: '{{details}}', onclick: function (evt) {editor.insertContent('{{details}}');evt.preventDefault();}},
                                        {text: '{{quantity}}', onclick: function (evt) {editor.insertContent('{{quantity}}');evt.preventDefault();}},
                                        {text: '{{price}}', onclick: function (evt) {editor.insertContent('{{price}}');evt.preventDefault();}},
                                        {text: '{{tip}}', onclick: function (evt) {editor.insertContent('{{tip}}');evt.preventDefault();}},
                                        {text: '{{tipLink}}', onclick: function (evt) {editor.insertContent('{{tipLink}}');evt.preventDefault();}},
                                        {text: '{{delivery_date}}', onclick: function (evt) {editor.insertContent('{{delivery_date}}');evt.preventDefault();}},
                                        {text: '{{/each}}', onclick: function (evt) {editor.insertContent('{{/each}}');evt.preventDefault();}},

                                    ]
                                },
                                {text: '{{full_name}}', onclick: function (evt) { editor.insertContent('{{full_name}}');}},
                                {text: '{{orderNumber}}', onclick: function (evt) { editor.insertContent('{{orderNumber}}');}},
                                {text: '{{address}}', onclick: function (evt) { editor.insertContent('{{address}}');}},
                                {text: '{{city}}', onclick: function (evt) { editor.insertContent('{{city}}');}},
                                {text: '{{postal_code}}', onclick: function (evt) { editor.insertContent('{{postal_code}}');}},
                                {text: '{{state}}', onclick: function (evt) { editor.insertContent('{{state}}');}},
                                {text: '{{country}}', onclick: function (evt) { editor.insertContent('{{country}}');}},
                                {text: '{{orderNumber}}', onclick: function (evt) { editor.insertContent('{{orderNumber}}');}},
                                {text: '{{time}}', onclick: function (evt) { editor.insertContent('{{time}}');}},
                                {text: '{{quantity}}', onclick: function (evt) { editor.insertContent('{{quantity}}');}},
                                {text: '{{total}}', onclick: function (evt) { editor.insertContent('{{total}}');}},
                                {text: '{{price}}', onclick: function (evt) { editor.insertContent('{{price}}');}},
                                {text: '{{save}}', onclick: function (evt) { editor.insertContent('{{save}}');}},
                                {text: '{{shipping_price}}', onclick: function (evt) { editor.insertContent('{{shipping_price}}');}},
                            ]
                        };

                        editor.addButton('hb_tag', {
                            type: 'menubutton',
                            text: 'Available codes',
                            icon: false,
                            menu: menu_hb_tag[id]
                        });
                    },

                });

            }
        });

    });

    $('body').on('click', '.tag-list li span', function (e) {
        var tmp = $(this).text();

        if (tmp == '{{/each}}') {
            tmp = $(this).closest('span').parent('span').text();
        }

        tinymce.activeEditor.execCommand(
            'mceInsertContent',
            false,
            tmp
        );

        return false;
    });

});
