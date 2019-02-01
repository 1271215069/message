<template>
    <div class="Phonemanage">
        <p class="console-PageTitle">预警手机号码管理</p>
        <div class="phmcontainer">
            <div class="phmhead">
                <span class="headyj" @click.prevent="yj">+ 添加预警号码</span>
                <span class="headyz" @click.prevent="yz">+ 设置登陆二次验证</span>
            </div>
            <div class="phmcontent">
                <table class="phmta" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>手机号</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in 10" :key="index">
                            <td>01</td>
                            <td>林祥柯</td>
                            <td>15958123761</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <x-dialog v-model="maskshow" :hide-on-blur="true" class="xdialog">
            <div class="maskcontent">
                <ul>
                    <li>
                        <div class="left"><span>*</span> 姓名：</div>
                        <div class="right">
                            <input type="text" v-model="username">
                        </div>
                    </li>
                    <li>
                        <div class="left"><span>*</span> 手机号码：</div>
                        <div class="right ">
                            <input type="text" v-model="usertel">
                            <span class="yzm" @click.prevent="getyzm">获取验证码</span>
                        </div>
                    </li>
                    <li>
                        <div class="left"><span>*</span> 验证码：</div>
                        <div class="right">
                            <input type="text" v-model="useryzm">
                        </div>
                    </li>
                </ul>
                <div class="btn" @click.prevent="checkbtn">确定</div>
            </div>
        </x-dialog>
    </div>
</template>
<script>
import consoleVue from "../../components/index"
import ZFlexboxItem from "../../components/ZFlexboxItem";
import { XDialog } from "vux"
export default {
    name:"phonemanage",
    components:{XDialog,ZFlexboxItem,...consoleVue},
    data(){
        return{
            maskshow:false,
            username:"",
            usertel:"",
            useryzm:"",
        }
    },
    methods:{
        yj(){//顶部按钮1
            this.maskshow=true;
        },
        yz(){//顶部按钮2
            this.$router.push("/Verification");
        },
        getyzm(){//验证码按钮

        },
        checkbtn(){//确定按钮

        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.Phonemanage{
    box-sizing: border-box;
    padding: 0 20px;
    .phmcontainer{
        border-top:1px solid @col-999999;
        .phmhead{
            margin-top: 10px;
            span{
                font-size: 14px;
                color:#00ccff;
                display: inline-block;
                box-sizing: border-box;
                border: 1px solid #00ccff;
                padding: 3px 7px;
                cursor: pointer;
                margin-right: 10px;
            }
        }
        .phmcontent{
            .phmta{
                margin-top: 35px;
                width: 100%;
                thead{
                    tr{
                        background: @col-ff6600;
                        line-height: 45px;
                        th{
                            color: #fff;
                            font-size: 16px;
                            
                            //border-right: 1px solid #fff;
                        }
                    }
                }
                tbody{
                    tr{
                        font-size: 14px;
                        color: @col-999999;
                        line-height: 45px;
                        background: #fff;   
                        td{
                            text-align: center;
                            border: none;
                            border-bottom: 1px solid #ababac;
                        }
                        td:nth-child(1){
                            width: 6%;
                        }
                        td:nth-child(2){
                            width: 47%;
                        }
                        td:nth-child(3){
                            width: 47%;
                        }
                    }
                    tr{
                        cursor: default;
                        &:nth-child(odd){
                            background: #f3f5f8;
                        }
                        &:nth-child(even){
                            background: #fff;
                        }
                    }
                    tr:hover{
                        background: @consoleColor;
                        td{
                            color: @cor_ffffff;
                        }
                    }
                }
            }
        }
    }
    .xdialog{
        &/deep/ .weui-dialog{
            //width: 50%;
            width: 30%;
            max-width: 30%;
        }
        .maskcontent{
           width: 100%;
           height: 100%;
           background: #fff;
           box-sizing: border-box;
           padding: 30px;
           ul{
               li{
                   display: flex;
                   justify-content: space-between;
                   flex-wrap: wrap;
                   line-height: 30px;
                   margin-bottom: 15px;
                   .left{
                       width: 20%;
                       text-align: right;
                       line-height: 30px;
                       span{
                           color: #ff3333;
                       }
                   }
                   .right{
                        width: 78%;
                        text-align: left;
                        overflow: hidden;
                        input{
                            width: 60%;
                            line-height: 30px;
                            box-sizing: border-box;
                            border: 1px solid @col-999999;
                            padding: 0 7px;
                            float: left;
                        }
                        .yzm{
                            text-align: center;
                            display: inline-block;
                            color: #fff;
                            background: #00ccff;
                            line-height: 32px;
                            float: left;
                            width: 30%;
                            margin-left: 5%;
                            cursor: pointer;
                        }
                   }
               }
           }
           .btn{
               width: 20%;
               line-height: 40px;
               margin: 20px auto 0;
               color: #fff;
               background: @col-ff6600;
               cursor: pointer;
           }
        }
    }
}
</style>
