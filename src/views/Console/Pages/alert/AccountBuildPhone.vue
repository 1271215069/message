<template>
    <div class="AccountBuildPhone console-PagePadding">
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>国家区号
                </div>
                <selector placeholder="国家区号" value="" class="selector XInput" :options="graphlist"></selector>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">&nbsp;</span> 手机号码
                </div>
                <div>
                    <x-input class="XInput" placeholder="请输入手机号码"></x-input>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>图形验证码
                </div>
                <flexbox>
                    <flexbox-item>
                        <x-input class="XInput" placeholder="请输入验证码"></x-input>
                    </flexbox-item>
                    <flexbox-item>
                        <img class="codeimg" :src="require('@/assets/img/about/bj.png')" alt="">
                    </flexbox-item>
                </flexbox>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>短信验证码
                </div>
                <flexbox>
                    <flexbox-item>
                        <x-input class="XInput" placeholder="请输入短信验证码"></x-input>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="XButton themeXButton r codeBtn">点击获取</x-button>
                    </flexbox-item>
                </flexbox>
            </z-flexbox-item>
        </z-flexbox>
        <flexbox class="btnBox">
            <flexbox-item>
                <x-button class="XButton themeXButton r">提交并验证</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button class="XButton r init" @click.native="back">重新选择</x-button>
            </flexbox-item>
        </flexbox>

    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XButton, XInput, Selector } from "vux"
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: "account-build-phone",
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
}
</style>