<template>
    <div class="FAQ">
        <div class="top" :style="{backgroundImage:`url('${bj}')`}" >
            <div class="top-content">
                <flexbox>
                    <flexbox-item>
                        <h1>接口文档</h1>
                        <!--<p>提交你自己的问题</p>-->
                        <!--<p>也可以看看有没有人和你遇到同样的问题</p>-->
                    </flexbox-item>
                    <flexbox-item>
                        <!--<x-input class="input" placeholder="搜索你想咨询的问题" :show-clear="false">-->
                            <!--<div slot="right" class="sousuo">搜索</div>-->
                        <!--</x-input>-->
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="content" :style="{minHeight:minHeight}">
            <flexbox>
                <flexbox-item :span="1/5">
                    <ul class="menus" :style="{top:top, maxHeight:maxHeight}" ref="FAQ_menus">
                        <li class="title">
                            <!--<span class="iconfont">&#xe673;</span>-->
                            接口分类
                        </li>
                        <li v-for="(item,index) in menus" :class="{select:airforce.layout.DocsKeyName == item.Key}" @click="tebMenus(item)">{{item.name}}</li>
                    </ul>
                </flexbox-item>
                <flexbox-item class="FAQ_Content_Box">
                    <div class="FAQ_Content" ref="FAQ_Content">
                        <flexbox class="FAQ_Content_top">
                            <flexbox-item class="left">接口分类 > {{title}}</flexbox-item>
                            <flexbox-item class="right">
                                <div class="btn"
                                     v-clipboard:copy="docUrl"
                                     v-clipboard:success="onCopy"
                                     v-clipboard:error="onError">
                                    <span class="iconfont">&#xe667;</span>
                                    点击复制接口文档Url
                                    <div class="btnsContentMsg">
                                        {{docUrl}}
                                    </div>
                                </div>
                            </flexbox-item>
                        </flexbox>
                        <div v-if="docContents" class="FAQ_Content_Doc" v-html="docContents"></div>
                        <div v-else class='notData'>暂无数据 !</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import docData from "./docData.js"
    import { Flexbox, FlexboxItem, XInput  } from "vux"
    export default {
        name: "f-a-q",
        components:{ Flexbox, FlexboxItem, XInput },
        data(){
            return {
                bj:require('@/assets/img/faq/bj.png'),
                top:0,
                minHeight:"auto",
                maxHeight:null,
                menus:docData,
            }
        },
        methods:{
            onCopy(){
                this.$vux.toast.text("复制成功！");
            },
            onError(){
                this.$vux.toast.text("复制失败！");
            },
            watchTop(){
                var index = 300;
                if(typeof window.scrollY == "number" && window.scrollY > index){
                    this.top = window.scrollY - index + "px";
                }else {
                    this.top = 0;
                }
                try {
                    if(this.$refs.FAQ_menus.clientHeight > this.$refs.FAQ_Content.clientHeight){
                        this.minHeight = this.$refs.FAQ_menus.clientHeight + "px";
                    }else {
                        this.minHeight = this.$refs.FAQ_Content.clientHeight + "px";
                    }
                    var ZFooter = document.getElementById("ZFooter");
                    if(ZFooter && window.innerHeight && ZFooter.clientHeight > 0){
                        this.maxHeight = window.innerHeight - ZFooter.clientHeight + "px";
                        if(typeof window.scrollY == "number" && window.scrollY < index){
                            this.maxHeight = window.innerHeight - index - 30 + "px";
                        }
                        if(typeof window.scrollY == "number" && document.body.clientHeight - window.innerHeight - window.scrollY > ZFooter.clientHeight &&  window.scrollY > index){
                            this.maxHeight = window.innerHeight - 60 + "px";
                        }
                    }else {
                        this.maxHeight = null;
                    }
                }catch (e){}
            },
            tebMenus(item,bool){
                if(item.html){
                    this.action({
                        moduleName:"layout",
                        goods:{
                            DocsKeyName:item.Key,
                            Docs:item
                        }
                    });
                    // this.$router.push({
                    //     query:{
                    //         doc:item.Key
                    //     }
                    // });
                    return;
                }
                if(!bool){
                    this.$vux.toast.text("暂未开放，敬请期待！")
                }
            }
        },
        computed:{
            docUrl(){
                if(this.findObj) {
                    return "http://www.ywhl106.com/#/Docs?doc=" + this.findObj.Key;
                }
                return "";
            },
            title(){
              if(this.findObj){
                  return this.findObj.name;
              }
            },
            findObj(){
                let findMenus = _.find(this.menus,{Key:this.airforce.layout.DocsKeyName});
                if(findMenus){
                    return findMenus;
                }
            },
            docContents(){
                let hljs = require("highlight.js");
                hljs.initHighlightingOnLoad();
                let showdown = require("showdown");
                let converter = new showdown.Converter();
                try {
                    return converter.makeHtml(require("@/"+this.airforce.layout.Docs.html+".md"));
                }catch (e){}
            }
        },
        watch:{
          docContents(){
              this.$nextTick(()=>{
                  this,document.querySelectorAll('pre code').forEach(e=>{
                      e.classList.add("hljs")
                  });
              });
          }
        },
        mounted(){
            this.action({
                moduleName:"layout",
                goods:{
                    time_vue:setInterval(this.watchTop),
                }
            });
            if(this.$route.query.doc && this.findObj.html){
                this.action({
                    moduleName:"layout",
                    goods:{
                        DocsKeyName:this.$route.query.doc,
                    }
                });
                this.tebMenus(this.findObj,true);
            }
            this.action({
                moduleName:"layout",
                goods:{
                    Docs:this.findObj
                }
            });
        }
    }
