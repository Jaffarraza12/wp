<?php if( isset( $_GET[ 'post_type' ] ) && $_GET[ 'post_type' ] == 'post' ){
    get_template_part( 'search', 'blog' );
}else{
    get_header();
    get_template_part( 'search', 'product' );
    get_footer();
}


