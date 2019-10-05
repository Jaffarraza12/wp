<?php
/**
 * Created by PhpStorm.
 * User: sunfun
 * Date: 21.04.17
 * Time: 12:40
 */

function adstm_cart_quantity_link() {
	
    ?>
    
	<div class="cart">
        <a class="btn btn-primary" href="<?php echo adstm_home_url( 'cart' ) ?>">
	        <i class="fas fa-shopping-cart"></i>
	        <span style="display:none" class="count_item" data-cart="quantity"></span>
	        <u><span data-cart="pluralize_items"></span></u>
        </a>
    </div>
    
	<?php
}
add_action( 'adstm_cart_quantity_link', 'adstm_cart_quantity_link' );


add_action( 'adstm_dropdown_currency', function() {
 
	?>
 
	<div class="dropdown dropdown_currency" >
        <a class="dropdown-toggle" ajax_update="currency" data-toggle="dropdown" href="#"></a>
        <ul class="dropdown-menu" role="menu">
            <?php echo ads_select_currency() ?>
        </ul>
    </div>
    
	<?php
} );

add_action( 'ads_menu_product', function() {

    $depth     = 3;
    $locations = get_nav_menu_locations();
    
    if( isset( $locations[ 'category' ] ) && $locations[ 'category' ] ) {

		$menuProduct = wp_nav_menu( [
            'container'       => false,
            'container_class' => false,
            'theme_location'  => 'category',
            'menu_class'      => '',
            'items_wrap'      => '%3$s',
            'depth'           => $depth,
            'echo'            => false
        ] );
        
		$menuProduct = preg_replace( "#<a([^>]*)>([^>]*)<\/a>#", "<a$1><span>$2</span></a>", $menuProduct );
        
        echo $menuProduct;
		
    }
} );

add_action( 'adstm_shipping_icon', function() {
 
    echo cz( 'shipping_icon' ) ? '<img src="' . cz( 'shipping_icon' ) . '" alt="">' : '<i class="icon-truck"></i>';
} );
