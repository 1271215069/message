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
                <div class="row1 row">
                    <div class="left">
                        <x-input class="input" placeholder="邮箱" v-model="email"></x-input>
                    </div>
                    <div class="right">通过邮箱找回</div>
                </div>
                <div class="row2 row">
                    <div class="left">
                        <x-input class="input code" placeholder="手机验证码" :showClear="false" v-model="yzm">
                            <x-button slot="right" class="getCode" @click.native="getcode">获取验证码</x-button>
                        </x-input>
                    </div>
                </div>
                <div class="row2 row">
                    <div class="left">
                        <x-input class="input" placeholder="密码" type="password" v-model="psd"></x-input>
                    </div>
                </div>
                <div class="row2 row">
                    <div class="left">
                        <x-button class="btn" @click.native="findpsd">找回密码</x-button>
                    </div>
                    <div class="right"  @click="go('/Forget')">Or 通过手机号找回</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { XInput, XButton, Flexbox, FlexboxItem } from "vux"
import { setTimeout } from 'timers';
    export default {
        name: "forget",
        components:{ XButton, XInput, Flexbox, FlexboxItem },
        data(){
            return{
                email:"",
                yzm:"",
                psd:""
            }
        },
        methods:{
            go(link){
                this.$router.push(link);
            },
            getcode(){//获取验证码的方法
                let yxzz=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if(this.email==""){
                    this.$vux.toast.text("请输入邮箱")
                    return
                }
                if (!yxzz.test(this.email)){
                    this.$vux.toast.text("请输入有效的电子邮箱！")
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
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                }).catch(err=>{})
            },
            findpsd(){//找回密码按钮的方法
                let yxzz=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                let pwdzz = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
                if(this.email==""){
                    this.$vux.toast.text("请输入邮箱")
                    return
                }
                if (!yxzz.test(this.email)){
                    this.$vux.toast.text("请输入有效的电子邮箱！")
                    return;
                }
                if(this.yzm==""){
                    this.$vux.toast.text("请输入验证码")
                    return
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
                this.action({
                    moduleName:'password_reset',
                    url:"password_reset",
                    method:"post",
                    isFormData:true,
                    data:{
                        username:this.email,
                        verification_code:this.yzm,
                        password:this.psd,
                    }
                }).then(res=>{
                    this.$vuz.loading.hide();
                    if(res.code==20000){
                        this.$vux.toast.text(res.msg);
                        let that=this;
                        setTimeout(()=>{
                            that.$router.push("/Login");
                        },2000)
                    }else{
                        this.$vux.toast.text(res.msg);  
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
            .content{
                overflow: hidden;
                padding:0 @pa;
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
            margin: auto;
            text-align: center;
            position: fixed;
            width: 100%;
            left: 0;
            top: 50%;
            margin-top: -5%;
            .content{
                color: #000;
                text-align: left;
                display: inline-block;
                .title{
                    font-size: 34px;
                    font-weight: initial;
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
                    width: 260px;
                    &:before{
                        border: none;
                    }
                    &.code{
                        position: relative;
                        .getCode{
                            position: absolute;
                            top: -1px;
                            right: -1px;
                            width: 120px;
                            background-color: @themeColor;
                            color: @cor_ffffff;
                            border-radius: 0;
                            font-size: 14px;
                            line-height: 40px;
                            cursor: pointer;
                            border:2px solid @themeColor;
                            &:after{
                                border: none;
                            }
                        }
                    }
                }
                .btn{
                    width: 294px;
                    background-color: @themeColor;
                    cursor: pointer;
                    color: @cor_ffffff;
                    border: none;
                    border-radius: 0;
                    &:after{
                        border: none;
                    }
                    &:hover{
                        background-color: @themeColor/0.9;
                    }
                }
                .row{
                    overflow: hidden;
                    .left{
                        float: right;
                    }
                    .right{
                        .left;
                    }
                    &.row1{
                        margin-bottom: @pa;
                        .right{
                            text-align: right;
                            font-size: 40px;
                            height: 40px;
                            line-height: 40px;
                            padding-right: 10px;
                            color: #999;
                            display: inline-block;
                        }
                    }
                    &.row2{
                        .row1;
                        .right{
                            font-size: 16px;
                            line-height: 40px;
                            color: @themeColor;
                            cursor: pointer;
                        }
                    }
                }

            }
        }
    }
</style>