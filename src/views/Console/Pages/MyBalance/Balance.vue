<template>
    <div class="Balance">
        <div class="money">
            <span>我的余额</span>
            <div class="money_detail">
                <ul>
                    <li class="yue">账户余额 :  <span>￥{{'66600.00' | moneyFormat}}</span></li>
                    <li class="switch"><span>余额预警 :  </span>
                        <kqm-switch textLeft="on" textRight="off" class="sw"></kqm-switch>
                    </li>
                </ul>
                <ul>
                    <li class="dongjie">冻结资金 : <span>￥{{'6600.00' | moneyFormat}}</span></li>
                </ul>
            </div>
        </div>
        <div class="pay">
            <span class="online">在线支付</span>
            <div class="pay_detail">
                <ul>
                    <li><span class="minTitle">充值金额 : </span>500</li>
                    <li>
                        <span class="minTitle">在线支付 : </span>
                        <div class="payonline">
                            <span class="iconfont iconfont1">&#xe611;</span>
                            <span class="iconfont iconfont2">&#xe60f;</span>
                            <span class="icon iconfont iconfont3">&#xe842;</span>
                        </div>
                    </li>
                    <li><XButton class="button">充值</XButton>请先完成实名认证，去认证</li>
                    <li class="text">2015年09月01日起通过支付宝在线充值、银行卡在线充值的金额如果用于话费、流量、加油卡、游戏等充值类接口，按笔扣取1%的手续费，首次手续费用不定期统一按笔扣除，后续即时扣除，请知悉！
                        银行转账或支付宝转账0手续费，如有疑问请联系在线客服。</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import consoleVue from "../../components/index"
    import { XButton } from "vux"
    export default {
        name: "balance",
        components:{ XButton,...consoleVue},
        mounted(){
        }
    }

</script>

<style scoped lang="less">
.Balance{
    margin-left: 30px;
    .money{
        span{
            font-size: 24px;
            color: #ff6600;
        }
        .money_detail{
            margin-right: 150px;
            background-color: #fff;
            ul{
                margin-left: 60px;
                li{
                    display: inline-block;
                    margin-right: 120px;
                    font-size: 14px;
                    overflow: hidden;
                    &.yue{
                        color: #ff6600;
                        span{
                            font-size: 36px;
                        }
                    }
                    &.switch{
                        overflow: hidden;
                        span{
                            float: left;
                            line-height: 47px;
                            font-size: 14px;
                            margin-right: 10px;
                            color: #339933;
                        }
                        &/deep/ .sw{
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
                    &.dongjie{
                        color: #42d3ff;
                        span{
                            font-size: 36px;
                            color: #42d3ff;
                        }
                    }
                }
            }
        }
    }
    .pay{
        margin-top: 45px;
        .online{
            width: 180px;
            height: 33px;
            background-color: #00ccff;
            font-size: 14px;
            color: #fff;
            display: block;
            text-align: center;
            line-height: 33px;
        }
        .pay_detail{
            background-color: #fff;
            margin-right: 150px;
            ul{
                padding: 40px 0 10px 0;
                li{
                    margin: 0 0 10px 60px;
                    display: block;
                    height: 40px;

                    font-size: 14px;
                    color: #999;
                    line-height: 40px;
                    span{
                        &.minTitle{
                            float: left;
                            margin-right: 10px;
                        }

                    }
                }
            }
            .payonline{
                border:1px solid #00ccff;
                display: inline-block;
                height: 36px;
                overflow: hidden;
                padding: 0 45px 0 15px;
                position: relative;
                .iconfont1{
                    color: #00ccff;
                    font-size: 30px;
                    line-height: 36px;
                }
                .iconfont2{
                    color: #666;
                    font-size: 35px;
                    line-height: 36px;
                }
                .iconfont3{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    font-size: 20px;
                    height: 24px;
                    line-height: 30px;
                    width: 20px;
                    color: #00ccff;
                }
            }
            .button{
                background-color: #ff6600;
                color: #fff;
                font-size: 14px;
                width: 130px;
                height: 34px;
                margin: 0 15px 0 75px;
                display: inline-block;
                border-radius:0;
            }
            .text{
                font-size: 12px;
                line-height:20px;
            }
        }
    }
}
</style>