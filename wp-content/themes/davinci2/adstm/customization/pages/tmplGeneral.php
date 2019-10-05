<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'custom', [
	'value' =>sprintf('<div class="form-group"><label style="display: block" for="tp_create">%1$s</label><button class="btn btn-blue" name="tp_create" value="true">%2$s</button></div>',
    __('Add default pages and menus', 'dav2'),
    __('Create', 'dav2')
)
] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Favicon png, gif (recommended size: 32*32px)', 'dav2' ), 'name' => 'tp_favicon' ] );
$tmpl->addItem( 'switcher', [ 'name' => 'tp_show_discount', 'value' => 1, 'label' => __( 'Show discount badges on products', 'dav2') ] );

$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );

$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable Image LazyLoad', 'dav2' ), 'name' => 'tp_item_imgs_lazy_load' ] );
$tmpl->template('ads-general', $tmpl->renderItems() );

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Template color', 'dav2' ), 'name' => 'tp_color' ] );

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Top header text color', 'dav2' ), 'name' => 'tp_header_text_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Top header text color (hover)', 'dav2' ), 'name' => 'tp_header_text_color_hover' ] );

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Cart icon color', 'dav2' ), 'name' => 'cart_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Cart icon color (hover)', 'dav2' ), 'name' => 'cart_color_hover' ] );

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Buttons color', 'dav2' ), 'name' => 'buttons_default' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Buttons color (hover)', 'dav2' ), 'name' => 'buttons_default_hover' ] );

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Discount color', 'dav2' ), 'name' => 'tp_discount_bg_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Prices color', 'dav2' ), 'name' => 'tp_price_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Cart/Payment buttons color', 'dav2' ), 'name' => 'tp_cart_pay_btn_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Cart/Payment buttons color (hover)', 'dav2' ), 'name' => 'tp_cart_pay_btn_color_hover' ] );

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Personal account buttons color', 'dav2' ), 'name' => 'tp_account_btn_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Personal account buttons color (hover)', 'dav2' ), 'name' => 'tp_account_btn_color_hover' ] );







$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-color', $tmpl->renderItems());



$tmpl->addItem( 'switcher', [ 'name' => 'tp_do_rtl', 'value' => 1, 'label' => __( 'Enable RTL layout', 'dav2') ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-rtl', $tmpl->renderItems());



?>

<div class="wrap">
	<div class="row">
		<div class="col-md-29">
            <form id="custom_form" method="POST">
                <?php
                wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
                <?php
                $tmpl->renderPanel( [
	                'panel_title'   => __('General Settings', 'dav2'),
	                'panel_class'   => 'success',
	                'panel_description'   =>  '',
	                'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-general"></div>'
                ] );
                $tmpl->renderPanel( [
                    'panel_title'   => __( 'Template Colors', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-color"></div>'
                ] );
                $tmpl->renderPanel( [
                    'panel_title'   => __( 'Right-to-Left layout', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-rtl"></div>'
                ] );
                ?>
                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
                <button form="custom_form" class="btn btn-default no-ads" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
            </form>

		</div>
	</div>
</div>