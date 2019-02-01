<template>
    <div class="Login">
        <flexbox class="flexbox">
            <flexbox-item class="left" :style="{height:height+'px'}">
                <img :src="require('@/assets/img/login/bj.png')" alt="" class="img">
                <div class="content">
                    <img class="logo" @click="go({link:'/'})" :src="require('@/assets/img/logo/logo2.png')"/>
                    <h1 class="title animated flipInX">
                        <span>数</span>
                        <span>据</span>
                        <span>积</span>
                        <span>分</span>
                        <span>体</span>
                        <span>系</span>
                    </h1>
                    <p class="text animated flipInX">呈现数据流量的价值</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="3/8" class="right" :style="{height:height+'px'}" >
                <div class="content">
                    <h1 class="title">欢迎登录</h1>
                    <p class="text">百款接口免费试用</p>
                    <x-input @on-enter="login"  class="input" placeholder="用户名" v-model="username">
                        <div slot="label" class="iconfont">&#xe66d;</div>
                    </x-input>
                    <x-input @on-enter="login" class="input" placeholder="密码" type="password" v-model="psd">
                        <div slot="label" class="iconfont">&#xe610;</div>
                    </x-input>
                    <p class="row" @click="go({link:'/Forget'})">忘记密码？</p>
                    <x-button class="btn" @click.native="login">登录</x-button>
                    <p class="row2">还没有账号，<span @click="go({link:'/Register'})">立即注册 ＞</span></p>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XInput, XButton } from "vux"
    export default {
        name: "login",
        components:{ Flexbox, FlexboxItem, XInput, XButton },
        data(){
            return {
                height:0,
                username:"",
                psd:"",
                ajaxswitch:true,
            }
        },
        methods:{
            init(){
              this.height = window.innerHeight;
            },
            go(item){
                if(item.link){
                    this.$router.push(item.link);
                }
            },
            login(){//登陆的方法
                if(!this.ajaxswitch){
                    this.$vux.toast.text("操作频繁，请等待数据响应")
                }
                if(this.username==""){
                    this.$vux.toast.text("请输入用户名");
                    return;
                }
                if(this.psd==""){
                    this.$vux.toast.text("请输入密码");
                    return;
                }
                this.$vuz.loading.show();
                this.ajaxswitch=false;
                this.action({
                    moduleName:'login',
                    url:"login",
                    method:"post",
                    isFormData:true,
                    data:{
                        username:this.username,
                        password:this.psd,
                    }
                }).then(res=>{
                    this.$vuz.loading.hide();
                    if(res.code==20000){
                        this.ajaxswitch=true;
                        localStorage.login=JSON.stringify(res);
                        this.$router.push("/Uinfo")
                        //this.$router.push("/UserInfo")
                    }else{
                        this.ajaxswitch=true;
                        this.$vux.toast.text(res.msg);
                    }
                }).catch(err=>{
                    this.$vuz.loading.hide();
                })
            }
        },
        created(){
            this.init();
        },
        mounted(){
            window.addEventListener( 'resize', ()=>{
                this.init();
            }, false );
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.Login{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .left{
        position: relative;
        overflow: hidden;
        .img{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .content{
            .img;
            z-index: 2;
            color: @cor_ffffff;
            text-align: center;
            height: auto;
            top: 50%;
            transform: translateY(-50%);
            .logo{
                width: 300px;
                display: block;
                margin: auto;
                margin-bottom: 50px;
                cursor: pointer;
            }
            .title{
                font-weight: initial;
                font-size: 70px;
                span{
                    margin: 0 15px;
                }
            }
            .text{
                font-size: 18px;
                color: @col-D8D8D8;
            }
        }
    }
    .right{
        .left;
        .content{
            color: #000;
            text-align: left;
            width: 60%;
            left: 20%;
            .title{
                font-size: 34px;
            }
            .text{
                color: initial;
                font-size: 20px;
            }
            .input{
                border:2px solid @themeColor;
                line-height: 40px;
                padding-top: 0;
                padding-bottom: 0;
                margin-top: @pa;
                &:before{
                    border: none;
                }
                .iconfont{
                    color: @themeColor;
                    margin-right: @mg;
                    font-size: 26px;
                    cursor: default;
                }
            }
            .btn{
                background-color: @themeColor;
                cursor: pointer;
                color: @cor_ffffff;
                border: none;
                border-radius: 0;
                &:hover{
                    background-color: @themeColor/0.9;
                }
            }
            .row{
                line-height: 50px;
                color: @themeColor;
                text-align: right;
                cursor: pointer;
                font-size: 14px;
            }
            .row2{
                color: #666;
                line-height: 50px;
                text-align: right;
                font-size: 14px;
                span{
                    color: @themeColor;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>