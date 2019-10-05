<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Website logo (recommended size: 262*64px)', 'dav2' ), 'name' => 'tp_logo_img', 'width' => 262, 'height' => 64, 'crop_name' => 'logo' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Custom text', 'dav2' ), 'name' => 'tp_text_top_header' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Call to action text', 'dav2' ), 'name' => 'tp_text_header_call' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Header phone', 'dav2' ), 'name' => 'tp_phone_header' ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Custom icon (recommended size: 20*20px)', 'dav2' ), 'name' => 'shipping_icon' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-header',$tmpl->renderItems());
?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php
				$tmpl->renderPanel( [
					'panel_title'   => '',
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-header"></div>'
				] );

				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>