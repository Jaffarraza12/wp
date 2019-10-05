<?php get_header() ?>

<div class="container">
 
	<div class="breadcrumbs">
		<?php adsTmpl::breadcrumbs() ?>
	</div>
	
	<div class="fulllogin row">
		<div class="col">
			<div class="logincont">
				
                <h1 class="superH1"><?php _e( 'Returning Customer', 'dav2' ) ?></h1>

				<div class="loginform">

					<div id="login-form" <?php echo ( isset( $_GET['action'] ) && $_GET['action'] == 'rp') ? 'style="display: none"' : '' ?>>
						<form class="nicelabel" action="<?php echo wp_login_url() ?>" method="post">
                            <?php $errorLogin = apply_filters('login_errors', false); ?>
							<div class="form-group">
								<input type="text" id="log" class="form-control" name="log" value="<?php echo isset($_SESSION['username']) ? $_SESSION['username'] : ''; ?>">
								<label for="log">* <?php _e( 'Your login or email', 'dav2' ) ?></label>
                                <?php
                                if (isset($_SESSION['username'])) {
                                    unset($_SESSION['username']);
                                }
                                ?>
                                <?php echo $errorLogin; ?>
							</div>
                            <?php $errorPassword = apply_filters('password_errors', false); ?>
							<div class="form-group is-empty">
								<input type="password" id="user_pass" class="form-control" name="pwd">
								<label for="user_pass">* <?php _e( 'Password', 'dav2' ) ?></label>
                                <?php echo $errorPassword; ?>
							</div>
							<div class="form-group">
								<div class="remembercont">
									<label class="checkbox" for="rememberme">
                                        <input id="rememberme" name="rememberme" type="checkbox" value="forever" />
                                        <span><?php _e( 'Remember me', 'dav2' ) ?></span>
                                    </label>
								</div>
								<div class="forgotlink">
									<a id="forgot-password" href="#recover-password" target="_blank">
                                        <?php _e( 'Forgot password', 'dav2' ) ?>
                                    </a>
								</div>
							</div>
                            
                            <?php get_template_part( 'template/social-login' ) ?>
                            
							<div class="form-group is-not-empty">
								<button type="submit" class="btn submit-review"><?php _e( 'Log in', 'dav2' ) ?></button>
							</div>
							<input type="hidden" name="redirect_to" value="<?php echo adstm_home_url( 'account' ) ?>">

						</form>
					</div>
					<div id="recover-password" class="" style="display: none;">
						<form class="nicelabel text-center" id="recover-login-form" method="post">
							<div class="form-group">
                                <input id="user_login" type="text" name="user_login" class="form-control">
                                <label for="user_login">
                                    <?php _e( 'Enter login or email to recover your password', 'dav2' ) ?>
                                </label>
                            </div>
                            <div class="form-group error-message-block"><p></p></div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-default" id="recover-password-button">
                                    <?php _e( 'Submit', 'dav2' ) ?>
                                </button>
                                <a href="#login-form" id="cancel-recover-password" class="btn btn-default">
                                    <?php _e( 'Cancel', 'dav2' ) ?>
                                </a>
                            </div>
						</form>
					</div>

					<div id="recover-password-message" class="text-center form-group" style="display: none;"></div>

                    <div id="reset-password" <?php echo ( isset( $_GET['action'] ) && $_GET['action'] == 'rp') ? '' : 'style="display: none"' ?> >
						<form class="nicelabel text-center" id="reset-password-form" method="post">
                            <input type="hidden" name="error-message">
                            <div class="form-group">

                                <input id="password-field" type="password" name="password" class="form-control">
                                <label for="password-field">
                                    <?php _e( 'New password', 'dav2' ) ?></label>
                            </div>
                            <div class="form-group">

                                <input id="repeat-password-field" type="password" name="repeat_password" class="form-control">
                                <label for="repeat-password-field">
                                    <?php _e( 'Confirm password', 'dav2' ) ?>
                                </label>
                            </div>
                            <?php wp_nonce_field('action-reset-password', 'reset-password-field'); ?>
                            <input type="hidden" name="_wp_http_referer" value="/userlogin/">
                            <input type="hidden" name="action" value="ads_reset_password">
                            <input type="hidden" name="login" value="<?php echo isset($_GET['login']) ? $_GET['login'] : ''; ?>" >
                            <input type="hidden" name="key" value="<?php echo isset($_GET['key']) ? $_GET['key'] : ''; ?>" >
                            <div class="form-group">
                                <button type="submit" class="btn btn-default" id="reset-password-button">
                                    <?php _e( 'Reset password', 'dav2' ) ?>
                                </button>
                            </div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="newcustomer">

                <h2 class="h1 superH1"><?php _e( 'New Customer', 'dav2' ) ?></h2>
				<p><?php _e( 'Create an account today and enjoy these benefits', 'dav2' ) ?>:</p>

                <div class="ulcentercont">
					<ul class="sqr3">
						<li><?php _e( 'Easy order tracking', 'dav2' ) ?></li>
						<li><?php _e( 'Save shipping address', 'dav2' ) ?></li>
						<li><?php _e( 'Special offers', 'dav2' ) ?></li>
						<li><?php _e( 'Faster checkout', 'dav2' ) ?></li>
					</ul>
				</div>

                <div class="flexbtns">

                    <a class="btn btn-white" href="<?php echo adstm_home_url( 'register' ) ?>">
                        <?php _e( 'Create an account', 'dav2' ) ?>
                    </a>

                    <?php if( isset( $_REQUEST[ 'redirect' ] ) ) : ?>
                        <a class="btn btn-white" href="<?php echo $_REQUEST[ 'redirect' ] ?>/">
                            <?php _e( 'Continue as a guest', 'dav2' ) ?>
                        </a>
                    <?php endif; ?>
				</div>    
			</div>
		</div>
	</div>
</div>

<?php get_footer() ?>