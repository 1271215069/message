<template>
    <div class="Api">
        <div class="top" :style="{backgroundImage:`url('${bj}')`}" >
            <div class="topContent">
                <h2>API分类</h2>
                <ul class="btns">
                    <li v-for="i in 9" :class="{select:i == 1}">全部</li>
                </ul>
                <ul class="btns tow">
                    <li v-for="i in 8">全部</li>
                </ul>
            </div>
            <div class="filter">
                <div class="left">
                    <span class="iconfont">&#xe603;</span>
                    <span class="txt">全部</span>
                    <x-input class="input" placeholder="请输入想要检索的API" :show-clear="false">
                        <div slot="right" class="iconfont">&#xe600;</div>
                    </x-input>
                </div>
                <div class="right">
                    <div class="type1">排序：<span class="select">综合</span><span>最新</span><span>热门</span></div>
                    <div class="type2">付费类型：<span class="select">全部</span><span>免费</span><span>收费</span></div>
                </div>
            </div>
        </div>
        <div class="apiList">
            <flexbox :gutter="0" wrap="wrap" class="flexbox">
                <flexbox-item class="flexbox-item" :span="1/5" v-for="i in 3" :key="i">
                    <div class="apiCard">
                        <div class="apiCardBox">
                            <img :src="require('@/assets/img/api/icon.png')"/>
                            <p>短信API服务</p>
                            <div v-if="i != 1" class="type1">￥0.001 / 次</div>
                            <div v-else class="type2">免费</div>
                        </div>
                        <x-button class="btn">申请数据</x-button>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { XInput, Flexbox, FlexboxItem, XButton } from "vux"
    export default {
        name: "api",
        components:{ XInput, Flexbox, FlexboxItem, XButton },
        data(){
            return {
                bj:require('@/assets/img/api/bj.png')
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.Api{
    padding-bottom: 50px;
    .top{
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        .topContent{
            width: @layoutInitWidth;
            margin: auto;
            color: @cor_ffffff;
            margin-top: 50px;
            .btns{
                margin-top: @pa;
                text-align: center;
                li{
                    display: inline-block;
                    width: 120px;
                    text-align: center;
                    line-height: 30px;
                    border:1px solid @cor_ffffff;
                    border-radius: 15px;
                    margin-bottom: @mg;
                    margin-left: @mg;
                    font-size: 14px;
                    cursor: pointer;
                    &:first-child{
                        margin-left: 0;
                    }
                    &:hover{
                        background-color: @cor_ffffff;
                        background-color: rgba(255,255,255,0.5);
                    }
                    &.select{
                        background-color: @themeColor;
                        border-color: @themeColor;
                    }
                }
                &.tow{
                    margin-top: 0;
                }
            }
        }
        .filter{
            overflow: hidden;
            color: @cor_ffffff;
            width: @layoutInitWidth;
            margin: auto;
            margin-top: 50px;
            margin-bottom: 50px;
            .left{
                float: left;
                font-size: 14px;
                line-height: 40px;
                overflow: hidden;
                *{
                    float: left;
                }
                .iconfont{
                    font-size: 30px;
                    margin-right: @mg;
                }
                .txt{
                    margin-right: @pa;
                }
                .input{
                    background-color:#cccccc;
                    border-radius: 20px;
                    padding: 0 @pa;
                    color: #000;
                    &:before{
                        border:none;
                    }
                    .iconfont{
                        font-size: 18px;
                        margin-right: 0;
                        margin-left: @mg;
                        cursor: pointer;
                    }
                }
            }
            .right{
                float: right;
                overflow: hidden;
                font-size: 14px;
                div{
                    float: left;
                    margin-left: 50px;
                    span{
                        margin-right: @mg;
                        cursor: pointer;
                        &.select{
                            color:@themeColor;
                        }
                        &:hover{
                            color:#ccc;
                        }
                    }
                }
            }
        }
    }
    .apiList{
        width: @layoutInitWidth;
        margin: auto;
        .flexbox{
            .flexbox-item{
                .apiCard{
                    border:1px solid #dcdee0;
                    margin-top: @pa/2;
                    margin-right:@pa/2;
                    text-align: center;
                    padding: @pa 0;
                    min-height: 250px - @pa;
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                    transform: scale(1);
                    border-radius: 8px;
                    .apiCardBox{
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        width: 100%;
                        img{
                            width: 80px;
                            height: 80px;
                            display: block;
                            margin: auto;
                        }
                        p{
                            line-height: 40px;
                            font-size: 16px;
                        }
                        div{
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .type1{
                            color: @themeColor;
                        }
                        .type2{
                            color: green;

                        }
                    }
                    .btn{
                        width: 80%;
                        border:none;
                        border-radius: 5px;
                        background-color: @themeColor;
                        color: @cor_ffffff;
                        line-height: 40px;
                        font-size: 16px;
                        margin-top: @pa;
                        cursor: pointer;
                        display: none;
                        position: absolute;
                        left: 10%;
                        &:hover{
                            background-color: @themeColor/0.8;
                        }
                    }
                    @keyframes apiCard {
                        0%{
                            transform: scale(1);
                        }
                        100%{
                            transform: scale(1.05);
                        }
                    }
                    &:hover{
                        @timeIndex:.4s;
                        @time:ease-in-out @timeIndex;
                        border-color: @themeColor;
                        box-shadow: inset 0 0 0 2px @themeColor;
                        transform: scale(1.05);
                        animation: apiCard ease @timeIndex;
                        @keyframes apiCardBox {
                            0%{
                                top: 50%;
                                transform: translateY(-50%);
                            }
                            100%{
                                top: @pa;
                                transform: translateY(0);
                            }
                        }
                        .apiCardBox{
                            top: @pa;
                            transform: translateY(0);
                            animation: apiCardBox @time;
                        }
                        @keyframes apiCardBoxBtn {
                            0%{
                                bottom: -@pa;
                                opacity: 0;
                            }
                            100%{
                                bottom: @pa;
                                opacity: 1;
                            }
                        }
                        .btn{
                            display: block;
                            bottom: @pa;
                            animation: apiCardBoxBtn @time;
                        }
                    }
                }
            }
        }
    }
}
</style>