<template>
    <div v-if="open" class="track-modal"  @click="close">
        <div class="track-modal-content">

            <template v-if="loader">
                <div class="">loading</div>
            </template>
            <template v-else>
                <ul>
                    <li v-for="item in list">{{item.time}} - {{item.text}}</li>
                </ul>
            </template>
        </div>
    </div>
</template>

<script>

    function getTrack(Cookie) {

        return new Promise((resolve, reject)=>{
            jQuery.ajax({
                type: "POST",
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'Cookie': Cookie
                },
                data: JSON.stringify({"data":[{"num":"ZA468625093LV","fc":0,"sc":0}],"guid":"","timeZoneOffset":-360}),
                success: (data) => {
                    console.log(data);

                    resolve(data);
                }
            });
        })

    }

    function htmlToObj( html ) {
        var div = jQuery( '<div></div>' );
        return jQuery( div ).append( html );
    }

    function b64DecodeUnicode( str ) {
        return str ? window.Base64.decode( str ) : false;
    }

    export default {
        name: "17track",
        data(){
            return {
                list : [],
                status : [],
                url: '',
                open : false,
                loader : false,
            }
        },
        created() {

            jQuery('body').append('<iframe id="iframediv" :src="https://t.17track.net/" width="100%" height="500" style="position: absolute;left: -99999px;"></iframe>');

            let self = this;

            jQuery('body').on('click', '.js-track', function (e) {
                e.preventDefault();
                self.open = true;
                self.loader = true;
                self.trankInfo(jQuery(this).text());
            });


            window.addEventListener( "message", ( event ) => {
                console.log( 'addEventListener' );
                if ( event.source !== document.getElementById( "iframediv" ).contentWindow ) {
                    console.log( 'НЕ ПРИНИМАЮ message' );
                    return;
                }

                console.log( 'ПРИНИМАЮ message' );
                let request = event.data;
                if ( request.source && request.source === 'IFRAME_TO_PARENT' ) {
                    console.log( 'NAME_SOURCE_BG_FROM_IFRAME' );
                    console.log( request.action );
                    console.log( request.info );
                    if(request.action === 'html'){

                        getTrack(event.data.info.cookie).then((data)=>{
                            console.log(data);
                        });

                        let html = b64DecodeUnicode( event.data.info.html );
                        this.parseParams(htmlToObj( html ));
                    }

                    if(request.action === 'init'){
                        this.getHtml();
                    }

                }

            }, false );


        },
        methods:{

            parseParams(value){
                let list = [];

                value.find( '.tracklist-details .des-block dd' ).each((i, e)=>{
                    list.push({
                        time : jQuery(e).find('time').text(),
                        text : jQuery(e).find('p').text(),
                    });
                });
                console.log(list);
                this.list = list;
                this.loader = false;
            },
            getHtml(){
                document.getElementById( "iframediv" ).contentWindow.postMessage( {
                    source : 'PARENT_TO_IFRAME',
                    action : 'html',
                    info   : {
                        checkDom : '.tracklist-details'
                    }
                }, "*" );
            },
            trankInfo(num){
                jQuery('#iframediv').attr('src', `https://t.17track.net/#nums=${num.trim()}`);
            },
            close(){
                this.open = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .track-modal{
        height: 100%;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        border-bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 99999999999;
        display: flex;
        justify-content: center;
        align-items: center;
        .track-modal-content{
            background: #fff;
            display: block;
            width: 900px;
            height: 600px;
            margin: auto;
        }
    }
</style>