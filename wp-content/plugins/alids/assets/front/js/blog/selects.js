jQuery(document).ready(function(){
	jQuery('select').each(function() {
		var jQuerythis = jQuery(this);
		var selonhtml = '';
		var selonhtmlopt = '';
		var firstopt = '';
		var selitid = jQuery(this).attr('id');//id select
		var selitname = jQuery(this).attr('name');//name select
		var selitclass = jQuery(this).attr('class');//name select
		var firstoptval = jQuerythis.val();
		jQuery(this).children('option').each(function() {
			var optitid = jQuery(this).val();
			var optithtml = jQuery(this).html();
			
			if (jQuery(this).is(':selected')) {
				selonhtmlopt += '<div class="optsel active"><span data-id="'+optitid+'">'+optithtml+'</span></div>';
				firstopt = jQuery(this).text();
			}else{
				selonhtmlopt += '<div class="optsel"><span data-id="'+optitid+'">'+optithtml+'</span></div>';
			}
		});
		selonhtml += '<div style="'+jQuery(this).attr('style')+'" class="twistedselect downselectbutton '+selitclass+'" id="'+selitid+'"><div class="twistedtext">'+firstopt+'</div><div class="selectbutton "><i class="fas fa-caret-down"></i></div><div class="ghostinshells">'+selonhtmlopt+'</div><input type="hidden" name="'+selitname+'" value="'+firstoptval+'">'
		jQuery(this).replaceWith(selonhtml);
	});
	

	jQuery('body').on('click','.twistedtext,.selectbutton', function(){
		mistery=jQuery(this).parent().children('.selectbutton')
		mistery2=jQuery('.selectbutton');
		if (mistery.parent().is('.downselectbutton')){
			mistery.parent().removeClass("downselectbutton").addClass("downselectbuttonH");
			jQuery('body').find('.focustwister').removeClass('focustwister');
			mistery.parent().addClass('focustwister');
			setTimeout('openselect(mistery)',100);
		}else if (mistery.parent().is('.upselectbutton')){
			mistery.parent().removeClass("upselectbutton").addClass("upselectbuttonH");
			jQuery('body').find('.focustwister').removeClass('focustwister');
			setTimeout('closeselect(mistery2)',100);
		}
	});
	

	jQuery('body').on('click','.ghostinshells .optsel', function(){
		mistery=jQuery(this).parent().prev('.selectbutton');
		mistery2=jQuery('.selectbutton');
		jQuery(this).parent().prev('.selectbutton').prev('.twistedtext').html(jQuery(this).children('span').html());
		jQuery(this).parent().next('input').val(jQuery(this).children('span').attr("data-id")).trigger('change');
		//jQuery('#form_id').attr("value",jQuery(this).children('span').attr("data-id"))
		mistery.parent().removeClass("upselectbutton").addClass("upselectbuttonH").removeClass('focustwister');
		setTimeout('closeselect(mistery2)',100);
	});
});	
	
	
function openselect(mistery) {
	closeselect(jQuery('.selectbutton'))
	mistery.parent().removeClass("downselectbuttonH").removeClass("downselectbutton").addClass("upselectbutton");
	mistery.next('.ghostinshells').slideDown(500);
	keysel=1;
}

function closeselect(mistery) {
	mistery.parent().removeClass("upselectbuttonH").removeClass("upselectbutton").addClass("downselectbutton");
	mistery.next('.ghostinshells').slideUp(500);
	keysel=0;
}