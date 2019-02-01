<template>
    <label class="LSwitch">
        <div class="Lmask" @click="lclick"></div>
        <InlineXSwitch @on-change="change" v-model="checkval" :disabled="true"></InlineXSwitch>
        <span class="textLeft" v-if="checkval">{{textLeft}}</span>
        <span class="textRight" v-else>{{textRight}}</span>
    </label>
</template>

<script>
    import { InlineXSwitch } from "vux"
    export default {
        name: "l-switch",
        components:{ InlineXSwitch },
        props:{
            textLeft:{
                type:String,
                default:null
            },
            textRight:{
                type:String,
                default:null
            },
            checkval:{
                type:Boolean,
                default:false
            },
        },
        data(){
            return {
                // SwitchVal:this.checkval
            }
        },
        methods:{
            change(value){
                this.$emit('on-change',value);
            },
            lclick(){
                this.$emit('on-click');
            }
        },
        mounted(){
            this.$emit('on-change',this.checkval);
        }
    }
</script>

<style scoped lang="less">
.LSwitch{
        position: relative;
        height: 32px;
        display: inline-block;
        @pa:15px;
        .Lmask{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 6px;
            z-index: 1000;
        }
        .textLeft{
            position: absolute;
            width: 100%;
            height: 100%;
            left: @pa;
            top: 0;
            font-size: 16px;
            text-align: left;
            line-height: 32px;
            color: #fff;
        }
        .textRight{
            .textLeft;
            text-align: right;
            left: -@pa;
            color: #f00;
        }
        input{
            width: 72px;
            &:before{
                width: 70px;
            }
            &:checked{
                &:after{
                    transform: translateX(40px);
                }
            }
        }
    }
</style>