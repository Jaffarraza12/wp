<?php
$tmpl = new ads\adsTemplate();

$panel_one   = 'ads-panel_1';



$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Blog logo', 'dav2' ), 'name' => 'blog_main_logos' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Blog color', 'dav2' ), 'name' => 'blog_links' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Blog color (hover)', 'dav2' ), 'name' => 'blog_links_hover' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Buttons color', 'dav2' ), 'name' => 'blog_buttons' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Buttons color (hover)', 'dav2' ), 'name' => 'blog_buttons_hover' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Homepage banner ad (recommended size: 728 x 90)', 'dav2' ), 'name' => 'blog_banner_main', 'width' => 728, 'height' => 90, 'crop_name' => 'blog_banner_main1' ] );
$tmpl->addItem( 'text', [ 'label' => __('Homepage banner ad link', 'dav2'), 'name' => 'blog_banner_main_link' ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Single page banner ad (recommended size: 250 x 250) ', 'dav2' ), 'name' => 'blog_banner_single', 'width' => 250, 'height' => 250, 'crop_name' => 'blog_banner_single1' ] );
$tmpl->addItem( 'text', [ 'label' => __('Single page banner ad link', 'dav2'), 'name' => 'blog_banner_single_link' ] );
$tmpl->addItem( 'switcher', [ 'label' => __('Enable back-to-top button','dav2') , 'name' => 'blog_upbutton' ] );
$tmpl->addItem( 'textarea', [ 'label' => __('Subscribe Form Settings','dav2'), 'help' => __( 'Paste your ‘Autoresponder’ code here', 'dav2' ), 'name' => 'tp_subscribe_blog' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template( $panel_one, $tmpl->renderItems() );


?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php
				$tmpl->renderPanel( [
					'panel_title'   => __('Blog settings', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#' . $panel_one . '"></div>'
				] );
				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>