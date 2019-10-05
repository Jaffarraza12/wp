import App from './components/select-address/select-address';
import Vue from 'vue';

const addressAuto = function () {
    return {
        init(){
            jQuery('#city').closest('.field').append('<div id="select-address"/>');
            new Vue({
                el: '#select-address',
                ...App
            });
            return this;
        }
    }
};


export default addressAuto();