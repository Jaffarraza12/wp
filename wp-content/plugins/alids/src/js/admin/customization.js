jQuery( function($) {

    window.adstm_customization = (function(){
        var $this,
            obj = {
                action_request : ''
            };

        function mainRequest( $el ) {

            var th     = $el,
                tmpl   = $( th.data('adstm_template') ).html(),
                action = th.data('adstm_action'),
                action_request = th.data('adstm_request'),
                data   = [],
                fields = $el.find('.ads-field');

            action_request = action_request || obj.action_request;

            if(!action_request || !action){
                return;
            }

            if( typeof fields !== 'undefined' ) {
                data = $this.serialize(th);
            }

            $.ajax({
                url: ajaxurl,
                data: { action: action_request, ads_action: action, args: data },
                type: "POST",
                dataType: 'json',
                success: function ( response ) {

                    if( response ) {

                        if( response.hasOwnProperty( 'error' ) ) {
                            window.ADS.notify( response.error, 'danger' );
                        } else {
                            th.html( window.ADS.objTotmpl( tmpl, response ) );
                            setTimeout( window.ADS.switchery( th ), 300 );
                            $('.icp-auto').iconpicker({
                                hideOnSelect: true,
                                icons: ['fa-phone','fa-phone-square',
									'fa-address-book',
									'fa-address-book-o',
									'fa-address-card-o',
									'fa-envelope-open',
									'fa-envelope-open-o',
									'fa-user-circle', 'fa-user-circle-o', 'fa-user-o', 'fa-vcard', 'fa-at'
								]
                            });
                            $('[data-toggle="tooltip"]').tooltip();

                            selectProduct.init(th);

                            $.event.trigger( {
                                type : "request:done",
                                obj  : th[0]
                            } );
                        }
                    }
                }
            });
        }

        return {
            init: function(){
                $this =  this;

				/*all page active btn*/
                $('button[form="custom_form"]').on('click',function ( e ) {

						e.preventDefault();

						var name = $(this).attr('name');

						$.ajaxQueue({
							url: ajaxurl,
							data: { action: obj.action_request, ads_action: 'form', active_btn : name, args: $this.serialize( $('#custom_form') ) },
							type: "POST",
							dataType: 'json',
							success: function ( response ) {

								if( typeof response.error !== 'undefined' ) {
									window.ADS.notify( response.error, 'danger' );
								} else {
									window.ADS.notify( response.message, 'success' );
									$('[data-adstm_template]').each(function(){
										mainRequest( $(this) );
									});
								}
							}
						});
					return false;
				});

                /*panel active btn*/
				$(document).on('click', 'button', function(e){

					var th = $(this).parents('.panel').find('[data-adstm_action]');

					if( $(this).hasClass('ads-button') && typeof th !== 'undefined' ) {

						e.preventDefault();

						var action = th.data('adstm_action'),
						    name = $(this).attr('name');

						var action_request = th.data('adstm_request');
							action_request = action_request || obj.action_request;

						$.ajaxQueue({
							url: ajaxurl,
							data: { action: action_request, ads_action: action, active_btn : name, args: $this.serialize( th ) },
							type: "POST",
							dataType: 'json',
							success: function ( response ) {

								if( typeof response.error !== 'undefined' ) {
									window.ADS.notify( response.error, 'danger' );
								} else {
									window.ADS.notify( response.message, 'success' );

									mainRequest( th );

									if( th.data('ads_update') ) {
										mainRequest( $(th.data('ads_update')) );
									}

									if( th.data('ads_reload') ) {
										var reload = th.data('ads_reload');
										if( typeof reload !== 'undefined' ){
											location.reload();
										}
									}
								}

							}
						});
					}
				});

				$('body').on('click', '.js-adstm-delete', function () {
					$(this).closest('.panel').remove();
                });

                return $this;
            },
            render: function () {
                $( '[data-adstm_action]' ).each(function(){
                    mainRequest( $(this) );
                });
                return $this;
            },
            setAction_request: function(action_request){
                obj.action_request = action_request;
                return $this;
            },
			serialize: function($el){

				var	serialized = $el.
					find('input[name],select[name],textarea[name]').not('input[type=\'checkbox\']').serialize();

				var che = '';
				$el.find( "input[type='checkbox']" ).each(function ( i,e ) {

					var value = $(this).prop( "checked" ) ? 1 : 0;
					che +='&'+$(this).attr('name')+'='+ value;
				});

				return serialized+che;
			}
        }

    })().init().setAction_request('adstm_customization_request').render();

});

var selectProduct = (function () {
	var $this;

	var obj = {
		$panel : null,
		root: '.js-ads-select-product',
		addProductBtn: '.js-ads-select-product-btn',
		targetValue: '.js-ads-select-product-params',
		tmpl: {
			list : '#ads-tmpl-select-product-box',
			target : {
				list: '.ads-select-product-list',
			}
		}
	};

	function getApply(e){

		var $root = $(e).closest( obj.root );
		var targetValue = $root.find(obj.targetValue).val();
		return targetValue ? targetValue.split(','): [];
	}

	function selectProduct($root) {

		$( obj.addProductBtn, $root ).selectProductsAds(function(data, e){

			var post_ids = data.join(',');

			var $root = $(e).closest( obj.root );

			$root.find(obj.targetValue).val(post_ids);

			$this.lists();

		}, { list : getApply });
	}

	return {

		request: function (action, args, callback) {

			args = args !== '' && args instanceof jQuery ? window.ADS.serialize(args) : args;

			$.ajaxQueue({
				url: ajaxurl,
				data: {
					action: 'ads_actions',
					ads_controller: 'adsSelectProduct',
					ads_action: action,
					args: args
				},
				type: 'POST',
				dataType: 'json',
				success: callback
			});
		},

		lists: function () {

			$('.js-ads-select-product-params', obj.$panel).each(function () {
				var $root = $(this).closest(obj.root);
				$this.request('list', {
					list : $(this).val(),
				}, function (response) {
					$this.listRender(response, $root)
				});
			})

		},

		listRender: function (response, $root) {

			var tmpl = $(obj.tmpl.list).html(),
				target = $root.find(obj.tmpl.target.list);

			if (response) {

				if (response.hasOwnProperty('error')) {
					window.ADS.notify(response.error, 'danger');
				} else {
					console.log(target);
					console.log(response);

					target.html(window.ADS.objTotmpl(tmpl, response));
					selectProduct($root);
				}
			}
		},

		events : function(){
			$('body').on('click', '.js-product-select-delete', function (e) {
				var $row = $(this).closest('.product-item');
				var post_id = $row.find('[name="item_id"]').val();

				var $root = $row.closest( obj.root );
				var targetValue = $root.find(obj.targetValue).val();
				targetValue = targetValue ? targetValue.split(','): [];

				targetValue = targetValue.filter(function (v) {
					return v !== post_id;
				});

				$root.find(obj.targetValue).val(targetValue.join(','));

				$row.remove();
				return false;
			});
		},

		init: function (th) {

			if(!$(th).find(obj.root).length){
				return;
			}

			obj.$panel = th;

			$this = this;

			this.lists();

			this.events();

		}
	}
})();