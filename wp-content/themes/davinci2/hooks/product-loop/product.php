<?php

function adstm_product_item( $img_size = 'ads-big', $no_scheme = false ) {

	$info = new adsProductTM( [
		'attributes' => true,
		'alimeta'    => true
	] );



	$product  = $info->singleProductMin($img_size);
	$discount = '';

	if( $product[ 'discount' ] && cz( 'tp_show_discount' ) ) {
		$discount = sprintf(
			'<div class="discount"><span><b>%1$d&percnt;</b> %2$s</span></div>',
			$product[ 'discount' ], __( 'off', 'dav2' )
		);
	}
	
	$price = '';
	if( $product[ '_price' ] > 0 && $product[ '_price' ] !== $product[ '_salePrice' ] ) {
	    $price .= "<small class='old js-price'></small><br>";
	}
	
	$price .= "<span class='sale js-salePrice'></span>";

    $availability = $product[ 'stock' ] > 0  ? "https://schema.org/InStock" : "https://schema.org/OutStock";
    $priceValidUntil = date('Y-m-d',
        strToTime('today + 30 days')
    );

    $getCountReview = $info->getCountReview();
    $aggregateRating = '';
    if($getCountReview){
        $aggregateRating = "<div style='display:none;' itemprop='aggregateRating' itemscope itemtype='http://schema.org/AggregateRating'><span itemprop='ratingValue'>{$info->getRate()}</span><span itemprop='reviewCount'>".$getCountReview."</span></div>";
    }

if($no_scheme == false){
    echo "<div class='product-item' data-post_id='{$info->getPostId()}'>
			<span itemscope='' itemtype='http://schema.org/Product'>
				{$info->getHiddenFields()}
				<meta itemprop='image' content='{$product[ 'thumb' ]}'>
				<meta itemprop='mpn' content='{$product['post_id']}'>
				<meta itemprop='brand' content='{$_SERVER['SERVER_NAME']}'>
				{$aggregateRating}
				<a href='{$info->getLink()}'>
					<div class='thumb'>
						<div class='thumb-box'>";
                        do_action('ads_product_item_thumb_box', $product['post_id']);
                        echo "<div class='thumb-wrap'>";
                        if( cz( 'tp_item_imgs_lazy_load' ) ) { ?>
                            <img data-src="<?php echo $product[ 'thumb' ]; ?>?10000">
                        <?php }else{ ?>
                            <img src="<?php echo $product[ 'thumb' ]; ?>?10000">
                        <?php }
                        echo "</div>
						</div>
					</div>
					<h4 itemprop='name'>{$info->getTitle()}</h4>
					{$discount}
					<span class='starscont'>{$info->starRating()}",
    $info->getCommentCount() ? '<span class="call-item">('.$info->getCommentCount().')</span>' : '',"</span>
					<div class='price' itemprop='offers' itemscope='' itemtype='http://schema.org/Offer'>
						<meta itemprop='price' content='{$product[ '_salePrice_nc' ]}'>
						<meta itemprop='priceCurrency' content='{$product[ 'currency' ]}'/>
						<meta itemprop='url' content='{$info->getLink()}'>
						<meta itemprop='availability' content='{$availability}'>
						<meta itemprop='priceValidUntil' content='{$priceValidUntil}'>
						{$price}
					</div>
				</a>
			</span>
		</div>";
}else{
    echo "<div class='product-item' data-post_id='{$info->getPostId()}'>
			<span>
				{$info->getHiddenFields()}
				<a href='{$info->getLink()}'>
					<div class='thumb'>
						<div class='thumb-box'>";
                            do_action('ads_product_item_thumb_box', $product['post_id']);
                            echo "<div class='thumb-wrap'>";
                            if( cz( 'tp_item_imgs_lazy_load' ) ) { ?>
                                <img data-src="<?php echo $product[ 'thumb' ]; ?>?10000">
                            <?php }else{ ?>
                                <img src="<?php echo $product[ 'thumb' ]; ?>?10000">
                            <?php }
                            echo "</div>
						</div>
					</div>
					<h4>{$info->getTitle()}</h4>
					{$discount}
					<span class='starscont'>{$info->starRating()}",
    $info->getCommentCount() ? '<span class="call-item">('.$info->getCommentCount().')</span>' : '',"</span>
					<div class='price'>
						{$price}
					</div>
				</a>
			</span>
		</div>";
}

}
add_action( 'adstm_product_item', 'adstm_product_item', 10 , 2 );