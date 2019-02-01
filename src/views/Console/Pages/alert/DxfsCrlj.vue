<template>
    <div class="dxfscrlj">
        <div class="linetext">
            <span class="title">URL</span>
            <div class="content">
                <input type="text" v-model="clj" placeholder="格式如：'www.xxxx.com/#/index''">
            </div>
        </div>
        <div class="linetext">
            <span class="title">&nbsp;</span>
            <div class="content">
                <p>* 插入后，将在超链接前后生成空格符号，以防止出现手机短信客户端不识别超链接的情况。</p>
            </div>
        </div>
        <div class="linetext">
            <span class="title">&nbsp;</span>
            <div class="content">
               <span class="btn" @click.prevent="qd">确定</span>
               <span class="btn" @click.prevent="qx">取消</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"dxfscrlj",
    data(){
        return{
            clj:"",
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
    },
    methods:{
        qd(){//确定按钮的方法
            if(this.clj==""){
                this.that.$vux.toast.text("请输入链接");
                return;
            }
            this.$emit("ljclick",this.clj)
            this.$ZAlert.hide();
        },
        qx(){//取消按钮的方法
            this.$ZAlert.hide();
        }
    }    
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.dxfscrlj{
    padding: 30px 0;
    .linetext{
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        color: #666;
        font-size: 14px;
        .title{
            display: block;
            float: left;
            width: 20%;
            line-height: 36px;
        }
        .content{
            float: left;
            line-height: 36px;
            width: 70%;
            text-align: left;
            input{
                line-height: 36px;
                width: 100%;
                border-bottom: 1px solid #dbdbdb;
                padding: 0 7px;
                font-size: 14px;
                color: #666;
            }
            p{
                margin-top: 30px;
                line-height: 20px;
                text-align: left;
                margin-bottom: 30px;
            }
            .btn{
                display: inline-block;
                background: @col-ff6600;
                color: #fff;
                line-height: 36px;
                padding: 0 20px;
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }
}
</style>
