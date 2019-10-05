<div class="footer">
	<div class="container">
        <div class="footerT">
            <div class="row">

                <div class="footone col adapactive">
                    <h5><?php _cz('tp_footer_menu_title_1'); ?></h5>
                    <div class="fonecont">
                        <p class="emailfooter">
                            <?php if( cz( 'tp_header_phone' ) ) : ?>
                                <i class="fas fa-phone"></i> <span dir="ltr"><?php echo cz( 'tp_header_phone' ) ?></span> <br/>
                            <?php endif ?>

                            <?php if( cz( 'tp_header_email' ) ) : ?>
                                <i class="far fa-envelope"></i> <?php echo cz( 'tp_header_email' ) ?>
                            <?php endif ?>
                        </p>
                        <p><?php echo cz( 'tp_address' ) ?></p>
                    </div>
                </div>

                <div class="footone col">

                    <h5 class="text-uppercase"><?php _cz('tp_footer_menu_title_2'); ?></h5>

                    <?php

                    wp_nav_menu( [
                        'theme_location'  => 'footer-company',
                        'menu'            => 'Company Info',
                        'container'       => false,
                        'container_class' => '',
                        'container_id'    => '',
                        'menu_class'      => 'info',
                        'menu_id'         => '',
                        'echo'            => true,
                        'fallback_cb'     => '__return_empty_string',
                        'before'          => '',
                        'after'           => '',
                        'link_before'     => '',
                        'link_after'      => '',
                        'items_wrap'      => '<div class="fonecont"><ul>%3$s</ul></div>',
                        'depth'           => 1,
                        'walker'          => '',
                    ] );

                    ?>
                </div>

                <div class="footone col">

                    <h5 class="text-uppercase"><?php _cz('tp_footer_menu_title_3'); ?></h5>

                    <?php

                    wp_nav_menu( [
                        'theme_location'  => 'footer-purchase',
                        'menu'            => 'Purchase info',
                        'container'       => false,
                        'container_class' => '',
                        'container_id'    => '',
                        'menu_class'      => 'info',
                        'menu_id'         => '',
                        'echo'            => true,
                        'fallback_cb'     => '__return_empty_string',
                        'before'          => '',
                        'after'           => '',
                        'link_before'     => '',
                        'link_after'      => '',
                        'items_wrap'      => '<div class="fonecont"><ul>%3$s</ul></div>',
                        'depth'           => 1,
                        'walker'          => '',
                    ] );

                    ?>
                </div>

                <div class="footone col">

                    <h5 class="text-uppercase"><?php _cz('tp_footer_menu_title_4'); ?></h5>

                    <?php

                    wp_nav_menu( [
                        'theme_location'  => 'footer-service',
                        'menu'            => 'Customer service',
                        'container'       => false,
                        'container_class' => '',
                        'container_id'    => '',
                        'menu_class'      => 'info',
                        'menu_id'         => '',
                        'echo'            => true,
                        'fallback_cb'     => '__return_empty_string',
                        'before'          => '',
                        'after'           => '',
                        'link_before'     => '',
                        'link_after'      => '',
                        'items_wrap'      => '<div class="fonecont"><ul>%3$s</ul></div>',
                        'depth'           => 1,
                        'walker'          => '',
                    ] );

                    ?>
                </div>
					
                <?php if( adsTmpl::is_enableSocial() ) : ?>

                    <div class="footone footone_soc col">

                        <h5><?php _e( 'Follow us', 'dav2' ) ?></h5>

                        <div class="fonecont socs">
                            <?php get_template_part( 'template/social-links' ) ?>
                        </div>
                    </div>

                <?php endif; ?>

            </div>
        </div>

        <?php $confidence = cz( 'tp_confidence_img_1' ) || cz( 'tp_confidence_img_2' ) || cz( 'tp_confidence_img_3' ) ?>

        <?php if( cz( 'tp_footer_payment_methods' ) || $confidence ) : ?>
            <div class="footerC">
                <div class="row footpicsrow no-gutters">

                    <?php if( cz( 'tp_footer_payment_methods' ) ) : ?>

                        <div class="fcL">
                            <div>
                                <?php echo cz('tp_payment_methods'); ?>
                            </div>
                            <div class="footpics">
                                <?php
                                $tmp = '<img src="%s" alt="">';
                                tmpCz('tp_footer_payment_methods_1', $tmp);
                                tmpCz('tp_footer_payment_methods_2', $tmp);
                                tmpCz('tp_footer_payment_methods_3', $tmp);
                                tmpCz('tp_footer_payment_methods_4', $tmp);
                                tmpCz('tp_footer_payment_methods_5', $tmp);
                                tmpCz('tp_footer_payment_methods_6', $tmp);
                                ?>
                            </div>
                        </div>

                    <?php endif; ?>

                    <?php if( $confidence ) : ?>

                        <div class="fcR">
                            <div>
                                <?php echo cz('tp_confidence'); ?>
                            </div>
                            <div class="footpics">
                                <?php
                                $tmp = '<img src="%s" alt="">';
                                tmpCz('tp_confidence_img_1', $tmp);
                                tmpCz('tp_confidence_img_2', $tmp);
                                tmpCz('tp_confidence_img_3', $tmp);
                                ?>
                            </div>
                        </div>

                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>

        <?php if( cz( 'tp_enable_upbutton' ) ) : ?>
            <div class="upbutton"></div>
        <?php endif; ?>
    </div>
</div>

<div class="footerB">
    <div>
        <?php echo str_replace( '{{YEAR}}', date( 'Y' ), cz( 'tp_copyright' ) ); ?><br/>
        <a href="<?php echo adstm_home_url() ?>"><?php echo cz( 'tp_copyright__line' ) ?></a>
    </div>
</div>

<div class="shade"></div>
</div>
 
<?php

wp_footer();

echo cz( 'tp_footer_script' );


?>

</body>
</html>