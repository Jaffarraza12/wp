import App from './17track/17track';
import Vue from 'vue';

const track17Info = function () {

    return {
        init(){
            jQuery('body').append('<div id="track17Info"/>');
            new Vue({
                el: '#track17Info',
                ...App
            });
        }
    }
};


export default track17Info();