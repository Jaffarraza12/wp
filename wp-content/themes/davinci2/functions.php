<?php
do_action('cz_menu_init');

if (function_exists('init_cz')) {
    init_cz();
}

add_action( 'template_redirect', function(){

    if ( defined( 'ADS_ERROR' ) ) {
        return;
    }

    get_template_part( 'empty' );
}, 1 );

remove_action('wp_head', 'wp_print_scripts');
remove_action('wp_head', 'wp_print_head_scripts', 9);
remove_action('wp_head', 'wp_enqueue_scripts', 1);

add_action('wp_footer', 'wp_print_scripts', 5);
add_action('wp_footer', 'wp_enqueue_scripts', 5);
add_action('wp_footer', 'wp_print_head_scripts', 5);

include( __DIR__ . '/adstm/init.php' );

include( __DIR__ . '/hooks/init.hooks.php' );

include( __DIR__ . '/inc/breadcrumbs.php' );
include( __DIR__ . '/inc/list_review.php' );
include( __DIR__ . '/inc/instagram.php' );


add_action('cz_change_options', function (){
    adstm_instagram::clearCache();
});

/**
 * Remove adminbar for subscribers
 */

if ( is_user_logged_in() && ! current_user_can( "level_2" ) ) {
	add_filter( 'show_admin_bar', '__return_false' );
}

/**
 * Enable responsive video (bootstrap only)
 *
 * @param $html
 * @param $url
 * @param $attr
 * @param $post_ID
 *
 * @return string
 */
function adstm_oembed_filter( $html, $url, $attr, $post_ID ) {
	return '<div class="embed-responsive embed-responsive-16by9">' . $html . '</div>';
}

add_filter( 'embed_oembed_html', 'adstm_oembed_filter', 10, 4 );


/**
 * Convert post_content \n
 *
 * @param $content
 *
 * @return mixed
 */
if ( ! function_exists( 'nl2br_content' ) ) {
	function nl2br_content( $content ) {
		$content = apply_filters( 'the_content', $content );

		return str_replace( ']]>', ']]>', $content );
	}
}

/* Lazy load of images for product's single page */

$enable_single_page_optimize_content = cz( 'tp_item_imgs_lazy_load' );

// To edit single product's description's content for images lazy loading
function change_single_product_content_for_img_lazy_load( $content ) {

    global $post;
    $use_regex = true;

    // only edit specific post types
    $types = array( 'product' );
    if ( $post && in_array( $post->post_type, $types, true ) ) {

        if( $use_regex ) {

            $content = preg_replace_callback(
                "|src=|",
                function ($match) {
                    return "data-src=";
                },
                $content
            );

        } else {

            $dom = new DOMDocument();
            @$dom->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));

            foreach ($dom->getElementsByTagName('img') as $node) {
                $src_attr = $node->getAttribute('src');
                $node->setAttribute("data-src", $src_attr );
                $node->removeAttribute("src");
            }
            $content = $dom->saveHtml();

        }
    }

    return $content;
}

if( $enable_single_page_optimize_content ) {

    // add the filter when main loop starts
    add_action( 'loop_start', function( WP_Query $query ) {
        if ( $query->is_main_query() ) {
            add_filter( 'the_content', 'change_single_product_content_for_img_lazy_load', -10 );
        }
    } );

// remove the filter when main loop ends
    add_action( 'loop_end', function( WP_Query $query ) {
        if ( has_filter( 'the_content', 'change_single_product_content_for_img_lazy_load' ) ) {
            remove_filter( 'the_content', 'change_single_product_content_for_img_lazy_load' );
        }
    } );

}

/* END Lazy load of images for product's single page */

function theme_get_icon( $name, $color ) {

    $file = dirname( __FILE__ ) . '/images/svg-icons/' . $name . '.svg';

    if ( file_exists( $file ) ) {
        ob_start();
        include( $file );
        $text = ob_get_contents();
        ob_end_clean();

        return $text;
    }

    return '';
}

