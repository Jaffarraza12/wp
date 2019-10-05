<?php
/**
 * return time actions end of js clock
 * format time 2015/09/15
 *
 * @param bool $return_data
 *
 * @return bool|string
 * @internal param bool $return
 */
function adstm_clock_time( $return_data = false ) {
	
	$tp_countdown_time_enable = cz('tp_countdown_time_enable');
    $tp_countdown_days = cz('tp_countdown_days');
    $tp_countdown_hours = cz('tp_countdown_hours');
    $tp_countdown_minutes = cz('tp_countdown_minutes');


	if($tp_countdown_time_enable && $tp_countdown_days>-1){
        $now          = strtotime( "now +2 minutes" );
        $next_tuesday = strtotime( "now +".$tp_countdown_days." days" );

        $time_dif = $next_tuesday - $now;

        if ( $time_dif <= 0 ) {
            $next_tuesday = $next_tuesday + 86400;    // 1 week = 604800
        }
    }else{
        $now          = strtotime( "now +4 hours 2 minutes" );
        $next_tuesday = strtotime( "next Tuesday +4 hours 2 minutes" );

        $time_dif = $next_tuesday - $now;

        if ( $time_dif <= 0 ) {
            $next_tuesday = $next_tuesday + 604800;    // 1 week = 604800
        }
    }



	$data_end_actions = date( 'Y/m/d', $next_tuesday );

	if ( $return_data ) {
		return $data_end_actions;
	}

	echo $data_end_actions;
	
	return null;
}
