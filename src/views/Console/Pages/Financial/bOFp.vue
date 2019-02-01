<template>
    <div class="OrderDetails console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">收支明细</div>
            <div class="content">
                <div class="Filter">
                    <span>交易时间</span>
                    <span class="d" @click="showDate('startTimeVal')" v-html="startTime"></span>
                    <span>-</span>
                    <span class="d" @click="showDate('endTimeVal')" v-html="endTime"></span>
                    <span>订单号</span>
                    <x-input :showClear="false" class="input XInput" placeholder="输入订单号"></x-input>
                    <div class="btns">
                        <x-button class="XButton themeXButton" mini>搜索</x-button>
                    </div>
                </div>
                <z-flexbox>
                    <z-flexbox-item>
                        <div class="console-checker" slot="left">
                            <span class="console-checker-title">产品名称</span>
                        </div>
                        <checker class="console-checker" v-model="checker" default-item-class="console-checker-item" selected-item-class="console-checker-item-selected">
                            <checker-item v-for="(item,index) in list" :key="index" :value="item.value">
                                <span class="iconfont" v-if="checker == item.value">&#xe65c;</span>
                                <span class="iconfont" v-else>&#xe651;</span>
                                {{item.type}}
                            </checker-item>
                        </checker>
                    </z-flexbox-item>
                </z-flexbox>
                <z-flexbox>
                    <z-flexbox-item>
                        <div class="console-checker" slot="left">
                            <span class="console-checker-title">财务类型</span>
                        </div>
                        <checker class="console-checker" v-model="checker" default-item-class="console-checker-item" selected-item-class="console-checker-item-selected">
                            <checker-item v-for="(item,index) in list" :key="index" :value="item.value">
                                <span class="iconfont" v-if="checker == item.value">&#xe65c;</span>
                                <span class="iconfont" v-else>&#xe651;</span>
                                {{item.type}}
                            </checker-item>
                        </checker>
                    </z-flexbox-item>
                </z-flexbox>
                <z-flexbox>
                    <z-flexbox-item>
                        <div class="console-checker" slot="left">
                            <span class="console-checker-title">支付类型</span>
                        </div>
                        <checker class="console-checker" v-model="checker" default-item-class="console-checker-item" selected-item-class="console-checker-item-selected">
                            <checker-item v-for="(item,index) in list" :key="index" :value="item.value">
                                <span class="iconfont" v-if="checker == item.value">&#xe65c;</span>
                                <span class="iconfont" v-else>&#xe651;</span>
                                {{item.type}}
                            </checker-item>
                        </checker>
                    </z-flexbox-item>
                </z-flexbox>
            </div>
        </div>
        <div class="console-card">
            <div class="content">
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
                        @on-selected-rows-change="selectionChanged"
                        styleClass="vgt-table striped"
                >
                    <template slot="table-row" slot-scope="props">
                        <div v-if="props.column.field == 'operate'">
                            <span class="rowss" @click="showDetails">详情</span>
                        </div>
                        <span v-else>{{props.formattedRow[props.column.field]}}</span>
                    </template>
                </vue-good-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueGoodTable } from 'vue-good-table';
    import { XInput, XButton, Checker, CheckerItem } from "vux"
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: "b-o-fp",
        components:{
            ZFlexboxItem,
            ZFlexbox,
            XInput, XButton, VueGoodTable, Checker, CheckerItem
        },
        data(){
            return {
                startTimeVal:null,
                endTimeVal:null,
                checker:0,
                list:[
                    {
                        value:0,
                        type:"招商银行是的",
                    },
                    {
                        value:1,
                        type:"招商银行1",
                    },
                    {
                        value:2,
                        type:"招商银行1",
                    },
                    {
                        value:3,
                        type:"招商银行1",
                    },
                    {
                        value:4,
                        type:"招商银行1",
                    },
                ],
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
                        field: 'operate',
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
            selectionChanged(){},
            showDetails(){
                this.$ZAlert.show({
                    title:"收支明细",
                    width:"700px",
                    components:"Console/Pages/alert/bOFp"
                })
            }
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