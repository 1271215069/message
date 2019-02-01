<template>
    <div class="UserEditApp console-PagePadding">
        <div class="console-PageTitle">应用管理编辑</div>
        <div class="UserEditAppBox">
            <z-flexbox>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">应用Ak：</div>
                    <div class="UserEditAppBox—right">
                        asdasdasdasdasdas
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">应用名称：</div>
                    <div class="UserEditAppBox—right">
                        腾讯视频
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">应用类型：</div>
                    <div class="UserEditAppBox—right">
                        服务端
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布版SHA1：</div>
                    <div class="UserEditAppBox—right">
                        <x-input class="input" placeholder="BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA"></x-input>
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">开发版SHA1：</div>
                    <div class="UserEditAppBox—right">
                        <x-input class="input" placeholder="请输入开发版SHA1"></x-input>
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">*包名：</div>
                    <div class="UserEditAppBox—right">
                        <x-input class="input" placeholder="com.pack.name"></x-input>
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">安全码：</div>
                    <div class="UserEditAppBox—right">
                        <x-input class="input" placeholder="BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA:BA"></x-input>
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">&nbsp;&nbsp;</div>
                    <div class="UserEditAppBox—right">
                        <p>Android SDK端安全码组成：SHA1+包名。（查看详细配置方法）</p>
                        <p>新申请的Modile与Brower类型的ak不再支持云存储接口的访问，</p>
                        <p>如要使用云存储，请申请Sercer类型ak。</p>
                    </div>
                </z-flexbox-item>
                <z-flexbox-item class="row">
                    <div slot="left" class="UserEditAppBox—left">&nbsp;</div>
                    <div class="UserEditAppBox—right">
                        <x-button class="btn x-button-t">提交认证</x-button>
                    </div>
                </z-flexbox-item>
            </z-flexbox>
        </div>
    </div>
</template>

<script>
    import CCS from "../../components/index"
    import { Flexbox, FlexboxItem, XButton, XInput } from "vux"
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: "user-edit-app",
        components:{
            ZFlexboxItem,
            Flexbox, FlexboxItem, ...CCS, XButton, XInput }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.UserEditApp{
    .UserEditAppBox{
        background-color: @cor_ffffff;
        padding: @pa;
        color: @col-999999;
        line-height: 50px;
        font-size: 14px;
        .row{
            margin-bottom: @mg;
            .UserEditAppBox—left{
                text-align: right;
            }
            .UserEditAppBox—right{
                margin-left: @mg;
                .input{
                    border:2px solid @col-999999;
                    line-height: 10px;
                    width: 400px;
                    color: initial;
                }
                p{
                    line-height: initial;
                    font-size: 12px;
                }
                .btn{
                    margin-top: 20px;
                }
            }
        }

    }
}
</style>