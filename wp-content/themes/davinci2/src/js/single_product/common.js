export const $form = $('#form_singleProduct');

/**
 * $this is form sku params
 *
 * @param sticker
 * @returns {*}
 */
export function getSku( sticker = true ) {

	var options = {
			line      : 'js-item-sku',
			variation : '[name="sku-meta-set[]"]'
		},
		error   = false,
		foo     = [];

	$form.find( options.variation ).each( function () {

		if ( $( this ).val().length == 0 && sticker !== false ) {
            $( this ).closest( options.line ).addClass('is-empty');
			var errorText = $(this).closest('.js-item-sku').find('.sku-warning').text();
            toastr.error(errorText);
			error = true;
		}
		else {
            $( this ).closest( options.line ).removeClass('is-empty');
			foo.push( $( this ).val() );
		}

	} );

	if ( error ) return false;

	return { foo : foo }
}