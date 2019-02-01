<template>
    <div class="Verification">
        <div class="xdialog">
            <div class="maskcontent">
                    <z-flexbox-item class="row" span="20%">
                        <div slot="left" class="UserEditAppBox—left">状态：</div>
                        <div class="UserEditAppBox—right">
                            <l-switch @click.native="chenkclick"  @on-change="chenkchange" :checkval="checked" textLeft="on" textRight="off" class="sw"></l-switch>
                        </div>
                    </z-flexbox-item>
                    <z-flexbox-item class="row" span="20%">
                        <div slot="left" class="UserEditAppBox—left">手机号码：</div>
                        <div class="UserEditAppBox—right">
                            {{15912345555}} （仅注册绑定的手机号）
                        </div>
                    </z-flexbox-item>
                    <z-flexbox-item class="row yzm" span="20%">
                        <div slot="left" class="UserEditAppBox—left">验证码：</div>
                        <div class="UserEditAppBox—right getyam">
                            <input type="text" name="" id="" v-model="yzm">
                            <span @click.prevent="getyzm">获取验证码</span>
                        </div>
                    </z-flexbox-item>
                <div class="btn" @click.prevent="saveconfig">保存设置</div>
            </div>
        </div>
    </div>
</template>

<script>
    import consoleVue from "../../components/index"
    export default {
        name: "verification",
        components:{ ...consoleVue },
        data(){
            return{
                tel:"15912345555",
                uid:"15912345555",
                maskshow:true,
                yzm:"",
            }
        },
        props:{
            vm:{
                type:Object,
                default:()=>{}
            },
        },
        computed:{
            checked(){
                return this.vm.checked;
            }
        },
        methods:{
            chenkchange(val){//开关的change事件
                // console.log(val)
            },
            chenkclick(){//点击开关的方法
                console.log(this.vm,this.vm.checked)
                this.vm.checked = !this.vm.checked;
                if(!this.checked){//开启状态
                    this.$vux.toast.text("已关闭登陆二次验证")
                }
            },
            getyzm(){//点击获取验证码的方法

            },
            saveconfig(){//点击弹窗内保存设置的方法
                this.$ZAlert.hide();
            }
        }
    }
</script>

<style scoped lang="less">
.Verification{
    .xdialog{
        .maskcontent{
            width: 100%;
            height: 100%;
            background: #fff;
            box-sizing: border-box;
            padding: 30px;
            .row{
                line-height: 30px;
                .UserEditAppBox—right{
                    &/deep/ .sw{
                        transform: translateY(-20%);
                        line-height: 63px;
                        input{
                            border: 1px solid #339933;
                            &:checked{
                                background-color: #339933;
                                border-color: #339933;
                                &:after{
                                    background-color: #fff;
                                }
                            }
                            &:after{
                                top: 5px;
                                left: 5px;
                                width: 20px;
                                height: 20px;
                                background-color: #339933;
                            }
                        }
                        .textLeft{
                            line-height: 39px;
                        }
                        .textRight{
                            line-height: 43px;
                            color: #339933;
                        }
                    }
                }
                .getyam{
                    //display: flex;
                    //    justify-content: space-between;
                    //    line-height: 32px;
                    overflow: hidden;
                    input{
                        width: 50%;
                        border: 1px solid @col-999999;
                        line-height: 30px;
                        box-sizing: border-box;
                        padding: 0 7px;
                        display: block;
                        float: left;
                    }
                    span{
                        width: 40%;
                        color: #fff;
                        background: #00ccff;
                        line-height: 32px;
                        display: inline-block;
                        display: block;
                        float: right;
                        cursor: pointer;
                        font-size: 14px;
                    }
                }
                .UserEditAppBox—left{
                    text-align: right;
                }
            }
            .yzm{
                margin-top: 20px;
            }
            .btn{
                width: 25%;
                background: @col-ff6600;
                color: #fff;
                margin: 20px auto 0;
                line-height: 40px;
                cursor: pointer;
            }
        }
    }
}
</style>