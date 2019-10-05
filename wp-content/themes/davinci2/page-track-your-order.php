<?php get_header();?>

	<div class="container">

        <div class="breadcrumbs"><?php adsTmpl::breadcrumbs() ?></div>
		
		<div class="trackcont">
			<h1 class="superH1 text-uppercase"><?php _e( 'Track your order', 'dav2' ) ?></h1>
			<div class="trackform">
				<form action="" method="post" id="tracking-form" class="nicelabel">
					<div class="form-group is-empty">
						<input type="text" id="YQNum" class="form-control">
						<label for="YQNum"><?php _e( 'Enter your tracking number', 'dav2' ) ?></label>
					</div>
					<div class="form-group is-not-empty">
						<button type="submit" class="btn submit-review angleswitch" onclick="doTrack()">
                            <span><?php _e( 'Search', 'dav2' ) ?></span><i class="fas fa-angle-right"></i>
                        </button>
					</div>
				</form>
			</div>
			<div class="trackframe">
				<div id="YQContainer"></div>

                <script type="text/javascript" src="//www.17track.net/externalcall.js"></script>
                <script type="text/javascript">
                    function doTrack() {
                        var num = document.getElementById("YQNum").value;
                        if(num === ""){
                            window.ADS.notify("Enter your tracking number")
                            return;
                        }
                        YQV5.trackSingle({
                            YQ_ContainerId:"YQContainer",
                            YQ_Height:600,
                            YQ_Fc:"0",
                            YQ_Lang:"en",
                            YQ_Num:num
                        });
                        return false;
                    }
                </script>
			</div>
		</div>
	</div>
<?php get_footer();?>