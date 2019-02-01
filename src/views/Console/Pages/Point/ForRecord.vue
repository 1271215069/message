<template>
    <div class="ForRecord console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">兑换记录</div>
            <div class="content">
                <ul class="console-tab">
                    <li class="select">全部</li>
                    <li>实物商品</li>
                    <li>虚拟商品</li>
                </ul>
                <div class="filter">
                    <span class="label">兑换状态</span>
                    <v-select class="v-select" :options="options"></v-select>
                    <x-button class="XButton themeXButton">搜索</x-button>
                </div>
                <vue-good-table
                        :columns="columns"
                        :rows="rows" class="tables"
                        :pagination-options="{
                    enabled: true,
                    mode: 'pages',
                    nextLabel: '下页',
                    prevLabel: '上页',
                    pageLabel: '页数',
                    rowsPerPageLabel: '默认显示条数',
                  }"
                        @on-selected-rows-change="selectionChanged"
                        styleClass="vgt-table striped"
                >
                    <template slot="table-row" slot-scope="props">
                        <span class="rowss" v-if="props.column.field == 'title'">
                            {{props.formattedRow[props.column.field]}}
                        </span>
                        <span v-else>{{props.formattedRow[props.column.field]}}</span>
                    </template>
                </vue-good-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueGoodTable } from 'vue-good-table';
    import { XButton } from "vux"
    import vSelect from 'vue-select'
    export default {
        name: "for-record",
        components:{VueGoodTable, XButton, vSelect},
        data(){
            return {
                options:[
                    {label: 'foo', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                ],
                columns: [
                    {
                        label: '兑换礼物',
                        field: 'title',
                    },
                    {
                        label: '兑换编号',
                        field: 'time',
                    },
                    {
                        label: '兑换数量',
                        field: 'type',
                    },
                    {
                        label: '消耗积分',
                        field: 'type',
                    },
                    {
                        label: '兑换时间',
                        field: 'type',
                    },
                    {
                        label: '兑换状态',
                        field: 'type',
                    },
                    {
                        label: '物流信息',
                        field: 'type',
                    },
                ],
                rows: [
                    { id:1, title:"John", time: '201-10-31',type:"更新通知"},
                ],
            }
        },
        methods:{
            selectionChanged(){}
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.ForRecord{
    .filter{
        line-height: 40px;
        height: 60px;
        margin-top: 20px;
        .label{
            float: left;
            font-size: 14px;
            margin-right: 30px;
        }
        .v-select{
            float: left;
            width: 200px;
            margin-right: 30px;
            &/deep/ .dropdown-toggle{
                margin-top: 4px;
            }
        }
        .XButton{
            float: left;
            height: 40px;
            line-height: 40px;
            width: auto;
            padding: 0 @pa;
            font-size: 14px;
        }
    }
}
</style>