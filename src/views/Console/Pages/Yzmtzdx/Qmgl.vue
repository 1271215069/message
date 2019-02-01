<template>
    <div class="qmgl">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                签名管理
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
                <ul class="Dxpartbox-btnlist">
                    <li @click.prevent="addqm">添加签名</li>
                </ul>
            </div>
            <div class="Dxpartbox-content">
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
                @on-per-page-change="onPageChange"
                >
                    <template slot="table-row" slot-scope="props">
                        <div class="cz" v-if="props.column.field == 'operate'">
                            <!-- <x-button @click.native="aa">操作</x-button> -->
                            <span @click.prevent="del(props.formattedRow)">删除</span>
                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table>
            </div>
        </div>
    </div>
</template>
<script>
import { VueGoodTable } from 'vue-good-table';
export default {
    name:"qmgl",
    components:{VueGoodTable},
    data(){
        return{
            columns:[
                {
                    label:"ID",
                    field: 'num',
                    type: 'number',
                },
                {
                    label:"签名名称",
                    field: 'qmname',
                },
                // {
                //     label:"行业",
                //     field:"industry",
                // },
                // {
                //     label:"应用场景",
                //     field:"scene",
                // },
                {
                    label:"状态",
                    field:"status",
                },
                {
                    label:"驳回原因",
                    field:"reason",
                },
                {
                    label: '日期',
                    field: 'score',
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
                // { id:1, num:1, qmname:"云通讯", industry:"保险公司",scene:"推广通知",status:"审核通过",reason:"",score:"2011-10-30" },
            ]
        }
    },
    methods:{
        addqm(){//添加签名按钮的方法
            this.$router.push("/Addqm");
        },
        selectionChanged(s){//勾选table复选框的方法
           
        },
        onPageChange(e){
           
        },
        del(e){//点击删除的方法
            this.action({
                moduleName:'del_sign',
                url:"del_sign",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    id:e.num,
                }
            }).then(res=>{
                if(res.code==200){
                    this.$vux.toast.text("删除成功");
                    this.gettabledata();
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        gettabledata(){
            this.rows=[];
            this.action({
                moduleName:'signlist',
                url:"signlist",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"1",
                }
            }).then(res=>{
                if(res.code==200){
                    for(let i=0;i<res.data.length;i++){
                        let rowobj={};
                        rowobj.num=res.data[i].id;
                        rowobj.qmname=res.data[i].sign_content;
                        switch(res.data[i].status){
                            case 1:
                                rowobj.status="待审核";
                                break;
                            case 2:
                                rowobj.status="审核通过";
                                break;
                            case 3:
                                rowobj.status="审核未通过";
                                rowobj.reason=res.data[i].remark;
                                break;
                            default:
                                break;
                        }
                        rowobj.score=res.data[i].create_time;
                        this.rows.push(rowobj);
                    }
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.gettabledata();
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.qmgl{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            box-sizing: border-box;
            padding: 12px;
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
