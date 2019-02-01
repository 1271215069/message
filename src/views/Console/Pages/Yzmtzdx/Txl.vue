<template>
    <div class="txl">
        <div class="left">
            <div class="Dxpartbox">
                <div class="Dxpartbox-head">
                    通讯录
                    <!-- <div class="notes"></div>
                    <div class="notestext">验证码</div> -->
                    <ul class="Dxpartbox-btnlist">
                        <li @click.prevent="addlxr">
                            添加联系人
                            <ul class="addlxr" v-if="btnbol">
                                <li>单个添加</li>
                                <li>批量添加</li>
                                <li>导入联系人</li>
                            </ul>
                        </li>
                        <li @click.prevent="dctxl">导出通讯录</li>
                    </ul>
                </div>
                <div class="Dxpartbox-content">
                    <div class="screen">

                        <div class="screenbox">
                            <!-- <span class="sctitle">批次号</span> -->
                            <input class="scinput" type="text" placeholder="请输入姓名或手机查询" v-model="screendata">
                        </div>
                        <span class="scbtn" @click.prevent="screenfn">搜索</span>

                    </div>
                    <ul class="btnlist" >
                        <li class="btn">批量发送</li>
                        <li class="btn">分组发送</li>
                        <li class="btn">批量编辑</li>
                    </ul>
                    
                </div>
            </div>
            <div class="tablebox">
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
                    >
                        <template slot="table-row" slot-scope="props">
                            <div class="cz" v-if="props.column.field == 'operate'">
                                <span @click.prevent="send">发送</span>
                                <span @click.prevent="edit">编辑</span>
                                <span @click.prevent="del">删除</span>
                                
                            </div>
                            <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                        </template>
                    </vue-good-table>
            </div>
        </div>

        <div class="right">
            <div class="Dxpartbox">
                <div class="Dxpartbox-head">
                    通讯录
                    <span class="newbuild" @click.prevent="addgroup">新建</span>
                </div>
                <div class="Dxpartbox-content">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"txl",
    data(){
        return{
            btnbol:false,//按钮列表是否显示的值
            screendata:"",//筛选条件绑定的值
            columns:[
                {
                    label:"联系人",
                    field: 'username',
                },
                {
                    label:"手机号",
                    field: 'tel',
                },
                {
                    label:"公司职务",
                    field: 'post',
                },
                {
                    label:"QQ",
                    field: 'qq',
                },
                {
                    label:"邮箱",
                    field: 'email',
                },
                {
                    label:"通讯组",
                    field: 'group',
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                {id:1,username:"张珊",tel:"15958123761",post:"",qq:"",email:"",group:""}
            ]
        }
    },
    methods:{
        addlxr(){//添加联系人的方法
            this.btnbol=!this.btnbol;
        },
        dctxl(){//导出通讯录的方法

        },
        screenfn(){//搜索按钮的方法
            
        },
        selectionChanged(){//table选中的方法

        },
        send(){//点击发送的方法

        },
        edit(){//点击编辑的方法

        },
        del(){//点击删除的方法

        },
        addgroup(){//点击新建通讯组的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Txladdgroup",
                    width:"550px",
                    title:"通讯组-新建",
                    // _event:{
                    //     ljclick:(e)=>{//转换链接窗口点击确定的方法
                    //         this.nrtext=this.nrtext+" "+e+" ";
                    //     },
                    // },
                    props:{
                        that:()=>this,
                    },
                })
        }
    }
}
</script>
<style lang="less" scoped>
.txl{
    box-sizing: border-box;
    padding: 0 20px;
    overflow: hidden;
    .left{
        width: 70%;
        float: left;
        .Dxpartbox{
            .Dxpartbox-head{
                // display: flex;
                // justify-content: space-between;
                position: relative;
                overflow: unset;
                .Dxpartbox-btnlist{
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    top: -3px;
                    li{
                        position: relative;
                        .addlxr{
                            position: absolute;
                            left: 0px;
                            width: 100%;
                            background: #fff;
                            box-sizing: border-box;
                            padding: 3px;
                            li{
                                line-height: 30px;
                                background: #fff;
                                display: block;
                                color: #666;
                                text-align: center;
                                padding: 0;
                            }
                            li:hover{
                                background: #f0f0f0;
                                color:  @col-ff6600;
                            }
                        }
                    }
                }
            }
            .Dxpartbox-content{
                overflow: hidden;
                .screen{
                    float: left;
                    padding: 20px 10px;
                    display: flex;
                    .screenbox{
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
                    }
                    .scbtn{
                            display: inline-block;
                            font-size: 14px;
                            line-height: 37px;
                            background: @col-ff6600;
                            color: #fff;
                            padding: 0 15px;
                            cursor: pointer;
                        }
                }
                
                    .btnlist{
                        float: right;
                        padding: 20px 10px;
                        display: flex;
                        li{
                            display: inline-block;
                            line-height: 37px;
                            padding: 0 15px;
                            color: #fff;
                            background: @col-ff6600;
                            font-size: 14px;
                            margin: 0 10px;
                            cursor: pointer;
                        }
                    }
                
            }
        }
        .tablebox{
            margin-top: 30px;
            background: #fff;
            padding: 12px;
        }
    }
    .right{
        width: 28%;
        float:right;
        .Dxpartbox{
            .Dxpartbox-head{
                .newbuild{
                    font-size: 14px;
                    color: @col-ff6600;
                    cursor: pointer;
                    float: right;
                }
            }
        }
    }
}
</style>
