<template>
    <div class="FAQ">
        <div class="top" :style="{backgroundImage:`url('${bj}')`}" >
            <div class="top-content">
                <flexbox>
                    <flexbox-item>
                        <h1>常见问题</h1>
                        <p>提交你自己的问题</p>
                        <p>也可以看看有没有人和你遇到同样的问题</p>
                    </flexbox-item>
                    <flexbox-item>
                        <x-input class="input" placeholder="搜索你想咨询的问题" :show-clear="false">
                            <div slot="right" class="sousuo">搜索</div>
                        </x-input>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="content" :style="{minHeight:minHeight}">
            <flexbox>
                <flexbox-item :span="1/5">
                    <ul class="menus" :style="{top:top, maxHeight:maxHeight}" ref="FAQ_menus">
                        <li class="title">
                            <span class="iconfont">&#xe673;</span>
                            问题分类
                        </li>
                        <li v-for="(item,index) in menus" :class="{select:airforce.layout.FAQ == item.FAQ}" @click="tebMenus(item)">{{item.name}}</li>
                    </ul>
                </flexbox-item>
                <flexbox-item class="FAQ_Content_Box">
                    <div class="FAQ_Content" ref="FAQ_Content">
                        <flexbox class="FAQ_Content_top">
                            <flexbox-item class="left">问题分类 > {{title}}</flexbox-item>
                            <flexbox-item class="right">
                                找不到类似的问题？
                                <div class="btn">
                                    <span class="iconfont">&#xe68d;</span>
                                    我要提问
                                </div>
                            </flexbox-item>
                        </flexbox>
                        <router-view/>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XInput } from "vux"
    export default {
        name: "f-a-q",
        components:{ Flexbox, FlexboxItem, XInput },
        data(){
            return {
                bj:require('@/assets/img/faq/bj.png'),
                top:0,
                minHeight:"auto",
                maxHeight:null,
                menus:[
                    // {name:"账号注册与登陆",FAQ:"FAQ",link:"/FAQ"},
                    // {name:"实名认证"},
                    // {name:"接口申请与购买"},
                    // {name:"接口调用"},
                ],
            }
        },
        methods:{
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
            tebMenus(item){
                if(item.link){
                    this.$router.push(item.link);
                    return;
                }
                this.$vux.toast.text("暂未开放，敬请期待！")
            }
        },
        computed:{
            title(){
                let findMenus = _.find(this.menus,{FAQ:this.airforce.layout.FAQ});
                if(findMenus){
                    return findMenus.name;
                }
            }
        },
        mounted(){
            this.action({
                moduleName:"layout",
                goods:{
                    time_vue:setInterval(this.watchTop)
                }
            });
        }
    }
</script>

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
                            .iconfont{
                                font-size: 18px;
                                display: inline-block;
                                transform: translateY(3px);
                            }
                            &:hover{
                                background-color: @themeColor/0.8;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>