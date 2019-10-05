jQuery(function($) {

    var obj = {
        tmpl : {
            list     : '#ali-list-template',
            activities : '#ali-activities-list',
            notfound : '#ali-list-notfound'
        },
        check : '#checkAll',
        p : {
            page : '#ads_page'
        },
        apply : {
            btn: '#bulk-apply',
            select: '#bulk-action'
        },
        item: {
            detailsTmpl: '#details-tmpl',
            detailsTarget: '#details',
            dataTmpl: '#activities-data-tmpl',
            dataTarget: '#activities-data',
            notfoundTmpl: '#activities-notfound',
        }

    };

    var Activities = {

        request: function (action, args, callback) {

            args = args !== '' && args instanceof jQuery ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_action_activities', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        },

        lists: function () {

            this.request('list', $('#params'), this.listRender);
        },

        listRender: function (response) {

            var tmpl = $(obj.tmpl.list).html(),
                target = $(obj.tmpl.activities);

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    if( response.items.length === 0 )
                        tmpl = $( obj.tmpl.notfound ).html();

                    target.html(window.ADS.objTotmpl(tmpl, response));
                    setTimeout(window.ADS.switchery(target), 300);

                    if( target.find('.pagination-menu').length )
                        window.ADS.createJQPagination( '#'+target.attr('id'), response.total, response.ads_page, $('#ads_count').val());
                }
            }
        },


        checker : function(){

            $(document).on('change', obj.check, function () {
                $(obj.tmpl.activities).find('[name="order_id"]').prop('checked', $(this).is(':checked'));
                $.uniform.update();
            });

            $(obj.tmpl.activities).on('click', '[name="order_id"]', function(){

                var u = $(obj.tmpl.activities).find('[name="order_id"]:not(:checked)');

                if( u.length && $(obj.check).prop( "checked" ) ){
                    $(obj.check).prop( "checked", false );
                } else if( u.length === 0 && ! $(obj.check).prop( "checked" )){
                    $(obj.check).prop( "checked", true );
                }
                $.uniform.update(obj.check);
            });
        },

        toTrashRender : function( response ) {
            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    window.ADS.notify(response.message, 'success');

                    Activities.lists();
                }
            }
        },

        toTrash : function( el ) {

            var id = el.closest('.item');

            if( $(obj.tmpl.activities).find('[name="id"]').length <= 1 )
                $(obj.p.page).val(1);

            this.request('to_trash', id, this.toTrashRender);
        },

        sendEmail : function( el ) {
            var id = el.data('id');
            this.request('send_email', {id : id}, this.toTrashRender);
        },


        handler: function () {

            var $this = this,
                $d = $(document);

            var pid = $('#params #post_id'),
                pID = $('[name="post_ID"]');
            if( pid.length && pid.val() === '' && pID.length && pID.val() !== '' )
                pid.val( pID.val() );

            $d.on('click', '#btn-clear', function(){

                var foo = { ads_page : 1, type : '', s : '', from : '', to : '' };

                $('#all-type').val('').change();

                $.each(foo, function(i, v){
                    $('#params').find('input[name="'+i+'"]').val(v);
                });

                $.event.trigger({ type : "datepicker:change" });

                $this.lists();

                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('click', '.js-to_trash', function(){
                $this.toTrash( $(this) );
            });

            $d.on('click', '.js-send-email', function(){
                $this.sendEmail( $(this) );
            });

            $d.on('click', '.js-empty_trash', function(e){
                e.preventDefault();
                $this.request('empty_trash', '', $this.toTrashRender);
            });

            $d.on('pagination:click', function (e) {
                $(obj.p.page).val(e.page);
                $this.lists();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('datepicker:update', function () {
                $(obj.p.page).val(1);
                $this.lists();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('click', '#btn-search', function (e) {

                e.preventDefault();

                var s = $('#search').val().trim();

                if( s.length > 0 ) {
                    $(obj.p.page).val(1);
                    $('#s').val( s );
                    $this.lists();
                    $.event.trigger({ type : "changedocinfo" });
                }
            });

            $d.on('change', '#all-type', function (e) {
                $('#type').val($(this).val());
                $('input[name="ads_page"]').val(1);
                $this.lists();
                $.event.trigger({ type : "changedocinfo" });
            });

            window.ADS.switchery( $('#action-box') );

            $('#all-type').val($('#type').val()).selectpicker('refresh');
        },

        bulk: function() {
        $('body').on('click', obj.apply.btn, function (e) {
            e.preventDefault();

            var value = $(obj.apply.select).val();

            var items = $(obj.tmpl.activities).find('[name="order_id"]:checked');
            var id = [];
            items.each(function (e, i) {
                id.push($(this).val());
            });
            switch (value) {
                case 'delete':
                    if( $(obj.tmpl.activities).find('[name="id"]').length <= items.length )
                        $(obj.p.page).val(1);
                    Activities.request('to_trash', {id : id}, Activities.toTrashRender);
                    break;
            }
            return false;
            })
        },

        renderDetails: function( response ) {

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    $(obj.item.detailsTarget).html(window.ADS.objTotmpl( $(obj.item.detailsTmpl).html(), response));
                    $(obj.item.dataTarget).html(window.ADS.objTotmpl( $(obj.item.dataTmpl).html(), response));

                }
            }else{
                $(obj.item.detailsTarget).html(window.ADS.objTotmpl( $(obj.item.notfoundTmpl).html(), {}));
            }
        },

        renderTrash: function () {
            window.location.href = $('#uri').val();
        },

        handlerItems: function () {
            $('body').on('click', '.js-to_trash-item', function () {
                var id = $('#activities_id').val();
                Activities.request('to_trash', {id : id}, Activities.renderTrash);
            });
        },

        details : function () {
            var id = $('#activities_id').val();

            Activities.request('details', {id: id} , Activities.renderDetails)
        },

        init: function () {

            if( $(obj.tmpl.activities).length ) {
                this.handler();
                this.bulk();
                this.checker();
                this.lists();
            } else if($(obj.item.notfoundTmpl).length){
                this.handlerItems();
                this.details();
            }
        }
    };

    Activities.init();
});