function tmpCz($name, $tmp){
	$value = cz($name);
	if(!$value){
		return;
	}

	printf( $tmp, $value );
}

function selectSearchWordBlog($search, $text){

    foreach (explode(' ', $search) as $v){
        $text = preg_replace('/('.$v.')/uUi', '<span>$1</span>', $text);
    }

    return $text;
}

function ads_search_ImageUrlBlog( $post ) {

    $post_id = $post->ID;

    if ( has_post_thumbnail( $post_id ) ) {
        $thumb_id = get_post_thumbnail_id( $post_id );
        $url      = wp_get_attachment_image_src( $thumb_id, 'thumbnail' );

        return $url[ 0 ];
    }

    return $post->imageUrl;
}





class WP_Bootstrap_Navwalker extends Walker_Nav_Menu {

	public $tree_type = array( 'post_type', 'taxonomy', 'custom' );

	public $db_fields = array( 'parent' => 'menu_item_parent', 'id' => 'db_id' );

	public function start_lvl( &$output, $depth = 0, $args = array() ) {

		$output .= "<span class='arrright'></span><div class='topnav'><ul>";

	}

	public function end_lvl( &$output, $depth = 0, $args = array() ) {
		$output .= "</ul></div>";
	}

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
			$t = '';
			$n = '';
		} else {
			$t = "\t";
			$n = "\n";
		}
		$indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

		$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		$args = apply_filters( 'nav_menu_item_args', $args, $item, $depth );

		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
		$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

		$id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
		$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

		$output .= $indent . '<li' . $id . $class_names . '>';

		$atts           = array();
		$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
		$atts['target'] = ! empty( $item->target ) ? $item->target : '';
		$atts['rel']    = ! empty( $item->xfn ) ? $item->xfn : '';
		$atts['href']   = ! empty( $item->url ) ? $item->url : '';

		$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

		$attributes = '';
		foreach ( $atts as $attr => $value ) {
			if ( ! empty( $value ) ) {
				$value      = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
				$attributes .= ' ' . $attr . '="' . $value . '"';
			}
		}

		$title = apply_filters( 'the_title', $item->title, $item->ID );

		$title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

		$item_output = $args->before;
		$item_output .= '<a' . $attributes . '>';
		$item_output .= $args->link_before . $title . $args->link_after;
		$item_output .= '</a>';
		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

	public function end_el( &$output, $item, $depth = 0, $args = array() ) {
		$output .= "</li>";
	}
}


class WP_Bootstrap_Navwalker_simple extends Walker_Nav_Menu {

    public $tree_type = array( 'post_type', 'taxonomy', 'custom' );

    public $db_fields = array( 'parent' => 'menu_item_parent', 'id' => 'db_id' );

    public function start_lvl( &$output, $depth = 0, $args = array() ) {

        $output .= "<span class='arrright'></span><ul>";
    }

    public function end_lvl( &$output, $depth = 0, $args = array() ) {
        $output .= "</ul>";
    }

    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
            $t = '';
            $n = '';
        } else {
            $t = "\t";
            $n = "\n";
        }
        $indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

        $classes   = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        $args = apply_filters( 'nav_menu_item_args', $args, $item, $depth );

        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        $id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names . '>';

        $atts           = array();
        $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts['target'] = ! empty( $item->target ) ? $item->target : '';
        $atts['rel']    = ! empty( $item->xfn ) ? $item->xfn : '';
        $atts['href']   = ! empty( $item->url ) ? $item->url : '';

        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $value      = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $title = apply_filters( 'the_title', $item->title, $item->ID );

        $title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . $title . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }

    public function end_el( &$output, $item, $depth = 0, $args = array() ) {
        $output .= "</li>";
    }
}

function adstm_selectSearchWord($search, $text){

    foreach (explode(' ', $search) as $v){
        $text = preg_replace('/('.$v.')/uUi', '<ins>$1</ins>', $text);
    }

    return $text;
}


add_filter('ads_account_template_type', function ($type){
	return 'type2';
});

