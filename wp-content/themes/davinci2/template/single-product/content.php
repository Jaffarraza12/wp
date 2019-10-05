<?php

global $post;

$review  = adsTmpl::review();
$product = adsTmpl::product();

?>
<?php if( cz( 'tp_tab_item_details' ) || cz( 'tp_tab_item_specifics' ) || cz( 'tp_tab_shipping' ) ) : ?>
<div class="subitem-nav">
	<ul class="nav nav-tabs">
        <?php if( cz( 'tp_tab_item_details' ) ) : ?>
		<li>
            <a class="active" data-toggle="tab" href="#item-details">
                <?php _e( 'Product Details', 'dav2' ) ?>
            </a>
        </li>
        <?php endif; ?>
		
        <?php if( cz( 'tp_tab_item_specifics' ) ) : ?>
			<li>
                <a data-toggle="tab" href="#item-specs">
                    <?php _e( 'Item Specifics', 'dav2' ) ?>
                </a>
            </li>
		<?php endif; ?>
  
		<?php if( cz( 'tp_tab_shipping' ) ) : ?>
			<li>
                <a data-toggle="tab" href="#item-returns">
                    <?php _e( 'Shipping & Payment', 'dav2' ) ?>
                </a>
            </li>
		<?php endif; ?>
	</ul>
</div>

<div class="tab-content">
    <?php if( cz( 'tp_tab_item_details' ) ) : ?>
        <div id="item-details" class="content tab-pane fade active show">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent=".tab-pane" href="#acc-item-details">
                            <?php _e( 'Product details', 'dav2' ) ?>
                        </a>
                    </h4>
                </div>
                <div id="acc-item-details" class="panel-collapse collapse show">
                    <div class="panel-body">
                        <?php get_template_part( 'template/single-product/tab/_details' ) ?>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
	<?php if( cz( 'tp_tab_item_specifics' ) ) : ?>
		<div id="item-specs" class="content tab-pane fade">
			<div class="panel panel-default">
				<div class="panel-heading">
				  <h4 class="panel-title">
					<a class="collapsed" data-toggle="collapse" data-parent=".tab-pane" href="#acc-item-specs">
					  <?php _e( 'Item Specifics', 'dav2' ) ?>
					</a>
				  </h4>
				</div>
				<div id="acc-item-specs" class="panel-collapse collapse">
					<div class="panel-body">
						<?php get_template_part( 'template/single-product/tab/_specifics' ) ?>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>
 
	<?php if ( cz( 'tp_tab_shipping' ) ) : ?>
		<div id="item-returns" class="content tab-pane fade">
			<div class="panel panel-default">
				<div class="panel-heading">
				  <h4 class="panel-title">
					<a class="collapsed" data-toggle="collapse" data-parent=".tab-pane" href="#acc-item-returns">
					  <?php _e( 'Shipping & Payment ', 'dav2' ) ?>
					</a>
				  </h4>
				</div>
				<div id="acc-item-returns" class="panel-collapse collapse">
					<div class="panel-body">
						<?php get_template_part( 'template/single-product/tab/_shipping' ) ?>	
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>
 
</div>
<?php endif; ?>