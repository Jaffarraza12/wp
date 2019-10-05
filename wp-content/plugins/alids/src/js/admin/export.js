jQuery( function ( $ ) {

   (function () {

       var $this = null;

        var $obj = {
            exportUrl : ''
        };

       function importSettings($input, types){

           types = types || [];

           var file = $input.prop('files');

           if(!file.length){
               console.log('not select file');
               return;
           }

           var fd = new FormData;

           fd.append('import', $input.prop('files')[0]);
           fd.append('action', 'ads_actions');
           fd.append('ads_action', 'import');
           fd.append('ads_controller', 'adsExport');

           types.map(function (i) {
               fd.append('types[]', i);
           });

           $.ajax({
               url: ajaxurl,
               data: fd,
               processData: false,
               contentType: false,
               type: 'POST',
               success: function (response) {
                   response = JSON.parse(response);
                   if (response) {
                       $input.val('');
                       if (response.hasOwnProperty('error')) {
                           window.ADS.notify(response.error, 'danger');
                       } else {
                           window.ADS.notify( response.message, 'success' );
                       }
                   }
               }
           });
       }

       function getBulkSelect() {

           var $items = $('#ads-export').find('.table-container .check-item:checked')
               .closest('.table-item');

           if(!$items.length){
               return false;
           }
           var types = [];

           $items.each(function () {
               types.push($(this).attr('data-row'))
           });

           return types;
       }

       function renderChecker() {

           var u = $('#ads-export').find('.table-container .check-item:not(:checked)');

           if (u.length && $('.all-check-item').prop("checked")) {
               $('.all-check-item').prop("checked", false);
           } else if (u.length === 0 && !$('.all-check-item').prop("checked")) {
               $('.all-check-item').prop("checked", true);
           }
           $.uniform.update('.all-check-item');
       }

        return {

            export: function(types){
                console.log(types);

                var params = types.map(function (i) {
                    return 'types[]='+i;
                });

                params = params.join('&');

                window.open($obj.exportUrl + '&' + params);
            },
            import: function(types){
                console.log(types);
            },
            init: function () {

                $this = this;

                $obj.exportUrl = $('.export-url').val();

                $('body').on('click', '#ads-export .table-item', renderChecker);

                $(document).on('change', '.all-check-item', function () {
                    $(this).closest('.table-container').find('.check-item').prop('checked', $(this).is(':checked'));
                    $.uniform.update();
                });

                $('body').on('click', '#bulk-apply', function (e) {
                    e.preventDefault();

                    var types = getBulkSelect();

                    if(!types){
                        window.ADS.notify($('.select-element-text').val());
                        return false;
                    }

                    var value = $('#bulk-action').val();

                    switch (value) {
                        case 'export':
                            $this.export(types);
                            break;
                        case 'import':
                            $this.import(types);
                            break;
                        case 'delete':
                    }
                    return false;

                });

                $('body').on('change', '#bulk-action', function () {
                    var value = $('#bulk-action').val();

                    if(value === 'import'){
                        $('.js-btn-bulk-import').show();
                        $('#bulk-apply').closest('.form-group').hide();
                    }else{
                        $('.js-btn-bulk-import').hide();
                        $('#bulk-apply').closest('.form-group').show();
                    }
                });

                $('body').on('change', '.js-btn-bulk-import .import-file', function () {

                    var types = getBulkSelect();

                    if(!types){
                        window.ADS.notify($('.select-element-text').val());
                        return false;
                    }

                    importSettings($(this), types );
                });

                $('body').on('change', '.table-container .import-file', function () {

                    var types = [$(this).closest('.table-item').attr('data-row')];
                    importSettings($(this), types );
                });

                $('body').on('click', '.btn-import', function () {
                    $(this).find('.import-file').click();
                });


                $('body').on('click', '.ads-import-settings', function () {
                    var $input = $(".import-file");

                    var file = $input.prop('files');

                    if(!file.length){
                        console.log('not select file');
                        return;
                    }

                    var fd = new FormData;

                    fd.append('import', $input.prop('files')[0]);
                    fd.append('action', 'ads_actions');
                    fd.append('ads_action', 'import');
                    fd.append('ads_controller', 'adsExport');
                    fd.append('types[]', 'tax');
                    fd.append('types[]', 'tax1');

                    $.ajax({
                        url: ajaxurl,
                        data: fd,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        success: function (response) {
                            response = JSON.parse(response);
                            if (response) {

                                if (response.hasOwnProperty('error')) {
                                    window.ADS.notify(response.error, 'danger');
                                } else {
                                    window.ADS.notify( response.message, 'success' );
                                }
                            }
                        }
                    });
                });

                return this;
            }
        };
    })().init();


});