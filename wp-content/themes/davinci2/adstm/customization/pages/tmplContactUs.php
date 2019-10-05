<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'text', [ 'label' => __( 'Contact email', 'dav2' ), 'name' => 's_mail' ] );
$tmpl->addItem( 'textarea', [ 'label' => __( 'Paste your ‘Autoresponder’ code here', 'dav2' ), 'name' => 'tp_contactUs_text' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-contact-us',$tmpl->renderItems());
?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php
				$tmpl->renderPanel( [
					'panel_title'   => __('Contact Us Page Settings', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-contact-us"></div>'
				] );

				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>