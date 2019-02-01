<template>
    <div class="UserCard">
        <div class="flexbox">
            <div :class="`flexboxCard flexboxCardTyep${item.type}`" v-for="item in data">
                <div class="top">
                    <div v-if="item.icon" class="iconfont" v-html="item.icon"></div>
                    <div class="title">
                        <div class="cardTitle">● {{item.title}}</div>
                        <x-button class="btn" v-if="item.btn && item.type == '1'">{{item.btn}}</x-button>
                        <div class="money" v-if="item.money">{{item.money | moneyFormat}}</div>
                        <div class="money" v-if="item.moneyStr" :class="{cor:item.type == '4' || item.type == '5'}">{{item.moneyStr}}</div>
                        <div class="money" v-if="item.moneyText" :class="{cor:item.type == '5'}">{{item.moneyText}}</div>
                    </div>
                </div>
                <div v-if="item.type != '5'">
                    <div class="title2" v-if="item.text">{{item.text}}</div>
                    <div class="title2 title3" v-else-if="item.text2 ">{{item.text2}}<span>{{item.textVal}}</span></div>
                    <div class="title2" v-else>&nbsp;</div>
                </div>
                <ul class="list" v-if="item.type == '1'">
                    <li :class="`row${itemList.row}`" v-for="itemList in item.list">
                        <p>{{itemList.name}}</p>
                        <div>{{itemList.value}}</div>
                    </li>
                </ul>
                <div v-if="item.type == '2' || item.type == '3' " class="bottom">
                    <x-button class="btn1" :class="{btn3:item.type == '3'}">{{item.btn}}</x-button>
                    <span class="btn2">{{item.btn2}}</span>
                </div>
                <div v-if="item.type == '4'" class="bottom">
                    <div class="row1"><span>积分详情</span> | <span>积分客服QQ</span></div>
                    <div class="row2"><span>什么是数据积分？</span> | <span>如何获取积分？</span></div>
                </div>
                <img class="qr" v-if="item.type == '5' && item.QR"  :src="item.QR">
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XButton } from "vux"
    export default {
        name: "user-card",
        components:{ Flexbox, FlexboxItem, XButton },
        props:{
            data:{
                type:Array,
                default:()=>[]
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../assets/css/vars";
.UserCard{
    .flexbox{
        .flexboxCard{
            background-color: @cor_ffffff;
            border-radius: 6px;
            padding: 15px;
            display: inline-block;
            margin-right: @mg;
            margin-bottom: @mg;
            height: 160px;
            @h:100px;
            @h2:60px;
            .top{
                overflow: hidden;
                .iconfont{
                    font-size: @h2 - 2px;
                    color: @col-D8D8D8;
                    float: left;
                    width: @h;
                    height: @h2;
                    line-height: @h2;
                    text-align: left;
                    overflow: hidden;
                }
                .title{
                    float: left;
                    color: @col-999999;
                    height: @h2;
                    overflow: hidden;
                    line-height: 20px;
                    text-align: initial;
                    font-size: 14px;
                    .btn{
                        border: none;
                        background-color: @col-00ccff;
                        color: @cor_ffffff;
                        font-size: 14px;
                        border-radius: 0;
                        line-height: 30px;
                        margin-top: 10px;
                        cursor: pointer;
                        &:hover{
                            background-color: @col-00ccff/0.9;
                        }
                        &:after{
                            border:none;
                        }
                    }
                    .money{
                        color: @themeColor;
                        font-size: 20px;
                        line-height: 30px;
                        &.cor{
                            color: @col-999999;
                        }
                    }
                }
            }
            .title2{
                color: @col-999999;
                font-size: 14px;
                line-height: 62px;
                height: 62px;
                overflow: hidden;
                &.title3{
                    color: @col-339933;
                    span{
                        font-size: 30px;
                        margin-left: @mg;
                    }
                }
            }
            .list{
                overflow: hidden;
                height: 38px;
                li{
                    float: left;
                    width: 60px;
                    font-size: 12px;
                    text-align: center;
                    border-right: 1px solid @col-D8D8D8;
                    &.row1{
                        color: @col-999999;
                    }
                    &.row2{
                        color: @col-00ccff;
                    }
                    &.row3{
                        border:none;
                        color: @themeColor;
                    }
                    p{
                        font-size: 12px;
                    }
                }
            }
            .bottom{
                overflow: hidden;
                text-align: center;
                height: 38px;
                line-height: 38px;
                .btn1{
                    border: none;
                    background-color: @themeColor;
                    color: @cor_ffffff;
                    border-radius: 0;
                    float: left;
                    width: 50%;
                    font-size: 14px;
                    cursor: pointer;
                    height: 38px;
                    &:after{
                        border: none;
                    }
                    &:hover{
                        background-color: @themeColor/0.9;
                    }
                }
                .btn2{
                    color: @col-999999;
                    float: left;
                    width: 40%;
                    font-size: 14px;
                    cursor: pointer;
                    text-align: left;
                    margin-left: 10%;
                }
                .btn3{
                    background-color: @col-339933;
                    &:hover{
                        background-color: @col-339933/0.9;
                    }
                }
                .row1{
                    color: @col-00ccff;
                    line-height: 18px;
                    font-size: 14px;
                    text-align: left;
                    span{
                        cursor: pointer;
                    }
                }
                .row2{
                    .row1;
                    color: @themeColor;
                }
            }
            &.flexboxCardTyep5{
                text-align: center;
                width: 200px;
                *{
                    text-align: center !important;
                }
                .cardTitle{
                    margin-bottom: 10px;
                }
                .title{
                    height: 100px !important;
                    width: 100%;
                    .money{
                        font-size: 14px !important;
                        line-height: 20px !important;
                    }
                }
                .qr{
                    @w:60px;
                    height: @w;
                    width: @w;
                    display: inline-block;
                    border:none;
                    outline: medium;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>