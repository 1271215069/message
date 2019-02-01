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
                <x-input @on-enter="regist" class="input" placeholder="邮箱" v-model="email"></x-input>
                <x-input @on-enter="regist" class="input" placeholder="密码" type="password" v-model="psd"></x-input>
                <x-input @on-enter="regist" class="input code" placeholder="验证码" :showClear="false" v-model="yzm">
                    <x-button slot="right" class="getCode" @click.native="getyzm">获取验证码</x-button>
                </x-input>
                <x-button class="btn" @click.native="regist">立即注册</x-button>
                <p class="row2" @click="go">返回注册 ＞＞</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { XInput, XButton } from "vux"
    export default {
        name: "register",
        components:{ XButton, XInput },
        data(){
            return{
                email:"",
                psd:"",
                yzm:"",
                ajaxswitch:true,
            }
        },
        methods:{
            go(){
                this.$router.back();
            },
            getyzm(){
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
                        username:this.email
                    }
                }).then(res=>{
                    if(res.code==200){
                        this.$vux.toast.text(res.msg);
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                }).catch(err=>{})
            },
            regist(){//注册的方法
                if(!this.ajaxswitch){
                    this.$vux.toast.text("操作频繁，请等待数据响应")
                }
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
                this.ajaxswitch=false;
                this.action({
                    moduleName:'register',
                    url:"register",
                    method:"post",
                    isFormData:true,
                    data:{
                        username:this.email,
                        password:this.psd,
                        verification_code:this.yzm
                    }
                }).then(res=>{ 
                    this.$vuz.loading.hide();
                    if(res.code==20000){
                        this.$vux.toast.text(res.msg)
                        this.ajaxswitch=true;
                        setTimeout(()=>{
                            this.$router.push("/Login")
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
                    margin-bottom: @pa;
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