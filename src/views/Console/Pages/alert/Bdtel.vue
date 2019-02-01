<template>
    <div class="email">
        <div class="line">
            <span class="title">手机号</span>
            <input class="xinput" type="text" v-model="tel">
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
    name:"bdtel",
    data(){
        return{
            tel:"",
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
            let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if(this.tel==""){
                this.$vux.toast.text("请输入手机号");
                return;
            }
            // if (!telzz.test(this.tel)){
            //     this.$vux.toast.text("请输入有效的手机号！")
            //     return;
            // }
            
            this.that.action({
                moduleName:'code',
                url:"code",
                method:"post",
                isFormData:true,
                data:{
                    username:this.tel
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
            let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if(this.tel==""){
                this.$vux.toast.text("请输入手机号");
                return;
            }
            // if (!telzz.test(this.tel)){
            //     this.$vux.toast.text("请输入有效的手机号！")
            //     return;
            // }
            if(this.code==""){
                this.$vux.toast.text("请输入验证码");
                return;
            }
             this.that.action({
                moduleName:'binding_mobile',
                url:'binding_mobile',
                method:"post",
                headers: {'XX-token': this.that.airforce.login.data.token,},
                data:{
                    mobile:this.tel,
                    verification_code:this.code,
                }
            }).then(res=>{
                if(res.code==20000){
                     this.$emit('aftersave');
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
