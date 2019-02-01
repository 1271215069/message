<template>
    <div class="SystemMessage console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">系统消息</div>
            <div class="content">
                <div class="topBox">
                    <span>消息类型：</span>
                    <ul>
                        <li class="select">全部消息</li>
                        <li>已读消息</li>
                        <li>未读消息</li>
                    </ul>
                </div>
                <div class="topBox2">
                    <ul>
                        <li>标为已读</li>
                        <li class="select">全部消息</li>
                        <li>已读消息</li>
                        <li>未读消息</li>
                    </ul>
                </div>

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
                        <span @click="go" class="rowss" v-if="props.column.field == 'title'">
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
    export default {
        name: "system-message",
        components:{VueGoodTable},
        data(){
            return {
                columns: [
                    {
                        label: '消息标题',
                        field: 'title',
                    },
                    {
                        label: '发布时间',
                        field: 'time',
                    },
                    {
                        label: '消息类型',
                        field: 'type',
                        width:"100px"
                    },
                ],
                rows: [
                    { id:1, title:"John", time: '201-10-31',type:"更新通知"},
                ],
            }
        },
        methods:{
            selectionChanged(){

            },
            go(){
                this.$router.push("/SystemMessageDetails")
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.SystemMessage{
    .topBox{
        overflow: hidden;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        padding: @mg 0;
        font-size: 14px;
        span{
            float: left;
            margin-right: 30px;
        }
        ul{
            overflow: hidden;
            float: left;
            li{
                float: left;
                min-width: 100px;
                margin-right: 30px;
                padding: 0 10px;
                box-sizing: border-box;
                text-align: center;
                cursor: pointer;
                &.select{
                    background-color: @col-00ccff;
                    color: @cor_ffffff;
                }
            }
        }
    }
    .topBox2{
        .topBox;
        border: none;
        ul{
            li{
                background-color: @themeBj-color*0.95;
            }
        }
    }
}
</style>