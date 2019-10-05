(function () {
    var $this;

    var obj = {
        addProductBtn: '#js-add-product',
        targetValue: '#js-applyto',
        tmpl: {
            list : '#ads-tmpl-blog-product',
            target : {
                list: '#panel-product-list',
            }
        }
    };

    function getApply(){
        var targetValue = $(obj.targetValue).val();
        return targetValue ? targetValue.split(','): [];
    }

    function selectProduct() {
        $( obj.addProductBtn ).selectProductsAds(function(data){

            var post_ids = data.join(',');

            $(obj.targetValue).val(post_ids);

            $this.save();

        }, { list : getApply });
    }

    return {

        request: function (action, args, callback) {

            args = args !== '' && args instanceof jQuery ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: {
                    action: 'ads_actions',
                    ads_controller: 'adsBlog',
                    ads_action: action,
                    args: args
                },
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        },

        lists: function () {

            $this.request('list', {
                post_id : $('[name="post_ID"]').val(),
            }, $this.listRender);
        },

        listRender: function (response) {

            var tmpl = $(obj.tmpl.list).html(),
                target = $(obj.tmpl.target.list);

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {
                    console.log(target);
                    console.log(response);
                    if(!window.ADS){
                        setTimeout(function () {
                            target.html(window.ADS.objTotmpl(tmpl, response));
                            selectProduct();
                        }, 3000);
                    }else{
                        target.html(window.ADS.objTotmpl(tmpl, response));
                        selectProduct();
                    }


                }
            }
        },

        save: function(){
            $this.request('save', {
                post_id : $('[name="post_ID"]').val(),
                list : $('#panel-product-list #js-applyto').val(),
            }, $this.listRender);
        },
        delete: function($id){
            $this.request('delete', {
                post_id : $('[name="post_ID"]').val(),
                item_id : $id
            }, $this.listRender);
        },
        events : function(){
            $('body').on('click', '.js-delete', function (e) {
               var post_id = $(this).closest('.product-item').find('[name="item_id"]').val();
                window.ADS.btnLock($(this));
               $this.delete(post_id);
               return false;
            });
        },

        init: function () {
            if ($this) return;
            $this = this;

            this.lists();

            this.events();

        }
    }
})().init();