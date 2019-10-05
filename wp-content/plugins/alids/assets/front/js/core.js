window.ADS = window.ADS || {
		tryJSON : function(data) {

			try {
				var response = jQuery.parseJSON( data );
			}
			catch (e) {
				return false;
			}

			return response;
		}
	};

window.ADS.Dispatcher = window.ADS.Dispatcher || {
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
					var _this = this;
					this.subscribers[ ev ].forEach( function( handler, i ){
						handler.observer.call( handler.context, data, handler.info );
						if ( handler.one ) {
							_this.subscribers[ ev ].splice( i, 1 );
						}
					} );
				}
			}
		}

	};

jQuery(function($) {

    var toggleEmpty = function (element) {
        return element.value === ''
            ? element.parentNode.classList.add('is-empty') || element.parentNode.classList.remove('is-not-empty')
            : element.parentNode.classList.remove('is-empty') || element.parentNode.classList.add('is-not-empty')
    };

    $('input, textarea').each(function (key, element) {
        toggleEmpty(element)
    }).on('focus', function () {
        this.parentNode.classList.add('is-focus')
    }).on('focusout', function () {
        this.parentNode.classList.remove('is-focus')
    }).on('keyup keypress', function () {
        toggleEmpty(this)
    }).on('change', function () {
        toggleEmpty(this)
    });

});
