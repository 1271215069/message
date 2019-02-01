<template>
    <div class="yetx">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                余额提醒
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">
                <div class="linetext">
                    <label class="title">提醒金额：</label>
                    <div class="content">
                        账户余额低于
                        <input type="text" v-model="ye">
                        条，发送提醒信息
                    </div>
                </div>
                <div class="linetext">
                    <label class="title">免费短信提醒：</label>
                    <div class="content">
                        <input class="phone" type="text" v-model="tel">
                        <p>最多十个手机号码,多个手机号码用英文逗号隔开</p>
                    </div>
                </div>
                <div class="linetext">
                    <label class="title">&nbsp;</label>
                    <div class="content">
                        <span class="btn" @click.prevent="save">保存</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"yetx",
    data(){
        return{
            ye:"0",
            tel:""
        }
    },
    methods:{
        save(){//保存按钮的方法
            this.action({
                moduleName:'warning',
                url:"warning",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"3",
                    is_thresh:"1",
                    threshold:this.ye,
                    thresh_phone:this.tel
                }
            }).then(res=>{
                if(res.code==20000){
                    this.$vux.toast.text(res.msg)
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.action({
            moduleName:'dataPushDetail',
            url:"dataPushDetail",
            method:"post",
            headers: {'XX-token': this.airforce.login.data.token,},
            isFormData:true,
            data:{
                type:"3",
            }
        }).then(res=>{
            if(res.code==200){
                this.tel=res.data.thresh_phone;
                this.ye=res.data.threshold;
            }else{
                this.$vux.toast.text(res.msg)
            }
        }).catch(err=>{})
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.yetx{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            padding: 20px 0 100px;
            .linetext{
                overflow: hidden;
                padding: 10px 0;
                .title{
                    display: block;
                    line-height: 36px;
                    font-size: 14px;
                    color: #666;
                    width: 150px;
                    float: left;
                    text-align: right;
                }
                .content{
                    font-size: 14px;
                    color: #666;
                    line-height: 36px;
                    float: left;
                    margin-left: 15px;
                    input{
                        height: 30px;
                        width: 50px;
                        box-sizing: border-box;
                        line-height: 30px;
                        border: 1px solid #666;
                        text-align: right;
                        padding: 0 7px;
                    }
                    .phone{
                        width: 300px;
                        text-align: left;
                    }
                    .btn{
                        display: inline-block;
                        line-height: 36px;
                        color: #fff;
                        background: @col-ff6600;
                        padding: 0 15px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
