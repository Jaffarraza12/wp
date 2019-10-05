<template>
    <div class="select-address" v-show="active && Object.keys( _items).length">
        <div class="select-address-item" v-for="(name, value) in _items" :key="value" @click="()=> select(name)" >{{name}}</div>
    </div>
</template>

<script>

    import _ from 'lodash';

    export default {
        props: {
        },
        data(){
            return{
                items : {},
                value : '',
                country : '',
                region : '',
                active : false,

            }
        },
        mounted() {

            jQuery('#city').on('focus', ()=>{
                this.active = true;
            });

            jQuery('#city').on('blur', ()=>{
                setTimeout(()=>{
                    this.active = false;
                }, 300)
            });

            jQuery('#city').on('mouseup keyup keypress input', ()=>{
                this.value = jQuery('#city').val();
            });

            jQuery('#country').on('change', ()=>{
                this.params();
            });

            jQuery('#js-cart-stateSelect').on('change', ()=>{
                this.params();
            });

            let id = setInterval(()=>{
                if(jQuery('[data-id="js-cart-stateSelect"]').is(":visible")){
                    clearInterval(id);
                    this.params();
                }
            })

        },
        computed:{
            _items(){
                if(!this.value){
                    return [];
                }

                return  _.filter(this.items, (i)=> this.value !== i && i.match(new RegExp( '^' + this.value, 'ig')) );
            }
        },
        methods:{
            params(){
                this.country = jQuery('#country').val();
                this.region = jQuery('#js-cart-stateSelect').val();
                this.city();
            },
            city(){

                jQuery.ajax({
                    url: alidAjax.ajaxurl,
                    type: "POST",
                    dataType: "json",
                    async: true,
                    data: {
                        action: "ads_city_list",
                        country: this.country,
                        region: this.region,
                    },
                    success: (data) => {
                        this.items = !jQuery.isArray(data) ? data : [];
                    }
                });
            },
            select(value){
                this.active = false;
                this.value = value;
                jQuery('#city').val(value).focus().change().blur();
            }
        }

    };
</script>


<style lang="scss">
    .select-address{
        position: absolute;
        max-height: 300px;
        overflow: auto;
        background: #fff;
        display: block;
        left: 0;
        right: 0;
        z-index: 999;
        top: 100%;
        margin-top: 2px;
        border: 1px solid #ccc;
        box-shadow: 0 0 4px #ccc;
        border-radius: 2px;
    }
    .select-address-item{
        cursor: pointer;
        padding: 6px 10px;

        &:hover{
            background: #ddd;
        }
    }
</style>