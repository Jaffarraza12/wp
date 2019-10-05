<?php

/**
 * User: sunfun
 * Date: 03.09.16
 * Time: 22:44
 */
class adstm_instagram
{

    private $userName;

    public $size = 'thumbnail';

    const ID_WIDGET = 'ADS_WIDGET_INSTAGRAM';
    const TIME_WIDGET = 'ADS_WIDGET_INSTAGRAM_TIME';

    public function __construct($userName)
    {
        if (!empty($userName))
            $this->userName = $userName;
    }


    /**
     * @return array|bool
     */
    public function params()
    {
        $foo = $this->data();

        /* Disable formatting for new instagram widget html */

        if(isset($foo['thumbnail']) && $foo['thumbnail']){
            $foo['images'] = array_map(function ($img) {
                return $this->formatImage($img);
            }, $foo['thumbnail']);
        }

        return $foo;
    }

    private function formatImage($url)
    {
        $format = [
            'thumbnail' => 0,//150
            '240' => 2,//240
            'low' => 2,//320
            'standard' => 3,//480
            'high' => 4//640
        ];

        return $url[$format[$this->size]]['src'];
    }

    public function setData($json){

        $NewParams = $this->paramsInst($json);
        if ($NewParams) {
            $this->setCache($NewParams);
        }

        return $NewParams;
    }

    private function data()
    {
        $params = $this->getCache();

        if($params && get_transient(self::TIME_WIDGET) ){
            return $params;
        }

        $NewParams = $this->getParams();

        if ($NewParams) {
            $this->setCache($NewParams);
            return $NewParams;
        }

        return $params;
    }

    private function getParams()
    {
        $html = $this->loadIframe();

        return $this->parseParams($html);
    }

    private function getCache()
    {
        return get_option(self::ID_WIDGET);
    }

    private function setCache($params)
    {
        update_option(self::ID_WIDGET, $params, true);
        return set_transient(self::TIME_WIDGET, 1, 12 * HOUR_IN_SECONDS);
    }

    static public function clearCache()
    {
        delete_transient(self::TIME_WIDGET);
        delete_option(self::ID_WIDGET);
    }

    private function paramsInst($json){

        $foo = [
            'images' => [],
            'photos' => false,
            'followers' => false,
            'thumbnail' => [],
        ];

        if(!isset($json['entry_data']['ProfilePage'][0]['graphql']['user']['edge_followed_by']['count'])){
            return false;
        }

        $foo['followers'] = $json['entry_data']['ProfilePage'][0]['graphql']['user']['edge_followed_by']['count'];

        if(!isset($json['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['count'])){
            return false;
        }

        $foo['photos'] = $json['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['count'];

        $edges = $json['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['edges'];

        if(!$edges){
            return false;
        }

        foreach ($edges as $k=>$v){
            $foo['images'][] = $v['node']['display_url'];
            $foo['thumbnail'][] = $v['node']['thumbnail_resources'];
        }

        return $foo;
    }

    private function parseParams($html)
    {



        if (preg_match('/window\._sharedData\s*=\s*(.*)<\/script>/Uiu', $html, $match)) {

            $data = trim(trim($match[1]), ';');

            $json = json_decode($data, true);

            return $this->paramsInst($json);
        }

        return false;
    }

    private function loadIframe()
    {

        $response = wp_remote_get('https://www.instagram.com/'.$this->userName.'/');

        if (is_array($response) && !is_wp_error($response)) {
            return $response['body'];
        }

        return false;
    }
}

function adstm_instagram_html(){
    $in =  new adstm_instagram('');
    $data = isset($_POST['data']) ? $_POST['data'] : [];
    $NewParams =  $in->setData($data);

    echo json_encode( ['text' => __('Your Instagram images have been updated', 'ami3'), 'NewParams' => $NewParams]);die;
}
add_action( 'wp_ajax_adstm_instagram_html', 'adstm_instagram_html');


/*function replace_unicode_escape_sequence($match) {
    return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
}
function unicode_decode($str) {
    return preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', $str);
}*/