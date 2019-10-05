<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Customize background image (recommended size: 1920*550px)', 'dav2' ), 'name' => 'tp_bg_thankyou', 'width' => 1920, 'height' => 550, 'crop_name' => 'thankyou' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Customize title', 'dav2' ), 'name' => 'tp_thankyou_fail_no_head' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Customize text', 'dav2' ), 'name' => 'tp_thankyou_fail_no_text' ] );
$tmpl->addItem( 'textarea', [ 'label' => __( 'Insert here a script to track your conversion rate', 'dav2' ), 'name' => 'tp_thankyou_fail_no_head_tag' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-thank-success',$tmpl->renderItems());

$tmpl->addItem( 'text', [ 'label' => __( 'Customize title', 'dav2' ), 'name' => 'tp_thankyou_fail_yes_head' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Customize text', 'dav2' ), 'name' => 'tp_thankyou_fail_yes_text' ] );
$tmpl->addItem( 'textarea', [ 'label' => __( 'Insert here a script to track your conversion rate', 'dav2' ), 'name' => 'tp_thankyou_fail_yes_head_tag' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-thank-fail',$tmpl->renderItems());
?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php
				$tmpl->renderPanel( [
					'panel_title'   => __('Thank You Page Settings When Payment is Successful', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-thank-success"></div>'
				] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Thank You Page Settings When Payment is Failed', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-thank-fail"></div>'
				] );

				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>