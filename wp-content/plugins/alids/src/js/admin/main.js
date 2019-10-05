/**
 * Created by user on 23.05.2017.
 */
jQuery( function ( $ ) {

    function base64ToBlob(base64, mime)
    {
        mime = mime || '';
        var sliceSize = 1024;
        var byteChars = window.atob(base64);
        var byteArrays = [];

        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: mime});
    }

	window.Base64 = {

		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		// public method for encoding
		encode : function ( input ) {

			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i      = 0;

            if(!input){
                return input;
            }

			input = window.Base64._utf8_encode( input );

			while ( i < input.length ) {

				chr1 = input.charCodeAt( i++ );
				chr2 = input.charCodeAt( i++ );
				chr3 = input.charCodeAt( i++ );

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if ( isNaN( chr2 ) ) {
					enc3 = enc4 = 64;
				} else if ( isNaN( chr3 ) ) {
					enc4 = 64;
				}

				output = output +
					this._keyStr.charAt( enc1 ) + this._keyStr.charAt( enc2 ) +
					this._keyStr.charAt( enc3 ) + this._keyStr.charAt( enc4 );

			}

			return output;
		},

		// public method for decoding
		decode : function ( input ) {

			if( typeof input === 'object' )
				return input;

			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i      = 0;

            if(!input){
                return input;
            }

			input = input.replace( /[^A-Za-z0-9\+\/\=]/g, "" );

			while ( i < input.length ) {

				enc1 = this._keyStr.indexOf( input.charAt( i++ ) );
				enc2 = this._keyStr.indexOf( input.charAt( i++ ) );
				enc3 = this._keyStr.indexOf( input.charAt( i++ ) );
				enc4 = this._keyStr.indexOf( input.charAt( i++ ) );

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode( chr1 );

				if ( enc3 !== 64 ) {
					output = output + String.fromCharCode( chr2 );
				}
				if ( enc4 !== 64 ) {
					output = output + String.fromCharCode( chr3 );
				}

			}

			output = Base64._utf8_decode( output );

			return output;

		},

		// private method for UTF-8 encoding
		_utf8_encode : function ( string ) {
			string      = string.replace( /\r\n/g, "\n" );
			var utftext = "";

			for ( var n = 0; n < string.length; n++ ) {

				var c = string.charCodeAt( n );

				if ( c < 128 ) {
					utftext += String.fromCharCode( c );
				}
				else if ( (c > 127) && (c < 2048) ) {
					utftext += String.fromCharCode( (c >> 6) | 192 );
					utftext += String.fromCharCode( (c & 63) | 128 );
				}
				else {
					utftext += String.fromCharCode( (c >> 12) | 224 );
					utftext += String.fromCharCode( ((c >> 6) & 63) | 128 );
					utftext += String.fromCharCode( (c & 63) | 128 );
				}

			}

			return utftext;
		},

		// private method for UTF-8 decoding
		_utf8_decode : function ( utftext ) {
			var string = '', i = 0, c = 0, c1 = 0, c2 = 0;

			while ( i < utftext.length ) {

				c = utftext.charCodeAt( i );

				if ( c < 128 ) {
					string += String.fromCharCode( c );
					i++;
				}
				else if ( (c > 191) && (c < 224) ) {
					c2 = utftext.charCodeAt( i + 1 );
					string += String.fromCharCode( ((c & 31) << 6) | (c2 & 63) );
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt( i + 1 );
					c1 = utftext.charCodeAt( i + 2 );
					string += String.fromCharCode( ((c & 15) << 12) | ((c2 & 63) << 6) | (c1 & 63) );
					i += 3;
				}

			}

			return string;
		}

	};


	var registerHelpersHandlebars = {
		init : function () {

			Handlebars.registerHelper( 'ifCond', function ( v1, operator, v2, options ) {

                switch ( operator ) {
					case '==':
						return (v1 == v2) ? options.fn( this ) : options.inverse( this );
					case '===':
						return (v1 === v2) ? options.fn( this ) : options.inverse( this );
					case '!=':
						return (v1 != v2) ? options.fn( this ) : options.inverse( this );
					case '!==':
						return (v1 !== v2) ? options.fn( this ) : options.inverse( this );
					case '<':
						return (v1 < v2) ? options.fn( this ) : options.inverse( this );
					case '<=':
						return (v1 <= v2) ? options.fn( this ) : options.inverse( this );
					case '>':
						return (v1 > v2) ? options.fn( this ) : options.inverse( this );
					case '>=':
						return (v1 >= v2) ? options.fn( this ) : options.inverse( this );
					case '&&':
						return (v1 && v2) ? options.fn( this ) : options.inverse( this );
					case '||':
						return (v1 || v2) ? options.fn( this ) : options.inverse( this );
					default:
						return options.inverse( this );
				}
			} );

			Handlebars.registerHelper( 'checkedIf', function ( condition ) {
				return condition === '1' || condition === 1 || condition === true ? 'checked' : '';
			} );

			Handlebars.registerHelper( 'ifIn', function ( elem, list, options ) {
                list = list ? list : [];
                if ( typeof list === 'object' ) {
					list = Object.values( list );
				}
				return list.includes( elem ) ? options.fn( this ) : options.inverse( this );
			} );

            Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
                lvalue = parseFloat(lvalue);
                rvalue = parseFloat(rvalue);

                return {
                    "+": lvalue + rvalue,
                    "-": lvalue - rvalue,
                    "*": lvalue * rvalue,
                    "/": lvalue / rvalue
                }[operator]});

            Handlebars.registerHelper('for', function(from, to, incr, block) {
                var accum = '';
                for(var i = from; i < to; i += incr)
                    accum += block.fn(i);
                return accum;
            });
		}
	};

	registerHelpersHandlebars.init();

	window.Notify = function ( text, callback, close_callback, style ) {

		var time       = '10000';
		var $container = $( '#ads-notify' );
		var icon       = '<i class="fa fa-info-circle"></i>';

		if ( typeof style === 'undefined' ) style = 'warning';

		var html = $( '<div class="alert alert-' + style + '  hide">' + icon + " " + text + '</div>' );

		$( '<a>', {
			text  : '×',
			class : 'notify-close',
			href  : '#',
			click : function ( e ) {
				e.preventDefault();
				close_callback && close_callback();
				remove_notice()
			}
		} ).prependTo( html );

		$container.prepend( html );

		html.removeClass( 'hide' ).hide().fadeIn( 'slow' );

		function remove_notice() {
			html.stop().fadeOut( 'slow' ).remove();
		}

		var timer = setInterval( remove_notice, time );

		$( html ).hover( function () {
			clearInterval( timer );
		}, function () {
			timer = setInterval( remove_notice, time );
		} );

		html.on( 'click', function () {
			clearInterval( timer );
			callback && callback();
			remove_notice();
		} );
	};

    window.DocInfo = (function(){

        var $this;

        var title    = document.title;
        var adminUrl = false;

        function getParameterByName(name, url) {

            name = name.replace(/[\[\]]/g, "\\$&");

            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);

            if (!results) return '';

            if (!results[2]) return '';

            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        function getLocation( href ) {

            var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

            return match && {
                href: href,
                protocol: match[1],
                host: match[2],
                hostname: match[3],
                port: match[4],
                pathname: match[5],
                search: match[6],
                hash: match[7]
            }
        }

        function parseUrl( href ) {

            var url  = getLocation( href );
            var page = getParameterByName( 'page', href );

            adminUrl = url.protocol+'//'+url.hostname+''+url.pathname;

            if( page !== '' ) {
                adminUrl += '?page='+page;
            }
        }

        function changeUrl (title, url){
            document.title = title;
            window.history.pushState({'pageTitle':title},'', url);
        }

        return {
            init: function(){
                $this = this;
                parseUrl( window.location.href );

                $(document).on('changedocinfo', function () {

                	setTimeout(function(){
                        var params = $('#params').find('input'); // todo #params id для div в котором скрытые поля
                        var search = '';
                        var pageTitle = '';

                        if( params.length ) {
                            params.each(function(){
                                var name = $(this).attr('name'),
                                    v = $(this).val();
                                if( name.length && v !== '' ) {
                                    search += '&'+name+'='+v;
                                    if( name === 'ads_page' ) //todo параметр для изменения при передаче постраничной пагинации
                                        pageTitle = 'Page '+v+' ‹ '+title;
                                }
                            });
                        }

                        var url = adminUrl +''+ search;

                        changeUrl (pageTitle, url);
					},50);
                });
            },
            getTitle : function () {
                return title;
            },
            getUrl : function () {
                return adminUrl;
            }
        };
    })();
    /**
     $.event.trigger( {
		type : "changedocinfo"
	 } );
     */
    window.DocInfo.init();

    var ADS = {

		tryJSON          : function ( data ) {
			try {
				var response = $.parseJSON( data );
			}
			catch ( e ) {
				return false;
			}

			return response;
		},
		b64EncodeUnicode : function ( str ) {
			return btoa(
				encodeURIComponent( str ).replace( /%([0-9A-F]{2})/g, function ( match, p1 ) {
					return String.fromCharCode( '0x' + p1 );
				} )
			);
		},
		cdata            : function ( str ) {

			str = str.replace( '/*<![CDATA[*/', '' );
			str = str.replace( '/*]]>*/', '' );

			return str;
		},

		objTotmpl : function ( tmpl, data ) {
			if ( typeof Handlebars === 'undefined' ) {
				console.log( 'Handlebars not registry' );
				return false
			}
			var template = Handlebars.compile( tmpl );
			return template( data );
		},

		serialize : function ( $el ) {
			var serialized = $el.serialize();
			if ( !serialized )
				serialized = $el.find( 'input[name],select[name],textarea[name]' ).serialize();
			return serialized;
		},
        scrollToNode: function (node, h , speed) {
			h = h || 0;
            speed = speed || 500;

            $(node).focus();
            var top = $(node).offset().top - h;
            $('body,html').stop().animate({
                scrollTop: top
            }, speed);
        },
		notify           : function ( message, type ) {
			window.Notify( message, null, null, type );
		},
		createPagination : function ( obj, total, current, perPage ) {

			perPage = typeof perPage !== 'undefined' ? perPage : 10;

			var $obj = $( obj ).find( '.pagination-menu' );

            $obj.pagination( {
				items       : parseInt( total ),
				itemsOnPage : parseInt( perPage ),
				currentPage : parseInt( current ),
				cssStyle    : "light-theme",
				prevText    : '<span class="fa fa-angle-left"></span>',
				nextText    : '<span class="fa fa-angle-right"></span>',

				onPageClick : function ( pageNumber ) {
/*
					$.event.trigger( {
						type : "pagination:click",
						obj  : obj,
						page : pageNumber
					} );*/

                    $( obj ).trigger( {
                        type : "pagination:click",
                        obj  : obj,
                        page : pageNumber
                    } );
				}
			} );
		},
		createJQPagination : function ( obj, total, current, count ) {

            count = count || 20;

			var $obj = $( obj ).find( '.pagination-menu' );

			total   = parseInt(total);
            current = parseInt(current);

            if( total > 0 )
                total = Math.ceil(total/count);

            var text = $obj.data('pagination-title');

            if( ! text ) {
            	text = 'Page {current_page} of {max_page}'
			}
            $obj
				.html( $('<a/>',{href:'#', class:'first'}).data('action', 'first').html( $('<i/>', {class:'fa fa-angle-double-left'}) ) )
				.append( $('<a/>',{href:'#', class:'previous'}).data('action', 'previous').html( $('<i/>', {class:'fa fa-angle-left'}) ) )
				.append( $('<input/>',{type:'text', readonly:'readonly'}).data('max-page',total) )
				.append( $('<a/>',{href:'#', class:'next'}).data('action', 'next').html( $('<i/>', {class:'fa fa-angle-right'}) ) )
				.append( $('<a/>',{href:'#', class:'last'}).data('action', 'last').html( $('<i/>', {class:'fa fa-angle-double-right'}) ) )
				.jqPagination({
                    page_string  : text,
                    link_string  : '#',
                    max_page     : total,
                    current_page : current,
					paged        : function( pageNumber ){
/*
                        $.event.trigger( {
							type : "pagination:click",
							obj  : obj,
							page : pageNumber
						} );*/

						$( obj ).trigger( {
							type : "pagination:click",
							obj  : obj,
							page : pageNumber
						} );
					}
				});
		},
		switchery        : function ( el ) {

			var elems = el.find( '.switchery' );

            $('[data-toggle="tooltip"]').tooltip();

			for ( var i = 0; i < elems.length; i++ ) {
				var switchery = new Switchery( elems[ i ] );
			}

			el.find( '.bootstrap-select' ).each( function () {

				if ( $( this ).find( 'option' ).length > 20 )
					$( this ).data( 'live-search', 'true' );

			} ).selectpicker();

			el.find( '.uniform-checkbox, .uniform-radio' ).uniform();

			el.find( '.multiselect-full-featured' ).multiselect( {
				includeSelectAllOption : true,
				enableFiltering        : true,
                enableCaseInsensitiveFiltering : true,
				templates              : {
					filter : '<li class="multiselect-item multiselect-filter"><i class="fa fa-search"></i> <input class="form-control" type="text"></li>'
				},
				onSelectAll            : function () {
					$.uniform.update();
				},
				onDeselectAll          : function () {
					$.uniform.update();
				},
                onChange : function( obj ) {
                },
                onInitialized : function (obj) {
                    var btn = obj.parent().find('button');

                    btn.attr( 'title', btn.attr('title').replace(/(\r\n|\n|\r|\t)/gm,"") );
                }
            } ).parent().find( '.multiselect-container input[type="checkbox"]' ).uniform();

			this.colorpicker( el );
			this.cropper( el );
			this.addMedia( el );

		},

		colorpicker : function ( $el ) {
			if(typeof $.fn.spectrum == 'undefined'){
				return;
			}

			$el.find( ".colorpicker" ).spectrum( {
				preferredFormat: "rgb",
				showInitial : true,
				showInput   : true,
				showAlpha   : true,
				allowEmpty  : true
			} );

		},
		initCrop : function ( e ) {
            if(typeof $.fn.cropper == 'undefined'){
                return;
            }

				var uploadedImageType = '';
				var height            = parseInt( $( e ).data( 'height' ) );
				var width             = parseInt( $( e ).data( 'width' ) );
				var options           = {
					aspectRatio : width / height,
					//dragMode: 'move',
					cropBoxResizable: false,
					zoomable: false,
					scalable: false,
					data        : {
						x      : 0,
						y      : 0,
						height : height,
						width  : width
					}
				};

				// Import image
				var $inputFileUrl = $( e ).find( '.file_url' );
				var $image      = $( e ).find( ".cropper" );
				var $self      = $( e );

				$image.cropper( options );

				$inputFileUrl.change( function () {
					if ( !$image.data( 'cropper' ) ) {
						return;
					}
					$image.cropper( 'destroy' ).attr( 'src', $(this).val() );//.cropper( options );

				} );
				$image.cropper("setDragMode", "move");

				$( e ).find('.crop_file').prop('disabled', false).show();

				function crop (images, p, zoomWidth, zoomHeight){
					var crop_canvas,
						left = p.left,
						top =  p.top,
						width = p.width,
						height = p.height;

					var img = new Image();

					img.src = $(images).attr('src');

					var cW = $(images).width();
					var cH = $(images).height();

					var kW = img.width/cW;
					var kH = img.height/cH;

                    crop_canvas = document.createElement('canvas');
                    crop_canvas.width = width*kW;
                    crop_canvas.height = height*kH;

                    var kHW = zoomWidth/width;
                    var kHH = zoomHeight/height;

                    crop_canvas.getContext('2d').drawImage(img, left*kW, top*kH, zoomWidth, zoomHeight, 0, 0, width*kW, height*kH);

					$('body').append(crop_canvas);
					return crop_canvas.toDataURL("image/png");
				}

				$( e ).find('.crop_file').on('click', function () {
					var _this = $(this);


					var data = _this.data();
					var result;

					_this.prop('disabled', true);

					if ($image.data('cropper')) {
						data = $.extend( {}, data ); // Clone a new one

                        if ( !data.option ) {
                            data.option = {};
                        }

						if ( uploadedImageType === 'image/jpeg' ) {
							data.option.fillColor = '#fff';
						}

                        result = $image.cropper( 'getCroppedCanvas', data.option );


						if ( result ) {

							var form_Data = new FormData();

							form_Data.append('action', 'ads_Media');
							form_Data.append('ads_action', 'save_image64');
							form_Data.append('file64', result.toDataURL( uploadedImageType ));
							form_Data.append('src', $self.find('.file_url').val());
							form_Data.append('crop_name', $self.find('.file_url').data('crop_name'));

							$.ajax( {
								url      : ajaxurl,
								dataType : 'json',
								data     : form_Data,
								contentType:false,
								processData:false,
								type     : "POST",
								success  : function ( attachment ) {
									$self.find('.preview-upload').attr('src', attachment.url).parent().show();
									$self.find('.file_url').val(attachment.url).trigger("change");
									_this.hide();
								}
							} );
						}
					}

					return false;

				} );
		},
		cropper : function ( $el ) {

		},

		addMedia: function($el){
			var _this = this;
			$el.find('.upload_file').click(function(e) {
				e.preventDefault();
				var button = $(this);
				var custom_uploader = wp.media({
					multiple: false
				})
					.on('select', function() {
						var attachment = custom_uploader.state().get('selection').first().toJSON();
						$(button).closest('.uploadImg-box').find('.preview-upload')
							.attr('src', attachment.url)
							.parent()
							.show();
						$(button).closest('.uploadImg-box').find('.file_url').val(attachment.url).trigger("change");
						_this.initCrop($(button).closest('.uploadImg-box'));
					})
					.open();

				return false;
			});

			$el.find('.remove_file').click(function(){
				var r = true;//confirm("Уверены?");
				if (r == true) {
					$(this).closest('.uploadImg-box').find('.preview-upload').attr('src', '').parent().hide();
					$(this).closest('.uploadImg-box').find('.crop_file').hide();
					$(this).closest('.uploadImg-box').find('.file_url').val('').trigger("change");
					$(this).closest('.uploadImg-box').find('.file_url').parent().removeClass('active');
				}
				return false;
			});
		},

		progress:function( $el, total, current ){
			total = parseInt(total);
			current = parseInt(current);

			var width = total > 0 ? current*100/total : 0,
				label = width.toFixed();

			$el.find('.progress-bar').css('width',width+'%');
			$el.find('.progress-percent').text(label);
		},

		progressText:function( $el, total, current ){

			total = parseInt(total);
			current = parseInt(current);

			var width = total > 0 ? current*100/total : 0,
				label = width.toFixed();

			$el.text(label+'%');
		},

		btnLock : function( $el ) {
			$el.addClass('animate-spinner').attr('disabled', true);
		},

		btnUnLock : function( $el ) {
			setTimeout(function(){
                if($el.length)
                	$el.removeClass('animate-spinner').attr('disabled', false);
			},300);
		},

		mainRequest : function( $el ) {

			var $this = this;

			var th     = $el,
				tmpl   = $( th.data('ads_template') ).html(),
				action = th.data('ads_action'),
				target = $( th.data('ads_target') ),
                action_request = th.data('ads_request') || th.closest('[data-ads_request]').data('ads_request'),
				data   = [],
				fields = $el.find('.ads-field');

            action_request = action_request || 'ads_action_request';

            	target = target === 'this' ? th : target ;

            if( typeof fields !== 'undefined' ) {

				data = fields.serialize();
			}

            var ads_controller = th.data('ads_controller');
            action_request = ads_controller ? 'ads_actions': action_request;

			$.ajaxQueue({
				url: ajaxurl,
				data: { action: action_request, ads_action: action, ads_controller: ads_controller, args: data },
				type: "POST",
				dataType: 'json',
				success: function ( response ) {

                    if( response ) {

						if( response.hasOwnProperty( 'error' ) ) {
							$this.notify( response.error, 'danger' );
						} else {

                            target.html( $this.objTotmpl( tmpl, response ) );

                            var hash = target.find("input, textarea, select" ).not('.not-hash').serialize();
                            target.data('hash', hash);

							setTimeout( $this.switchery( target ), 300 );
                            $.event.trigger( {
                                type : "request:done",
                                obj  : th.data('ads_target'),
                                response  : response
                            } );
						}
					}
				}
			});
		},

		mainHandlers : function() {

			if( $this ) return;

			var $this = this;

			$('[data-toggle="tooltip"]').tooltip();

			$('body').on('click','.to_clipboard', function (e) {
                e.preventDefault();
            });

			$('body').on('click','#update_instagram_images', function (e) {
                e.preventDefault();

                var name = $('#s_in_name_api').val();
				window.ADS.aliExtension.enableIframe();
				window.ADS.aliExtension.getPage('https://www.instagram.com/'+name+'/').then(function (value) {

					var data    = value.html.match( /window\._sharedData\s*=\s*(.*)<\/script>/im );

					if( null === data){
						window.open('https://www.instagram.com/'+name+'/');
						return;
					}

					data = data[1].substring(0, data[1].length - 1);

					data = JSON.parse(data);
					console.log(data);
					$.ajaxQueue({
						url: ajaxurl,
						data: {action: 'adstm_instagram_html', 'data' : data },
						type: "POST",
						dataType: 'json',
						success: function (response) {
							window.ADS.notify(response.text, 'success');
						}
					});
				})
            });

			var clipboard = new Clipboard('.to_clipboard');

            clipboard.on('success', function(e) {
                window.ADS.notify(e.text, 'success');
                e.clearSelection();
            });

			$.fn.selectpicker.defaults = {
				iconBase: '',
				tickIcon: 'fa'
			};

			$( '[data-ads_action]:not(.ads-no)' ).each(function(){
				$this.mainRequest( $(this) );
			});

            $(document).on('request:done', function (e) {

                var editors = $(e.obj).find('.editor');

                if (!editors.length) {
                    return;
                }

                editors.each(function () {
                    $this.renderEditor(this);
                })

            });

			$(document).on('click', 'button', function(e){

				var btn = $(this),
                    _for = btn.data('for'),
					th = btn.parents('.panel').find('[data-ads_action]');
					th = th.length ? th : btn.closest('[data-ads_action]');

                th = _for ? $(_for) : th;


				if( $(this).hasClass('ads-button') && ! $(this).hasClass('ads-no') && typeof th !== 'undefined' ) {

					$this.btnLock( btn );

					e.preventDefault();

					var action = th.data('ads_action');

                    var name =  btn.attr('name');

                    action = name ? name + '_' + action: 'save_' + action;

                    var action_request = th.data('ads_request') || th.closest('[data-ads_request]').data('ads_request');

                    action_request = action_request || 'ads_action_request';

                    var ads_controller = th.data('ads_controller');
                    action_request = ads_controller ? 'ads_actions': action_request;

                    $.ajaxQueue({
						url: ajaxurl,
						data: { action: action_request, ads_action: action, ads_controller: ads_controller, args: $this.serialize( th ) },
						type: "POST",
						dataType: 'json',
						success: function ( response ) {

                            $.event.trigger( {
                                type : "request:button",
                                action  : action
                            } );

							if( typeof response.error !== 'undefined' ) {
								$this.notify( response.error, 'danger' );
							} else {
								$this.notify( response.message, 'success' );

                                $this.mainRequest( th );
                                if( th.data('ads_update') ) {
									setTimeout( $this.mainRequest( $(th.data('ads_update')) ), 300 );
								}else if($(th.data('ads_target')).data('ads_update')){
                                    setTimeout( $this.mainRequest( $($(th.data('ads_target')).data('ads_update')) ), 300 );
								}

								if( th.data('ads_reload') ) {
									var reload = th.data('ads_reload');
									if( typeof reload !== 'undefined' ){
										location.reload();
									}
								}
							}

                            $this.btnUnLock( btn );
						}
					});
				}
			});

		},

        renderEditor: function(edit){

        var arg =	$(edit).serializeArray();

        var name = arg[0]['name'];
        var value = arg[0]['value'];

        var row = $(edit).closest('.form-group');
        var id = $(edit).attr('id');

        $(edit).remove();

        var init = tinyMCEPreInit.mceInit['editor_settings'];

        tinymce.EditorManager.editors = [];
        $.ajaxQueue({
            url: ajaxurl,
            data: {action: 'ads_action_request', ads_action: 'tinymce', args: 'template='+ encodeURIComponent(value) + '&name=' + name + '&id=' + id},
            type: "POST",
            dataType: 'json',
            success: function (response) {

                row.append(response.editor);
                tinymce.remove('[id="' + id + '"]');
                tinymce.init({
                    selector: '[id="' + id + '"]',
                    wp_autoresize_on: true,
                    relative_urls: false,
                    remove_script_host: false,
                    convert_urls: true,
                    forced_root_block: '',
                    force_p_newlines: false,
                    force_br_newlines: false,
                    convert_newlines_to_brs: false,
                    remove_linebreaks: true,
                    menubar: false,
                    formats: init['formats'],
                    toolbar1: init['toolbar1'],
                    toolbar2: init['toolbar2'],
                    plugins: init['plugins'],
                    preview_styles: init['preview_styles'],
                    resize: init['resize'],
                    theme: init['theme'],
                    wpeditimage_html5_captions: init['wpeditimage_html5_captions'],
                    wpautop: false,
                    skin: init['skin'],
                    wp_shortcut_labels: init['wp_shortcut_labels'],
                    setup: function (editor) {
                        editor.on('change', function () {
                            editor.save();
                        });
                    },

                });

            }
        });

		},

        product: function(post_id, fields){

        	return new Promise(function(resolve, reject){

                var _fields = fields || [];

                var _post_id = parseInt(post_id);

                $.ajaxQueue({
                    url: ajaxurl,
                    data: { action: 'ads_action_request', ads_action: 'product', args: { post_id : _post_id, fields : _fields} },
                    type: "POST",
                    dataType: 'json',
                    success: function ( response ) {
                        resolve(response);
                    }
                });
			});


		},

        order: function(id, fields){

            return new Promise(function(resolve, reject){

                var _fields = fields || [];

                var _id = parseInt(id);

                $.ajaxQueue({
                    url: ajaxurl,
                    data: { action: 'ads_action_orders', ads_action: 'order_details', args: { id : _id, fields : _fields} },
                    type: "POST",
                    dataType: 'json',
                    success: function ( response ) {
                        resolve(response);
                    }
                });
            });


        },

        request: function (ads_controller) {
			return function (action, args, callback) {
                args = args !== '' && args instanceof jQuery ? window.ADS.serialize(args) : args;

                $.ajaxQueue({
                    url: ajaxurl,
                    data: {action: 'ads_actions',ads_controller : ads_controller, ads_action: action, args: args},
                    type: 'POST',
                    dataType: 'json',
                    success: callback
                });
            }
        },

		init: function () {
			this.mainHandlers();
            this.coverAppend();
		},

		Dispatcher : {
			subscribers : [],

			/**
			 *
			 * @param {string} event
			 * @param {function} observer
			 * @param {object} context
			 * @param info
			 * @param {boolean} one
			 *
			 * @example
			 * Dispatcher.on('adsGoogleExtension:name', function(e){}, this, {a1:123})
			 */
			on: function( event, observer, context, info, one ) {

				context = context || null;
				info = info || null;
				one = one || false;

				var handler = {
					observer:observer,
					context: context,
					info: info,
					one: one
				};

				if ( this.subscribers.hasOwnProperty( event ) ) {
					this.subscribers[ event ].push( handler );
				} else {
					this.subscribers[ event ] = [ handler ];
				}
			},
			one: function( event, observer, context, info ) {
				context = context || null;
				info = info || null;
				this.on( event, observer, context, info, true );
			},

			trigger: function( event, data ) {
				for ( var ev in this.subscribers ) {
					if ( ev !== event ) {
						continue;
					}
					if ( this.subscribers.hasOwnProperty( ev ) ) {
						var _self = this;
						this.subscribers[ ev ].forEach( function( handler, i ){
							handler.observer.call( handler.context, data, handler.info );
							if ( handler.one ) {
                                _self.subscribers[ ev ].splice( i, 1 );
							}
						} );
					}
				}
			}

		},
        getBASE64: function(url){
            return new Promise(function(resolve, reject){
                $.ajaxQueue({
                    url: ajaxurl,
                    data: { action: 'ads_url_to_base64', url :url },
                    dataType : 'json',
                    type: 'POST',
                    success: function(response){
                        if(response.data)
                            resolve(response.data);

                        reject();
                    }
                });
            });
        },
        attachmentImage64: function(base64, post_id, filename ){
            filename = filename || false;
            post_id = post_id || false;

            var form_Data     = new FormData();

            var ext    = base64.match( /^data:image\/(\w*);base64,/im );

            if(ext === null){
            	return;
			}
            ext = ext !== null ? ext[ 1 ] : '';

            base64 = base64.replace(/^data:image\/(\w*);base64,/, "");

            var blob = base64ToBlob(base64, 'image/'+ext);

            form_Data.append('action', 'ads_attachmentBlob');
            form_Data.append('blob', blob);
            form_Data.append('ext', ext);
            form_Data.append('post_id', post_id);
            form_Data.append('filename', filename);

            return new Promise(function(resolve, reject){


                $.ajaxQueue({
                    url: ajaxurl,
                    data     : form_Data,
                    contentType:false,
                    processData:false,
                    dataType: 'json',
                    type: 'POST',
                    success: function(response){
                        if(response)
                            resolve(response);

                        reject();
                    },
                    error: function () {
                        reject();
                    }
                });
            });
        },
        cover: '.fade-cover',
        coverAppend : function(){
            $('body').append(
                '<div class="fade-cover">' +
                '<div id="Plane">' +
                '<div id="Plane_1" class="Plane"></div>' +
                '<div id="Plane_2" class="Plane"></div>' +
                '<div id="Plane_3" class="Plane"></div>' +
                '<div id="Plane_4" class="Plane"></div>' +
                '<div id="Plane_5" class="Plane"></div>' +
                '<div id="Plane_6" class="Plane"></div>' +
                '<div id="Plane_7" class="Plane"></div>' +
                '<div id="Plane_8" class="Plane"></div>' +
                '</div>' +
                '</div>'
            );
        },
        coverShow : function(){
            $(ADS.cover).show();
        },
        coverHide : function(){
            $(ADS.cover).hide();
        },
	};

    if ( typeof window.ADS === 'undefined' ) {
        window.ADS = {};
    }

    window.ADS = $.extend(window.ADS, ADS);

    window.ADS.init();
});