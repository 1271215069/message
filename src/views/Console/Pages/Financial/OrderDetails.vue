<template>
    <div class="OrderDetails console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">订单明细</div>
            <div class="content">
                <ul class="console-tab">
                    <li class="select">全部</li>
                    <li>已支付</li>
                    <li>未支付</li>
                    <li>已申请</li>
                </ul>
                <div class="Filter">
                    <span>下单时间</span>
                    <span class="d" @click="showDate('startTimeVal')" v-html="startTime"></span>
                    <span>-</span>
                    <span class="d" @click="showDate('endTimeVal')" v-html="endTime"></span>
                    <span>订单号</span>
                    <x-input :showClear="false" class="input XInput" placeholder="输入订单号"></x-input>
                    <div class="btns">
                        <x-button class="XButton themeXButton" mini>搜索</x-button>
                        <x-button class="XButton themeXButton" mini>合并开票</x-button>
                    </div>
                    <span class="c">开票须知</span>
                </div>
            </div>
        </div>
        <div class="console-card">
            <div class="content">
                <vue-good-table
                        :columns="columns"
                        :rows="rows" class="tables"
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
    import { XInput, XButton } from "vux"
    export default {
        name: "order-details",
        components:{
            XInput, XButton, VueGoodTable
        },
        data(){
            return {
                startTimeVal:null,
                endTimeVal:null,
                columns: [
                    {
                        label: '订单号',
                        field: 'title',
                    },
                    {
                        label: '产品名称',
                        field: 'time',
                    },
                    {
                        label: '订单金额',
                        field: 'type',
                    },
                    {
                        label: '优惠金额',
                        field: 'type',
                    },
                    {
                        label: '实际金额',
                        field: 'type',
                    },
                    {
                        label: '订单类型',
                        field: 'type',
                    },
                    {
                        label: '产品数量',
                        field: 'type',
                    },
                    {
                        label: '支付方式',
                        field: 'type',
                    },
                    {
                        label: '下单时间',
                        field: 'type',
                    },
                    {
                        label: '订单状态',
                        field: 'type',
                    },
                    {
                        label: '操作',
                        field: 'type',
                    },
                ],
                rows: [
                    { id:1, title:"John", time: '201-10-31',type:"更新通知"},
                ],
            }
        },
        methods:{
            showDate(name){
                this.$ZVueDatepicker.show({
                    startTime:{
                      time:this[name]
                    },
                    onChange:(v)=>{
                        this[name]=v;
                    }
                });
            },
            selectionChanged(){}
        },
        computed:{
            startTime(){
                if(this.startTimeVal){
                    return this.startTimeVal;
                }
                return "&nbsp;"
            },
            endTime(){
                if(this.endTimeVal){
                    return this.endTimeVal;
                }
                return "&nbsp;"
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.OrderDetails{
    &/deep/ .date-picker-input{
        background-color: #cccccc;
    }
    .Filter{
        overflow: hidden;
        font-size: 14px;
        line-height: 40px;
        padding-bottom: @pa;
        span{
            margin-right: @mg;
            float: left;
            display: inline-block;
            margin-top: @pa;
            &.d{
                border:1px solid #ccc;
                width: 100px;
                text-align: center;
                padding: 0 @mg;
                cursor: pointer;
            }
            &.c{
                color: @themeColor;
                cursor: pointer;
            }
        }
        .input{
            margin-right: @mg;
            float: left;
            width: 100px;
            border:1px solid #ccc;
            height: 40px;
            padding: 0 @pa;
            margin-top: @pa;
        }
        .btns{
            float: left;
            overflow: hidden;
            display: inline-block;
            width: auto;
            min-width: 100px;
            line-height: 40px;
            margin-top: @pa;
            .XButton{
                float: left;
                border-radius: 0;
                margin: 0;
                margin-right: @mg;
                display: inline-block;
                line-height: 40px;
            }
        }
    }
}
</style>