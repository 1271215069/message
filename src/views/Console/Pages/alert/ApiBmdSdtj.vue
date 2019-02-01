<template>
    <div class="dxfssdyj">
        <div class="sdtjbox">
            <label class="title"><span>*</span>&nbsp;手机号码</label>
            <div class="right">
                <textarea class="content" v-model="tellist" placeholder="号码之间使用回车符分隔"></textarea>
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
            tellist:"",
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
        // test:{
        //     type:Function,
        //     default:()=>{}
        // }
    },
    methods:{
        foo(str){
            var temp = str.replace(/\n/g,",");
            // var temp = str.split(/[\n,]/g);
            // console.log(temp)
            // for(var i =0;i<temp.length;i++){
            //     if(temp[i] == ""){
            //     temp.splice(i, 1);
            //     //删除数组索引位置应保持不变
            //     i--;
            //     }
            // }
            return temp;
            console.log(temp);
        },
        qd(){//点击确定的方法

            this.that.action({
                moduleName:'addphonewhite',
                url:"addphonewhite",
                method:"post",
                headers: {'XX-token': this.that.airforce.login.data.token,},
                isFormData:true,
                data:{
                    content:this.foo(this.tellist),
                    type:"3"
                }
            }).then(res=>{
                if(res.code==20000){
                    this.that.$vux.toast.text("添加成功");
                    setTimeout(()=>{
                        this.$emit('afteradd');
                        this.$ZAlert.hide();
                    },2000)
                }else{
                    this.that.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
            
        },
        qx(){//点击取消的方法
            // this.$emit("kk",656)
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
