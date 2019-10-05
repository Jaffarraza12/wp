<?php
$tmpl = new ads\adsTemplate();

$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$btn = 	$tmpl->renderItems();

$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-add', 'name' =>'add', 'value' => __( 'Add', 'dav2' ) ] );
$btnAdd = $tmpl->renderItems();

$tmpl->addItem( 'switcher', [ 'label' => __( 'Rotation', 'dav2' ), 'name' => 'tp_home_slider_rotating' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Rotating time', 'dav2'), 'help' =>__('Slider rotating time in seconds', 'dav2') , 'name' => 'tp_home_slider_rotating_time' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'YouTube Video ID', 'dav2'), 'help' =>__('Customize YouTube Video ID', 'dav2') , 'name' => 'id_video_youtube_home' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Buttons colors', 'dav2' ), 'name' => 'tp_home_buttons_color' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Buttons colors (hover)', 'dav2' ), 'name' => 'tp_home_buttons_color_hover' ] );

$tmpl->addItem( 'select', [ 'label' => __( 'Text position', 'dav2' ), 'name' => 'slider_home_position' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Font size (Desktop)', 'dav2'), 'name' => 'slider_home_fs_desk' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Font size (Mobile)', 'dav2'), 'name' => 'slider_home_fs_mob' ] );


$inVideo = 	$tmpl->renderItems();

$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Banner', 'dav2' ).' #{{math @index "+" 1}} '.__( '(recommended size: 967*440px)', 'dav2' ), 'crop_name' => 'slider_home{{@index}}', 'name' => 'slider_home[{{@index}}][img]', 'value' =>'{{img}}', 'width' => 967, 'height' => 440 ] );
$tmpl->addItem( 'uploadImgCrop', [ 'label' => __( 'Banner', 'dav2' ).' #{{math @index "+" 1}} '.__( 'mobile (recommended size: 500*500px)', 'dav2' ), 'crop_name' => 'slider_home{{@index}}_adap', 'name' => 'slider_home[{{@index}}][img_adap]', 'value' =>'{{img_adap}}', 'width' => 500, 'height' => 500 ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Banner', 'dav2' ).' #{{math @index "+" 1}} '.__( 'text', 'dav2' ) , 'name' => 'slider_home[{{@index}}][text]', 'value' =>'{{text}}' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Banner', 'dav2' ).' #{{math @index "+" 1}} '.__( 'text color', 'dav2' ), 'name' => 'slider_home[{{@index}}][text_color]', 'value' =>'{{text_color}}' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Banner', 'dav2' ).' #{{math @index "+" 1}} '.__( 'text overlay color', 'dav2' ), 'name' => 'slider_home[{{@index}}][background]', 'value' =>'{{background}}' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Show button', 'dav2' ), 'name' => 'slider_home[{{@index}}][shop_now_enabled]' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Banner', 'dav2' ).' #{{math @index "+" 1}} '.__( 'button text', 'dav2' ), 'name' => 'slider_home[{{@index}}][button_text]', 'value' =>'{{button_text}}' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Banner', 'dav2' ).' #{{math @index "+" 1}} '.__( 'link', 'dav2' ), 'name' => 'slider_home[{{@index}}][shop_now_link]', 'value' =>'{{shop_now_link}}' ] );
$tmpl->addItem( 'button', [ 'class' =>'btn btn-blue ads-no js-adstm-delete', 'name' =>'delete', 'value' => __( 'Delete', 'dav2' ) ] );

$template = sprintf(
	'%3$s {{#each slider_home}}
        <div class="panel panel-success">
            <div class="panel-body">
            %1$s
            </div>
	    </div>
	{{/each}}%2$s',
	$tmpl->renderItems(),
    $btnAdd,
    $inVideo
);

$tmpl->template('ads-slider',$template);


$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable super sale banner', 'dav2' ), 'name' => 'tp_countdown' ] );
$tmpl->addItem( 'text', [ 'help' => __( 'Customize super sale banner text.', 'dav2' ), 'name' => 'tp_countdown_text' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Super sale banner link', 'dav2' ), 'name' => 'tp_countdown_link' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Super sale banner text color', 'dav2' ), 'name' => 'tp_color_text_countdown' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Super sale banner discount color', 'dav2' ), 'name' => 'tp_color_text_countdown_sale' ] );
/*
$tmpl->addItem( 'switcher', [ 'label' => __( 'Set up Countdown timer manually', 'dav2' ), 'name' => 'tp_countdown_time_enable' ] );

$tmpl->addItem( 'text', [ 'label' => __( 'Countdown timer expires in', 'dav2' ), 'help' => __( 'Days', 'dav2' ), 'name' => 'tp_countdown_days' ] );

$tmpl->addItem( 'text', [ 'label' => __( 'Countdown timer expires in', 'dav2' ), 'help' => __( 'Hours', 'dav2' ), 'name' => 'tp_countdown_hours' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Countdown timer expires in', 'dav2' ), 'help' => __( 'Minutes', 'dav2' ), 'name' => 'tp_countdown_minutes' ] );
*/
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-counter',$tmpl->renderItems());


/*features*/
$tmpl->addItem( 'hidden', [ 'name' => 'tp_show_discount', 'value' =>' ' ] );
$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable features', 'dav2' ), 'name' => 'features_enable', 'value' =>1 ] );

$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Features titles color', 'dav2' ), 'name' => 'features_title_color', 'value' =>'{{features_title_color}}' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Features text color', 'dav2' ), 'name' => 'features_text_color', 'value' =>'{{features_text_color}}' ] );
$tmpl->addItem( 'colorpicker', [ 'label' => __( 'Features icon color', 'dav2' ), 'name' => 'features_icon_color', 'value' =>'{{features_icon_color}}' ] );
$t = $tmpl->renderItems();

