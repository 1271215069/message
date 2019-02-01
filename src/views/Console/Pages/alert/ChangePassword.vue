<template>
    <div class="AccountBuildPhone console-PagePadding">
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">&nbsp;</span>用户名
                </div>
                <div>
                    <x-input class="XInput" placeholder="请输入手机号码"></x-input>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>原始密码
                </div>
                <div>
                    <x-input class="XInput" placeholder="请输入原始密码"></x-input>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>新密码
                </div>
                <div>
                    <x-input class="XInput" placeholder="请输入原始密码"></x-input>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    &nbsp;
                </div>
                <div>
                    <ul class="types">
                        <li class="text">密码强度</li>
                        <li class="type11">弱</li>
                        <li class="type21">中</li>
                        <li class="type31">强</li>
                    </ul>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>确认密码
                </div>
                <div>
                    <x-input class="XInput" placeholder="请输入原始密码"></x-input>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">&nbsp;</span>
                </div>
                <div>
                    <x-button class="XButton themeXButton r">确认修改</x-button>
                </div>
            </z-flexbox-item>
        </z-flexbox>

    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XButton, XInput, Selector } from "vux"
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: " change-password",
        components:{
            ZFlexboxItem,
            ZFlexbox,
            Flexbox, FlexboxItem, XButton, XInput, Selector },
        data(){
            return {
                graphlist:[
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                ],
            }
        },
        methods:{
            back(){
                this.$ZAlert.show({
                    maxWidth:"700px",
                    title:"重新绑定手机",
                    components:"Console/Pages/alert/AccountBuild",
                });
            }
        }
    }
</script>

<style scoped lang="less">
.AccountBuildPhone{
    font-size: 14px;
    .row{
        line-height: 40px;
        margin: @pa 0;
        text-align: left;
        .r{
            color: #f00;
            margin-right: @mg;
        }
        .XInput{
            display: block;
            line-height: 40px;
            height: 40px;
            padding-top: 0;
            padding-bottom: 0;
            border-bottom: 1px solid #CCCCCC;
        }
        .selector{
            .XInput;
            float: left;
            margin-right: 1%;
            padding: 4px 0;
            width: 100%;
        }
        .codeimg{
            .XInput;
            width: 100%;
            cursor: pointer;
        }
        .XButton{
            width: 120px;
            margin: 0;
            font-size: 14px;
            &.r{
                color: @cor_ffffff;
            }
        }
        .codeBtn{
            width: 100%;
        }
    }
    .btnBox{
        width: 80%;
        margin: auto;
        margin-bottom: 30px;
        .XButton{
            cursor: pointer;
            &.r{
                border-radius: 0;
            }
        }
    }
    .types{
        overflow: hidden;
        li{
            float: left;
            color: @cor_ffffff;
            margin-right: @mg;
            font-size: 16px;
            padding:0 @pa;
            text-align: center;
            background-color: #CCCCCC;
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
                background-color: transparent;
                color: #CCCCCC;
                font-size: 14px;
            }
        }
    }
}
</style>