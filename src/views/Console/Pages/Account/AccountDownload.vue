<template>
    <div class="AccountDownload console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">下载中心</div>
            <div class="content">
                <p class="title"><span class="iconfont">&#xe663;</span>因运营商安全政策原因，已整理好的记录会在云端保存<span>10</span>天，如遇导出时间过长，请喝杯咖啡再来查看</p>
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
                        styleClass="vgt-table striped"
                >
                </vue-good-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "account-download",
        data(){
            return {
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
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.AccountDownload{
    .title{
        font-size: 14px;
        line-height: 40px;
        span{
            color: @themeColor;
            margin: 0 @mg;
            &:first-child{
                margin-left: 0;
            }
            &.iconfont{
                font-size: 18px;
            }
        }
    }
}
</style>