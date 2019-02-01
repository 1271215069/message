<template>
    <div class="dsgl">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                定时管理
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
                    <span class="scbtn" @click.prevent="screenfn">搜索</span>
                </div>
            </div>
            <div class="Dxpartbox-table">
                <vue-good-table v-if="tabval!=2"
                :columns="columns"
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
                            <span class="detail" @click.prevent="detail(props.formattedRow)">详情</span>
                            <span class="cancel" @click.prevent="cancel(props)">取消</span>
                            <!-- <span @click.prevent="del">删除</span> -->
                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table>




                <vue-good-table v-if="tabval==2"
                :columns="columnstwo"
                :rows="rowstwo" class="tables"
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
                @on-selected-rows-change="selectionChangedtwo"
                >
                    <template slot="table-row" slot-scope="props">
                        <div class="cz" v-if="props.column.field == 'operate'">
                            <span class="cancel" @click.prevent="cancel(props)">取消</span>
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
import ConsoleComponents  from "../../components/index.js"
import { VueGoodTable } from 'vue-good-table';
import { exists } from 'fs';
export default {
    name:"dsgl",
    components:{VueGoodTable,...ConsoleComponents},
    data(){
        return{
            tablist:[//tab页的数据
                {
                    title:"短信定时",
                    val:"1"
                },
                {
                    title:"变量定时",
                    val:"2"
                },
                {
                    title:"API定时",
                    val:"3"
                }
            ],
            tabval:"1",//判断tab页的值
            screendata:{//筛选的数据
                strtime:"",
                endtime:"",
                content:""
            },
            columns:[
                {
                    label:"批次号",
                    field:"pcnum"
                },
                {
                    label:"发送内容",
                    field:"content"
                },
                {
                    label:"提交数量",
                    field:"num",
                },
                {
                    label:"提交状态",
                    field:"status"
                },
                {
                    label: '创建时间    ',
                    field: 'cjscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label: '定时时间',
                    field: 'dsscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            columnstwo:[
                {
                    label:"序号",
                    field:"xh",
                    type: 'number',
                    hidden:true,
                },
                {
                    label:"发送内容",
                    field:"content"
                },
                {
                    label:"提交数量",
                    field:"num",
                },
                {
                    label:"提交状态",
                    field:"status"
                },
                {
                    label: '创建时间',
                    field: 'cjscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label: '定时时间',
                    field: 'dsscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                //{id:1,pcnum:"6548451545",content:"短信测试",num:"7",status:"通过审核",cjscore:"2018-11-07 19:17:32",dsscore:"2018-11-07 19:17:32"}
            ],
            rowstwo:[
                //{id:1,xh:1,content:"短信测试",num:"7",status:"通过审核",cjscore:"2018-11-07 19:17:32",dsscore:"2018-11-07 19:17:32"}
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
        getstrtime(val){//获取起始时间
            this.screendata.strtime=val;
        },
        getendtime(val){//获取结束日期
            this.screendata.endtime=val;
        },
        screenfn(){//搜索按钮的方法
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
        cancel(e){//点击取消的方法
            this.action({
                moduleName:'cancelvariable',
                url:"cancelvariable",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                //isFormData:true,
                data:{
                    id:e.row.id
                }
            }).then(res=>{
                if(res.code==20000){
                    //this.$vux.toast.text("取消成功");
                    this.gettabledata();
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        detail(e){//点击详情的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Dxfspcxq",
                    width:"1000px",
                    title:"详情",
                    // _event:{
                    //     ljclick:(e)=>{//转换链接窗口点击确定的方法
                    //         this.nrtext=this.nrtext+" "+e+" ";
                    //     },
                    // },
                    props:{
                        that:()=>this,
                        data:()=>{
                            return {
                                pcnum:e.pcnum,
                                content:e.content,
                                dstime:e.dsscore,
                                status:e.status
                            }
                        }
                    },
                })
        },
        selectionChanged(){//table勾选的方法

        },
        selectionChangedtwo(){//table2勾选的方法

        },
        gettabledata(){//获取表格数据的方法
            this.rowstwo=[];
            this.rows=[];
            this.action({
                moduleName:'smslist',
                url:"smslist",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                //isFormData:true,
                data:{
                    type:"1",
                    is_timing:"2",
                    is_variable:this.tabval,
                    sms_content:this.screendata.content,
                    start_time:this.screendata.strtime,
                    end_time:this.screendata.endtime,
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    for(let i=0;i<res.data.length;i++){
                        let newobj={};
                        newobj.content=res.data[i].sms_content;
                        newobj.num=res.data[i].sm_sum;
                        newobj.status = this.$options.filters.showStatus(res.data[i].status);
                        newobj.id=res.data[i].id;
                        newobj.cjscore=res.data[i].create_time;
                        newobj.dsscore=this.lgetdate(res.data[i].regular_time);
                        if(this.tabval!="2"){
                            newobj.pcnum=res.data[i].sms_order_sn;
                        }
                        newarr.push(newobj);
                    }
                    if(this.tabval=="2"){
                        this.rowstwo=newarr;
                    }else{
                        this.rows=newarr;
                    }
                    this.$vux.toast.text("定时数据更新完成")
                }else{
                    this.$vux.toastexists
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
        this.gettabledata();
    }
}
</script>
<style lang="less" scoped>
.dsgl{
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
            background: #fff;
            padding: 14px;
            margin-top: 30px;
            &/deep/ .cancel{
                cursor: pointer;
                color: @col-ff6600;
            }
            &/deep/ .detail{
                cursor: pointer;
                color:#4c88f5;
            }
        }
    }
}
</style>
