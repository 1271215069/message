<template>
    <div class="rechargelist">
        <p class="console-PageTitle">充值记录</p>
        <div class="tabhead">
            <div class="tabont cgcztab tabselect" @click="cgcztab">
                常规充值
            </div>
            <div class="tabont hycztab" @click="hycztab">
                会员充值订单
            </div>
        </div>
        <div class="cgcz" v-if="tabcard=='1'">
            <div class="amount">总充值金额：<span>￥180565</span></div>
            <div class="query">
                <span class="spanone">查询时间：</span>
                <timeinput class="timestart" @closeMain="getstarttime"></timeinput>
                <span class="spantwo">至</span>
                <timeinput class="timeend" @closeMain="getendtime"></timeinput>
                <span class="querybtn" @click.prevent="query">查询</span>
                <span class="excalbtn" @click.prevent="dc">导出excel</span>
            </div>
            <table class="cgcztable" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>订单</th>
                        <th>名称</th>
                        <th>金额</th>
                        <th>购买时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in listdata" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.order}}</td>
                        <td>{{item.ordername}}</td>
                        <td>{{item.amount}}元（支持1.5万次）</td>
                        <td>{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="hycz" v-if="tabcard=='2'">
            <div class="amount">总充值金额：<span>￥28564</span></div>
            <table class="hycztable" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>订单</th>
                        <th>名称</th>
                        <th>金额</th>
                        <th>状态</th>
                        <th>描述</th>
                        <th>购买时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in listdata" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.order}}</td>
                        <td>{{item.ordername}}</td>
                        <td>{{item.amount}}元（支持1.5万次）</td>
                        <td>{{item.stats}}</td>
                        <td>{{item.describe}}</td>
                        <td>{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js";
import Timeinput from "../../components/Timeinput";
import AddressSelect from "../../components/AddressSelect";
export default {
    name:"rechargelist",
    components:{Timeinput,AddressSelect},
    data(){
        return{
            tabcard:"1",
            tstar:"",
            tend:"",
            listdata:[
                {
                    id:"01",
                    order:"DTS5842443598",
                    ordername:"宁波力拓信息科技有限公司",
                    amount:"3500",
                    time:"2018-10-19",
                    stats:"已付款",
                    describe:"这是描述这是描述这是描述这是描述这是描述这是描述"
                },
                {
                    id:"02",
                    order:"DTS5842443598",
                    ordername:"宁波力拓信息科技有限公司",
                    amount:"3500",
                    time:"2018-10-19",
                    stats:"已付款",
                    describe:"这是描述这是描述这是描述这是描述这是描述这是描述"
                },
                {
                    id:"03",
                    order:"DTS5842443598",
                    ordername:"宁波力拓信息科技有限公司",
                    amount:"3500",
                    time:"2018-10-19",
                    stats:"已付款",
                    describe:"这是描述这是描述这是描述这是描述这是描述这是描述"
                },
                {
                    id:"04",
                    order:"DTS5842443598",
                    ordername:"宁波力拓信息科技有限公司",
                    amount:"3500",
                    time:"2018-10-19",
                    stats:"已付款",
                    describe:"这是描述这是描述这是描述这是描述这是描述这是描述"
                }
            ],
            startdays:"",
            enddays:"",
        }
    },
    methods:{
        getstarttime(val){//选择起始时间的方法
            this.startdays=val;
        },
        getendtime(val){//选择结束时间的方法
            this.enddays=val;
        },
        cgcztab(){
            this.tabcard="1";
            document.getElementsByClassName("hycztab")[0].classList.remove("tabselect");
            document.getElementsByClassName("cgcztab")[0].classList.add("tabselect");
        },
        hycztab(){
            this.tabcard="2";
            document.getElementsByClassName("cgcztab")[0].classList.remove("tabselect");
            document.getElementsByClassName("hycztab")[0].classList.add("tabselect");
        },
        query(){//点击查询按钮

        },
        dc(){//点击导出按钮

        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";

.rechargelist{
    box-sizing: border-box;
    padding: 0 20px;
    .console-PageTitle{
        font-size: 22px;
        padding-bottom: 20px;
        color: @col-999999;
    }
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
            width: 150px;
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

    .cgcz{
        .amount{
            font-size: 16px;
            span{
                color: @col-ff6600;
                font-size: 32px;
                letter-spacing: 2px;
            }
        }

        .query{
            background: #fff;
            box-sizing: border-box;
            padding: 30px 50px;
            margin-top: 30px;
            //display: flex;
            .spanone{
                margin-right: 10px;
            }
            .spantwo{
                margin: 0 20px;
            }
            span{
                display: inline-block;
            }
            .timestart{
                display: inline-block;
                top: 12px;
            }
            .querybtn{
                width: 9%;
                line-height: 37px;
                text-align: center;
                color: #fff;
                background: @col-ff6600;
                margin-left: 60px;
                cursor: pointer;
            }
            .excalbtn{
                width: 9%;
                line-height: 37px;
                text-align: center;
                color: #fff;
                background: #00CCFF;
                margin-left: 20px;
                cursor: pointer;
            }
        }
        .cgcztable{
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
                        width: 7%;
                    }
                    th:nth-child(2){
                        width: 30%;
                    }
                    th:nth-child(3){
                        width: 35%;
                    }
                    th:nth-child(4){
                        width: 10%;
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
    }
    .hycz{
        .amount{
            font-size: 16px;
            span{
                color: @col-ff6600;
                font-size: 32px;
                letter-spacing: 2px;
            }
        }
        .hycztable{
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
                    // th:nth-child(1){
                    //     width: 7%;
                    // }
                    // th:nth-child(2){
                    //     width: 30%;
                    // }
                    // th:nth-child(3){
                    //     width: 35%;
                    // }
                    th:nth-child(6){
                        width: 30%;
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
    }
    input[type="date"]:before{
        color:#A9A9A9;
        content:attr(placeholder);
    }


    input[type="date"].full:before {
        color:black;
        content:""!important;
    }
}

</style>
