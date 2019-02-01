<template>
    <div class="addgroup">
        <div class="content">
            <div class="left">
                <p>分组名称</p>
                <input type="text" v-model="groupname" placeholder="分组名称">
            </div>
            <div class="right">
                <p>上级分组</p>
                <selector class="selector" v-model="fgroup" :options="grouplist"></selector>
            </div>
        </div>
        <div class="btnlist">
            <span class="btn save" @click.prevent="save">保存</span>
        </div>
    </div>
</template>
<script>
import { Selector } from "vux"
import { setTimeout } from 'timers';
export default {
    name:"Txladdgroup",
    components:{Selector },
    data(){
        return{
            fgroup:"",
            grouplist:[],
            groupname:"",
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
    },
    methods:{
        save(){//点击保存按钮的方法
            this.that.action({
                moduleName:'addgroup',
                url:"addgroup",
                method:"post",
                resthen(){
                    
                },
                headers: {'XX-token': this.that.airforce.login.data.token},
                isFormData:true,
                data:{
                    type:"1",
                    group_name:this.groupname,
                    f_id:this.fgroup,
                }
            }).then(res=>{
                if(res.code==20000){
                    this.that.$vux.toast.text("添加成功");
                    setTimeout(()=>{
                        this.$ZAlert.hide();
                    },2000)
                }else{
                    this.that.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.that.action({
            moduleName:'group',
            url:"group",
            method:"post",
            headers: {'XX-token': this.that.airforce.login.data.token},
            isFormData:true,
            data:{
                type:"1",
            }
        }).then(res=>{
            if(res.code==200){
                let newarr=[];
                for(var i in res.data){
                    console.log(i)
                    let newobj={};
                    console.log(res.data[i])
                    newobj.key=res.data[i].id;
                    newobj.value=res.data[i].group_name;
                    console.log(newobj)
                    newarr.push(newobj);
                }
                this.grouplist=newarr;
                console.log(this.grouplist)
            }else if(res.code==20003){
                this.that.$vux.toast.text("暂无上级通讯组")
            }else{
                this.that.$vux.toast.text(res.msg)
            }
        }).catch(err=>{})
    }
}
</script>
<style lang="less" scoped>
.addgroup{
    .content{
        overflow: hidden;
        padding: 10px 30px;
        .left{
            float: left;
            width: 50%;
            p{
                text-align: left;
                font-size: 16px;
                line-height: 35px;
            }
            input{
                line-height: 30px;
                display: block;
                width: 80%;
                border-bottom: 1px solid #dbdbdb;
            }
        }
        .right{
            float: right;
            width: 50%;
            p{
                text-align: left;
                font-size: 16px;
                line-height: 35px;
            }

            .selector{
                width: 80%;
                border-bottom: 1px solid #dbdbdb;
                &/deep/ .weui-select{
                    line-height: 30px;
                    height: 30px;
                    font-size: 14px;
                }
            }
            &/deep/ .weui-cell:before{
                    border: none;
                }
        }
    }
    .btnlist{
        .save{
            display: block;
            background: @col-ff6600;
            line-height: 40px;
            color: #fff;
            width: 60px;
            margin: 30px auto 30px;
            cursor: pointer;
        }
    }
}
</style>
