<template>
    <div class="mgxxbh">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                敏感信息保护
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">
                <div class="linecontent" v-if="type==0">
                    <span class="tips">您已开启敏感信息保护。</span>
                    <span class="btn" @click.prevent="close">关闭保护</span>
                </div>
                <div class="linecontent" v-if="type==1">
                    <span class="tips">您已关闭敏感信息保护。</span>
                    <span class="btn" @click.prevent="open">开启保护</span>
                </div>
                <p class="subtitle">什么是敏感信息保护？</p>
                <div class="mgimg">
                    <img :src="require('@/assets/img/dxbj/scrects.png')" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"mgxxbh",
    data(){
        return{
            type:0,
        }
    },
    methods:{
        open(){//开启保护按钮的方法
            this.action({
                moduleName:'sensitive',
                url:"sensitive",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"1",
                    is_sensitive:"2",
                }
            }).then(res=>{
                if(res.code==20000){
                    this.$vux.toast.text("您已开启敏感信息保护");
                    this.type=0;
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
            //this.type=0;
        },
        close(){//关闭保护按钮的方法
            this.action({
                moduleName:'sensitive',
                url:"sensitive",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"1",
                    is_sensitive:"1",
                }
            }).then(res=>{
                if(res.code==20000){
                    this.$vux.toast.text("您已关闭敏感信息保护");
                    this.type=1;
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
            //this.type=1;
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
                type:"1",
            }
        }).then(res=>{
            if(res.code==200){
                switch(res.data.is_sensitive){
                    case 1:
                        this.type=1;
                        break;
                    case 2:
                        this.type=0;
                        break;
                    default:
                        break;
                }
               
            }else{
                this.$vux.toast.text(res.msg)
            }
        }).catch(err=>{})
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.mgxxbh{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            padding: 14px;
            .linecontent{
                padding-top: 40px;
                .tips{
                    //color:#f52b14;
                    font-size: 14px;
                }
                .btn{
                    font-size: 14px;
                    display: inline-block;
                    background: @col-ff6600;
                    color:#fff;
                    line-height: 40px;
                    padding: 0 30px;
                    cursor: pointer;
                }
            }
            .subtitle{
                font-size: 14px;
                color:#f52b14;
                padding-top: 50px;
            }
            .mgimg{
                margin: 15px 0 60px 15px;
                width: 800px;
                img{
                    width: 100%;
                    display: block;
                }
            }
        }
    }
}
</style>
