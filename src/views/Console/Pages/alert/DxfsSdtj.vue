<template>
    <div class="dxfssdyj">
        <div class="sdtjbox">
            <label class="title"><span>*</span>&nbsp;手机号码</label>
            <div class="right">
                <textarea class="content" v-model="allphone" placeholder="号码之间使用回车进行分割"></textarea>
            </div>
        </div>
        <div class="btnlist">
            <span class="btn" @click.prevent="qd">确定</span>
            <span class="btn" @click.prevent="qx">取消</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"dxfssdyj",
    data(){
        return{
            allphone:"",//输入框绑定的值
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
    }, 
    methods:{
        foo(str){
            var temp = str.split(/[\n,]/g);
            for(var i =0;i<temp.length;i++){
                if(temp[i] == ""){
                temp.splice(i, 1);
                //删除数组索引位置应保持不变
                i--;
                }
            }
            return temp;
            console.log(temp);
        },
        qd(){//点击确定的方法
            if(this.allphone==""){
                this.that.$vux.toast.text("请输入电话号码")
                return;
            }
            let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            //let arearr=this.allphone.split(" ");
            let arearr=this.foo(this.allphone);
            console.log(arearr)
            
            let telarr=[];
            for(let i=0;i<arearr.length;i++){
                let telobj={};
                telobj.tel=arearr[i];
                if (telzz.test(telobj.tel)){
                    telobj.status="正确";
                }else{
                    telobj.status="错误";
                }
                telarr.push(telobj);
            }
            if(this.that.airforce.Phonelist.data){
                let newarr=this.that.airforce.Phonelist.data.concat(telarr);
                this.that.action({
                    moduleName:"Phonelist",
                    goods:{
                        data:newarr,
                    }
                })
            }else{
                this.that.action({
                    moduleName:"Phonelist",
                    goods:{
                        data:telarr,
                    }
                })
            }
            this.$ZAlert.hide();
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Hmcxq",
                    width:"1000px",
                    title:"号码池详情",
                    props:{
                        that:()=>this.that,
                    },
                });
        },
        qx(){//点击取消的方法
            this.$ZAlert.hide();
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.dxfssdyj{
    .sdtjbox{
        overflow: hidden;
        padding: 30px 5%;
        .title{
            display: block;
            float: left;
            width: 20%;
            text-align: right;
            font-size: 14px;
            line-height: 25px;
            span{
                color: #ff2b2b;
            }
        }
        .right{
            float: left;
            margin-left: 2%;
            width: 68%;
            .content{
                width: 100%;
                height: 200px;
                font-size: 14px;
                line-height: 25px;
                border-bottom: 1px solid #dbdbdb;
                resize: none;
            }
        }
    }
    .btnlist{
        text-align: left;
        
        margin-bottom: 20px;
        margin-left: 25%;
        .btn{
            display: inline-block;
            font-size: 14px;
            background: @col-ff6600;
            color: #fff;
            line-height: 36px;
            padding: 0 30px;
            margin-right: 10px;
            cursor: pointer;
        }
    }
}
</style>
