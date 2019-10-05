/**
 * Created by user on 13.06.2017.
 */
jQuery(function($){

    var InitImport = (function () {
        var $this, $body;

        var template = {
            alertBrowser   : $( '#tmpl-alertBrowser' ),
            alertExpansion : $( '#tmpl-alertExpansion' )
        };

        var obj = {
            form : $( '#ali-alert' )
        };

        return {

            init : function () {
                $this = this;
                $body = $( 'body' );

                $body.on( 'test:chrome', function ( e ) {
                    if ( !e.active ) {
                        $this.showAlertBrowser();
                    }
                } );

                $body.on( 'test:extensions:start', function ( e ) {
                    //ADS.coverShow();
                } );

                $body.on( 'test:extensions', function ( e ) {
                    console.log(e);
                    if ( e.active ) {
                    } else {
                        $this.showAlertExpansion();
                    }
                    //ADS.coverHide();
                } );

            },

            showAlertBrowser   : function () {
                var tmpl = template.alertBrowser.html();
                obj.form.html( tmpl );
            },
            showAlertExpansion : function () {
                var tmpl = template.alertExpansion.html();
                obj.form.html( tmpl );

            }
        }
    })();

    InitImport.init();
});
