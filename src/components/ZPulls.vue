<template>
    <div class="ZPulls">
        <pulls ref="pulls" :is-throttle-scroll="false" v-if="list.length != 0" @bottom-state-change="stateChange" :is-top-bounce="isTopBounce" :bottom-load-method="done" :top-load-method="topDone">
            <slot></slot>
            <div slot="bottom-block" v-if="showBottom">
                <box gap="15px">
                    <divider>我是有底线的</divider>
                </box>
            </div>
            <span class="notData mg" v-if="!showBottom && showBottomMsg">上拉加载更多</span>
        </pulls>
        <div v-else>
            <span class="notData">{{msg}}</span>
        </div>
    </div>
</template>

<script>
    import pulls from "vue-pull-to"
    import { Box, Divider } from 'vux'
    export default {
        name: "z-pulls",
        components:{ Box, pulls, Divider },
        props:{
            msg:{
              type:String,
              default:"无数据！"
            },
            isTopBounce:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                showBottomMsg:true,
            }
        },
        methods:{
            touchstart(){
                this.showBottomMsg = false;
            },
            touchend(){
                setTimeout(()=>{
                    this.showBottomMsg = true;
                },400);
            },
            stateChange(val){
                if(val == "pull"){
                    this.showBottomMsg = false;
                };
                this.$refs.pulls.scrollEl.addEventListener('touchstart', this.touchstart);
                this.$refs.pulls.scrollEl.addEventListener('touchend', this.touchend);
            },
            done(done){
                try {
                    if(this.$refs.pulls){
                        this.$refs.pulls.scrollEl.removeEventListener('touchstart', this.touchstart);
                        this.$refs.pulls.scrollEl.removeEventListener('touchend', this.touchend);
                    }
                }catch (e){}
                setTimeout(()=>{
                    this.showBottomMsg = true;
                },500);
                if(this.showBottom){
                    if(done){
                        done("done");
                    }
                    return;
                }
                this.$emit("done",done);
            },
            topDone(done){
                this.$emit("topDone",done);
            }
        },
        computed:{
            showBottom(){
                return (this.max && this.list.length >= this.max);
            },
            list(){
                if(this.$parent.list && Array.isArray(this.$parent.list)){
                    if(this.$parent.list.length > 0){
                        this.$vux.loading.hide();
                    }
                    return this.$parent.list;
                }else {
                    console.error("【ZPulls警告】：父组件的list必须声明为数组");
                    return [];
                };
            },
            max(){
                return this.$parent.max;
            }
        },
        mounted(){
            this.$vux.loading.show("加载中");
            this.done();
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/vars";
.ZPulls{
    overflow: hidden;
    .title{
        color: @col-888888;
        padding: 0 @pa*2;
        margin-top: @mg;
    }
    .notData{
        color: @col-888888;
        text-align: center;
        display: block;
        margin-top: 50px;
        &.mg{
            margin-top: 20px;
        }
    }
}
</style>