</script>
<style lang="less">
    .FAQ_Content_Doc{
        h1{
            margin: 20px 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #999999;
        }
        p{
            color: #666;
        }
        blockquote{
            p{
                color: #999999;
                position: relative;
                margin-top: 10px;
                padding-left: 15px;
                &:before{
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 4px;
                    height: 100%;
                    background-color: #999999;
                }
            }
        }
        span,a{
            color: #999;
            &.red{
                color: #f00;
            }
            &.b{
                font-weight: bold;
            }
            &.blue{
                color: blue;
                cursor: pointer;
            }
        }
        table{
            border-spacing: 0;
            border-left:1px solid #dddddd;
            border-top:1px solid #dddddd;
            margin: 20px 0;
            font-size: 14px;
            td,th{
                padding: 0 15px;
                text-align: left;
                border-right:1px solid #dddddd;
                border-bottom:1px solid #dddddd;
                font-weight: initial;
                line-height: 40px;
            }
            tr{
                border-top: 1px solid #dddddd;
            }
            thead{
                tr{
                    background-color: #f3f3f3;
                    td{

                    }
                }
            }
            tbody{
                tr{
                    td{
                        background-color: #fff;
                        color: #666;
                    }
                }
            }
        }
        hr{
            height: 1px;
            background-color: #999999;
            margin: 20px 0;
            &.d{
                background-color: transparent;
                height: 0;
                border-bottom: 1px dashed #999999;
            }
        }
        h3,h2{
            margin: 20px 0;
        }
        pre{
            margin: 20px 0;
            &.pre{
                color: #666;
            }
        }
    }
</style>
<style scoped lang="less">
    @import "../../assets/css/vars";
    .FAQ{
        .top{
            padding: 50px 0;
            color: @cor_ffffff;
            overflow: hidden;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            .top-content{
                width: @layoutInitWidth;
                margin: auto;
                h1{
                    font-size: 50px;
                    font-weight: initial;
                }
                p{
                    font-size: 14px;
                    color: @col-D9D9D9;
                }
                .input{
                    background-color: @cor_ffffff;
                    border-radius: 6px;
                    width: 80%;
                    border: none;
                    margin-left: 20%;
                    color: #000;
                    .sousuo{
                        cursor: pointer;
                    }
                }
            }
        }
        .content{
            width: @layoutInitWidth;
            margin: auto;
            margin-top: @pa;
            position: relative;
            .menus{
                background-color: @cor_ffffff;
                border-radius: 4px;
                border:1px solid @col-D9D9D9;
                position: absolute;
                left: 0;
                top: 0;
                max-height: 500px;
                overflow-x: hidden;
                li{
                    line-height: 40px;
                    padding: 0 @pa;
                    border-top:1px solid @col-D9D9D9;
                    cursor: pointer;
                    font-size: 16px;
                    &:hover{
                        background-color: #efefef;
                    }
                    &.title{
                        border: none;
                        color: @col-D8D8D8;
                        font-weight: bold;
                        font-size: 18px;
                        &:hover{
                            background-color: transparent;
                        }
                    }
                    &.select{
                        color: @themeColor;
                        font-weight: bold;
                        position: relative;
                        &:before{
                            content: '';
                            position: absolute;
                            right:-1px;
                            top: 0;
                            width: 3px;
                            height: 100%;
                            background-color: @themeColor;
                        }
                    }
                }
            }
            .FAQ_Content_Box{
                .FAQ_Content{
                    .FAQ_Content_top{
                        color: #919192;
                        font-size: 14px;
                        line-height: 40px;
                        .right{
                            text-align: right;
                            .btn{
                                background-color: @themeColor;
                                color: @cor_ffffff;
                                float: right;
                                padding: 0 @pa;
                                border-radius: 20px;
                                cursor: pointer;
                                margin-left: @mg;
                                text-align: center;
                                position: relative;
                                .iconfont{
                                    font-size: 18px;
                                    display: inline-block;
                                    transform: translateY(3px);
                                }
                                &:hover{
                                    background-color: @themeColor/0.8;
                                    .btnsContentMsg{
                                        display: block;
                                    }
                                }
                                .btnsContentMsg{
                                    position: absolute;
                                    left: 0;
                                    top: 53px;
                                    background-color: #fff;
                                    color: #000;
                                    width: 100%;
                                    border-radius: 5px;
                                    z-index: 10;
                                    line-height: initial;
                                    padding: 20px;
                                    margin: 0 -20px;
                                    word-wrap:break-word;
                                    display: none;
                                    &:after{
                                        content: '';
                                        position: absolute;
                                        left: 50%;
                                        bottom: 100%;
                                        width: 20px;
                                        height: 20px;
                                        background-color: #fff;
                                        z-index:-100;
                                        transform: translate(-50%,10px) rotate(45deg);
                                    }
                                }
                            }
                        }
                    }
                    .notData{
                        color: #999;
                        text-align: center;
                    }
                    @import "../../../node_modules/highlight.js/styles/pojoaque.css";
                }
            }
        }
    }

</style>