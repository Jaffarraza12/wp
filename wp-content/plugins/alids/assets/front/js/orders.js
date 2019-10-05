jQuery(function($) {
    var accountOrders = (function() {
        var pagination = {
            total: $('#order-pagination').data('count'),
            perPage: $('#order-pagination').data('perpage'),
            current: $('#order-pagination').data('page'),
            link: $('#order-pagination').data('link')
        };

        var filter = {
            startDate : '',
            endDate   : '',
            status    : '',
            search    : ''
        };

        return {
            init: function() {
                if ($('.pagination-menu').length > 0) {
                    $('.pagination-menu').pagination({
                        items: parseInt(pagination.total),
                        itemsOnPage: parseInt(pagination.perPage),
                        currentPage: parseInt(pagination.current),
                        hrefTextPrefix: '#page-',
                        cssStyle: "light-theme",
                        prevText: '<<',
                        nextText: '>>',
                        onPageClick: function (pageNumber) {
                            var link = window.location.href;
                            if (/[?]/.test(link)) {
                                link += '&';
                            } else {
                                link += '?';
                            }

                            link = link.replace(/ads-page=\d/g, "");
                            link = link.replace(/#page-\d/g, "");
                            link = link.replace(/(&)(?=&)/g, "");
                            link += 'ads-page=' + pageNumber;
                            window.location.replace(link);
                        }
                    });
                }
                this.showTransaction();
                this.initDateRange();
                this.initFilterStatus();
                this.initFilterButton();
                this.initSearchField();
            },
            showTransaction: function() {
                $('.js-show-transaction').on('click', function(e) {
                    var action = $(this).hasClass('show-transaction2') ? 'show_transaction_products2' : 'show_transaction_products';
                    e.preventDefault();
                    e.stopPropagation();
                    var that = $(this);
                    var productTable = that.parents('.order-item').find('.products-table');

                    if (productTable.length > 0) {
                        that.removeClass('show-products');
                        productTable.remove();
                        return false;
                    }

                    that.prop('disabled', true).addClass('disabled').addClass('show-products');
                    $.ajax({
                        url      : alidAjax.ajaxurl,
                        type     : "POST",
                        dataType : "json",
                        data     : {
                            action : action,
                            id : that.data('transaction-id')
                        },
                        success  : function (xhr) {
                            that.prop('disabled', false).removeClass('disabled');
                            if (xhr.result) {
                                that.parents('.order-item ').append('<div class="row no-margin">' + xhr.html + '</div>');
                            }
                        }
                    });
                });
            },
            initDateRange: function() {
                var startDate = $('.filter-daterange').data('start');
                var endDate = $('.filter-daterange').data('end');
                var start = moment(startDate);
                var end = moment(endDate);

                filter.startDate = startDate;
                filter.endDate = endDate;

                $('.filter-daterange').daterangepicker({
                    locale: {
                        format: 'YYYY-MM-DD'
                    },
                    startDate: start,
                    endDate: end,
                    applyClass: '',
                    cancelClass: '',
                    showOtherMonths: true
                });

                $('.filter-daterange').on('apply.daterangepicker', function(ev, picker) {
                    filter.startDate = picker.startDate.format('YYYY-MM-DD');
                    filter.endDate = picker.endDate.format('YYYY-MM-DD');
                    $('.filter-daterange')
                        .find('span')
                        .html(picker.startDate.format('MMM D, YYYY') + ' - ' + picker.endDate.format('MMM D, YYYY'));
                }).on('cancel.daterangepicker', function(ev, picker) {
                    //$('#statisticDaterange').val('');
                });
            },
            initFilterStatus: function() {
                $('#js-order-statusSelect').on('change', function() {
                    filter.status = $(this).val();
                });
            },
            initFilterButton: function() {
                $('.filterButton').on('click', function() {
                    var filterForm = $(this).parents('form');
                    $.each(filter, function(index, value) {
                        if ($.inArray(index, ['startDate', 'endDate']) != -1) {
                            filterForm.append("<input type='hidden' name='" + index + "' value='" + value + "' />");
                        }
                    });
                    filterForm.submit();
                });
            },
            initSearchField: function() {
                $('input[name="search"]').on('keydown', function(e) {
                    var filterForm = $(this).parents('form');
                    if (e.which == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        $.each(filter, function(index, value) {
                            if ($.inArray(index, ['startDate', 'endDate']) != -1) {
                                filterForm.append("<input type='hidden' name='" + index + "' value='" + value + "' />");
                            }
                        });
                        filterForm.submit();
                    }
                });
            }
        }
    })();

    accountOrders.init();
});