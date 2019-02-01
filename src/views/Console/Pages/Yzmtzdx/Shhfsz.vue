<template>
    <div class="shhfsz">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                上行回复设置
                <div class="notes"></div>
                <div class="notestext">验证码</div>
                <ul class="Dxpartbox-btnlist">
                    <li @click.prevent="sethf">设置回复</li>
                </ul>
            </div>
            <div class="Dxpartbox-content">
                <div class="screen">
                    <span class="sctitle">日期</span>
                    <timeinput  class="chosetime" @closeMain="getstrtime" placeholder=" "></timeinput>
                    <span>—</span>
                    <timeinput  class="chosetime" @closeMain="getendtime" placeholder=" "></timeinput>
                    <div class="screenbox">
                        <span class="sctitle">回复内容</span>
                        <input class="scinput" type="text" placeholder="请输入关键字" v-model="screendata.content">
                    </div>
                    <span class="scbtn" @click.prevent="screenfn">搜索</span>
                </div>
            </div>  
            <div class="Dxpartbox-table">
                <vue-good-table 
                :columns="columns"
                :rows="rows" class="tables"
                :select-options="{
                selectionInfoClass: 'selectionInfoClass',
                enabled: true
                }"
                :pagination-options="{
                    enabled: true,
                    mode: 'pages',
                    nextLabel: '下页',
                    prevLabel: '上页',
                    pageLabel: '页数',
                    rowsPerPageLabel: '默认显示条数',
                  }"
                @on-selected-rows-change="selectionChanged"
                >
                    <template slot="table-row" slot-scope="props">
                        <div class="cz" v-if="props.column.field == 'operate'">
                            
                            <!-- <span @click.prevent="del">删除</span> -->
                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table>
            </div>
        </div>
    </div>    
</template>
<script>
import ConsoleComponents  from "../../components/index.js";
import { VueGoodTable } from 'vue-good-table';
export default {
    name:"shhfsz",
    components:{VueGoodTable,...ConsoleComponents},
    data(){
        return{
            screendata:{
                strtime:"",
                endtime:"",
                content:""
            },
            columns:[
                {
                    label:"序号",
                    field:"serial",
                    type: 'number',
                },
                {
                    label:"发送内容",
                    field:"content",
                },
                {
                    label:"触发关键字",
                    field:"crux",
                },
                {
                    label:"主动回复内容",
                    field:"backcontent",
                },
                {
                    label: '创建时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:MM:SS',
                    dateOutputFormat: 'YYYY-MM-DD HH:MM:SS',
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                {id:1,serial:1,content:"短信测试",crux:"回复",backcontent:"主动回复测试",score:"2017-02-14 20:06:55"}
            ]
        }
    },
    methods:{
        sethf(){//设置回复按钮的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/ShhfHfsz",
                    width:"750px",
                    title:"设置回复",
                    props:{that:()=>this}
                })
        },
        getstrtime(val){//获取开始时间的方法
            this.screendata.strtime=val;
        },
        getendtime(val){//获取结束时间的方法
            this.screendata.endtime=val;
        },
        screenfn(){//点击搜索按钮的方法

        },
        selectionChanged(){//table勾选的方法

        }
    }
}
</script>
<style lang="less" scoped>
.shhfsz{
    box-sizing: border-box;
    padding: 0 20px;
    background: transparent;
    .Dxpartbox{
        background: transparent;
        .Dxpartbox-content{
            background: #fff;
            padding: 12px 14px 12px 7px;
            .screen{
                display: flex;
                flex-wrap: wrap;
                margin: 20px 0 10px 10px;
                span{
                    display: inline-block;
                    line-height: 36px;
                    font-size: 14px;
                    color: #666;
                }
                .sctitle{
                    margin: 0 7px 0 5px;
                }
                .chosetime{
                    width: 150px;
                    margin: 0 10px;
                }
                .screenbox{
                    .scinput{
                        display: inline-block;
                        line-height: 36px;
                        height: 37px;
                        box-sizing: border-box;
                        padding: 0 7px;
                        border: 1px solid #000;
                        margin-right: 20px;
                    }
                }
                .scbtn{
                    line-height: 37px;
                    background: @col-ff6600;
                    color: #fff;
                    padding: 0 15px;
                    cursor: pointer;
                }
            }
        }
        .Dxpartbox-table{
            background: #fff;
            padding: 14px;
            margin-top: 30px;
        }
    }
}
</style>
