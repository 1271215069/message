<template>
    <label class="KqmSwitch">
        <InlineXSwitch @on-change="change" v-model="SwitchVal"></InlineXSwitch>
        <span class="textLeft" v-if="SwitchVal">{{textLeft}}</span>
        <span class="textRight" v-else>{{textRight}}</span>
    </label>
</template>

<script>
    import { InlineXSwitch } from "vux"
    export default {
        name: "kqm-switch",
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
        },
        data(){
            return {
                SwitchVal:false
            }
        },
        methods:{
            change(value){
                this.$emit('on-change',value);
            }
        },
        mounted(){
            this.$emit('on-change',this.SwitchVal);
        }
    }
</script>

<style scoped lang="less">
.KqmSwitch{
        position: relative;
        height: 32px;
        display: inline-block;
        @pa:15px;
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