<template>
    <div class="UserInfo console-PagePadding">
       <p class="console-UserInfoTitle">
           <span class="iconfont">&#xe622;</span>
           欢迎您，<span class="userName">用户名XXXXX</span>
       </p>
        <user-card  :data="list"></user-card>
        <!--<p class="console-UserInfoTitle bottom">已申请的数据（0）</p>-->
        <!--<div class="flexbox">-->
            <!--<user-data-card ma="10px" class="flexbox-item"></user-data-card>-->
            <!--<user-data-card @click.native="$utils.go('/AddData',$router)" ma="10px" type="add" class="flexbox-item"></user-data-card>-->
        <!--</div>-->
        <div class="console-card">
            <div class="console-PageTitleV2">我的产品</div>
            <div class="content">
                <div class="productList">
                    <div class="row" v-for="i in 5">
                        <z-flexbox>
                            <z-flexbox-item span="80px">
                                <div slot="left" class="left">
                                    <div class="icon iconfont">&#xe655;</div>
                                    <x-button class="XButton themeXButton">进入应用</x-button>
                                </div>
                                <div class="right">
                                    <h3>验证码通知短信</h3>
                                    <p>啊大大阿萨打算打阿萨啊大大阿萨打算打阿萨</p>
                                    <div>条数：203条</div>
                                </div>
                            </z-flexbox-item>
                        </z-flexbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ConsoleComponents  from "../../components/index.js"
    import { Flexbox, FlexboxItem, XButton } from "vux"
    import UserDataCard from "../../components/UserDataCard";
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: "user-info",
        components:{
            ZFlexboxItem,
            ZFlexbox,
            UserDataCard,
            Flexbox, FlexboxItem, XButton, ...ConsoleComponents },
        data(){
            return {
                list:[
                    {
                        icon:"&#xe60b;",
                        title:"实名认证",
                        btn:"点击去认证",
                        text:"● 实名认证",
                        list:[
                            {name:"未认证",value:"11",row:"1"},
                            {name:"认证中",value:"11",row:"2"},
                            {name:"已认证",value:"11",row:"3"},
                        ],
                        type:"1"
                    },
                    {
                        icon:"&#xe696;",
                        title:"账户余额（元）",
                        money:"1886.00",
                        btn:"充值",
                        btn2:"索要发票",
                        type:"2"
                    },
                    {
                        icon:"&#xe61d;",
                        title:"会员",
                        moneyStr:"免费会员",
                        text2:"会员积分",
                        textVal:"500",
                        btn:"升级会员",
                        btn2:"会员积分兑换",
                        type:"3"
                    },
                    {
                        icon:"&#xe639;",
                        title:"数据积分-总计",
                        moneyStr:"1200",
                        type:"4"
                    },
                    {
                        title:"专属客户经理",
                        moneyStr:"张山",
                        moneyText:"18768527014",
                        type:"5",
                        QR:require('@/assets/img/about/bj.png')
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.UserInfo{
    .flexbox{
        overflow: hidden;
        .flexbox-item{
            margin-bottom: @mg;
            width: 30%;
            float: left;
        }
    }
    .productList {
        margin-top: @pa;
        overflow: hidden;
        padding: 5px;
        .row {
            float: left;
            margin-bottom: @pa;
            margin-right: @pa;
            box-shadow: 0 0 5px #e5e5e5;
            padding: @mg;
            width: 350px;
            width: ~"calc((100% - 60px)/3 - 20px)";
            cursor: pointer;
            @media (max-width: 1200px) {
                width: ~"calc((100% - 30px)/2 - 20px)";
                &:nth-of-type(even) {
                    margin-right: 0;
                }
            }
            @media (min-width: 1200px) {
                &:nth-of-type(3n+0) {
                    margin-right: 0;
                }
            }
            .left{
                .icon{
                    width: 75px;
                    height: 75px;
                    text-align: center;
                    line-height: 75px;
                    font-size: 30px;
                    box-shadow: 0 0 5px  #ccc;
                    color:  @themeColor+255/5;
                    border-radius: 100%;
                    margin: auto;
                    margin-top: 5px;
                    margin-bottom: 30px;
                }
                .XButton{
                    font-size: 12px;
                    border-radius: 0;
                    background-color: @themeColor+255/5;
                }
            }
            .right{
                padding-left: 20px;
                h3{
                    color: #999;
                }
                p{
                    color: #999;
                    font-size: 14px;
                    margin: 20px 0;
                }
                div{
                    font-size: 16px;
                }
            }
            &:hover{
                box-shadow: 0 0 5px #e5e5e5, inset 0 0 0 2px @themeColor;
                .left{
                    .icon{
                        color: @themeColor;
                    }
                    .XButton{
                        background-color: @themeColor;
                    }
                }
                .right{
                    h3{
                        color: @themeColor;
                    }
                    p{
                        color: @themeColor;
                    }
                }
            }
        }
    }
}
</style>