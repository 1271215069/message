<template>
    <div class="hfjl">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                回复记录
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
export default {
    name:"hfjl",
    components:{VueGoodTable,...ConsoleComponents},
    data(){
        return{
            tablist:[//tab页的数据
                {
                    title:"平台回复记录",
                    val:"1"
                },
                {
                    title:"API回复记录",
                    val:"3"
                }
            ],
            tabval:"1",//判断tab页的值
            screendatajs:{//搜索所需的数据
                strtime:"",
                endtime:"",
                content:"",
                pcnum:"",
            },
            columns:[
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
                    label:"回复内容",
                    field: 'content',
                },
                {
                    label: '回复时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
            ],
            rows:[

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
        selectionChanged(){

        },
        getstrtime(val){//获取开始时间的方法
            this.screendatajs.strtime=val;  
        },
        getendtime(val){//获取结束时间的时间
            this.screendatajs.endtime=val;
        },
        screenfn(){//点击搜索的方法
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
            this.gettabledata();
        },
        gettabledata(){//获取表格数据
            this.rows=[];
            this.action({
                moduleName:'replaylist',
                url:"replaylist",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:this.tabval,
                    start_time:this.screendatajs.strtime,
                    end_time:this.screendatajs.endtime,
                    sms_order_sn:this.screendatajs.pcnum,
                    phone:this.screendatajs.content
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    for(let i=0;i<res.data.length;i++){
                        let newobj={};
                        newobj.pcnum=res.data[i].sms_order_sn;
                        newobj.tel=res.data[i].phone;
                        newobj.content=res.data[i].receive_content;
                        newobj.score=res.data[i].receive_time;
                        newarr.push(newobj)
                    }
                    this.rows=newarr;
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{
                // this.$vux.toast.text(err)
            })
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
.hfjl{
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
        }
    }
}
</style>
