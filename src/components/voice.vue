<template>
    <div class="voice">
        <video class="video" v-if="bool" @ended="ended" controls="" autoplay="" name="media"><source :src="src" type="audio/mpeg"></video>
    </div>
</template>

<script>
    export default {
        name: "voice",
        data(){
            return {
                bool:true,
                text:"",
                index:0,
                contents:[],
            }
        },
        methods:{
            ended(){
                if(this.index < this.contents.length){
                    this.next(this.contents[this.index],false);
                    this.index += 1;
                }
            },
            next({text,time},indexBool = true){
                try {
                    if(this.bool){
                        if(indexBool){
                            this.contents.push({text,time});
                            this.index += 1;
                        }
                        this.text = text;
                        this.bool = false;
                        setTimeout(()=>{
                            this.bool = true;
                        },time)
                    }else {
                        this.contents.push({text,time});
                    }
                }catch (e){}
            }
        },
        computed:{
            src(){
                return $$rootUrl+'/Dome/voice?text='+this.text;
            }
        },
        mounted(){
            // this.next({text:"前方路口请直行",time:0});
            // this.next({text:"然后100米再左转",time:2000});
        }
    }
</script>

<style scoped lang="less">
.voice{
    width: 0;
    height: 0;
    overflow: hidden;
    .video{
        height: 0;
    }
}
</style>