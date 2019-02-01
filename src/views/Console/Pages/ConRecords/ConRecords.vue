<template>
    <div class="ConRecords">
        <p class="console-PageTitle">充值记录</p>
        <div class="tabhead">
            <div class="tabont fcztab tabselect" @click="fcztab">
                非充值服务类记录
            </div>
            <div class="tabont cztab" @click="cztab">
                充值服务类记录
            </div>
        </div>
        <div class="fcz" v-if="tabcard=='1'">
            <table class="fcztable" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>数据</th>
                        <th>套餐</th>
                        <th>份数</th>
                        <th>次数</th>
                        <th>金额</th>
                        <th>购买时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tabledata" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.data}}</td>
                        <td>{{item.setmeal}}</td>
                        <td>{{item.copies}}</td>
                        <td>{{item.frequency}}</td>
                        <td>{{item.amount}}元（支持1.05万次）</td>
                        <td>{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="cz" v-if="tabcard=='2'">

            <div class="screen">
                <group gutter="0" class="screenpart">
                    <span class="screentitle">业务的类型：</span>
                    <selector class="screenselector" v-model="screendata.type" :options="ywtype"></selector>
                </group>
                <group gutter="0" class="screenpart">
                    <span class="screentitle">订单状态：</span>
                    <selector class="screenselector" v-model="screendata.stats" :options="zttype"></selector>
                </group>
                <group gutter="0" class=" screentime">
                    <span class="screentitle">查询时间：</span>
                    <timeinput class="timeend" @closeMain="getstrtime"></timeinput>
                    <span>至</span>
                    <timeinput class="timeend" @closeMain="getendtime"></timeinput>
                </group>
                <group gutter="0" class="screenpart">
                    <span class="screentitle">商户订单号：</span>
                    <input class="screeninput" type="text" v-model="screendata.ordernum">
                </group>
                <group gutter="0" class="screenpart">
                    <span class="screentitle">充值号码：</span>
                    <input class="screeninput" type="text" v-model="screendata.cznum">
                </group>
                <group gutter="0" class="screenpart screenbtn">
                    <span class="cxdd" @click.prevent="queryorder">查询订单</span>
                    <span class="dcbg" @click.prevent="exporttable">导出excel</span>
                </group>
            </div>

            <table class="cztable" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>数据</th>
                        <th>套餐</th>
                        <th>份数</th>
                        <th>次数</th>
                        <th>金额</th>
                        <th>购买时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tabledata" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.data}}</td>
                        <td>{{item.setmeal}}</td>
                        <td>{{item.copies}}</td>
                        <td>{{item.frequency}}</td>
                        <td>{{item.amount}}元（支持1.05万次）</td>
                        <td>{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js"
import { Selector,Group } from 'vux'
import Timeinput from "../../components/Timeinput";
export default {
    name:"conrecords",
    components:{Selector,Group,Timeinput,...ConsoleComponents},
    data(){
        return{
            tabcard:"1",
            tabledata:[{
                id:"01",
                data:"短信API服务",
                setmeal:"首次申请赠送",
                copies:"212",
                frequency:"100",
                amount:"200",
                time:"2018-11-01"
            },
            {
                id:"02",
                data:"短信API服务",
                setmeal:"首次申请赠送",
                copies:"212",
                frequency:"100",
                amount:"200",
                time:"2018-11-01"
            },
            {
                id:"03",
                data:"短信API服务",
                setmeal:"首次申请赠送",
                copies:"212",
                frequency:"100",
                amount:"200",
                time:"2018-11-01"
            },
            {
                id:"04",
                data:"短信API服务",
                setmeal:"首次申请赠送",
                copies:"212",
                frequency:"100",
                amount:"200",
                time:"2018-11-01"
            }],
            ywtype:["短信API服务","短信API服务","短信API服务"],
            zttype:["已购买"],
            screendata:{
                type:"",
                stats:"",
                starttime:"",
                endtime:"",
                ordernum:"",
                cznum:""
            }
        }
    },
    methods:{
        fcztab(){//tab切换的方法
            this.tabcard="1";
            document.getElementsByClassName("cztab")[0].classList.remove("tabselect");
            document.getElementsByClassName("fcztab")[0].classList.add("tabselect");
        },
        cztab(){//tab切换的方法
            this.tabcard="2";
            document.getElementsByClassName("fcztab")[0].classList.remove("tabselect");
            document.getElementsByClassName("cztab")[0].classList.add("tabselect");
        },
        getstrtime(val){//选取开始时间的方法
            this.screendata.starttime=val;
        },
        getendtime(val){//选取结束时间的方法
            this.screendata.endtime=val;
        },
        queryorder(){//点击查询订单的方法
            console.log(this.screendata)
        },
        exporttable(){//点击导出表格的方法

        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.ConRecords{
    box-sizing: border-box;
    padding: 0 20px;
    .tabhead{
        overflow: hidden;
        border-bottom: 1px solid #9f9995;
        margin-bottom: 30px;
        .tabont{
            line-height: 35px;
            font-size: 16px;
            float:left;
            border: 1px solid #e0e1e2;
            border-bottom: none;
            width: 200px;
            text-align: center;
            background: #fff;
            cursor:pointer;
        }
        .tabselect{
            background: @col-ff6600;
            color: #fff;
            position: relative;
        }
        .tabselect:after{
            content: " ";
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #fff;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;
        }
    }
    &/deep/ table{
            margin-top: 35px;
            width: 100%;
            thead{
                tr{
                    background: @col-ff6600;
                    line-height: 45px;
                    th{
                        color: #fff;
                        font-size: 16px;
                        border: none;
                        //border-right: 1px solid #fff;
                    }
                    th:nth-child(1){
                        width: 5%;
                    }
                    th:nth-child(2){
                        width: 20%;
                    }
                    th:nth-child(3){
                        width: 20%;
                    }
                    th:nth-child(4){
                        width: 10%;
                    }
                    th:nth-child(5){
                        width: 10%;
                    }
                    th:nth-child(6){
                        width: 15%;
                    }
                    th:nth-child(7){
                        width: 20%;
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
    .cz{
        .screen{
            background: #fff;
            box-sizing: border-box;
            padding: 25px 35px;
            // overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            .screenpart{
                //float: left;
                margin-right: 20px;
                padding: 10px 0;
                &/deep/ .weui-cells:before{
                    border:none;
                }
                &/deep/ .weui-cells:after{
                    border:none;
                }
                overflow: hidden;
                .screentitle{
                    font-size: 14px;
                    display: block;
                    float: left;
                    width: 100px;
                    line-height: 30px;
                    text-align: right;
                }
                .screenselector{
                    float: left;
                    width: 200px;
                    margin-left: 7px;
                    box-sizing: border-box;
                    border:1px solid @col-999999;
                    line-height: 30px;
                    &/deep/ .weui-select{
                        font-size: 14px;
                        height: 30px;
                        line-height: 30px;  
                        option{
                            width: 100%;
                            border: none;
                        }
                    }
                    &/deep/ .weui-cell__bd:after{
                        transform: rotate(135deg)
                    }
                }
                &/deep/ .screenselector:before{
                        border:none;
                    }
                .screeninput{
                    width: 200px;
                    margin-left: 7px;
                    box-sizing: border-box;
                    padding: 0 7px;
                    border: 1px solid @col-999999;
                    line-height: 30px;
                }
            }
            .screentime{
                //float: left;
                margin-right: 20px;
                padding: 10px 0;
                &/deep/ .vux-no-group-title{
                    overflow:unset;
                    .screentitle{
                        width: 100px;
                        text-align: right;
                        line-height: 30px;
                        font-size: 14px;
                    }
                    span{
                        line-height: 30px;
                        font-size: 14px;
                    }
                    .timestart{
                        height: 32px;
                        margin: 0 7px;
                        .timeicon{
                            height: 32px;
                        }
                        input{
                            padding: 3px 8px;
                            border-color: @col-999999;
                        }
                    }
                }
                &/deep/ .weui-cells{
                    display: flex;
                    flex-wrap: wrap;
                    //overflow: auto;
                }
                &/deep/ .weui-cells:before{
                    border:none;
                }
                &/deep/ .weui-cells:after{
                    border:none;
                }
                .screentitle{
                    float: none;
                }
                .timeend{
                    width: 220px;
                }
            }
            .screenbtn{
                margin-left: 107px;
                font-size: 14px;
                height: 32px;
                line-height: 32px;
                &/deep/ .weui-cells{
                    span{
                        display: inline-block;
                        color: #fff;
                        line-height: 32px;
                        font-size: 14px;
                        padding: 0 30px;
                        cursor: pointer;
                    }
                    .cxdd{
                        background: @col-ff6600;
                        margin-right: 30px;
                    }
                    .dcbg{
                        background: #00CCFF;
                    }
                }
            }
        }
    }
}
</style>
