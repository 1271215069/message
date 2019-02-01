<template>
    <div class="security console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">账号安全</div>
            <div class="content">
                <ul class="types">
                    <li class="text">安全等级</li>
                    <li class="type1">弱</li>
                    <li class="type2">中</li>
                    <li class="type3">强</li>
                </ul>
            </div>
        </div>
        <flexbox wrap="wrap" :gutter="0" class="listCard">
            <flexbox-item :span="1/2" class="listCardItem">
                <div class="listCardBox">
                    <div class="listCardContent">
                        <div class="listCardTitle">
                            <span class="iconfont">&#xe610;</span>
                            <span>登录密码</span>
                            <span class="msg">（密码强度<span class="type type1">弱</span>）</span>
                        </div>
                        <p class="text">安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码</p>
                        <x-button class="XButton themeXButton r" @click.native="password">修改密码</x-button>
                    </div>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" class="listCardItem">
                <div class="listCardBox">
                    <div class="listCardContent">
                        <div class="listCardTitle">
                            <span class="iconfont">&#xe669;</span>
                            <span>手机号码</span>
                            <span class="msg">（17316321915）</span>
                        </div>
                        <p class="text">该手机号用于接收登录提醒，登录验证码，余额提醒消息</p>
                        <x-button class="XButton themeXButton r" @click.native="build">重新绑定</x-button>
                    </div>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" class="listCardItem">
                <div class="listCardBox">
                    <div class="listCardContent">
                        <div class="listCardTitle">
                            <span class="iconfont">&#xe65a;</span>
                            <span>邮箱绑定</span>
                            <span class="msg">（未填写）</span>
                        </div>
                        <p class="text">验证后可接收系统推送的消息。</p>
                        <x-button class="XButton themeXButton r" @click.native="buildEmail">激活邮箱</x-button>
                    </div>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" class="listCardItem">
                <div class="listCardBox">
                    <div class="listCardContent">
                        <div class="listCardTitle">
                            <span class="iconfont">&#xe660;</span>
                            <span>登录提醒</span>
                            <span class="msg">（已关闭）</span>
                        </div>
                        <p class="text">登录时会收到短信提醒，及时了解非法、异地登录，预防账号被盗。</p>
                        <x-button class="XButton themeXButton r" @click.native="AccountRemind">开启提醒</x-button>
                    </div>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" class="listCardItem">
                <div class="listCardBox">
                    <div class="listCardContent">
                        <div class="listCardTitle">
                            <span class="iconfont">&#xe723;</span>
                            <span>登录验证</span>
                            <span class="msg">（未开启）</span>
                        </div>
                        <p class="text">开启的登录验证后，用户需要验证手机号码才可以登录。(国际需要选择区号,如001)</p>
                        <x-button class="XButton themeXButton r">开启验证</x-button>
                    </div>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" class="listCardItem">
                <div class="listCardBox">
                    <div class="listCardContent">
                        <div class="listCardTitle">
                            <span class="iconfont">&#xe723;</span>
                            <span>API密码验证</span>
                            <span class="msg">（未开启）</span>
                        </div>
                        <p class="text">开启后，查看/修改API密码须进行短信验证</p>
                        <x-button class="XButton themeXButton r">开启验证</x-button>
                    </div>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XButton } from "vux"
    export default {
        name: "security",
        components:{ Flexbox, FlexboxItem, XButton },
        methods:{
            password(){
                this.$ZAlert.show({
                    maxWidth:"500px",
                    title:"修改密码",
                    components:"Console/Pages/alert/ChangePassword",
                });
            },
            build(){
                this.$ZAlert.show({
                    maxWidth:"400px",
                    title:"重新绑定手机",
                    components:"Console/Pages/alert/AccountBuild",
                });
            },
            buildEmail(){
                this.$ZAlert.show({
                    maxWidth:"400px",
                    title:"激活邮箱",
                    props:{
                        showBtn:false,
                    },
                    components:"Console/Pages/alert/AccountBuildEmail",
                });
            },
            AccountRemind(){
                this.$ZAlert.show({
                    maxWidth:"400px",
                    title:"设置登录提醒",
                    components:"Console/Pages/alert/AccountRemind",
                });
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.security{
    .types{
        overflow: hidden;
        li{
            float: left;
            color: @cor_ffffff;
            margin-right: @mg;
            font-size: 16px;
            padding:0 @pa;
            text-align: center;
            &.type1{
                background-color: red;
            }
            &.type2{
                background-color:#ff6600*2;
            }
            &.type3{
                background-color: green;
            }
            &.text{
                color: #000;
                padding: 0;
            }
        }
    }
    .listCard{
        .listCardItem{
            .listCardBox{
                margin-top: @pa !important;
                padding-left: @pa/2;
                .listCardContent{
                    background-color: @cor_ffffff;
                    box-shadow: 0 0 10px @col-D8D8D8;
                    font-size: 16px;
                    padding: @pa;
                    .listCardTitle{
                        span{
                            &.iconfont{
                                color: #CCCCCC;
                            }
                            &.msg{
                                color: #999;
                                .type{
                                    padding:0 @pa;
                                    margin-left: @mg;
                                    color:@cor_ffffff;
                                    &.type1{
                                        background-color: red;
                                    }
                                    &.type2{
                                        background-color:#ff6600*2;
                                    }
                                    &.type3{
                                        background-color: green;
                                    }
                                }
                            }
                        }
                    }
                    .text{
                        font-size: 14px;
                        color: #999;
                        margin: @mg 0;
                        min-height: 66px;
                    }
                    .XButton{
                        width: auto;
                        margin: 0;
                        min-width: 120px;
                        font-size: 14px;
                    }
                }
            }
            &:nth-of-type(odd){
                .listCardBox{
                    padding-left: 0;
                    padding-right: @pa/2;
                }
            }
        }
    }
}
</style>