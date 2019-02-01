<template>
    <div class="dxfszhlj">
        <p class="title">请输入长网址</p>
        <div class="inputbtn">
            <input type="text" v-model="clj" placeholder="http://">
            <span class="btn" @click.prevent="zh">转换</span>
        </div>
        <div class="taglist">
            <p class="tag"><span class="s">*</span>插入后，将在超链接前后生成空格符号，以防止出现手机短信客户端不识别超链接的情况。</p>
            <p class="tag"><span class="s">*</span>我们可以帮您把长网址压缩，让您在70个字符的短信中输入更多内容。</p>
            <p class="tag"><span class="s">*</span>短链模块为第三方功能，本公司只提供方案，不对最终结果负责。</p>
        </div>
        <p class="title">短网址链接</p>
        <div class="inputbtn">
            <input type="text" disabled="disabled" v-model="dlj" placeholder="生成短链接">
            <!-- <span class="btn" @click.prevent="yl">预览</span> -->
        </div>
        <div class="btnlist">
            <button class="sure" @click.prevent="sure" >确定</button>
            <!-- disabled="disabled" -->
            <span class="confirm" @click.prevent="confirm">取消</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"dxfszhlj",
    data(){
        return{
            clj:"",
            dlj:"",
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
    },
    methods:{
        zh(){//点击转换按钮的方法
            if(this.clj==""){
                this.that.$vux.toast.text("请输入长链接");
                return;
            }
            this.that.action({
                moduleName:'shorturl',
                url:"shorturl",
                method:"post",
                headers: {'XX-token': this.that.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"1",
                    url:this.clj,
                }
            }).then(res=>{
                if(res.code==200){
                    this.dlj=res.data.url;
                }else{
                    this.that.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        yl(){//点击预览按钮的方法

        },
        sure(){//点击确定按钮的方法
            if(this.dlj==""){
                this.that.$vux.toast.text("请转换长连接")
            }else{
                this.$emit("ljclick",this.dlj)
                this.$ZAlert.hide();
            }
            
        },
        confirm(){//点击取消按钮的方法
            this.$ZAlert.hide();
        }
    }
}
</script>
<style lang="less" scoped>
.dxfszhlj{
    padding: 20px 20px;
    .title{
        line-height: 36px;
        font-size: 14px;
        text-align: left;
        color: #666;
    }
    .inputbtn{
        display: flex;
        justify-content: space-between;

        input[type=text]{
            box-sizing: border-box;
            width: 80%;
            border: 1px solid #e0e0e0;
            line-height: 34px;
            border-radius: 5px;
            padding: 0 7px;
        }
        .btn{
            display: inline-block;
            width: 15%;
            line-height: 36px;
            text-align: center;
            font-size: 14px;
            border: 1px solid #e0e0e0;
            color: #666;
            border-radius: 5px;
            cursor: pointer;
        }
        .btn:hover{
            background: @col-ff6600;
            color: #fff;
            border-color: @col-ff6600;
        }
    }
    .taglist{
        margin: 20px 0;
        .tag{
            color: #666;
            font-size: 14px;
            text-align: left;
            .s{
                color: #ff2b2b;
                margin-right: 5px;
                line-height: 20px;
            }
        }
    }
    .btnlist{
        text-align: right;
        margin-top: 30px;
        .sure{
            background: @col-ff6600;
            border: none;
            outline: none;
            color: #fff;
            line-height: 36px;
            padding: 0 20px;
            cursor: pointer;
            margin-right: 20px;
            font-size: 14px;
        }
        .sure:focus{
            border: none;
            outline: none;
        }
        .confirm{
            display: inline-block;
            line-height: 36px;
            color: #fff;
            padding: 0 20px;
            background: #c5ced7;
            font-size: 14px;
            cursor: pointer;
        }
    }
    
}
</style>
