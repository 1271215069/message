<template>
    <div class="AccountBuild console-PagePadding">
        <flexbox>
            <flexbox-item class="row" @click.native="buildPhone">
                <div class="iconfont">&#xe669;</div>
                <p class="text">手机验证</p>
                <div class="XButtonBox">
                    <x-button class="XButton themeXButton r">选择</x-button>
                </div>
            </flexbox-item>
            <flexbox-item class="row" @click.native="buildEmail">
                <div class="iconfont icon1">&#xe65d;</div>
                <p class="text">邮箱验证</p>
                <div class="XButtonBox">
                    <x-button class="XButton themeXButton r">选择</x-button>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XButton } from "vux"
    export default {
        name: "account-build",
        components:{ Flexbox, FlexboxItem, XButton },
        methods:{
            buildPhone(){
                this.$ZAlert.show({
                    maxWidth:"400px",
                    title:"安全验证",
                    components:"Console/Pages/alert/AccountBuildPhone",
                });
            },
            buildEmail(){
                this.$ZAlert.show({
                    maxWidth:"400px",
                    title:"安全验证",
                    components:"Console/Pages/alert/AccountBuildEmail",
                });
            }
        }
    }
</script>

<style scoped lang="less">
.AccountBuild{
    .row{
        cursor: pointer;
        .text{
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .iconfont{
            font-size: 70px;
            text-align: center;
            color: #CCCCCC;
            width: 100%;
            &.icon1{
                font-size: 50px;
            }
            line-height: 70px;
            margin: 40px 0 @pa 0;
        }
        .XButtonBox{
            height: 80px;
            margin-top: @pa;
            .XButton{
                width: auto;
                padding: 0 @pa;
                display: none;
            }
        }
        &:hover{
            .iconfont{
                color: @themeColor;
            }
            .XButton{
                display: block;
            }
        }
    }
}
</style>