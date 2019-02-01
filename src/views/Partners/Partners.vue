<template>
    <div class="Partners">
        <div class="top" :style="{backgroundImage:`url('${bj}')`}" >
            <div class="content">
                <div class="contentBox">
                    <h1 class="title">合作伙伴</h1>
                    <img class="img" v-for="i in imgs" :src="i">
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="title">欢迎加入易网互联</div>
            <p class="txt">安全高效的全球云通讯平台</p>
            <x-input class="input"
                     :value="airforce.Partners.name"
                     @on-change="airforce.input($event,'name','Partners')"
                     placeholder="输入姓名"></x-input>
            <x-input class="input"
                     :value="airforce.Partners.company"
                     @on-change="airforce.input($event,'company','Partners')"
                     placeholder="公司名称"></x-input>
            <x-input class="input"
                     :value="airforce.Partners.job"
                     @on-change="airforce.input($event,'job','Partners')"
                     placeholder="职位"></x-input>
            <x-input class="input"
                     :value="airforce.Partners.phone"
                     @on-change="airforce.input($event,'phone','Partners')"
                     placeholder="电话"></x-input>
            <x-input class="input"
                     :value="airforce.Partners.email"
                     @on-change="airforce.input($event,'email','Partners')"
                     placeholder="邮箱"></x-input>
            <x-input class="input"
                     :value="airforce.Partners.remark"
                     @on-change="airforce.input($event,'remark','Partners')"
                     placeholder="备注"></x-input>
            <x-button class="btn" @click.native="submit">确认提交</x-button>
        </div>
    </div>
</template>

<script>
    import { XInput, XButton } from "vux"
    export default {
        name: "partners",
        components:{ XInput, XButton },
        data(){
            return {
                bj:require('@/assets/img/about/bj.png'),
                imgs:[
                    require('@/assets/img/Partners/p1.png'),
                    require('@/assets/img/Partners/p2.png'),
                    require('@/assets/img/Partners/p3.png'),
                    require('@/assets/img/Partners/p4.png'),
                ]
            }
        },
        methods:{
            submit(){
                let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                let yxzz=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if(this.airforce.Partners.name==""){
                    this.$vux.toast.text("请输入姓名！");
                    return;
                }
                if(this.airforce.Partners.company==""){
                    this.$vux.toast.text("请输入公司名称！");
                    return;
                }
                if(this.airforce.Partners.job==""){
                    this.$vux.toast.text("请输入职位！");
                    return;
                }
                if(this.airforce.Partners.phone==""){
                    this.$vux.toast.text("请输入电话！");
                    return;
                }
                if (!telzz.test(this.airforce.Partners.phone)){
                    this.$vux.toast.text("请输入有效的电话！")
                    return;
                }
                if(this.airforce.Partners.email==""){
                    this.$vux.toast.text("请输入邮箱！");
                    return;
                }
                if (!yxzz.test(this.airforce.Partners.email)){
                    this.$vux.toast.text("请输入有效的电子邮箱！")
                    return;
                }
                if(this.airforce.Partners.remark==""){
                    this.$vux.toast.text("请输入备注！");
                    return;
                }
                this.action({
                    moduleName:'adduser',
                    url:"adduser",
                    method:"post",
                    headers: {'XX-token': this.airforce.login.data.token,},
                    data:{
                        name:this.airforce.Partners.name,
                        company:this.airforce.Partners.company,
                        position:this.airforce.Partners.job,
                        phone:this.airforce.Partners.phone,
                        email:this.airforce.Partners.email,
                        remark:this.airforce.Partners.remark,
                    }
                }).then(res=>{
                    if(res.code==200){
                        this.$vux.toast.text(res.msg);
                        this.action({
                            moduleName:"Partners",
                            goods:{
                                name:"",
                                company:"",
                                job:"",
                                phone:"",
                                email:"",
                                remark:"",
                            }
                        })
                    }else{
                        this.$vux.toast.text(res.msg)
                    }
                }).catch(err=>{
                    this.$vux.toast.text(err)
                })
            }
        }
    }
</script>

<style scoped lang="less">
.Partners{
    .top{
        padding: 30px 0 30px 0;
        color: @cor_ffffff;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        .content{
            width: 100%;
            color: #ffffff;
            .contentBox{
                width: @layoutInitWidth;
                margin: auto;
                text-align: center;
                .title{
                    font-size: 30px;
                    font-weight: initial;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .img{
                    margin: 20px 10px;
                }
            }

        }
    }
    .bottom{
        width: 500px;
        margin: auto;
        color: #999999;
        font-size: 14px;
        .title{
            font-size: 40px;
            margin-top: 30px;
        }
        .txt{
            margin-bottom: 50px;
        }
        .input{
            border:1px solid #999;
            margin-bottom: 10px;
            color: #000;
            border-radius: 7px;
            &:before{
                border: none;
            }
        }
        .btn{
            background-color: @themeColor;
            color: #fff;
            border:none;
            line-height: 40px;
            border-radius: 7px;
            cursor: pointer;
            margin-bottom: 50px;
            &:hover{
                background-color: @themeColor*0.9;
            }
        }
    }
}
</style>