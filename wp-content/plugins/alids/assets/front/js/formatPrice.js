jQuery( function ( $ ) {

var formatPrice = (function(){
	var ADSCacheCurrency,
		ADScurrentCurrency,
		isInit = false;

	function tryJSON(data) {
		try {
			var response = $.parseJSON( data );
		}
		catch (e) {
			//console.log(data);
			return false;
		}

		return response;
	}

	function number_format(number, decimals, decPoint, thousandsSep){
		decimals = decimals || 0;
		number = parseFloat(number);

		if(!decPoint || !thousandsSep){
			decPoint = '.';
			thousandsSep = ',';
		}

		var roundedNumber = Math.round( Math.abs( number ) * ('1e' + decimals) ) + '';
		// add zeros to decimalString if number of decimals indicates it
		roundedNumber = (1 > number && -1 < number && roundedNumber.length <= decimals)
			? Array(decimals - roundedNumber.length + 1).join("0") + roundedNumber
			: roundedNumber;
		var numbersString = decimals ? roundedNumber.slice(0, decimals * -1) : roundedNumber.slice(0);
		var checknull = parseInt(numbersString) || 0;

		// check if the value is less than one to prepend a 0
		numbersString = (checknull == 0) ? "0": numbersString;
		var decimalsString = decimals ? roundedNumber.slice(decimals * -1) : '';

		var formattedNumber = [];
		while(numbersString.length > 3){
			formattedNumber.push(thousandsSep + numbersString.slice(-3));
			numbersString = numbersString.slice(0,-3);
		}

		formattedNumber = formattedNumber ? formattedNumber.reverse().join('') : '';
		return (number < 0 ? '-' : '') + numbersString + formattedNumber + (decimalsString ? (decPoint + decimalsString) : '');
	}

	function searchNearest( value, inArray ) {
		var lastKey = false,
			lastDif = false;

		value = value || 0;
		for(var k in inArray){

			var v = inArray[k];

			if ( v == value ) {
				return k;
			}

			var dif = Math.abs( value - v );
			if ( !lastKey || dif < lastDif ) {
				lastKey = k;
				lastDif = dif;
			}

		}
		console.log(lastKey);
		return lastKey;
	}

	function ads_price_convert_current( price, priceCurrency ) {

		price = parseFloat( price );


		//console.log(ADSCacheCurrency.ADS_CUVALUE);
		try {
			var currencyList = ADSCacheCurrency.ADS_CUVALUE,
				currencyProduct = currencyList[ priceCurrency ],
				currencyLocalValue = currencyList[ ADScurrentCurrency.ADS_CUR ];

		} catch (err) {

			//console.error('not ' + priceCurrency + ' in currencyList');

		}


		if ( ADScurrentCurrency.ADS_CUR == priceCurrency ) {
			return price;
		}

		var sub   = (currencyLocalValue > 0 && currencyProduct > 0) ? (currencyLocalValue/currencyProduct ) : 0;

		price = price * sub;

		return price;
	}

	function roundsCentPrice( price ) {

		if( price == 0 || isNaN(price) ) return '0.00';

		if ( ADScurrentCurrency.ADS_PRICE_ROUNDING ) {
			price = Math.round( price );
		}

		var assignCents = ADScurrentCurrency.ADS_PRICE_ASSIGNCENTS ? ADScurrentCurrency.ADS_PRICE_ASSIGNCENTS.split( ',') : false;

		price   = price.toFixed(2);

		var priceAR = price.toString().split( '.' );

		if (assignCents &&  parseInt( priceAR[ 0 ] ) == 0) {
			var index = assignCents.indexOf('00');
			if(index !=-1)
				assignCents.splice(index, 1);
		}

		if ( assignCents ) {

			var lastPriceKey = searchNearest( priceAR[ 1 ], assignCents );
			priceAR[ 1 ] = assignCents[ lastPriceKey ];
		}

		price = priceAR[ 1 ] ? priceAR[ 0 ] + '.' + priceAR[ 1 ] : priceAR[ 0 ];

		return parseFloat(price);
	}

	function out_current_front( price, cur, round ) {
		round = typeof round === 'undefined' ? true : round;

		cur = cur || ADScurrentCurrency.ADS_CUR || 'USD';

		var foo = ADSCacheCurrency.list_currency[cur];

		var assignCents = ADScurrentCurrency.ADS_PRICE_ASSIGNCENTS ? true : false;

		if(!round || assignCents || ! ADScurrentCurrency.ADS_PRICE_ROUNDING ){
			price = parseFloat(price).toFixed(2);
		}else{
			price = parseFloat(price).toFixed(0);
		}

		price = number_format( price, 2, '.', ' ' ); // ~> "1 234.50"

		return foo[ 'pos' ] == 'before' ? foo[ 'symbol' ] + price : price + foo[ 'symbol' ];
	}

	function convertPriceOut( price, priceCurrency , round ) {
		round = typeof round === 'undefined' ? true : round;
		price = ads_price_convert_current(price, priceCurrency);

		if(round){
			price = roundsCentPrice( price );
		}

		price = out_current_front( price , false, round);

		return price;
	}

	function convertPrice( price, priceCurrency  ) {
		price = ads_price_convert_current(price, priceCurrency);
		price = roundsCentPrice( price );

		return price;
	}

	function outPrice( price ) {

		price = out_current_front( price );

		return price;
	}

	function getADScurrentCurrency() {
		$.ajax({
			url     : alidAjax.ajaxurl,
			type    : "POST",
			async   : true,
			data    : {
				action      : "ads_get_currency"
			},
			success : function (json) {
				ADScurrentCurrency = tryJSON(json);
				$('body').trigger( {
					type : "infoCurrency:done",
					info : ADScurrentCurrency
				});

				isInit = true;
			}
		});
	}

	return {
		init: function ( ) {
			ADSCacheCurrency = window.ADSCacheCurrency;
			getADScurrentCurrency();
			return this;
		},
		ADSCacheCurrency: function (  ) {
			return ADSCacheCurrency;
		},
		ADScurrentCurrency: function (  ) {
			return ADScurrentCurrency;
		},
		convertPriceOut: function ( price, priceCurrency, round ) {
			round = typeof round === 'undefined' ? true : round;
			return convertPriceOut( price, priceCurrency, round );
		},
		convertPrice: function ( price, priceCurrency ) {
			return convertPrice( price, priceCurrency );
		},
		outPrice: function ( price) {
			return outPrice( price);
		},
		isInit: function (  ) {
			return isInit;
		}


	}
})();
    window.formatPrice = formatPrice.init();
});

