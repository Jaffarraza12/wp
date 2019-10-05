<?php global $post; ?>

<?php if ( $post->post_content != '' ) : ?>

	<div class="content">

		<div class="wrap-content"><?php the_content() ?></div>

	</div>

<?php endif; ?>