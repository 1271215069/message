<template>
    <div class="dssj">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                发送数据
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">
                <ul class="Dxpartbox-tab">
                    <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
                </ul>
                <div class="screen">
                    <span class="sctitle">日期</span>
                    <timeinput  class="chosetime" @closeMain="getstrtime" :justmouth="tabval=='2'" placeholder=" "></timeinput>
                    <span>—</span>
                    <timeinput  class="chosetime" @closeMain="getendtime" :justmouth="tabval=='2'" placeholder=" "></timeinput>
                    <span class="scbtn" @click.prevent="screenfn">搜索</span>
                    <div class="type">
                        <selector v-model="dxtype" :options='typelist' @on-change="typechange"></selector>
                    </div>
                </div>
            </div>
            <div class="Dxpartbox-table">
                <vue-good-table 
                :columns="tabval=='1'?columns:columnsmon"
                :rows="rows" class="tables"
                :select-options="{
                selectionInfoClass: 'selectionInfoClass',
                enabled: false
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
import { Selector } from 'vux'
export default {
    name:"fssj",
    components:{VueGoodTable,...ConsoleComponents,Selector},
    data(){
        return{
            tablist:[//tab页的数据
                {
                    title:"日发送",
                    val:"1"
                },
                {
                    title:"月发送",
                    val:"2"
                },
            ],
            tabval:"1",//判断tab页的值
            screendata:{//筛选的数据
                strtime:"",
                endtime:"",
            },
            dxtype:"1",
            typelist:[
                {
                    key:"1",
                    value:"平台短信"
                },
                {
                    key:"3",
                    value:"接口短信"
                },
            ],
            columns:[
                {
                    label: '时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-mm-DD',
                    dateOutputFormat: 'YYYY-mm-DD',
                },
                {
                    label:"发送数量",
                    field:"fsnum",
                    type: 'number',
                },
                {
                    label:"成功",
                    field:"success",
                    type: 'number',
                },
                {
                    label:"成功率",
                    field:"surate",
                    type: 'percentage',
                },
                {
                    label:"失败",
                    field:"fail",
                    type: 'number',
                },
                {
                    label:"失败率",
                    field:"farate",
                    type: 'percentage',
                },
                // {
                //     label:"未知",
                //     field:"unknow",
                //     type: 'number',
                // },
                // {
                //     label:"未知率",
                //     field:"ukrate",
                //     type: 'percentage',
                // },
            ],
            columnsmon:[
                {
                    label: '时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-mm',
                    dateOutputFormat: 'YYYY-mm',
                },
                {
                    label:"发送数量",
                    field:"fsnum",
                    type: 'number',
                },
                {
                    label:"成功",
                    field:"success",
                    type: 'number',
                },
                {
                    label:"成功率",
                    field:"surate",
                    type: 'percentage',
                },
                {
                    label:"失败",
                    field:"fail",
                    type: 'number',
                },
                {
                    label:"失败率",
                    field:"farate",
                    type: 'percentage',
                },
            ],
            rows:[
                //{id:1,score:"2018-05-13",fsnum:"50",success:"40",surate:0.8,fail:"5",farate:0.1,unknow:"5",ukrate:0.1}
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
            this.gettabledata();
        },
        getstrtime(val){//获取开始时间数据
            this.screendata.strtime=val;
        },
        getendtime(val){//获取结束时间数据
            this.screendata.endtime=val;
        },
        screenfn(){//搜索按钮的方法
            this.gettabledata();
        },
        selectionChanged(){//table被勾选触发的方法

        },
        typechange(){//类型改变时触发的方法
            this.gettabledata();
        },
        gettabledata(){
            let axiosurl="";
            if(this.tabval=="1"){
                axiosurl="datacount";
            }else if(this.tabval=="2"){
                axiosurl="datamonthdata";
            }

            this.action({
                moduleName:axiosurl,
                url:axiosurl,
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token},
                data:{
                    type:this.dxtype,
                    start_time:this.screendata.strtime,
                    end_time:this.screendata.endtime,
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    for(let i=0;i<res.data.length;i++){
                        let newobj={};
                        newobj.score=res.data[i].date;
                        if(res.data[i].sm_sum==null){
                            newobj.fsnum=0;
                        }else{
                            newobj.fsnum=parseInt(res.data[i].sm_sum);
                        }
                        if(res.data[i].send_sum==null){
                            newobj.success=0;
                        }else{
                            newobj.success=parseInt(res.data[i].send_sum);
                        }
                        if(newobj.success==0||newobj.fsnum==0){
                            newobj.surate=0;
                        }else{
                            newobj.surate=newobj.success/newobj.fsnum;
                        }
                        
                        if(res.data[i].send_error_sum==null){
                            newobj.fail=0;
                        }else{
                            newobj.fail=parseInt(res.data[i].send_error_sum);
                        }
                        if(newobj.farate==0||newobj.fsnum==0){
                            newobj.farate=0;
                        }else{
                            newobj.farate=newobj.fail/newobj.fsnum;
                        }
                        
                        newarr.push(newobj);
                    }
                    this.rows=newarr;
                    this.$vux.toast.text("数据更新成功")
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.$refs.tabitem[0].classList.add("tabactive");
        this.gettabledata();
    }
}
</script>
<style lang="less" scoped>
.dssj{
    box-sizing: border-box;
    padding: 0 20px;
    background: transparent;
    .Dxpartbox{
        background: transparent;
        .Dxpartbox-content{
            background: #fff;
            padding: 12px 14px 12px 7px;
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
                .type{
                    margin-left: 20px;
                    border: 1px solid #000;
                    &/deep/ .weui-select{
                        height: 35px;
                        line-height: 35px;
                        font-size: 14px;
                    }
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
