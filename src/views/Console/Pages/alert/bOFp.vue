<template>
    <div class="bOFp console-PagePadding">
        <flexbox wrap="wrap" :gutter="0">
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">订单号</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">应用类型</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">财务类型</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">入账金额</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">优惠金额</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">实际金额</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">支付方式</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">支付状态</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
            <flexbox-item :span="1/2">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left">完成时间</div>
                        <div class="value">1111111111</div>
                    </z-flexbox-item>
                </z-flexbox>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: "b-o-fp",
        components:{
            ZFlexboxItem,
            ZFlexbox,
            Flexbox, FlexboxItem }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.bOFp{
    text-align: left;
    font-size: 14px;
    line-height: 60px;
    padding: @pa;
    cursor: default;
    color: #666;
    .lable{
        padding-right: @pa;
    }
    .value{
        border-bottom: 1px solid #cccccc;
        margin-right: @pa;
    }
}
</style>