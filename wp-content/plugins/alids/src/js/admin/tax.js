

jQuery( function ( $ ) {

    (function () {
        var $this;

        var obj = {
            currencyForm: '#p-tax-options',
            rateForm: '#p-tax-rate'
        };

        function toggleRender() {
            $('[data-toggle-box]').each(function () {
                var box = $(this);
                var manager = $('[name="'+box.attr('data-toggle-box')+'"]');
                box.toggle(manager.val() === box.attr('data-enable'));

                manager.one('change', function () {
                    toggleRender();
                });
            })
        }


        function renderState() {

            $('.js-tax_rate_custom select.js-select-state').each(function () {

                if(!$(this).find('option').length){
                    $(this).closest('.table-item').find('.js-select-state').hide()
                }else{
                    $(this).closest('.table-item').find('.js-input-state').hide()
                }
            });
        }
        
        return {
            renderTaxRate: function(response){
                window.ADS.notify( response.message, 'success' );
                window.ADS.mainRequest($('#p-tax-rate'));
            },
            request: window.ADS.request('adsTax'),
            init: function () {
                $this = this;
                $(document).on('request:done', function (e) {

                    if (e.obj === obj.currencyForm) {
                        toggleRender();
                        $this.initSortingStore();
                    }

                    if (e.obj === obj.rateForm) {
                        $this.initSorting();
                        renderState();
                        window.ADS.createJQPagination(  '#p-tax-rate', $('#p-tax-rate').find('[name="total"]').val(), $('#p-tax-rate').find('[name="page"]').val());
                    }
                });

                $('body').on('click', '.js-add-zip_code', function (e) {
                    var $root = $(this).closest('.table-item');
                    var id = $root.data('id');
                    var zip = $root.find('[name="tax_rate_custom[zip][]"]').val();

                    $('#changeZip').find('#tax_id').val(id);
                    $('#changeZip').find('#zip_code').val(zip);
                    $('#changeZip').modal('show');
                    e.preventDefault();

                });

                $('body').on('keyup keydown', '#zip_code', function (e) {
                    var text = $(this).val();
                    var result = text.replace(/\s/gm, ",");
                    result = result.replace(/\,+/gm, ",");
                    console.log(result);
                    $(this).val(result);
                });

                $('body').on('click', '#js-update_zip', function (e) {
                    var id = $('#changeZip').find('#tax_id').val();
                    var zip = $('#changeZip').find('#zip_code').val();

                    var $root = $('#p-tax-rate').find('.table-item[data-id="'+id+'"]');
                    $root.find('[name="tax_rate_custom[zip][]"]').val(zip);

                    $('#changeZip').modal('hide');
                    $('#p-tax-rate').find('[name="save"]').click();
                    e.preventDefault();

                });

                $('#p-tax-rate').on('pagination:click', function (e) {
                    $('#p-tax-rate').find('[name="page"]').val(e.page);
                    window.ADS.mainRequest($('#p-tax-rate'));
                });

                $('body').on('click', '.js-add-tax-rate-store', function (e) {
                    var tmpl = $('#ads-tmpl-tax_rate_store-row').html();

                    var id = 0;

                    if($('#p-tax-options .sortable-item').length){
                        id = $('#p-tax-options .sortable-item').last().attr('data-id');
                        id++;
                    }

                    $('.js-tax_rate_store .table-container').append(window.ADS.objTotmpl(tmpl, {
                        priority: id,
                        tax_rate: '',
                        name: ''
                    }));

                    $('.js-tax_rate_store .table-container .bootstrap-select').selectpicker();

                    return false;
                });

                $('body').on('click', '.js-tax_rate_store .js-remove', function (e) {
                    $(this).closest('.table-item').remove();
                    return false;
                });

                $('body').on('change', '.js-tax_rate_custom .js-select-state', function (e) {
                    var val = $(this).val();
                    $(this).closest('.table-item').find('.js-input-state').val(val);
                    return false;
                });

                $('body').on('change', '.js-tax_rate_custom .js-select-country', function (e) {
                    var $root = $(this).closest('.table-item');
                    var val = $(this).val();

                    $.ajax({
                        url: ajaxurl,
                        type: "POST",
                        dataType: "json",
                        async: true,
                        data: {
                            action: "ads_rg_list_tax",
                            country: val
                        },
                        success: function (data) {
                            var regionList = !$.isArray(data) ? data : false;

                            if(!regionList){
                                $root.find('.js-select-state').hide();
                                $root.find('.js-input-state').val('').show();
                                return;
                            }

                            var option = '';
                            var selected = 'selected';
                            var val = false;

                            for (var key in regionList) {

                                if(val === false){
                                    val = key;
                                }

                                option += '<option value="' + key + '" ' + selected + '>' + regionList[key] + '</option>';
                                selected = '';
                             }

                            $root.find('.js-input-state').val(val).hide();
                            $root.find('select.js-select-state').html(option).selectpicker('refresh');
                            $root.find('div.js-select-state').show();

                        }
                    });


                    return false;
                });

                $('body').on('click', '.js-add-tax-rate-custom', function (e) {
                    $('#p-tax-rate').find('[name="page"]').val(9999999999);
                    $this.request('add_tax_rate_customer', {}, $this.renderTaxRate);

                    return false;
                });

                $('body').on('click', '.js-tax_rate_custom .js-remove', function (e) {
                    $this.request('remove_tax_rate_customer', { id : $(this).closest('.table-item').attr('data-id')}, $this.renderTaxRate);
                    return false;
                });

                return this;
            },
            initSorting: function(){

                $(obj.rateForm).find(".table-container.sortable").sortable({
                    items:".sortable-item",
                    handle: ".js-sort",
                    update: function( event, ui ) {
                    }
                });
            },
            initSortingStore: function(){

                $(obj.currencyForm).find(".table-container.sortable").sortable({
                    items:".sortable-item",
                    handle: ".js-sort",
                    update: function( event, ui ) {
                    }
                });
            },
        };
    })().init();

});