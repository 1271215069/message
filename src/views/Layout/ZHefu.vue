<template>
    <div class="ZHefu">
        <div class="ZHefuBtn iconfont">
            &#xe601;
            <div class="content">
                <ul>
                    <li>
                        <flexbox class="flexbox">
                            <flexbox-item :span="0.2" class="iconfont icon1"> &#xe674;</flexbox-item>
                            <flexbox-item>
                                <p>客服电话</p>
                                <div class="cor">4008-123-106 </div>
                            </flexbox-item>
                        </flexbox>
                    </li>
                    <!--<li>-->
                        <!--<flexbox class="flexbox">-->
                            <!--<flexbox-item :span="0.2" class="iconfont icon2"> &#xe994;</flexbox-item>-->
                            <!--<flexbox-item>-->
                                <!--<p>在线对话</p>-->
                                <!--<div>QQ在线及时回应</div>-->
                            <!--</flexbox-item>-->
                        <!--</flexbox>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<flexbox class="flexbox">-->
                            <!--<flexbox-item :span="0.2" class="iconfont icon3"> &#xe9ad;</flexbox-item>-->
                            <!--<flexbox-item>-->
                                <!--<p>工单管理</p>-->
                                <!--<div>专业解答产品疑问</div>-->
                            <!--</flexbox-item>-->
                        <!--</flexbox>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<flexbox class="flexbox">-->
                            <!--<flexbox-item :span="0.2" class="iconfont icon4"> &#xe673;</flexbox-item>-->
                            <!--<flexbox-item>-->
                                <!--<p>常见问题</p>-->
                                <!--<div>解答一般常见问题</div>-->
                            <!--</flexbox-item>-->
                        <!--</flexbox>-->
                    <!--</li>-->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "z-hefu",
        components:{ Flexbox, FlexboxItem }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.ZHefu{
    .ZHefuBtn{
        position: fixed;
        right: 100px;
        bottom: 100px;
        @index:40px;
        width: @index;
        height: @index;
        background-color: #333333;
        z-index: @ZIndex + 3;
        border-radius: 100%;
        color: #999999;
        font-size: 18px;
        text-align: center;
        line-height: @index;
        font-weight: bold;
        cursor: pointer;
        @w:260px;
        .content{
            position: absolute;
            left: -@w - @pa;
            bottom: 0;
            width: @w;
            display: none;
            padding-right: @pa;
            ul{
                background-color: #0a0403;
                box-shadow: 0 0 10px #fff;
                border-radius: 5px;
                padding: @pa 0;
                li{
                    padding:@mg @pa;
                    .flexbox{
                        line-height: initial;
                        .iconfont{
                            font-size: 35px;
                            color:  #999999;
                            font-weight: initial;
                            text-align: center;
                            &.icon2{
                                font-size: 38px;
                            }
                            &.icon3{
                                font-size: 30px;
                            }
                        }
                        .cor{
                            color: @themeColor;
                        }
                        p{
                            font-size: 18px;
                            color:  #999999;
                        }
                        div{
                            font-size: 16px;
                            color: #666;
                        }
                    }
                    &:hover{
                        background-color: #333;
                    }
                }
            }
        }
        @keyframes showContent {
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }
        &:hover{
            background-color: @cor_ffffff;
            color: #000;
            .content{
                display: block;
                animation: showContent ease-in-out .4s;
            }
        }
    }
}
</style>