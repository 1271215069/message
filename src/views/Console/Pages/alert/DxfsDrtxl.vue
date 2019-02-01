<template>
    <div class="dxfsdrtxl">
        <p class="title">选择联系租</p>
        <ul class="listbox">
            <li class="listline">
                <label> 
                    <input type="checkbox" v-model="chosall" @change.prevent="chooseall">
                    <span>全选</span>
                </label>
            </li>
            <li class="listline">
                <label> 
                    <input type="checkbox" v-model="ngrouping">
                    <span>未分组</span>
                </label>
            </li>
            <li class="listline" v-for="(item,index) in groupinglist" :key="index">
                <label> 
                    <input type="checkbox" v-model="item.chexk">
                    <span>{{item.title}}</span>
                </label>
            </li>
        </ul>
        <div class="btn">
            <span @click.prevent="checkcho">确认选择</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"dxfsdrtxl",
    data(){
        return{
            chosall:false,//全选input绑定的值
            ngrouping:false,//未分组input绑定的值
            groupinglist:[
                {
                    title:"分组一",
                    chexk:false
                },
                {
                    title:"分组二",
                    chexk:false
                },
                {
                    title:"分组三",
                    chexk:false
                },
            ]
        }
    },
    methods:{
        chooseall(){//点击全选的方法
            console.log(this.chosall)
            if(this.chosall){
                this.ngrouping=true;
                for(let o=0;o<this.groupinglist.length;o++){
                    this.groupinglist[o].chexk=true;
                }
            }else{
                this.ngrouping=false;
                for(let o=0;o<this.groupinglist.length;o++){
                    this.groupinglist[o].chexk=false;
                }
            }
        },
        checkcho(){//点击确认选择的方法
            this.$ZAlert.hide();
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Hmcxq",
                    width:"1000px",
                    title:"号码池详情"
                });
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.dxfsdrtxl{
    box-sizing: border-box;
    padding: 20px 60px;
    .title{
        text-align: left;
        font-size: 14px;
        color: #666;
    }
    .listbox{
        width: 100%;
        display: block;
        box-sizing: border-box;
        padding: 5px 10px;
        border: 1px solid #666;
        margin-top: 10px;
        padding: 20px 10px 50px;
        .listline{
            text-align: left;
            position: relative;
            label{
                display: block;
                width: 100%;
                cursor: pointer;
                input[type=checkbox]{
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    line-height: 36px;
                    top: 8px;
                    left: 5px;
                }
                span{
                    font-size: 14px;
                    color: #666;
                    line-height: 36px;
                    display: inline-block;
                    padding-left: 30px;
                }
            }
            
        }
        .listline:hover{
            background: #f2f4f6;
            label{
                span{
                    color:@col-ff6600;
                }
            }
        }
    }
    .btn{
        text-align: right;
        margin-top: 20px;
        span{
            display: inline-block;
            font-size: 14px;
            line-height: 36px;
            background: @col-ff6600;
            color:#fff;
            padding: 0 20px;
            cursor: pointer;
        }
    }
}
</style>