$tmpl->addItem( 'text', [ 'label' => __( 'Title', 'dav2' ), 'name' => 'features[item][{{@index}}][head]', 'value' =>'{{head}}' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Description', 'dav2' ), 'name' => 'features[item][{{@index}}][text]', 'value' =>'{{text}}' ] );

$template = sprintf(
	'%2$s{{#each features.item}}
	<div class="panel panel-success">
	<div class="panel-body">    
	%1$s
	</div> 
	</div> 
	{{/each}}%3$s',
	$tmpl->renderItems(),
    $t,
	$btn
);

$tmpl->template('ads-features',$template);

$tmpl->addItem( 'editor', [ 'help' => __( 'Add 300-500 words article to your home page.' ), 'name' => 'tp_home_article' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-article',$tmpl->renderItems());


$tmpl->addItem( 'switcher', [ 'label' => __( 'Enable blog', 'dav2' ), 'name' => 'home_blog_enable', 'value' =>1 ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );
$tmpl->template('ads-blog',$tmpl->renderItems());

$tmpl->addItem( 'switcher', [ 'label' => __( 'Use grid', 'dav2' ), 'name' => 'home_grid_enable', 'value' =>1 ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Top right image (recommended size: 290x220)', 'dav2' ), 'name' => 'grid_home_img1' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Top right image text', 'dav2'), 'name' => 'grid_home_txt1' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Top right image link', 'dav2'), 'name' => 'grid_home_href1' ] );
$tmpl->addItem( 'uploadImg', [ 'label' => __( 'Bottom right image (recommended size: 290x220)', 'dav2' ), 'name' => 'grid_home_img2' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Bottom right image text', 'dav2'), 'name' => 'grid_home_txt2' ] );
$tmpl->addItem( 'text', [ 'label' => __( 'Bottom right image link', 'dav2'), 'name' => 'grid_home_href2' ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-green ads-no js-adstm-save', 'name' =>'save', 'value' => __( 'Save Settings', 'dav2' ) ] );
$tmpl->addItem( 'buttons', [ 'class' =>'btn btn-blue ads-no js-adstm-save', 'name' =>'default', 'value' => __( 'Default', 'dav2' ) ] );

$tmpl->template('ads-grid',$tmpl->renderItems());


?>

<div class="wrap">
	<div class="row">
		<div class="col-md-30">
			<form id="custom_form" method="POST">
				<?php
				wp_nonce_field( 'cz_setting_action', 'cz_setting' ); ?>
				<?php
                $tmpl->renderPanel( [
                    'panel_title'   => __('Grid Settings', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-grid"></div>'
                ] );

				$tmpl->renderPanel( [
					'panel_title'   => __('Slider Settings', 'dav2'),
					'panel_class'   => 'success',
					'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-slider"></div>'
				] );
                $tmpl->renderPanel( [
                    'panel_title'   => __('Countdown Settings', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-counter"></div>'
                ] );
                $tmpl->renderPanel( [
                    'panel_title'   => __('Features', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_description'   =>  '',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-features"></div>'
                ] );

                $tmpl->renderPanel( [
                    'panel_title'   => __('Article', 'dav2'),
                    'panel_class'   => 'success',
                    'panel_description'   =>  '',
                    'panel_content' => '<div data-adstm_action="general" data-adstm_template="#ads-article"></div>'
                ] );
				?>

                <button form="custom_form" class="btn btn-save no-ads" name="save"><?php _e( 'Save Settings', 'dav2' ) ?></button>
				<button form="custom_form" class="btn btn-default" name="default"><?php _e( 'Default', 'dav2' ) ?></button>
			</form>

		</div>
	</div>
</div>