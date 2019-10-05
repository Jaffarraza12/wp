(function($) {
    tinymce.PluginManager.add('edit_imager_js', function( editor, url ) {

        if(typeof window.editImages === 'undefined'){
            return;
        }

        function isPlaceholder( node ) {
            return !! ( editor.dom.getAttrib( node, 'data-mce-placeholder' ) || editor.dom.getAttrib( node, 'data-mce-object' ) );
        }

        editor.on( 'wptoolbar', function( event ) {
            if ( event.element.nodeName === 'IMG' && ! isPlaceholder( event.element ) && !editImages.isActive ) {
                window.editImages.params( event.element.src , 'content');
                var e = $('#wp-content-editor-container .mce-edit-area');
                var p = e.offset();
                var top = p.top + parseInt(e.css('padding-top'));
                window.editImages.render_edit_image(event.element, p.left, top)
            }else{
                if (typeof window.editImages != 'undefined') {
                    window.editImages.hide();
                }
            }
        } );

        $(document).on('imager:content', function (e) {
            $(window.editImages.$el).attr('src', e.url);
            $(window.editImages.$el).attr('data-mce-src', e.url);
        });

    });

})(jQuery);