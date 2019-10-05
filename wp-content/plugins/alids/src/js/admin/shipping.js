

jQuery( function ( $ ) {

    (function () {
        var $this;

        function toggleRender() {
            if($('[name="free_enable_min_price"]:checked').length){
                $('#free_min_price').parent().show();

                setTimeout(function () {
                    if($('[name="free_enable_min_price"]').prop("checked")){
                        $('[name="free_enable"]').prop("checked", false);
                        $('[name="free_enable"]').click();
                    }
                }, 100)

            }else{
                $('#free_min_price').parent().hide()
            }

        }

        return {
            init: function () {
                $this = this;
                $(document).on('request:done', function (e) {
                    if (e.obj == '#ads_shipping-form') {
                        toggleRender();
                    }
                });

                $('body').on('change', '#free_enable_min_price', function () {
                    toggleRender();
                });

                $('body').on('change', '#free_enable', function () {
                    setTimeout(function () {
                        if(!$('[name="free_enable"]').prop("checked")){
                            $('[name="free_enable_min_price"]').prop("checked", true);
                            $('[name="free_enable_min_price"]').click();
                        }
                    }, 100);
                });

                return this;
            }
        };
    })().init();

});