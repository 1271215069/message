<template>
    <div class="Home">
        <img :src="bjs[selectIndex]">
        <div class="content homePage1" :class="{show:show}" v-if="selectIndex == 0">
            <!--<p class="animated fadeIn">易网互联</p>-->
            <div class="title animated flipInX">安全高效的全球云通讯平台</div>
            <p>为您提供更好的验证码、行业、营销短信服务</p>
            <x-button class="btn animated fadeIn" @click.native="gologin">立即体验</x-button>
        </div>
        <div class="content" :class="{show:show}" v-if="selectIndex == 1">
            <div class="title animated slideInLeft">一键推送  海量并发</div>
            <p class="animated slideInRight">伴随基础网络的迭代更新和手机的大规模普及，短信已成为更高效、更便捷的传播媒介。
                <br>
                易网互联云通讯平台提醒您，企业商家做短信营销推广是非常明智的选择，短信不仅阅读量高、覆盖面广，还具有瞬时传播效应，一分钟即时发送，一瞬间万人传播。</p>
        </div>
        <div class="content" :class="{show:show}" v-if="selectIndex == 2">
            <ul class="top animated slideInDown">
                <li>速度快</li>
                <li class="animated jackInTheBox">回报高</li>
                <li>投资省</li>
                <li class="animated jackInTheBox">精确性</li>
                <li>蔓延性</li>
            </ul>
            <div class="title animated zoomIn">行业短信方案优势</div>
            <ul class="bottom animated slideInUp">
                <li>灵活性</li>
                <li class="animated jackInTheBox">互动性</li>
                <li>低成本</li>
                <li class="animated jackInTheBox">轰动效应</li>
                <li>形式新颖</li>
            </ul>
        </div>
        <div class="content footer" :class="{show:show}" v-if="selectIndex == 3">
            <div class="footerBox">
                <flexbox class="footerBoxRow">
                    <flexbox-item class="vux-1px-r rowObj">
                        <span class="iconfont">&#xe767;</span>服务咨询 4008-123-106
                    </flexbox-item>
                    <flexbox-item class="vux-1px-r rowObj">
                        <span class="iconfont">&#xe66c;</span>一对一 贵宾级服务
                    </flexbox-item>
                    <flexbox-item class="rowObj">
                        <span class="iconfont">&#xe67e;</span>7X24小时技术保障
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item v-for="(item,index) in footerData" :key="index">
                            <div class="title">{{item.title}}</div>
                            <ul class="footerList">
                                <li  v-for="itemList in item.menus" @click="go(itemList)">{{itemList.name}}</li>
                            </ul>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <ul class="btns">
            <li v-for="(item,index) in bjs" :class="{select:index == selectIndex}" @click="tab(index)"><span></span></li>
        </ul>
        <div class="down" v-if="selectIndex != bjs.length -1">
            <div class="iconfont icon1" @click="down">&#xe602;</div>
            <div class="iconfont icon2">&#xe615;</div>
        </div>
    </div>
