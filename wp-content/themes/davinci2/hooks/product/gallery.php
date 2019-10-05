<?php

function adstm_single_gallery( $items = [], $alt = '', $name = 'product-slider-desc' ) {
	
    if ( ! $items || count( $items ) == 0 ) { ?>
        
        <div id="productSlider" class="fotorama" data-nav="thumbs" data-fit="contain" data-click="false"></div>
		<div class="itemadapslider">
			<div class="owl-carouselcont">
			</div>
		</div>
		
        <?php
        
		return null;
	} ?>
	
	<div id="productSlider" class="fotorama" data-nav="thumbs" data-fit="contain" data-click="false">
		<?php foreach( $items as $k => $item ) {
			printf(
				'<a href="%3$s">
                    <img src="%1$s?1000" class="img-responsive" alt="%2$s">
                </a><meta itemprop="image" content="%1$s"/>',
				$item[ 'ads-large' ],
				$alt,
				$item[ 'full' ]
			);
		}
		?>
    </div>
	
	<div class="itemadapslider">
		<div class="owl-carouselcont swiper-container">
			<div class="swiper-wrapper">
				<?php foreach( $items as $k => $item ) {
					printf(
						'<div class="swiper-slide">
							<div class="itembgr" style="background-image: url(%1$s?1000);"></div>
						</div>',
						$item[ 'ads-large' ]
					);
				}
				?>
			</div>
            <div class="swiper-pagination"></div>
		</div>
	</div>
	<?php
}
add_action( 'adstm_single_gallery', 'adstm_single_gallery', 10, 2 );