<template>
    <div class="cwfx">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                错误分析
                <div class="notes"></div>
                <div class="notestext">验证码</div>
            </div>
            <div class="Dxpartbox-content">
                <ul class="Dxpartbox-tab">
                    <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
                </ul>
                <div class="screen" v-if="tabval=='1'">
                    <span class="sctitle">日期</span>
                    <timeinput  class="chosetime" @closeMain="getstrtime" placeholder=" "></timeinput>
                    <span>—</span>
                    <timeinput  class="chosetime" @closeMain="getendtime" placeholder=" "></timeinput>
                    <span class="scbtn" @click.prevent="screenfn">搜索</span>
                </div>
                <div class="Dxpartbox-table">

                    <vue-good-table  v-if="tabval=='1'"
                    :columns="sendcwco"
                    :rows="sendcwro" class="tables"
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
                    @on-selected-rows-change="selectionChangedfs"
                    >
                        <template slot="table-row" slot-scope="props">
                            <div class="cz" v-if="props.column.field == 'operate'">
                                
                                <!-- <span @click.prevent="del">删除</span> -->
                            </div>
                            <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                        </template>
                    </vue-good-table>

                    <vue-good-table  v-if="tabval=='2'"
                    :columns="subcwco"
                    :rows="subcwro" class="tables"
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
                    @on-selected-rows-change="selectionChangedtj"
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
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js";
import { VueGoodTable } from 'vue-good-table';
export default {
    name:'cwfx',
    components:{VueGoodTable,...ConsoleComponents},
    data(){
        return{
            tablist:[///tab页的数据
                {
                    title:"发送错误",
                    val:"1"
                },
                {
                    title:"提交错误",
                    val:"2"
                },
            ],
            tabval:"1",//判断tab页的值
            screendata:{
                strtime:"",
                endtime:"",
             },
            sendcwco:[
                {
                    label:"错误码",
                    field:"code",
                },
                {
                    label:"分类",
                    field:"classify",
                },
                {
                    label:"错误码解释",
                    field:"explain",
                    type: 'number',
                },
                {
                    label:"解决方案",
                    field:"solve",
                    type: 'number',
                },
                {
                    label:"错误次数",
                    field:"num",
                    type: 'number',
                },
            ],
            subcwco:[
                {
                    label:"提交内容",
                    field:"content",
                },
                {
                    label:"错误码",
                    field:"code",
                },
                {
                    label:"错误码解释及建议操作",
                    field:"explain",
                },
                {
                    label: '提交时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:MM:SS',
                    dateOutputFormat: 'YYYY-MM-DD HH:MM:SS',
                },
            ],
            sendcwro:[
                {id:1,code:"501",classify:"次数限制",explain:"当日发送量已达限额",solve:"请联系客服或充值增加上限条数",num:38}
            ],
            subcwro:[
                {id:1,content:"短信发送失败",错误码:"501",explain:"当日发送量已达限额,请联系客服或充值增加上限条数",score:"2011-06-17 17:05:53"}
            ]
        }
    },
    methods:{
        tabclick(i,item){
            for(let n=0;n<this.$refs.tabitem.length;n++){
                this.$refs.tabitem[n].classList.remove("tabactive");
            }
            this.$refs.tabitem[i].classList.add("tabactive");
            this.tabval=item.val;
        },
        getstrtime(val){//获取开始时间的方法 
            this.screendata.strtime=val;
        },
        getendtime(val){//获取结束时间的方法
            this.screendata.endtime=val;
        },
        selectionChangedfs(){//table选中方法(发送错误)

        },
        selectionChangedtj(){//table选中方法(提交错误)

        }
    },
    mounted(){
        this.$refs.tabitem[0].classList.add("tabactive");
    }
}
</script>
<style lang="less" scoped>
.cwfx{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{

        .Dxpartbox-content{
            box-sizing: border-box;
            padding: 12px;
            .Dxpartbox-tab{
                height: 36px;
                border-bottom: 1px solid #ddd;
                li{
                    float: left;
                    height: 35px;
                    background-color: #fff;
                    padding: 0px 15px;
                    line-height: 35px;
                    cursor: pointer;
                    color: #A7B1C2;
                    margin-right: 3px;
                    border-radius: 3px 3px 0 0;
                    font-size: 14px;
                    color: #666;
                    background: #fff;
                }
                li:hover{
                    background: #e6e6e6;
                }
                .tabactive{
                    height: 36px;
                    border: 1px solid #ddd;
                    border-bottom: none;
                    color: @col-ff6600;
                }
                .tabactive:hover{
                    background: #fff;
                }
            }
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
            .Dxpartbox-table{
                background: #fff;
                padding: 14px;
                margin-top: 15px;
            }
            .tables{
                &/deep/ .cz{
                    span{
                        display: inline-block;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
