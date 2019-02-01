<template>
    <div class="dxjl">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                短信记录
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">
                <ul class="Dxpartbox-tab" >
                    <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
                </ul>
                <div class="screen" >
                    <span class="sctitle">发送时间</span>
                    <timeinput  class="chosetime" :timetext="screendatajs.strtime"  @closeMain="getstrtime" placeholder=" "></timeinput>
                    <span>—</span>
                    <timeinput  class="chosetime" :timetext="screendatajs.endtime" @closeMain="getendtime" placeholder=" "></timeinput>

                    <!-- <div class="screenbox">
                        <span class="sctitle">接收状态</span>
                        <selector v-model="screendatajs.status" class="scselect" :options="statuslist"></selector>
                    </div>
                    
                    <div class="screenbox">
                        <span class="sctitle">相应代码</span>
                        <input class="scinput" type="text" placeholder="请输入相应代码" v-model="screendatajs.content">
                    </div> -->
                    
                    <div class="screenbox">
                        <span class="sctitle">手机号码</span>
                        <input class="scinput" type="text" placeholder="请输入手机号码" v-model="screendatajs.content">
                    </div>

                    <div class="screenbox">
                        <span class="sctitle">批次号</span>
                        <input class="scinput" type="text" placeholder="请输入批次号" v-model="screendatajs.pcnum">
                    </div>
                    
                    <span class="scbtn" @click.prevent="screenfn">搜索</span>
                </div>

                <div class="screen" v-if="tabval=='2'">
                    <span class="sctitle">发送时间</span>
                    <timeinput  class="chosetime" @closeMain="getstrtime" placeholder=" "></timeinput>
                    <span>—</span>
                    <timeinput  class="chosetime" @closeMain="getendtime" placeholder=" "></timeinput>
                    <span class="scbtn" @click.prevent="screenfn">搜索</span>
                </div>
            </div>
            <div class="Dxpartbox-table">
                <vue-good-table  
                :columns="columnsjs"
                :rows="rowsjs" class="tables"
                :line-numbers="true"
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
                @on-selected-rows-change="selectionChangedjs"
                >
                    <template slot="table-row" slot-scope="props">
                        <div class="cz" v-if="props.column.field == 'status'">
                            {{props.formattedRow[props.column.field]}}
                            <p class="errcode" v-if="props.formattedRow.status =='接收失败'">
                                {{props.formattedRow.error_report}}
                            </p>
                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table>

                <!-- <vue-good-table  v-if="tabval=='2'"
                :columns="columnshf"
                :rows="rowshf" class="tables"
                :line-numbers="true"
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
                @on-selected-rows-change="selectionChangedhf"
                >
                    <template slot="table-row" slot-scope="props">
                        <div class="cz" v-if="props.column.field == 'status'">
                            {{props.formattedRow[props.column.field]}}

                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table> -->
            </div>
        </div>
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js"
import { VueGoodTable } from 'vue-good-table';
import { Selector  } from "vux"
export default {
    name:"dxjl",
    components:{Selector,VueGoodTable,...ConsoleComponents},
    data(){
        return{
            tablist:[//tab页的数据
                {
                    title:"平台短信",
                    val:"1"
                },
                {
                    title:"接口短信",
                    val:"3"
                },
            ],
            tabval:"1",//判断tab页的值
            screendatajs:{//搜索所需的数据
                strtime:"",
                endtime:"",
                content:"",
                pcnum:"",
                status:""
            },
            statuslist:["接收成功","接收失败","等待返回"],//状态下拉选项
            columnsjs:[//接收记录表格标题
                {
                    label:"批次号",
                    field: 'pcnum',
                    type: 'number',
                },
                {
                    label:"手机号",
                    field: 'tel',
                },
                {
                    label:"归属地",
                    field: 'belong',
                },
                {
                    label:"运营商",
                    field: 'operator',
                },
                {
                    label:"相应代码",
                    field: 'code',
                    hidden: true,
                },
                {
                    label:"发送内容",
                    field: 'content',
                },
                {
                    label: '发送时间',
                    field: 'fsscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label: '接收时间',
                    field: 'jsscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                     hidden: true,
                },
                {
                    label:"接收状态",
                    field: 'status',
                    // field: 'operate',
                    html:true
                },
            ],
            rowsjs:[//接收记录表格数据
                //{id:1,pcnum:96223,tel:"15958123761",belong:"浙江宁波",operator:"宁波力拓",status:"接收成功",code:"",content:"",fsscore:"2018-11-02 13:53:59",jsscore:"2018-11-03 13:53:59"}
            ],
            columnshf:[//回复记录表格标题
                {
                    label:"手机号",
                    field: 'tel',
                },
                {
                    label:"回复内容",
                    field: 'content',
                },
                {
                    label: '接收时间',
                    field: 'jsscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-mm-DD HH:MM:SS',
                    dateOutputFormat: 'YYYY-mm-DD HH:MM:SS',
                },
            ],
            rowshf:[
                //{id:1,tel:"15958123761",content:"",jsscore:"2018-11-02 13:53:59"}
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
            this.getjstabledata();
        },
        getstrtime(val){//获取开始时间的方法
            this.screendatajs.strtime=val;  
        },
        getendtime(val){//获取结束时间的时间
            this.screendatajs.endtime=val;
        },
        screenfn(){//点击搜索按钮的方法
            let st=new Date(this.screendatajs.strtime);
            let et=new Date(this.screendatajs.endtime);
            let now=new Date();
            if(st>et){
                this.$vux.toast.text("起始日期不得大于结束日期");
                return;
            }
            if(st>now){
                this.$vux.toast.text("起始日期不得大于当前日期");
                return;
            }
            if(et>now){
                this.$vux.toast.text("结束日期不得大于当前日期");
                return;
            }
            var aDay = 24 * 60 * 60 * 1000; // 完整一天有24小时，将小时换算成毫秒时间戳
            var diffDay = (et - st) / aDay; // 计算间隔天数（注意日期隐式转换）
            if(diffDay>7){
                this.$vux.toast.text("查询天数不得大于7天");
                return;
            }

            if(this.tabval=="1"){
                this.getjstabledata();
            }else if(this.tabval=="3"){
                this.getjstabledata();
            }
        },
        selectionChangedjs(){//接收记录勾选table复选框的方法

        },

        getjstabledata(){//获取表格数据的方法
            this.rowsjs=[];
            this.action({
                moduleName:'smdList',
                url:"smdList",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:this.tabval,
                    start_time:this.screendatajs.strtime,
                    end_time:this.screendatajs.endtime,
                    order_sn:this.screendatajs.pcnum,
                    phone:this.screendatajs.content
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    for(let i=0;i<res.data.length;i++){
                        let telist=res.data[i].user_phone;
                        let newobj={};
                        newobj.pcnum=res.data[i].sms_order_sn;//批次号
                        newobj.content=res.data[i].sms_content;//内容
                        newobj.fsscore=this.lgetdate(res.data[i].create_time);//发送时间
                        newobj.tel=res.data[i].phone;//号码
                        newobj.belong=res.data[i].province;//归属地
                        newobj.operator=res.data[i].sp;//运营商
                        switch(res.data[i].status){
                            case '10':
                                newobj.status="接收成功";
                                break;
                            case '20':
                                newobj.status="接收失败";
                                newobj.error_report=res.data[i].error_report;
                                break;
                            case '30':  
                                newobj.status="已发送";
                                break;     
                            default:
                                newobj.status="未审核";
                                break;
                        }
                        newarr.push(newobj);
                    }
                    this.rowsjs=newarr;
                    this.$vux.toast.text("短信记录数据更新成功")
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        lgetdate(e){
                e=e*1000;
                var now = new Date(e);
                let y = now.getFullYear();
                let m = now.getMonth() + 1;
                let d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        }
    },
    mounted(){
        this.$refs.tabitem[0].classList.add("tabactive");
        if(this.$route.query.query=="1"){
            try {
                let querydata=this.airforce.Fsquery.data;
                this.screendatajs.strtime=querydata.strtime;
                this.screendatajs.endtime=querydata.endtime;
                this.screendatajs.pcnum=querydata.pcnum;
            }catch (e){}
        }
        this.getjstabledata();
    }
}
</script>
<style lang="less" scoped>
.dxjl{
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
                    display: flex;
                    .scinput{
                        display: inline-block;
                        line-height: 36px;
                        height: 37px;
                        width: 150px;
                        box-sizing: border-box;
                        padding: 0 7px;
                        border: 1px solid #000;
                        margin-right: 20px;
                    }
                    .scselect{
                        height: 37px;
                        line-height: 37px;
                        width: 115px;
                        margin-right: 20px;
                        &/deep/ .weui-select{
                            height: 37px;
                            line-height: 37px;
                            border: 1px solid #000;
                            font-size: 14px;
                            option{
                                font-size: 14px;
                            }
                        }
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
            margin-top: 30px;
            box-sizing: border-box;
            padding: 12px;
            background: #fff;
            &/deep/ .cz{
                position: relative;
                .errcode{
                    position: absolute;
                    top: 20px;
                    right: 70px;
                    width: 200px;
                    height: auto;
                    padding: 10px;
                    background: #fff;
                    box-shadow: 0 0 15px 0 #ddd;
                    z-index: 700;
                    white-space:normal;
                    word-break:break-all;
                    word-wrap:break-word; 
                    display: none;
                }
            }
            &/deep/ .cz:hover{
                .errcode{
                    display: block;
                }
            }
        }
    }
}
</style>
