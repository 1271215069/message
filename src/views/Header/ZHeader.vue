<template>
    <div class="ZHeader">
        <div class="left">
            <img @click="go({link:'/'})" :src="require('@/assets/img/logo/logo.png')"/>
        </div>
        <div class="content">
            <ul>
                <li v-for="item in menus" @click="go(item)" :class="{select:item.menusKey == airforce.layout.menus}">
                    {{item.name}}
                    <ul v-if="item.hoverdata.show" class="navmenus">
                        <li v-for="(oitem,oindex) in item.hoverdata.data" :key="oindex" @click="go(oitem)">{{oitem.name}} </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="icon">
                <x-input class="input" :class="{show:showInputClass}" v-if="input" placeholder="请输入关键字" :show-clear="false">
                    <div slot="right" class="iconfont" @click="showInput">&#xe600;</div>
                </x-input>
                <span class="iconfont" v-else @click="showInput">&#xe600;</span>
            </div>

            <x-button v-if="isLogin"  type="primary" class="btn XButton themeXButton" @click.native="go({link:'/Uinfo'})">控制台</x-button>
            <!-- @click.native="go({link:'/UserInfo'})" -->
            <x-button v-else plain class="btn" @click.native="gologin">登录</x-button>
            <!-- <x-button v-if="isLogin"plain class="btn" @click.native="logOut">退出</x-button> -->
            <!-- <x-button v-else plain class="btn" @click.native="go({link:'/Register'})">注册</x-button> -->
        </div>
    </div>
</template>

<script>
    import { FlexboxItem, Flexbox, Box, XButton, XInput } from "vux"
    export default {
        name: "z-header",
        components:{ FlexboxItem, Flexbox, Box, XButton, XInput },
        data(){
          return {
              menus:[
                  { name:"首页", menusKey:"home",link:"/Home",hoverdata:{
                      show:false,
                      data:[]
                  }},
                  // { name:"api数据平台", menusKey:"api",link:"/Api" },
                  { name:"产品服务", menusKey:"service",hoverdata:{
                      show:true,
                      data:[
                          {name:"验证码短信",link:"/service?type=1"},
                          {name:"行业短信",link:"/service?type=2"},
                          {name:"营销短信",link:"/service?type=3"},
                      ]
                  } },
                  { name:"关于我们", menusKey:"About", link:"/About",hoverdata:{
                      show:false,
                      data:[]
                  } },
                  { name:"合作客户", menusKey:"Partners", link:"/Partners",hoverdata:{
                      show:false,
                      data:[]
                  } },
                  { name:"开发者中心", menusKey:"developer", link:"/Developer",hoverdata:{
                      show:false,
                      data:[]
                  } },
              ],
              input:false,
              showInputClass:false,
          }
        },
        computed:{
            isLogin(){
                try {
                    return this.airforce.login.code == 20000;
                }catch (e){}
            }
        },
        methods:{
            showInput(){
                this.input = !this.input;
                if(this.input){
                    setTimeout(()=>{
                        this.showInputClass = this.input;
                    },1);
                    return;
                }
                this.showInputClass = false;
            },
            go(item){
                if(item.link){
                    this.$router.push(item.link);
                }
            },
            gologin(){
                //window.open('http://47.100.118.227')
                window.open('http://admin.ywhl106.com')
            },
            logOut(){
                this.action({
                    moduleName:"login",
                    goods:null,
                }),
                this.action({
                    moduleName:"login",
                    goods:{},
                });
                delete localStorage.login;
            }
        },
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.ZHeader{
    background-color: @cor_efeff0;
    // overflow: hidden;
    @h:@headerHeight;
    padding: 0 @pa;
    height: @h;
    position: relative;
    z-index: @ZIndex + 2;
    *{
        cursor: pointer;
    }
    .left{
        overflow: hidden;
        position: absolute;
        left: @pa;
        top: 10px;
        img{
            height: @h - 20px;
            float: left;
        }
    }
    .content{
        width: 100%;
        ul{
            text-align: center;
            width: 100%;
            li{
                display: inline-block;
                width: 120px;
                line-height: @h;
                text-align: center;
                position: relative;
                font-size: 18px;
                .navmenus{
                    display: none;
                    background: #fff;
                    position: absolute;
                    top:60px;
                    left:0;
                    z-index: 700;
                    li{
                        color:#666;
                        font-size: 14px;
                    }
                    li:hover{
                        color:@themeColor;
                    }
                }
            }
            li:hover{
                color: @themeColor;
                .navmenus{
                    color: #666;
                    display: block;
                    animation: showContent ease-in-out .4s;
                }

            }
            li.select{
                color: @themeColor;
                &:before{
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 0;
                    width: 30px;
                    border-bottom: 2px solid @themeColor;
                }
            }
        }
    }
    .right{
        @index:30px;
        position: absolute;
        right: (@h - @index) / 2;
        top: (@h - @index) / 2;
        overflow: hidden;
        .icon{
            float: left;
            .iconfont{
                line-height: @index;
                border-right: 1px solid #000;
                padding-right: 10px;
                position: relative;
                z-index: 2;
            }
            .input{
                background-color: #cccccc;
                line-height: @index;
                border-radius: @index/2;
                padding: 0 15px;
                width: 0;
                .iconfont{
                    border:none;
                }
                &.show{
                    width: 200px;
                    transition: width ease-out .5s;
                }
            }
            &:hover{

            }
        }
        .btn{
            float: left;
            line-height: @index;
            border-radius: @index/2;
            width: auto;
            margin: 0;
            margin-left: 10px;
            &:hover{
                background-color: @cor_ffffff;
            }
            &.XButton{
                &:hover{
                    background-color: @themeColor*0.9;
                }
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
</style>