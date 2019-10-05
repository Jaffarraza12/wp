<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'switcher', [ 'label' => __( 'Make phone number field as required', 'dav2' ), 'name' => 'tp_phone_number_required' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Make leave your comments field as required', 'dav2' ), 'name' => 'tp_description_required' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-fields-options',$tmpl->renderItems());


$tmpl->addItem( 'switcher', [ 'label' => __( 'Show Terms & Conditions checkbox', 'dav2' ), 'name' => 'tp_readonly_read_required' ] );
$tmpl->addItem( 'textarea', [ 'label' => __( 'Text', 'dav2' ), 'name' => 'tp_readonly_read_required_text' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-conditions',$tmpl->renderItems());


$tmpl->addItem( 'switcher', [ 'label' => __( 'Show the message about PayPal payment method at checkout', 'dav2' ), 'name' => 'tp_paypal_info_enable' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Additional information for PayPal payment method', 'dav2' ), 'name' => 'tp_paypal_info_text' ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Show the message about Credit Card payment method at checkout', 'dav2' ), 'name' => 'tp_credit_card_info_enable' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Additional information for Credit Cards payment method', 'dav2' ), 'name' => 'tp_credit_card_info_text' ] );

$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-additional',$tmpl->renderItems());

$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable shop with confidence section', 'dav2' ), 'name' => 'sidebar_safe_shopping_guarantee_show' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Title', 'dav2' ), 'name' => 'sidebar_safe_shopping_guarantee' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Customize image #1 (recommended size: 123*53px)', 'dav2' ), 'name' => 'sidebar_safe_shopping_guarantee_img_1', 'width' => 123, 'height' => 53, 'crop_name' => 'safe1' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Customize image #2 (recommended size: 123*53px)', 'dav2' ), 'name' => 'sidebar_safe_shopping_guarantee_img_2', 'width' => 123, 'height' => 53, 'crop_name' => 'safe2' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Customize image #3 (recommended size: 123*53px)', 'dav2' ), 'name' => 'sidebar_safe_shopping_guarantee_img_3', 'width' => 123, 'height' => 53, 'crop_name' => 'safe3' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-sidebar',$tmpl->renderItems());
?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php
				$tmpl->renderPanel( [
					'panel_title'   => __('Required Fields', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-fields-options"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Terms & Conditions Checkbox Settings', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-conditions"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Additional Information', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-additional"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Sidebar', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-sidebar"></div>'
				] );

				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>