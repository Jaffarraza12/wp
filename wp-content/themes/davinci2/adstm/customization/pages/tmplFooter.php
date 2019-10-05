<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Background color', 'dav2' ), 'name' => 'tp_footer_bgr_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Menu title color', 'dav2' ), 'name' => 'tp_footer_title_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Text color', 'dav2' ), 'name' => 'tp_footer_text_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Link color', 'dav2' ), 'name' => 'tp_footer_link_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Link hover color', 'dav2' ), 'name' => 'tp_footer_link_color_hover' ] );

$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('footer-colors',$tmpl->renderItems());

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Background color', 'dav2' ), 'name' => 'tp_copyright_bgr_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Copyright notice color', 'dav2' ), 'name' => 'tp_copyright_notice_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Domain name text color', 'dav2' ), 'name' => 'tp_copyright_domain_color' ] );

$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('copyright-notice-colors',$tmpl->renderItems());


$tmpl->addItem( 'text', [ 'label' => __( 'Footer title #1', 'dav2' ), 'name' => 'tp_footer_menu_title_1' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Footer title #2', 'dav2' ), 'name' => 'tp_footer_menu_title_2' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Footer title #3', 'dav2' ), 'name' => 'tp_footer_menu_title_3' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Footer title #4', 'dav2' ), 'name' => 'tp_footer_menu_title_4' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('footer-menu',$tmpl->renderItems());

$tmpl->addItem( 'switcher', [ 'label' => __( 'Show back-to-top button', 'dav2' ), 'name' => 'tp_enable_upbutton' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('back-to-top',$tmpl->renderItems());

$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Logo (recommended size: 262*64px)', 'dav2' ), 'name' => 'tp_footer_logo_img', 'width' => 262, 'height' => 64, 'crop_name' => 'logo' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-footer-logo',$tmpl->renderItems());

$tmpl->addItem( 'switcher', [ 'label' => __( 'Show payment methods icons', 'dav2' ), 'name' => 'tp_footer_payment_methods' ] );
$tmpl->addItem( 'text', [ 'name' => 'tp_payment_methods' ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Image 1 (recommended size: 45*30px)', 'dav2' ), 'name' => 'tp_footer_payment_methods_1', 'width' => 45, 'height' => 30 ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Image 2 (recommended size: 45*30px)', 'dav2' ), 'name' => 'tp_footer_payment_methods_2', 'width' => 45, 'height' => 30 ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Image 3 (recommended size: 45*30px)', 'dav2' ), 'name' => 'tp_footer_payment_methods_3', 'width' => 45, 'height' => 30 ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Image 4 (recommended size: 45*30px)', 'dav2' ), 'name' => 'tp_footer_payment_methods_4', 'width' => 45, 'height' => 30 ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Image 5 (recommended size: 45*30px)', 'dav2' ), 'name' => 'tp_footer_payment_methods_5', 'width' => 45, 'height' => 30 ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Image 6 (recommended size: 45*30px)', 'dav2' ), 'name' => 'tp_footer_payment_methods_6', 'width' => 45, 'height' => 30 ] );

$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-methods',$tmpl->renderItems());

$tmpl->addItem( 'text', [ 'label' => __( 'Description', 'dav2' ), 'name' => 'tp_confidence' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Trust seal #1 (recommended size: 300*120px)', 'dav2' ), 'name' => 'tp_confidence_img_1', 'width' => 300, 'height' => 120, 'crop_name' => 'confidence1' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Trust seal #1 (recommended size: 300*120px)', 'dav2' ), 'name' => 'tp_confidence_img_2', 'width' => 300, 'height' => 120, 'crop_name' => 'confidence2' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Trust seal #1 (recommended size: 300*120px)', 'dav2' ), 'name' => 'tp_confidence_img_3', 'width' => 300, 'height' => 120, 'crop_name' => 'confidence3' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-confidence',$tmpl->renderItems());

$tmpl->addItem( 'text', [ 'name' => 'tp_copyright' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Copyright', 'dav2' ), 'name' => 'tp_copyright__line' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-copyright',$tmpl->renderItems());

$tmpl->addItem( 'text', [ 'label' => __( 'Contact phone', 'dav2' ), 'name' => 'tp_header_phone' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Contact email', 'dav2' ), 'name' => 'tp_header_email' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Address', 'dav2' ), 'name' => 'tp_address' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-contact-details',$tmpl->renderItems());

$tmpl->addItem( 'textarea', [ 'help' =>__('Use this section to add or edit scripts that will be placed between tags <footer></footer> on your site.', 'dav2'), 'name' => 'tp_footer_script' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-script',$tmpl->renderItems());
?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php

                $tmpl->renderPanel( [
                    'panel_title'   => __('Footer colors', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#footer-colors"></div>'
                ] );

                $tmpl->renderPanel( [
                    'panel_title'   => __('Footer menu settings', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#footer-menu"></div>'
                ] );

                $tmpl->renderPanel( [
                    'panel_title'   => __('Copyright notice colors', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#copyright-notice-colors"></div>'
                ] );

                $tmpl->renderPanel( [
                    'panel_title'   => __('Back-to-top', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#back-to-top"></div>'
                ] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Payment methods', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-methods"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Trust seals', 'dav2'),
					'panel_class'   => 'success',
					'panel_description'   =>  '',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-confidence"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Copyright', 'dav2'),
					'panel_class'   => 'success',
					'panel_description'   =>  '',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-copyright"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Contact details', 'dav2'),
					'panel_class'   => 'success',
					'panel_description'   =>  '',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-contact-details"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Footer Tag Container', 'dav2'),
					'panel_class'   => 'success',
					'panel_description'   =>  '',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-script"></div>'
				] );

				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>