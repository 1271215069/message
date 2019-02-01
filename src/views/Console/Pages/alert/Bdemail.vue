<template>
    <div class="email">
        <div class="line">
            <span class="title">邮箱</span>
            <input class="xinput" type="text" v-model="email">
        </div>
        <div class="line">
            <span class="title">验证码</span>
            <input class="xinput" type="text" v-model="code">
            <span class="getcode" @click.prevent="getcode">获取验证码</span>
        </div>
        <div class="save">
            <span @click.prevent="save">保存</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"bdemail",
    data(){
        return{
            email:"",
            code:"",
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
    },
    methods:{
        getcode(){
            let yxzz=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if(this.email==""){
                this.$vux.toast.text("请输入邮箱");
                return;
            }
            // if (!yxzz.test(this.email)){
            //     this.$vux.toast.text("请输入有效的电子邮箱！")
            //     return;
            // }
            
            this.that.action({
                moduleName:'code',
                url:"code",
                method:"post",
                isFormData:true,
                data:{
                    username:this.email
                }
            }).then(res=>{
                if(res.code==200){
                    this.that.$vux.toast.text("发送成功");
                }else{
                    this.that.$vux.toast.text(res.msg);
                }
            }).catch(err=>{})
        },
        save(){
            let yxzz=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if(this.email==""){
                this.$vux.toast.text("请输入邮箱");
                return;
            }
            // if (!yxzz.test(this.email)){
            //     this.$vux.toast.text("请输入有效的电子邮箱！")
            //     return;
            // }
            if(this.code==""){
                this.$vux.toast.text("请输入验证码");
                return;
            }
             this.that.action({
                moduleName:'binding_email',
                url:'binding_email',
                method:"post",
                headers: {'XX-token': this.that.airforce.login.data.token,},
                data:{
                    email:this.email,
                    verification_code:this.code,
                }
            }).then(res=>{
                if(res.code==20000){
                     this.that.$vux.toast.text(res.msg)
                     this.$emit('aftersave',this.email);
                     this.$ZAlert.hide();
                }else{
                    this.that.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    }
}
</script>
<style lang="less" scoped>
.email{
    padding: 20px 20px;
    .line{
        overflow: hidden;
        margin-bottom: 10px;
        .title{
            width: 28%;
            text-align: right;
            display: block;
            float: left;
            line-height: 32px;
            margin-right: 2%;
        }
        .xinput{
            float: left;
            line-height: 30px;
            border: 1px solid #DBDBDB;
            box-sizing: border-box;
            padding: 0 7px;
        }
        .getcode{
            float: left;
            font-size: 14px;
            display: block;
            color: #fff;
            background: @col-ff6600;
            line-height: 32px;
            padding: 0 10px;
            cursor: pointer;
            margin-left: 10px;
        }
    }
    .save{
        span{
            display: block;
            line-height: 32px;
            background: @col-ff6600;
            color: #fff;
            width: 20%;
            margin: 30px auto 20px;
            cursor: pointer;
        }
    }
}
</style>
