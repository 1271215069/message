<template>
    <div class="Developer">
        <img class="bj" :src="require('@/assets/img/developer/bj.png')">
        <div class="mask"></div>
        <div class="content">
            <div class="contentBox">
                <h1 class="title">| 开发者中心
                    <svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80px" height="45px">
                        <path name="三角形" style="fill:transparent;stroke:#fff;stroke-width:2" d="M0 0 L80 0 L80 30 L35 30 L15 45 L15 30 L0 30 Z"/>
                    </svg>
                    <span>new 01</span>
                </h1>
                <flexbox class="fixedList">
                    <flexbox-item class="fixedListItem" @click.native="go(item)" v-for="(item,index) in list" :key="index">
                        <div class="fixedListItemBox">
                            <div class="iconfont" v-html="item.icon"></div>
                            <div class="title">{{item.name}}</div>
                            <p class="btn">了解详情</p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "developer",
        components:{ Flexbox, FlexboxItem },
        data(){
            return {
                list:[
                    {name:"接入指南",icon:"&#xe8a9;"},
                    {name:"接口文档",icon:"&#xe604;",link:"/Docs"},
                    {name:"常见问题",icon:"&#xe605;",link:"/FAQ"},
                    {name:"SDK下载",icon:"&#xe6a3;"},
                ]
            }
        },
        methods:{
          go(item){
              if(item.link){
                  this.$router.push(item.link);
                  return;
              }
              this.$vux.toast.text("玩命开发中，敬请期待...")
          }
        },
        mounted(){
            this.$utils.particleAnimations("rgba(255,255,255,0.15)");
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.Developer{
    .bj{
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .content{
        position: fixed;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: @ZIndex + 2;
        width: 100%;
        color: #ffffff;
        .contentBox{
            width: @layoutInitWidth;
            margin: auto;
            .title{
                font-size: 60px;
                font-weight: initial;
                display: inline-block;
                position: relative;
                margin-bottom: 50px;
                @w:80px;
                .svg{
                    position: absolute;
                    right: -@w;
                    top: -15px;
                    z-index: 1;
                }
                span{
                    font-size: 16px;
                    z-index: 2;
                    position: absolute;
                    width: @w;
                    right: -@w;
                    top: -15px;
                    text-align: center;
                    line-height: 30px;
                }
            }
            .fixedList{
                .fixedListItem{
                    .fixedListItemBox{
                        background-color: #000;
                        background-color: rgba(0,0,0,0.4);
                        margin-right: @pa;
                        border: 2px solid @cor_ffffff;
                        text-align: center;
                        padding: 50px 0;
                        cursor: pointer;
                        .iconfont{
                            font-size: 50px;
                        }
                        .title{
                            font-size: 30px;
                            font-weight: initial;
                            border-bottom: 1px solid @cor_ffffff;
                            @index:10px;
                            margin-bottom: @index + @pa;
                            &:before{
                                content: '';
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                                bottom: -@index;
                                border-top: @index solid @cor_ffffff;
                                border-left: @index solid transparent;
                                border-right: @index solid transparent;
                            }
                        }
                        .btn{
                            width: 120px;
                            text-align: center;
                            line-height: 30px;
                            border: 1px solid @cor_ffffff;
                            margin: auto;
                            //border-radius: 7px;
                        }
                        @boxShadow: @col-D8D8D8;
                        @keyframes fixedListItemBox {
                            0%{
                                background-color: #000;
                                background-color: rgba(0,0,0,0.4);
                                border-color: @cor_ffffff;
                                box-shadow: 0 0 0px @boxShadow;
                            }
                            100%{
                                background-color: #0a162b;
                                background-color: rgba(0,0,0,0.7);
                                border-color: @themeColor;
                                box-shadow: 0 0 20px @boxShadow;
                            }
                        }
                        @keyframes fixedListItemBox_iconfont {
                            0%{
                                color: @cor_ffffff;
                            }
                            100%{
                                color: @themeColor;
                            }
                        }
                        @keyframes fixedListItemBox_btn {
                            0%{
                                background-color: transparent;
                                border-color: @cor_ffffff;
                            }
                            100%{
                                background-color: @themeColor;
                                border-color: @themeColor;
                            }
                        }
                        &:hover{
                            background-color: #0a162b;
                            background-color: rgba(0,0,0,0.7);
                            border-color: @themeColor;
                            box-shadow: 0 0 20px @boxShadow;
                            animation: fixedListItemBox ease-in-out .4s;
                            .iconfont{
                                color: @themeColor;
                                animation: fixedListItemBox_iconfont ease-in-out .4s;
                            }
                            .btn{
                                background-color: @themeColor;
                                border-color: @themeColor;
                                animation: fixedListItemBox_btn ease .4s;
                                &:hover{
                                    background-color: @themeColor/0.8;
                                    border-color: @themeColor/0.8;
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    .mask{
        .content;
        height: 100%;
        z-index: @ZIndex + 1;
        background-color: rgba(0,0,0,0.2);
    }
}
</style>