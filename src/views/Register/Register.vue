<template>
    <div class="Register">
        <div class="top">
            <div class="content">
                <img @click="go('/')" :src="require('@/assets/img/logo/logo.png')"/>
                <p>已有账号，<span @click="go('/Login')">立即登录</span></p>
            </div>
        </div>
        <div class="RegisterContent">
            <div class="content">
                <h1 class="title">欢迎注册</h1>
                <p class="text">百款接口免费试用</p>
                <!-- <x-input class="input" placeholder="用户名（6-20位字母数字）"></x-input> -->
                <x-input @on-enter="regist" class="input" placeholder="手机号码" v-model="tel"></x-input>
                <x-input @on-enter="regist" class="input" placeholder="密码" type="password" v-model="psd"></x-input>
                
                <x-input @on-enter="regist" class="input code" placeholder="验证码" :showClear="false" v-model="yzm">
                    <x-button slot="right" class="getCode" @click.native="getyzm">{{getCodeTxt}}</x-button>
                </x-input>
                <p class="row"><span class="iconfont">&#xe746;</span>我已阅读并接受《<span>用户服务协议</span>》</p>
                <x-button class="btn" @click.native="regist">立即注册</x-button>
                <p class="row2" @click="go('/RegisterEmail')">通过邮箱注册 ＞＞</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { XInput, XButton } from "vux"
import { setTimeout } from 'timers';
    export default {
        name: "register",
        components:{ XButton, XInput },
        data(){
            return{
                tel:"",
                psd:"",
                yzm:"",
                getCodeTxt:"获取验证码",
                disabled:true,
                 ajaxswitch:true,
            }
        },
        methods:{
            go(link){
                this.$router.push(link);
            },
            initCodeText(){
                // if(!this.airforce.register.TimeIndex){
                //     this.action({
                //         moduleName:"layout",
                //         goods:{
                //             time_vue:this.airforce.register.TimeIndexInit,
                //         }
                //     });
                // };
                // this.disabled = true;
                // this.getCodeTxt = `(${this.airforce.register.TimeIndex}s)后重新获取`;
                // const time = setInterval(()=>{
                //     this.action({
                //         moduleName:"layout",
                //         goods:{
                //             TimeIndex:this.airforce.register.TimeIndex -1,
                //         }
                //     });
                //     this.getCodeTxt = `(${this.airforce.register.TimeIndex}s)后重新获取`;
                //     if(this.airforce.register.TimeIndex < 0 ){
                //         clearInterval(time);
                //         this.disabled = false;
                //         this.getCodeTxt = '获取验证码';
                //         this.action({
                //             moduleName:"register",
                //             goods:{
                //                 time_vue:this.airforce.register.TimeIndexInit,
                //             }
                //         });
                //     }
                // },1000);
                // this.action({
                //     moduleName:"register",
                //     goods:{
                //         Time:time,
                //     }
                // });
            },
            getyzm(){//获取验证码的方法
                
                let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                if(this.tel==""){
                    this.$vux.toast.text("请输入手机号")
                    return
                }
                if (!telzz.test(this.tel)){
                    this.$vux.toast.text("请输入有效的电话号码！")
                    return;
                }
                this.action({
                    moduleName:'code',
                    url:"code",
                    method:"post",
                    isFormData:true,
                    data:{
                        username:this.tel
                    }
                }).then(res=>{
                    if(res.code==200){
                        this.$vux.toast.text(res.msg);
                        this.initCodeText();
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                }).catch(err=>{})
            },
            regist(){//注册的方法
                if(!this.ajaxswitch){
                    this.$vux.toast.text("操作频繁，请等待数据响应")
                }
                let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                let pwdzz = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
                if(this.tel==""){
                    this.$vux.toast.text("请输入手机号");
                    return;
                }
                if (!telzz.test(this.tel)){
                    this.$vux.toast.text("请输入有效的电话号码！");
                    return;
                }
                if(this.yzm==""){
                    this.$vux.toast.text("请输入验证码");
                    return;
                }
                if(this.psd==""){
                    this.$vux.toast.text("请输入密码");
                    return;
                }
                if(!pwdzz.test(this.psd)){
                    this.$vux.toast.text("请输入8到16位数字与字母组合的密码");
                    return;
                }
                this.$vuz.loading.show();
                this.ajaxswitch=false;
                this.action({
                    moduleName:'register',
                    url:"register",
                    method:"post",
                    isFormData:true,
                    data:{
                        username:this.tel,
                        password:this.psd,
                        verification_code:this.yzm
                    }
                }).then(res=>{ 
                    this.$vuz.loading.hide();
                    if(res.code==20000){
                        this.$vux.toast.text(res.msg)
                        let that=this;
                        this.ajaxswitch=true;
                        setTimeout(()=>{
                            that.$router.push("/Login")
                        },2000)
                    }else{
                        this.ajaxswitch=true;
                        this.$vux.toast.text(res.msg)
                    }
                }).catch(err=>{
                    this.$vuz.loading.hide();
                })
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.Register{
    .top{
        background-color:@cor_ffffff;
        .content{
           overflow: hidden;
            width: @layoutInitWidth;
            margin: auto;
            line-height: @headerHeight;
            img{
                height: @headerHeight - @mg * 2 ;
                margin-top: @mg;
                float: left;
                cursor: pointer;
            }
            p{
                color: #666;
                float: right;
                span{
                    color: @themeColor;
                    cursor: pointer;
                }
            }
        }
    }
    .RegisterContent{
        width: @layoutInitWidth;
        margin: auto;
        background-color: @cor_ffffff;
        margin-top: 50px;
        padding: 40px 0;
        .content{
            color: #000;
            text-align: left;
            width: 50%;
            margin: auto;
            .title{
                font-size: 34px;
                font-weight: initial;
            }
            .text{
                color: initial;
                font-size: 20px;
            }
            .input{
                border:2px solid @col-D8D8D8;
                line-height: 40px;
                padding-top: 0;
                padding-bottom: 0;
                margin-top: @pa;
                &:before{
                    border: none;
                }
                &.code{
                    padding-right: 0;
                    .getCode{
                        background-color: #f3f5f8;
                        border: none;
                        border-radius: 0;
                        font-size: 14px;
                        line-height: 40px;
                        cursor: pointer;
                        &:after{
                            border: none;
                        }
                    }
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
                cursor: pointer;
                font-size: 14px;
                color: #666;
                .iconfont{
                    color: @themeColor;
                    margin-right: @mg;
                }
                span{
                    .iconfont;
                    margin: 0;
                }
            }
            .row2{
                color: #666;
                line-height: 50px;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
}
</style>