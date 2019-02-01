<template>
    <div class="pcxq">
        <vue-good-table 
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
            >
            <template slot="table-row" slot-scope="props">
                <div class="cz" v-if="props.column.field == 'status'">
                    {{props.formattedRow[props.column.field] | receiveStatus}}
                </div>
                <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
            </template>
            </vue-good-table>
    </div>
</template>
<script>
import { VueGoodTable } from 'vue-good-table';
export default {
    name:"dxfspcxq",
    components:{VueGoodTable},
    data(){
        return{
            columns:[
                {
                    label:"手机号码",
                    field:"phone"
                },
                {
                    label:"发送内容",
                    field:"sms_content"
                },
                {
                    label: '定时时间',
                    field: 'time',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label:"状态",
                    field:"status"
                },
            ]
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
        data:{
            type:Object,
            default:()=>{}
        }
    },
    methods:{

    },
    computed:{
        rows(){
            try {
                if(this.that.airforce.smdList.code == 200){
                    return this.that.airforce.smdList.data;
                }
            }catch (e){}
            return []
        }
    },
    mounted(){
        this.that.action({
            moduleName:'smdList',
            url:"smdList",
            method:"post",
            headers: {'XX-token': this.that.airforce.login.data.token,},
            data:{
                type:"1",
                order_sn:this.data.pcnum,
            }
        }).then(res=>{
            if(res.code==200){

            }else{
                this.that.$vux.toast.text(res.msg)
            }
        }).catch(err=>{})
        console.log(this.data,this.rows)
    }

}
</script>
<style lang="less" scoped>
.pcxq{

}
</style>
