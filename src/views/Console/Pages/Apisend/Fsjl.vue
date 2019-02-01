<template>
    <div class="fsjl">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                发送记录
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">
                <ul class="Dxpartbox-tab">
                    <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
                </ul>
                <div class="screen">
                    <span class="sctitle">日期</span>
                    <timeinput  class="chosetime" @closeMain="getstrtime" placeholder=" "></timeinput>
                    <span>—</span>
                    <timeinput  class="chosetime" @closeMain="getendtime" placeholder=" "></timeinput>
                    
                    <div class="screenbox">
                        <span class="sctitle">发送内容</span>
                        <input class="scinput" type="text" placeholder="请输入关键字" v-model="screendata.content">
                    </div>
                    
                    <div class="screenbox">
                        <span class="sctitle">批次号</span>
                        <input class="scinput" type="text" placeholder="请输入批次号" v-model="screendata.pcnum">
                    </div>
                    
                    
                    <span class="scbtn" @click.prevent="screenfn">搜索</span>
                </div>
            </div>
            <div class="Dxpartbox-table">
                <vue-good-table 
                :columns="columns"
                :rows="rows" class="tables"
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
                @on-selected-rows-change="selectionChanged"
                >
                    <template slot="table-row" slot-scope="props">
                        <div class="cz" v-if="props.column.field == 'operate'">
                            
                            <span class="detail" @click.prevent="detail(props)">详情</span>
                            <span class="detail" @click.prevent="setsh(props)">设置上行回复</span>
                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table>
            </div>
        </div>
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js"
import { VueGoodTable } from 'vue-good-table';
export default {
    name:"fsjl",
    components:{VueGoodTable,...ConsoleComponents},
    data(){
        return{
            tablist:[//tab页的数据
                {
                    title:"全部",
                    val:""
                },
                {
                    title:"等待审核",
                    val:"1"
                },
                {
                    title:"审核驳回",
                    val:"3"
                },
                {
                    title:"等待发送",
                    val:"4"
                },
                {
                    title:"发送中",
                    val:"5"
                },
                {
                    title:"发送完毕",
                    val:"6"
                },
                {
                    title:"已取消",
                    val:"7"
                },
            ],
            tabval:"",//判断tab页的值
            screendata:{//搜索所需的数据
                strtime:"",
                endtime:"",
                content:"",
                pcnum:""
            },
            columns:[
                {
                    label:"批次号",
                    field: 'pcnum',
                    type: 'number',
                },
                {
                    label:"发送内容",
                    field: 'content',
                    width:"",
                },
                {
                    label:"已发送/总条数",
                    field:"alread",
                    hidden: true,
                },
                {
                    label:"号码个数",
                    field:"numlen",
                    type: 'number',
                },
                {
                    label:"发送来源",
                    field:"source",
                },
                {
                    label:"提交状态",
                    field:"status",
                },
                {
                    label: '发送时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-mm-DD HH:MM:SS',
                    dateOutputFormat: 'YYYY-mm-DD HH:MM:SS',
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                //{ id:1, pcnum:96223, content:"云通讯", alread:7,numlen:7,source:"平台发送",status:"审核通过",score:"2011-10-30 13:53:59" },
            ]
        }
    },
    methods:{
        tabclick(i,item){//点击tab的方法
            for(let n=0;n<this.$refs.tabitem.length;n++){
                this.$refs.tabitem[n].classList.remove("tabactive");
            }
            this.$refs.tabitem[i].classList.add("tabactive");
            this.tabval=item.val;
            this.gettabledata();
        },
        getstrtime(val){//获取开始时间的方法
            this.screendata.strtime=val;
        },
        getendtime(val){//获取结束时间的时间
            this.screendata.endtime=val;
        },
        screenfn(){//点击搜索按钮的方法
            let st=new Date(this.screendata.strtime);
            let et=new Date(this.screendata.endtime);
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
            this.gettabledata();
        },
        selectionChanged(){//勾选table复选框的方法

        },
        detail(e){//点击详情的方法
            let newobj={};
            newobj.pcnum=e.formattedRow.pcnum;
            newobj.strtime=this.screendata.strtime;
            newobj.endtime=this.screendata.endtime;
            this.action({
                moduleName:"Fsquery",
                goods:{
                    data:null
                }
            })
            this.action({
                moduleName:"Fsquery",
                goods:{
                    data:newobj
                }
            })
            this.$router.push("/Dxjl?query=1")
        },
        setsh(e){//点击上行回复的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/ShhfHfsz",
                    width:"750px",
                    title:"设置回复",
                    props:{
                        that:()=>this,
                        dxdata:()=>e,
                        type:()=>"3",
                    }
                })
        },
        gettabledata(){//获取表格数据的方法
            this.rows=[];
            this.action({
                moduleName:'smslist',
                url:"smslist",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:"3",
                    is_timing:"1",
                    status:this.tabval,
                    order_sn:this.screendata.pcnum,
                    sms_content:this.screendata.content,
                    start_time:this.screendata.strtime,
                    end_time:this.screendata.endtime,
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    for(let i=0;i<res.data.length;i++){
                        let newobj={};
                        newobj.id=res.data[i].id;
                        newobj.pcnum=res.data[i].sms_order_sn;
                        newobj.content=res.data[i].sms_content;

                        newobj.numlen=res.data[i].sm_sum;
                        newobj.source="Api发送";
                        switch(res.data[i].status){
                            case 1:
                                newobj.status="等待审核";
                                break;
                            case 2:
                                newobj.status="通过审核";
                                break;
                            case 3:
                                newobj.status="审核驳回";
                                break;
                            case 4:
                                newobj.status="等待发送";
                                break;
                            case 5:
                                newobj.status="发送中";
                                break;
                            case 6:
                                newobj.status="发送完毕";
                                break;
                            case 7:
                                newobj.status="已取消";
                                break;
                            default:
                                break;
                        }
                        newobj.score=res.data[i].send_time;
                        newarr.push(newobj);
                        this.$vux.toast.text("发送记录数据更新成功")
                    }
                    this.rows=newarr;
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
@import "../../../../assets/css/vars";
.fsjl{
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
            }
        }
        .Dxpartbox-table{
            margin-top: 30px;
            box-sizing: border-box;
            padding: 12px;
            background: #fff;
            &/deep/ .detail{
                cursor: pointer;
                color: #2252af;
            }
        }
    }
}

</style>
