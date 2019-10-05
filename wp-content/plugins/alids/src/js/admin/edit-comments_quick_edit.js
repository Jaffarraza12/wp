

var com = (function ($) {

    var $this;

    function datePick(date) {

        $('#select-comment-date').daterangepicker('remove');
        $('#select-comment-date').daterangepicker( {
                locale: {
                    format: 'YYYY-MM-DD HH:mm:ss'
                },
                autoApply: false,
                autoUpdateInput: true,
                singleDatePicker: true,
                startDate: date,
                //      endDate: $inputEnd.val(),
                timePicker: true,
                //   timePicker24Hour: true,
                opens: 'right',
                applyClass: 'btn-small bg-slate',
                cancelClass: 'btn-small btn-default'
            },
            function(start, end) {
                $('#select-comment-date').html(start.format('YYYY MM DD HH:mm:ss'));
                $('[name="aa"]').val(start.year());
                $('[name="mm"]').val(start.month()+1);
                $('[name="jj"]').val(start.date());
                $('[name="hh"]').val(start.hours());
                $('[name="mn"]').val(start.minutes());
                $('[name="ss"]').val(start.seconds());


            }
        );


    }

    return {
        request: function () {},
        init: function () {
            console.log(window.ADS);

            if($this){
                return this;
            }

            $this = this;

            this.request = window.ADS.request('adsReview');

            $this.request('html_field', {}, function (response) {
                $('.inline-edit-row').find('#edithead').append(response.html);
            });


            $('body').on('click', '[data-action="edit"][data-comment-id]', function () {
                var id = $(this).data('comment-id');
                $this.request('comment_info', {id : id}, function (response) {
                    $('[name="newcomment_flag"]').val(response.flag);
                    $('[name="select-newcomment_flag"]').val(response.flag);

                    $('.comments-quick-edit .flag').attr('class', 'flag flag-'+response.flag.toLocaleLowerCase());

                    $('#select-comment-date').html(response.date);
                    $('[name="hidden_aa"]').val(response.aa);
                    $('[name="aa"]').val(response.aa);
                    $('[name="hidden_mm"]').val(response.mm);
                    $('[name="mm"]').val(response.mm);
                    $('[name="hidden_jj"]').val(response.jj);
                    $('[name="jj"]').val(response.jj);
                    $('[name="hidden_hh"]').val(response.hh);
                    $('[name="hh"]').val(response.hh);
                    $('[name="hidden_ss"]').val(response.ss);
                    $('[name="ss"]').val(response.ss);
                    $('[name="hidden_mn"]').val(response.mn);
                    $('[name="mn"]').val(response.mn);

                    $('#set-rate-5').val(5);
                    $('#set-rate-4').val(4);
                    $('#set-rate-3').val(3);
                    $('#set-rate-2').val(2);
                    $('#set-rate-1').val(1);

                    $('[name="newcomment_star"]').val(response.star);

                    $('[name="_newcomment_star"]').prop('checked', false);
                    $('[name="_newcomment_star"][value="'+response.star+'"]').prop('checked', true);

                    datePick(response.date);
                });

            });

            $('body').on('change', '[name="select-newcomment_flag"]', function () {
                $('[name="newcomment_flag"]').val($(this).val());
                $('.comments-quick-edit .flag').attr('class', 'flag flag-'+$(this).val().toLocaleLowerCase());
            });

            $('body').on('change', '[name="_newcomment_star"]', function () {
                $('[name="newcomment_star"]').val($(this).val());
            });


        }
    }

})(jQuery);

var intervalIDCom = setInterval(function () {
    if(window.ADS){
        clearInterval(intervalIDCom);
        com.init();
    }
})