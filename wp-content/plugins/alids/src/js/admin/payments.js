/**
 * Created by Vitaly on 07.07.2016.
 */
jQuery(function($){

    $( document ).on( 'change', '#type', function() {

        var t = $( this ).val();

        var th     = $( this ).parents( '.panel' ).find( '[data-ads_action]' ),
            action = 'ads_change_cc',
            target = $( th.data('ads_target') ),
            tmpl   = $( th.data('ads_template') ).html(),
            d      = 'type='+t;

        $.ajaxQueue( {
            url: ajaxurl,
            data: { action: 'ads_action_request', ads_action: action, args: d },
            type: "POST",
            dataType: 'json',
            success: function ( response ) {

                if( typeof response.error !== 'undefined' ) {
                    window.ADS.notify( response.error, 'danger' );
                } else {
                    window.ADS.notify( response.message, 'success' );

                    if( response.hasOwnProperty( 'error' ) ) {
                        window.ADS.notify( response.error, 'danger' );
                    } else {
                        target.html( window.ADS.objTotmpl( tmpl, response ) );
                        setTimeout( window.ADS.switchery( target ), 300 );

                        if( response.hasOwnProperty('type') )
                            typeFactory( response.type )
                    }
                }
            }
        } );
    });

    function typeFactory( type, response ) {

        if( type === 'stripe' ) {

            let s = $("#strong").attr("checked") !== 'checked';

            let sn = $('#showName').closest('.checkbox-switchery'),
                bn = $('#brand').closest('.form-group');

            if( ! s ) {
                sn.hide();
                bn.show();
            } else {
                sn.show();
                bn.hide();
            }
        }
    }

    $(document).on('change', '#strong', function () {

        typeFactory( $('#type').val() );
    });

    $(document).on('request:done', function (e) {

        if( e.response.hasOwnProperty('type') ) {
            typeFactory( e.response.type )
        }
    });

    function waitPP() {

        let el   = $('#old'),
            rest = $('#pp-rest'),
            nvp  = $('#pp-nvp');


        if( el.length ) {

            if( el.val() === '1' ) {
                rest.hide();
                nvp.show();
            } else {
                rest.show();
                nvp.hide();
            }

            el.on('change', function () {

                if( $(this).val() === '1' ) {
                    rest.hide();
                    nvp.show();
                } else {
                    rest.show();
                    nvp.hide();
                }
            });

            $(document).on('request:done', function (e) {
                if( e.response.hasOwnProperty( 'old' ) ) {
                    waitPP();
                }
            })
        } else { window.setTimeout( waitPP, 50 ); }
    }
    waitPP();
});