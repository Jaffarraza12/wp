<?php

function adstm_paging_nav() {

	global $wp_query;

	$posts_per_page =
		isset( $wp_query->query_vars[ 'posts_per_page' ] ) && intval( $wp_query->query_vars[ 'posts_per_page' ] ) ?
		$wp_query->query_vars[ 'posts_per_page' ] :
		intval( get_option( 'posts_per_page' ) );

	$big = 999999999;

	$paged = max( 1, get_query_var( 'paged' ) );
	$count = $wp_query->found_posts;
	$total = ceil( $count / $posts_per_page );
	$links = paginate_links( [
		'base'      => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
		'format'    => '/page/%#%',
		'total'     => $total,
		'current'   => $paged,
		'type'      => 'array',
		'prev_text' => '<i class="fas fa-angle-left"></i>',
		'next_text' => '<i class="fas fa-angle-right"></i>'
	] );
	
	
	$pagination = [];
	if( $links ) {
		foreach( $links as $link ) {
			$pagination[] = [
				'active' => adstm_search_current( $link ),
				'link'   => $link,
			];
		}
	}
	
	if( count( $pagination ) ) {
		
		$pagination2 = $pagination;
		$pagprev     = array_shift( $pagination2 );
		$pagnext     = array_pop( $pagination2 );
		
		echo '<ul>';
		
		foreach ( $pagination as $key => $link ) {
			
			$class = '';
			if ( $link[ 'active' ] ) {
				$class = ' class="active" ';
			}
			echo '<li' . $class . '>' . $link[ 'link' ] . '</li>';
		}
		
		echo '</ul>
		<div class="adappagercont">
			' . $pagprev[ 'link' ] . '<span class="adappager"><b>' . $paged . ' /</b> ' . $total . '</span>' . $pagnext[ 'link' ] . '
		</div>';
	}
}
add_action( 'adstm_paging_nav', 'adstm_paging_nav' );

function adstm_search_current( $string ) {

	if ( preg_match( '/(current)/', $string ) ) {
		return true;
	}

	return false;
}