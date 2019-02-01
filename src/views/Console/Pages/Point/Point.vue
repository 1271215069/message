<template>
    <div class="Point console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">
                积分商城
                <ul class="left">
                    <li>说明下载</li>
                </ul>
            </div>
            <div class="content">
                <div class="topBox">
                    <div class="row">
                        <div>礼品类型:</div>
                        <ul>
                            <li class="select">不限</li>
                            <li>实物商品</li>
                            <li>虚拟商品</li>
                        </ul>
                    </div>
                    <div class="row">
                        <div>积分范围:</div>
                        <ul>
                            <li class="select">不限</li>
                            <li>0-10000</li>
                            <li>10000-50000</li>
                            <li>50000-100000</li>
                            <li>100000+</li>
                        </ul>
                    </div>
                    <div class="row">
                        <div>排序方式:</div>
                        <ul>
                            <li class="select">综合排序</li>
                            <li>兑换排行 <span class="iconfont">&#xe653;</span></li>
                            <li>积分值 <span class="iconfont">&#xe654;</span></li>
                        </ul>
                    </div>
                </div>
                <div class="shopList">
                    <ul>
                        <li class="row" v-for="i in 10" @click="$router.push('/GiftDetails')">
                            <div class="rowTop">
                                <div class="left">
                                    <img :src="require('@/assets/img/about/bj.png')">
                                </div>
                                <div class="right">
                                    <ul>
                                        <li><img :src="require('@/assets/img/about/bj.png')"></li>
                                        <li><img :src="require('@/assets/img/about/bj.png')"></li>
                                        <li><img :src="require('@/assets/img/about/bj.png')"></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="rowTitle">“5秒到”短信包</div>
                            <div class="rowBottom">
                                <span class="s1">积分：</span>
                                <span class="s2">600000</span>
                                <span class="s3">0人兑换</span>
                                <span class="s4">立即兑换</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: "point",
        components:{
            ZFlexboxItem,
            ZFlexbox,
            Flexbox, FlexboxItem }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.Point{
    .topBox{
        border:1px solid #cccccc;
        padding:@mg @pa;
        .row{
            overflow: hidden;
            line-height: 40px;
            div{
                float: left;
                margin-right: 30px;
                font-size: 14px;
            }
            ul{
                float: left;
                overflow: hidden;
                li{
                    float: left;
                    min-width: 50px;
                    margin-right: 30px;
                    cursor: pointer;
                    text-align: center;
                    font-size: 14px;
                    &.select{
                        color: @col-00ccff;
                    }
                }
            }
        }
    }
    .shopList{
        margin-top: @pa;
        overflow: hidden;
        padding: 5px;
        .row{
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
                &:nth-of-type(even){
                    margin-right: 0;
                }
            }
            @media (min-width: 1200px) {
                &:nth-of-type(3n+0){
                    margin: 0;
                }
            }
            .rowTop{
                overflow: hidden;
                .left{
                    width: 270px;
                    width: ~"calc(100% - 80px)";
                    float: left;
                    img{
                        width: 100%;
                        display: block;
                        height: 270px;
                    }
                }
                .right{
                    width: 80px;
                    float: left;
                    ul{
                        width: 70px;
                        margin-left: 10px;
                        li{
                            height: 70px;
                            border:1px solid #cccccc;
                            margin-top: 2px;
                            img{
                                width: 60px;
                                height: 60px;
                                margin-left: 5px;
                                margin-top: 5px;
                                display: block;
                            }
                        }
                    }
                }
            }
            .rowTitle{
                color: #666;
                font-weight: bold;
                line-height: 50px;
            }
            .rowBottom{
                overflow: hidden;
                span{
                    float: left;
                    font-size: 14px;
                    color: #666;
                    line-height: 40px;
                    &.s2{
                        color: #ff6c00;
                        font-weight: bold;
                        margin-right: 10px;
                    }
                    &.s3{
                        margin-right: 10px;
                    }
                    &.s4{
                        float: right;
                        background-color: @themeColor+255/3;
                        color: @cor_ffffff;
                        padding: 0 @mg;
                        cursor: pointer;
                    }
                }
            }
            &:hover{
                box-shadow: 0 0 5px #e5e5e5 , inset 0 0 0 1px @themeColor;
                .rowBottom{
                    span{
                        &.s4{
                            background-color: @themeColor;
                        }
                    }
                }
            }
        }
    }
}
</style>