</template>
<script>
import footerData from "../Footer/footerData"
import { XButton, Flexbox, FlexboxItem } from "vux"
export default {
    name:"Home",
    components:{ XButton, Flexbox, FlexboxItem },
    data(){
        return{
            selectIndex:0,
            bjs:[
                require("@/assets/img/home/bj6.png"),
                require("@/assets/img/home/bj2.png"),
                require("@/assets/img/home/bj3.png"),
                require("@/assets/img/home/bj3.png"),
            ],
            show:true,
            timeBool:true,
            footerData:footerData
        }
    },
    methods:{
        tab(index){
            this.selectIndex = index;
            this.show = false;
            setTimeout(()=>{
                this.show = true;
            },1)
        },
        up(){
            if(this.selectIndex > 0 && this.timeBool){
                this.selectIndex -= 1;
                this.timeBool = false;
                setTimeout(()=>{
                    this.timeBool = true;
                },1500)
            }
        },
        down(){
            if(this.selectIndex < this.bjs.length - 1 && this.timeBool){
                this.selectIndex += 1;
                this.timeBool = false;
                setTimeout(()=>{
                    this.timeBool = true;
                },1500)
            }
        },
        go(item){
            if(item.link){
                this.$router.push(item.link);
            }
        },
        gologin(){
            window.open('http://admin.ywhl106.com')
            //window.open('http://admin.ywhl106.com:18000/login.do')
        }
    },
    mounted(){
        this.$utils.particleAnimations("rgba(255,255,255,0.2)");
        this.$utils.windowAddMouseWheel(this.up,this.down);
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/vars";
.Home{
    img{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: @ZIndex ;
    }
    .content{
        position: fixed;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: @ZIndex + 1;
        background-color: #000;
        background-color: rgba(0,0,0,0.8);
        width: 100%;
        color: #ffffff;
        text-align: center;
        padding: 80px 0;
        opacity: 0;
        &.footer{
            top: @headerHeight;
            height: 100%;
            padding: 0;
            transform: translateY(0);
            height:~"calc(100% - 60px)";
            .footerBox{
                width: 1000px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                text-align: left;
                .title{
                    color: #666;
                    font-size: 18px;
                    position: relative;
                    &:before{
                        content: '';
                        position: absolute;
                        left: -20px;
                        width: 10px;
                        height: 10px;
                        background-color: @themeColor;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
                .footerList{
                    margin-top: @pa;
                    min-height: 200px;
                    li{
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
                .footerBoxRow{
                    margin-bottom: 20px;
                    border-bottom: 1px solid #999999;
                    padding-bottom: 20px;
                    .rowObj{
                        line-height: 50px;
                        overflow: hidden;
                        .iconfont{
                            font-size: 30px;
                            float: left;
                            margin-right: 15px;
                            margin-left: 15px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        &.show{
            opacity: 1;
            transition: opacity ease-out .8s;
        }
        p{
            font-size: 18px;
            color: #8b8a8a;
        }
        .title{
            font-size: 80px;
        }
        .btn{
            width: auto;
            line-height: 40px;
            border-radius: 20px;
            background-color: @themeColor;
            color: @cor_ffffff;
            font-size: 14px;
            &:hover{
                background-color: @themeColor/0.9;
            }
        }
        @w:100px;
        .top{
            position: absolute;
            left: 0;
            top: -@w + @pa;
            width: 100%;
            text-align: center;
            li{
                display: inline-block;
                width: @w;
                height: @w;
                background-color: @cor_ffffff;
                color: #000;
                border-radius: 100%;
                text-align: center;
                line-height: @w;
                margin-left: 50px;
                text-shadow: 0 0 @w/3 #000;
                box-shadow:0 0 0 @mg rgba(255,255,255,0.3);
                cursor: pointer;
                &:first-child{
                    margin: 0;
                }
                &:nth-of-type(even){
                    position: relative;
                    top: @w/2;
                }
                @keyframes toHover {
                    0%{
                        color: #000;
                        background-color: @cor_ffffff;
                        box-shadow:0 0 0 @mg rgba(255,255,255,0.3);
                        transform: scale(1);
                    }
                    100%{
                        background-color: @themeColor;
                        color: @cor_ffffff;
                        box-shadow:0 0 0 @mg rgba(255,102,0,0.3);
                        transform: scale(1.5);
                    }
                }
                &:hover{
                    background-color: @themeColor;
                    color: @cor_ffffff;
                    box-shadow:0 0 0 @mg rgba(255,102,0,0.3);
                    transform: scale(1.5);
                    animation:toHover ease 0.5s ;
                }
            }
        }
        .bottom{
            .top;
            top: initial;
            bottom: -@w + @pa;
        }
        &.homePage1{
            background-color: transparent;
            text-align: left !important;
            padding-left: 100px;
            .btn{
                margin-left: 0;
                margin-top: 30px;
                border-radius: 7px;
                width: 120px;
                cursor: pointer;
            }
            .title{
                font-size: 60px;
               
            }
            p{
                color: #ffffff;
                
            }
        }
    }
    .btns{
        position: fixed;
        left: @pa;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid @cor_ffffff;
        width: 20px;
        border-radius: 14px;
        z-index: @ZIndex + 2;
        padding-top: 5px;
        text-align: center;
        li{
            @index:12px;
            width: @index;
            height: @index;
            border-radius: 100%;
            display: block;
            margin: auto;
            margin-bottom: 5px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            border: 1px solid transparent;
            &.select{
                border: 1px solid @cor_ffffff;
            }
            &:hover{
                border: 1px solid @cor_ffffff;
                border: 1px solid rgba(255,255,255,0.8);
                background-color: @cor_ffffff;
                background-color: rgba(255,255,255,0.5);
            }
            span{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: @index/2;
                height: @index/2;
                border-radius: 100%;
                background-color: @cor_ffffff;
                display: inline-block;
            }
        }
    }
    .down{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        z-index: @ZIndex + 3;
        .iconfont{
            color: #fff;
            color: rgba(255,255,255,0.8);
            font-size: 30px;
            width: auto;
            &.icon1{
                position: relative;
                cursor: pointer;
                top: 30px;
                display: inline-block;
                &:hover{
                    color: @themeColor;
                }
            }
        }
    }
}
</style>
