<template>
    <div class="ZXDialog">
        <x-dialog @on-show="onShow" @on-hide="onHide" v-model="show" mask-transition hide-on-blur>
            <div class="content">
                <box gap="30px">
                    <div v-if="img" >
                        <img class="img" :src="img">
                    </div>
                    <h4 class="title" v-if="title">{{title}}</h4>
                    <div class="text" v-if="text">{{text}}</div>
                </box>
                <div class="close iconfont" @click="close">&#xe640;</div>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import { XDialog, Box } from "vux"
    export default {
        name: "z-x-dialog",
        components:{ XDialog, Box },
        props:{
            img:String,
            text:String,
            title:String,
        },
        data(){
            return {
                show:false,
            }
        },
        methods:{
            close(){
                this.show = false;
            },
            onShow(){
                this.$emit('on-show');
            },
            onHide(){
                this.$emit('on-hide');
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/vars";
.ZXDialog{
    .content{
        background-color: @cor_ffffff;
        margin: auto;
        position: relative;
        overflow: hidden;
        text-align: center;
        .close{
            position: absolute;
            right: 0;
            top: 0;
            @z:30px;
            width: @z;
            height: @z;
            text-align: center;
            line-height: @z;
            font-size: 18px;
            cursor: pointer;
        }
        .img{
            width: 50px;
            height: 50px;
            text-align: center;
            display: inline-block;
        }
        .text{
            font-size: 14px;
            margin-top: @mg;
            width: 80%;
            display: inline-block;
        }
    }
}
</style>