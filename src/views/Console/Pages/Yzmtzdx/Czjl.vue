<template>
    <div class="czjl">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                充值记录
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
               
                >
                 <!-- @on-selected-rows-change="selectionChanged" -->
                    <template slot="table-row" slot-scope="props">
                        <div class="cz" v-if="props.column.field == 'operate'">
                            
                            <span class="detail" @click.prevent="detail(props)">详情</span>
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
    name:"czjl",
    components:{VueGoodTable},
    data(){
        return{
            columns:[
                {
                    label:"订单号",
                    field: 'orderid',
                },
                {
                    label:"金额",
                    field: 'content',
                },
                {
                    label: '下单时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-mm-DD HH:MM:SS',
                    dateOutputFormat: 'YYYY-mm-DD HH:MM:SS',
                },
                {
                    label:"订单状态",
                    field: 'status',
                },
            ],
            rows:[],
        }
    },
    methods:{

    },
    mounted(){
        this.action({
            moduleName:"recharge_list",
            url:"rechargelist",
            headers:{"XX-token":this.airforce.login.data.token},
            method:"post",
            data:{}
        }).then(res=>{
            if(res.code==200){
                let newarr=[];
                for(let i=0;i<res.data.length;i++){
                    let newobj={};
                    newobj.orderid=res.data[i].order_sn;
                    newobj.content=res.data[i].pay_money;
                    newobj.score=res.data[i].create_time;
                    switch(res.data[i].s_type){
                        case 1:
                            newobj.status="待审核";
                            break;
                        case 2:
                            newobj.status="通过";
                            break;
                        case 3:
                            newobj.status="未通过";
                            break;
                        case 4:
                            newobj.status="主管通过";
                            break;
                        case 5:
                            newobj.status="主管未通过";
                            break;
                        default:
                            break;
                    }
                    newarr.push(newobj);
                }
                this.rows=newarr;
            }else{
                this.$vux.toast.text(res.msg)
            }
        }).catch(err=>{
            this.$vux.toast.text(err)
        })

    }
}
</script>
<style lang="less" scoped>
.czjl{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            box-sizing: border-box;
            padding: 15px;
        }
    }
}
</style>
