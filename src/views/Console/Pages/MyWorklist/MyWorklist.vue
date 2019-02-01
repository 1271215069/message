<template>
    <div class="myworklist">
        <div class="console-card">
            <div class="console-PageTitleV2">工单管理</div>
            <div class="content">
                <div class="tabhead">
                    <div class="tabont" ref="tabhead" v-for="(item,index) in tablist" :key="index" @click.prevent="changetab(index,item)">
                        {{item.title}}
                    </div>
                </div>
                <span class="headbtn" @click.prevent="addgd">+ 创建新工单</span>
                <table class="datatable" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>标题</th>
                        <th>状态</th>
                        <th>受理客服组</th>
                        <th>受理客服</th>
                        <th>日期</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in datalist" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.states}}</td>
                        <td>{{item.kefugroup}}</td>
                        <td>{{item.kefu}}</td>
                        <td>{{item.time}}</td>
                    </tr>
                    </tbody>
                </table>
                <paging :pages="1"></paging>
            </div>
        </div>
    </div>
</template>
<script>
import Paging from "../../components/Paging";

export default {
    name:"myworklist",
    components:{Paging},
    data(){
        return{
            tablist:[
                {
                    title:"我的工单",
                    type:"0"
                },
                {
                    title:"待受理",
                    type:"1"
                },
                {
                    title:"待回复",
                    type:"2"
                },
                {
                    title:"已解决",
                    type:"3"
                },
                {
                    title:"已关闭",
                    type:"4"
                }
            ],
            datalist:[
                {
                    id:"01",
                    title:"全国天气预报全国天气预报全国天气预报",
                    states:"已审核",
                    kefugroup:"Juhe运营组Juhe运营组",
                    kefu:"100",
                    time:"2018-11-05"
                },
                {
                    id:"02",
                    title:"全国天气预报全国天气预报全国天气预报",
                    states:"已审核",
                    kefugroup:"Juhe运营组Juhe运营组",
                    kefu:"100",
                    time:"2018-11-05"
                },
                {
                    id:"03",
                    title:"全国天气预报全国天气预报全国天气预报",
                    states:"已审核",
                    kefugroup:"Juhe运营组Juhe运营组",
                    kefu:"100",
                    time:"2018-11-05"
                }
            ]
        }
    },
    methods:{
        changetab(i,item){//tab按钮
            for(let l=0;l<this.$refs.tabhead.length;l++){
                this.$refs.tabhead[l].classList.remove("tabselect")
            }
            this.$refs.tabhead[i].classList.add("tabselect");

        },
        addgd(){//点击创建新工单按钮
            this.$router.push("/AddWorklist")
        },
        getdata(datatype){//获取表格数据的方法

        }
    },
    mounted(){
        this.$refs.tabhead[0].classList.add("tabselect");
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.myworklist{
    box-sizing: border-box;
    padding: 0 20px;
    .tabhead{
        overflow: hidden;
        border-bottom: 1px solid #9f9995;
        margin-bottom: 15px;
        .tabont{
            line-height: 35px;
            font-size: 16px;
            float:left;
            border: 1px solid #e0e1e2;
            border-bottom: none;
            width: 100px;
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
    .headbtn{
        font-size: 14px;
        color:@col-ff6600;
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid @col-ff6600;
        padding: 3px 7px;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 15px;
    }
    .datatable{
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
                // th:nth-child(2){
                //     width: 20%;
                // }
                th:nth-child(3){
                    width: 25%;
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
</style>
