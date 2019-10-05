<?php get_header() ?>

<div class="container">
	
    <div class="breadcrumbs">
		<?php adsTmpl::breadcrumbs() ?>
	</div>
 
	<div class="contactcont">
		
        <h1 class="superH1"><?php _e( 'Contact us', 'dav2' ) ?></h1>
		
        <p><?php _cz('tp_contactUs_text') ?></p>
		
        <div>
			<a href="mailto:<?php echo cz( 's_mail' ) ?>"><?php echo cz( 's_mail' ) ?></a>
		</div>
		
        <div class="socs whitesocs">
            <?php get_template_part( 'template/social-links' ) ?>
		</div>
  
		<div class="contactform">
   
			<form class="contact-form nicelabel" method="POST">
                <?php if(isset($_POST['error']) && $_POST['error'] == 'g-recaptcha-response'){?>
                    <div class="form-group error-text-color">
                        <?php _e( 'Check reCAPTCHA', 'dav2' ) ?>
                    </div>
                <?php } ?>
				<div class="form-group">
					<input type="text" id="nameClient" class="form-control" name="nameClient" required="required" value="<?php echo isset($_POST['nameClient']) ? esc_attr($_POST['nameClient']) : '';?>">
					<label for="nameClient">* <?php _e( 'Name', 'dav2' ); ?></label>
				</div>
				<div class="form-group">
					<input type="email" id="email" class="form-control" name="email" required="required" value="<?php echo isset($_POST['email']) ? esc_attr($_POST['email']): '';?>">
					<label for="email">* <?php _e( 'Email', 'dav2' ); ?></label>
				</div>
				<div class="form-group">
					<textarea id="message" rows="5" class="form-control" name="message" required="required"><?php echo isset($_POST['message']) ? esc_attr($_POST['message']) : '';?></textarea>
					<label for="message">* <?php _e( 'Message', 'dav2' ); ?></label>
				</div>
				<?php
                
                $options = new \ads\adsOptions();
				$args    = $options->get('ads_recaptcha_options');
    
				?>
					
				<?php if( $args[ 'recaptcha_status' ] == 1 ) : ?>

					<div class="form-group">
						<div class="wrap-g-recaptcha clearfix">
							<div class="g-recaptcha" data-sitekey="<?php echo $args[ 'recaptcha_site_key' ] ?>"></div>
						</div>
						<input type="hidden" id="recaptcha" name="recaptcha">
					</div>
				<?php endif; ?>
    
				<div class="form-group is-not-empty submit-group">
					<button type="submit" name="contactSender" value="Send" class="btn"><?php _e( 'Send Message', 'dav2' ) ?></button>
				</div>
			</form>
		</div>
	</div>
</div>

<?php get_footer(); ?>