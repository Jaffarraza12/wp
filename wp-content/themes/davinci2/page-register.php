<?php get_header() ?>

    <div class="container">
        <div class="breadcrumbs">
            <div class="pr-breadcrumbs" xmlns:v="http://rdf.data-vocabulary.org/#">
                <a href="/" rel="v:url" property="v:title"><?php _e( 'Home', 'dav2' ) ?></a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
                <span class="current"><?php _e( 'Register', 'dav2' ) ?></span>
            </div>
        </div>
        <div class="registercont">
            <h1 class="superH1">
                <?php echo function_exists( 'ads_set_custom_title' ) ? ads_set_custom_title( '', '' ) : ''; ?>
            </h1>
            <div id="register-account" class=" contactform">
                <form  id="register-account-form" class="nicelabel">
                    <div class="form-group">
                        <input id="register-first-name" type="text" name="first_name" class="form-control">
                        <label for="register-first-name"><?php _e( '* First name', 'dav2' ) ?></label>
                    </div>
                    <div class="form-group">
                        <input id="register-last-name" type="text" name="last_name" class="form-control">
                        <label for="register-last-name"><?php _e( '* Last name', 'dav2' ) ?></label>
                    </div>
                    <div class="form-group">
                        <input id="register-email" type="text" name="email" class="form-control">
                        <label for="register-email"><?php _e( '* Email', 'dav2' ) ?></label>
                    </div>
                    <div class="form-group">
                        <input id="register-password" type="password" name="password" class="form-control">
                        <label for="register-password"><?php _e( '* Password', 'dav2' ) ?></label>
                    </div>
                    <div class="form-group">
                        <input id="register-repeat-password" type="password" name="repeat_password" class="form-control">
                        <label for="register-repeat-password"><?php _e( '* Confirm password', 'dav2' ) ?></label>
                    </div>
                    <?php get_template_part( 'template/social-login');?>
                    <?php
                    $options = new \ads\adsOptions();
                    $args = $options->get('ads_recaptcha_options');
                    ?>
                    <?php if ($args['recaptcha_status'] == 1): ?>
                        <div class="form-group g-recaptcha" data-sitekey="<?php echo $args['recaptcha_site_key']; ?>">
                        </div>
                        <div class="form-group">
                            <input type="hidden" id="recaptcha" name="recaptcha">
                        </div>
                    <?php endif; ?>
                    <div class="form-group">
                        <input type="hidden" id="register-account-field" name="register-account-field" value="7c1526c298">
                        <input type="hidden" name="_wp_http_referer" value="/register">
                        <input type="hidden" name="action" value="ads_register_account_action">
                        <button type="submit" class="btn btn-default" id="register-account-button">
                            <?php _e( 'Create an account', 'dav2' ) ?>
                        </button>
                    </div>
                    <div class="form-group">
                        <a href="<?php echo adstm_home_url( 'userlogin' ) ?>" id="account-link" class="">
                            <?php _e( 'Already have an account? Click here!', 'dav2' ) ?>
                        </a>
                    </div>


                </form>
            </div>
            <div id="recover-password-message" class="text-center" style="display: none;"></div>
            <div id="message-send-mail" class="text-center" style="display: none;">
                <img class="mail-send" src="<?php echo ADS_URL ?>/assets/img/register/mail_send.svg" alt="">
                <p class="text"></p>
            </div>
        </div>
    </div>
<?php get_footer();?>