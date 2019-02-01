<template>
    <div class="verification">
        <p class="console-PageTitle">登陆二次验证</p>
        <div class="varcontainer">
            <div class="varcontent">
                <div class="vartext">
                    <p class="title">温馨提示：</p>
                    <p>1、为了保障您的账户安全，一些敏感的操作会触发二次验证，我们会通过核对手机验证码等形式来确保操作者可信</p>
                    <p>2、开启登录二次验证后，至少选择一个手机号码</p>
                    <p>3、被选择的号码，可用于登录时候接收二次校验的手机验证码</p>
                    <p class="sign"><span class="iconfont">&#xe832;</span>注：每次开启、关闭或选择二次验证手机号的时候会发送验证码到：{{tel}} (即注册绑定的手机号)</p>
                </div>
                <div class="varswitch">
                    <div>账户UID：{{uid}}</div>
                    <div>开启验证：<l-switch @on-click="chenkclick" @on-change="chenkchange" :checkval="checked" textLeft="on" textRight="off" class="sw"></l-switch></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import consoleVue from "../../components/index"
import { XButton,XDialog,  } from "vux"
export default {
    name:"verification",
    components:{
        XButton,XDialog,...consoleVue},
    data(){
        return{
            tel:"15912345555",
            uid:"15912345555",
            checked:true,
            maskshow:false,
            yzm:"",
        }
    },
    methods:{
        chenkchange(val){//开关的change事件
            // console.log(val)
        },
        chenkclick(){//点击开关的方法
            this.$ZAlert.show({
                components:"Console/Pages/alert/Verification",
                title:"温馨提示",
                props:{
                    checked:this.checked,
                    vm:()=>this
                }
            });
        }
    },
    watch:{
        checked(){

        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.verification{
    box-sizing: border-box;
    padding: 0 20px;
    .varcontainer{
        border-top:1px solid @col-999999;
        .varcontent{
            background: #fff;
            box-sizing: border-box;
            padding: 25px 0;
            margin-top: 20px;
            .vartext{
                box-sizing: border-box;
                padding: 0 40px 25px;
                border-bottom: 1px solid @col-999999;
                p{
                    color:@col-999999;
                    line-height: 40px;
                    font-size: 16px;
                }
                .title{
                    font-size: 16px;
                    font-weight: 600;
                    color: #000;
                }
                .sign{
                    color: @col-ff6600;
                    font-size: 14px;
                    span{
                        font-size: 20px;
                        margin-right: 7px;
                    }
                }
            }
            .varswitch{
                box-sizing: border-box;
                padding: 25px 40px 0;
                div{
                    & /deep/ .sw{
                        transform: translateY(30%);
                        line-height: 63px;
                        input{
                            border: 1px solid #339933;
                            &:checked{
                                background-color: #339933;
                                border-color: #339933;
                                &:after{
                                    background-color: #fff;
                                }
                            }
                            &:after{
                                top: 5px;
                                left: 5px;
                                width: 20px;
                                height: 20px;
                                background-color: #339933;
                            }
                        }
                        .textLeft{
                            line-height: 39px;
                        }
                        .textRight{
                            line-height: 43px;
                            color: #339933;
                        }
                    }
                }
            }
        }
    }
}
</style>
