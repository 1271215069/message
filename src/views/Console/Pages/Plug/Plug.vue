<template>
    <div class="Plug console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">基本资料</div>
            <div class="content">
                <flexbox>
                    <flexbox-item>
                        <div>|&nbsp;&nbsp;&nbsp;余额（条）</div>
                        <p class="v">5000</p>
                    </flexbox-item>
                    <flexbox-item>
                        <div>|&nbsp;&nbsp;&nbsp;累计充值（元）</div>
                        <p class="v">0</p>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="btn XButton" @click.native="Recharge">充值</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="console-card">
            <div class="console-PageTitleV2">API接口信息</div>
            <div class="content">
                <flexbox>
                    <flexbox-item>
                        <div>账号：S7256081</div>
                        <div>密码：pwd1402714 <span class="iconfont">&#xe64c;</span></div>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="btn XButton btn2">对接文档</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="btn XButton btn2">联系我们</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <div>(您的专属对接人-我是昵称)</div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="console-card">
            <div class="console-PageTitleV2">今日统计</div>
            <div class="content">
                <flexbox>
                    <flexbox-item class="lineRigth">
                        <p class="v2">5000</p>
                        <div class="msg">实号包</div>
                    </flexbox-item>
                    <flexbox-item class="lineRigth">
                        <p class="v2">5000</p>
                        <div class="msg">空号包</div>
                    </flexbox-item>
                    <flexbox-item>
                        <p class="v2">5000</p>
                        <div class="msg">沉默包</div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="console-card">
            <div class="console-PageTitleV2">空号检测</div>
            <div class="content">
                <div class="msgTitle">上传号码</div>
                <div class="inputBox">
                    <x-input placeholder="请上传文件进行检测" class="input"></x-input>
                    <x-button class="iconfont btn XButton">&#xe650;浏览</x-button>
                </div>
                <div class="msg msg2">注：文件格式仅持TXT格式文件／每行一个／支持最低3000—50W条号码包上传</div>
            </div>
        </div>
        <div class="console-card">
            <div class="console-PageTitleV2">检测结果</div>
            <div class="content">
                <flexbox>
                    <flexbox-item class="lineRigth">
                        <div class="msg msg3">实号包</div>
                        <p class="v2">5000</p>
                        <x-button class="btn XButton btn3">下载</x-button>
                    </flexbox-item>
                    <flexbox-item class="lineRigth">
                        <div class="msg msg3">空号包</div>
                        <p class="v2">5000</p>
                        <x-button class="btn XButton btn3">下载</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="msg msg3">沉默包</div>
                        <p class="v2">5000</p>
                        <x-button class="btn XButton btn3">下载</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="console-card">
            <div class="console-PageTitleV2">检测历史
                <ul>
                    <li class="iconfont">&#xe617;批量编辑</li>
                    <li class="iconfont">&#xe617;批量编辑</li>
                </ul>
            </div>
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
                        <span v-if="props.column.field == 'operate'">
                            <x-button @click.native="aa">{{props.row.operate}}操作</x-button>
                        </span>
                        <span class="12" v-else>{{props.formattedRow[props.column.field]}}</span>
                    </template>
                </vue-good-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueGoodTable } from 'vue-good-table';
    import { Flexbox, FlexboxItem, XButton, XInput } from "vux"
    export default {
        name: "plug",
        components:{Flexbox, FlexboxItem, XButton, XInput,VueGoodTable },
        data(){
            return {
                columns: [
                    {
                        label: '名称',
                        field: 'name',
                    },
                    {
                        label: '大小',
                        field: 'age',
                        type: 'number',
                    },
                    {
                        label: '扣款条数',
                        field: 'createdAt',
                        type: 'date',
                        dateInputFormat: 'YYYY-MM-DD',
                        dateOutputFormat: 'MMM Do YY',
                    },
                    {
                        label: '日期',
                        field: 'score',
                        type: 'percentage',
                    },
                    {
                        label: '操作',
                        field: 'operate',
                        html:true
                    },
                ],
                rows: [
                    { id:1, name:"John", age: 20, createdAt: '201-10-31:9: 35 am',score: 0.03343 },
                    { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
                    { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
                    { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
                    { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
                    { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343,operate:"454"},
                    { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343,operate:"454"},
                    { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343,operate:"454"},
                    { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343,operate:"454"},
                    { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343,operate:"454"},
                    { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343,operate:"454"},
                ],
            }
        },
        methods:{
            aa(){
                console.log(1)
            },
            selectionChanged(p){
                console.log(p)
            },
            Recharge(){
                this.$ZAlert.show({
                    components:"Console/Pages/alert/Recharge",
                    width:"500px",
                    title:"充值"
                })
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.Plug{
    .v{
        font-size: 18px;
        margin: 30px 0;
    }
    .btn{
        background-color: @themeColor;
        color: @cor_ffffff;
        width: auto;
        padding: 0 @pa;
        border-radius: 0;
        cursor: pointer;
        &.btn2{
            background-color: @col-00ccff;
        }
        &.btn3{
            margin-top: 40px;
        }
    }
    .v2{
        text-align: center;
        font-size: 50px;
    }
    .msg{
        text-align: center;
        color: #666;
        margin-bottom: @pa;
        &.msg2{
            text-align: left;
            line-height: 40px;
            margin-bottom: 0;
        }
        &.msg3{
            margin-top: @pa;
        }
    }
    .msgTitle{
        line-height: 40px;
    }
    .inputBox{
        overflow: hidden;
        .input{
            float: left;
            border:1px solid #d8d8d8;
            line-height: 50px;
            height: 50px;
            padding: 0 @pa;
            width: 400px;
            border-right: none;
            box-sizing: border-box;
        }
        .btn{
            float: left;
            line-height: 50px;
            height: 50px;
            border:1px solid @themeColor !important;
            box-sizing: border-box;
        }
    }
    .tables{
        margin-bottom: @pa;
    }

}
</style>