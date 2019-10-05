<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable pre-selected variation', 'dav2' ), 'name' => 'tp_single_enable_pre_selected_variation' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable social share icons', 'dav2' ), 'name' => 'tp_share' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable quantity of orders', 'dav2' ), 'name' => 'tp_orders' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Show number of products left in stock', 'dav2' ), 'name' => 'tp_single_stock_enabled' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Show if number of products left in stock is fewer than', 'dav2' ), 'name' => 'tp_single_stock_count' ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Show Buyer protection', 'dav2' ), 'name' => 'tp_single_buyer_protection' ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable Product description tab', 'dav2' ), 'name' => 'tp_tab_item_details' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable item specifics tab', 'dav2' ), 'name' => 'tp_tab_item_specifics' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable Shipping&Payment tab', 'dav2' ), 'name' => 'tp_tab_shipping' ] );
$tmpl->addItem( 'textarea', [ 'label' => __( 'Shipping&Payment description', 'dav2' ), 'name' => 'tp_single_shipping_payment_content' ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Show recommended products', 'dav2' ), 'name' => 'tp_related' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Show recently viewed products', 'dav2' ), 'name' => 'tp_recently' ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable country flag in reviews', 'dav2' ), 'name' => 'tp_comment_flag' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable Verified buyer badge', 'dav2' ), 'name' => 'tp_verifed' ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable Write a review option', 'dav2' ), 'name' => 'tp_enable_leave_review_box' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Show Terms & Conditions checkbox', 'dav2' ), 'name' => 'cm_readonly' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Terms & Conditions', 'dav2' ), 'name' => 'tp_readonly_read_required_text' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Error text', 'dav2' ), 'name' => 'cm_readonly_notify' ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable Size guide', 'dav2' ), 'name' => 'tp_size_chart' ] );



$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-single-product',$tmpl->renderItems());
?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php
				$tmpl->renderPanel( [
					'panel_title'   => __('Single Product Page Settings', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-single-product"></div>'
				] );

				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>