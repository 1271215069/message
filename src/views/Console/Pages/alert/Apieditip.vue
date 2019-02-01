<template>
    <div class="editip">
        <div class="inputbox">
            <input type="text" v-model="ipcontent">
        </div>
        <span class="save" @click.prevent="save">保存</span>
    </div>
</template>
<script>
export default {
    name:"editip",
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
         data:{
            type:Object,
            default:()=>{}
        },
    },
    data(){
        return{
            ipcontent:""
        }
    },
    methods:{
        save(){
            this.that.action({
                moduleName:'editwhite',
                url:"editwhite",
                method:"post",
                headers: {'XX-token': this.that.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"3",
                    content:this.ipcontent,
                    id:this.data.serial,
                }
            }).then(res=>{
                if(res.code==20000){
                    this.that.$vux.toast.text('保存成功');
                    this.$emit("afteredit");
                    this.$ZAlert.hide();
                }else{
                    this.that.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        
        console.log(this.data,6456)
        this.ipcontent=this.data.address;
    }
}
</script>
<style lang="less" scoped>
.editip{
    .inputbox{
        margin: 30px 0;
        input{
            display: block;
            width: 60%;
            margin: 0 auto;
            line-height: 34px;
            box-sizing: border-box;
            border: 1px solid #000;
            padding: 0 7px;
        }
    }
    .save{
        display: block;
        width: 20%;
        color: #fff;
        background: @col-ff6600;
        line-height: 36px;
        cursor: pointer;
        margin: 0 auto;
        font-size: 14px;
        margin-bottom: 20px;
    }
}
</style>
