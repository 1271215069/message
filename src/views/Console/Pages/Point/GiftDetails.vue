<template>
    <div class="GiftDetails console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">
                礼品详情
                <ul class="left">
                    <li @click="$router.back()">返回上级</li>
                </ul>
            </div>
            <div class="content">
                <div class=contentBox>
                    <flexbox>
                        <flexbox-item class="left">
                            <img class="img" :src="require('@/assets/img/about/bj.png')">
                            <div class="minimg">
                                <div class="row" v-for="i in 3">
                                    <img class="imgObj" :src="require('@/assets/img/about/bj.png')">
                                </div>
                            </div>
                            <p class="msg">图片仅供参考，实际兑奖礼品请以实物为准</p>
                        </flexbox-item>
                        <flexbox-item class="right" :span="5/12">
                            <div class="rightBox">
                                <h2>“5秒到”短信包</h2>
                                <p>温馨提示：虚拟商品订单在每月1号和16号统一处理发放，请熟知！如有疑问，请拨打售后服务热线：400-9669-253</p>
                                <div class="msg msg1">
                                    <flexbox>
                                        <flexbox-item :span="1/4">
                                            <div>积分：</div>
                                        </flexbox-item>
                                        <flexbox-item>
                                            <div class="a">600000</div>
                                            <div>
                                                可用积分：
                                                <span class="b">0</span>
                                            </div>
                                        </flexbox-item>
                                    </flexbox>
                                </div>
                                <div class="x-number-box">
                                    <span>选择数量：</span>
                                    <x-number class="x-number" :value="1" :min="1"></x-number>
                                </div>
                                <div class="msg">
                                    <div>礼品概述：</div>
                                    本礼品扣除积分后将由对应商务协同处理，请您下单时备注所需产品类型</div>
                                <div class="msg">
                                    <div>礼品备注：</div>
                                    6000元10万条短信大礼包
                                </div>
                                <x-button class="XButton themeXButton">立即兑换</x-button>
                            </div>
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XNumber, XButton } from "vux"
    export default {
        name: "gift-details",
        components:{ Flexbox, FlexboxItem, XNumber, XButton }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.GiftDetails{
    .contentBox{
        border:1px solid #cccccc;
        padding: @mg;
        @media (min-width: 1200px) {
            width: 50%;
        }
        .left{
            .img{
                width: 100%;
                height: 300px;
                display: block;
            }
            .minimg{
                width: 100%;
                overflow: hidden;
                margin-top: 30px;
                .row{
                    float: left;
                    width: 50px;
                    height: 50px;
                    border:1px solid #999;
                    margin-right: 10px;
                    .imgObj{
                        width: 40px;
                        height: 40px;
                        margin-top: 5px;
                        margin-left: 5px;
                    }
                }
            }
            .msg{
                color: #cccccc;
                line-height: 40px;
                margin-top: 30px;
            }
        }
        .right{
            .rightBox{
                padding-left: 30px;
                .x-number-box {
                    overflow: hidden;
                    line-height: 40px;
                    span{
                        float: left;
                    }
                    .x-number {
                        float: left;
                        display: inline-block;
                        &:before {
                            border: none;
                        }
                    }
                }
                .msg{
                    background-color: @themeBj-color;
                    padding: @mg;
                    margin-top: @mg;
                    font-size: 14px;
                    div{
                        font-size: 12px;
                        margin-bottom: 5px;
                    }
                    &.msg1{
                        text-align: center;
                        .a{
                            font-size: 20px;
                            color: @themeColor;
                            font-weight: bold;
                        }
                        .b{
                            font-weight: bold;
                        }
                    }
                }
                .XButton{
                    margin-top: 30px;
                }
            }
        }
    }
}
</style>