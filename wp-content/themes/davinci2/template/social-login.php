<?php

$soc1 = new models\logmebaby\fb();
$soc3 = new models\logmebaby\tw();

$soc1link = $soc1->login_url('<i class="fab fa-facebook-f"></i>');
$soc3link = $soc3->login_url('<i class="fab fa-twitter"></i>');

if( $soc1link || $soc3link ) : ?>

    <div class="form-group">
        <div class="formsocs">
            <span><?php _e( 'Connect with', 'dav2' ) ?>:</span>
            <div class="socs whitesocs">
                <?php echo $soc1link . $soc3link ?>
            </div>
        </div>
    </div>

<?php endif;?>