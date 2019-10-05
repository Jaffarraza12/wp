<?php

query_posts( [
	'post_type'      => 'post',
	'posts_per_page' => 2,
] );

if ( have_posts() ) : ?>

<div id="blog-home">
    <div class="container">
        
        <div class="p-heading">
            <h3 class="p-title">
                <a href="<?php echo adstm_home_url( 'blog' )?>"><?php _e( 'Blog', 'dav2' ) ?></a>
            </h3>
        </div>

        <div class="slider-blog">
            
            <?php while( have_posts() ) : the_post(); ?>

                <div>
                    <div class="blog-item">
                        
                        <div class="blog-thumb">
                            <div class="thumb">
                                <a href="<?php the_permalink() ?>">
                                    <div class="bg" style="background-image: url(<?php echo theme_thumb_photo_url( $post->ID, 'medium' ) ?>?1000)"></div>
                                </a>
                            </div>
                        </div>
                        
                        <div class="blog-content">
                            <div class="blog-meta">
                                <time class="meta-time" datetime="<?php the_date() ?>" itemprop="datePublished">
                                    <?php the_date() ?>
                                </time>
                                <span class="separator">|</span>
                                <div class="category">
                                    <?php
                                        get_the_category( $post->ID );
                                        echo '<span>' . __( 'Category', 'dav2' ) . ': </span>';
                                        echo get_the_category_list( ', ', 1 );
                                    ?>
                                </div>
                            </div>
                            
                            <div class="content">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </div>

                            <div class="footer-content">
                                <a class="more-link" href="<?php the_permalink() ?>" target="_blank">
                                    <?php __( 'Read More', 'dav2' ) ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            <?php endwhile ?>
            
        </div>
    </div>
</div>

<?php endif; wp_reset_query(); ?>