<template>
    <div class="mbgl">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                模板管理
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
                <ul class="Dxpartbox-btnlist">
                    <!-- <li @click.prevent="pldr">批量导入模板</li>
                    <li @click.prevent="dxmb">短信模板库</li> -->
                    <li @click.prevent="addmd">添加模板</li>
                </ul>
            </div>
            <div class="Dxpartbox-content">
                <ul class="Dxpartbox-tab">
                    <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
                </ul>
                <div class="Dxpartbox-table">
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
                    >
                        <template slot="table-row" slot-scope="props">
                            <div class="cz" v-if="props.column.field == 'operate'">
                                <!-- <x-button @click.native="aa">操作</x-button> -->
                                <span @click.prevent="del(props.formattedRow)">删除</span>
                                <!-- <span @click.prevent="copy">复制</span> -->
                            </div>
                            <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"mbgl",
    data(){
        return{
            tablist:[//tab页的数据
                {
                    title:"全部",
                    val:""
                },
                {
                    title:"已通过",
                    val:"2"
                },
                {
                    title:"审核中",
                    val:"1"
                },
                {
                    title:"已驳回",
                    val:"3"
                },
            ],
            tabval:"",//判断tab页的值
            columns:[
                {
                    label:"ID",
                    field: 'xnum',
                    type: 'number',
                },
                {
                    label:"签名",
                    field: 'qmname',
                },
                {
                    label:"短信内容",
                    field: 'content',
                },
                {
                    label:"备注",
                    field: 'sign',
                },
                {
                    label:"字数",
                    field: 'num',
                    type: 'number'
                },
                {
                    label: '添加时间',
                    field: 'tjscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label: '审核时间',
                    field: 'shscore',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label:"状态",
                    field: 'status',
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                //{xnum:6,qmname:"云通讯",content:"短信测试",sign:"这是备注",num:4,tjscore:"2011-10-30 19:17:32",shscore:"2011-10-30 19:22:32",status:"审核通过"}
            ],
            tabledata:[],//未处理的接口数据
        }
    },
    methods:{
        pldr(){//批量导入模板的按钮方法

        },
        dxmb(){//短信模板库的按钮方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/MbglMbk",
                    width:"900px",
                    title:"短信模板库"
                })
        },
        addmd(){//添加模板的按钮方法
            this.$router.push("/ApiAddmb");
        },
        tabclick(i,item){//点击tab的方法
            for(let n=0;n<this.$refs.tabitem.length;n++){
                this.$refs.tabitem[n].classList.remove("tabactive");
            }
            this.$refs.tabitem[i].classList.add("tabactive");
            this.tabval=item.val;
            this.gettabledata(item.val)
        },
        selectionChanged(){//表格复选框选中事件

        },
        del(e){//点击删除的方法
            this.action({
                moduleName:'del_templet',
                url:"del_templet",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    //type:"1",
                    id:e.xnum
                }
            }).then(res=>{
                if(res.code==200){
                    this.$vux.toast.text("删除成功");
                    this.gettabledata(this.tabval);
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        copy(){//点击复制的方法

        },
        gettabledata(mbstas){//获取表格数据的方法
            this.rows=[];
            this.action({
                moduleName:'templetlist',
                url:"templetlist",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"3",
                    status:mbstas
                }
            }).then(res=>{
                if(res.code==200){
                    for(let i=0;i<res.data.length;i++){
                        let mbobj={};
                        mbobj.xnum=res.data[i].id;
                        mbobj.qmname=res.data[i].getsign.sign_content;
                        mbobj.content=res.data[i].sms_content;
                        mbobj.sign=res.data[i].remark;
                        mbobj.num=res.data[i].sms_content.length;
                        mbobj.tjscore=res.data[i].create_time;
                        mbobj.shscore=res.data[i].update_time;
                        switch(res.data[i].status){
                            case 1:
                                mbobj.status="审核中";
                                break;
                            case 2:
                                mbobj.status="已通过";
                                break;
                            case 3:
                                mbobj.status="已驳回";
                                break;
                            case 4:
                                mbobj.status="审核禁用";
                                break;
                            default:
                                break;
                        }
                        this.rows.push(mbobj);
                    }
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.$refs.tabitem[0].classList.add("tabactive");
        this.rows=[];
        this.action({
            moduleName:'templetlist',
            url:"templetlist",
            method:"post",
            headers: {'XX-token': this.airforce.login.data.token,},
            isFormData:true,
            data:{
                type:"3",
            }
        }).then(res=>{
            if(res.code==200){
                for(let i=0;i<res.data.length;i++){
                    let mbobj={};
                    mbobj.xnum=res.data[i].id;
                    mbobj.qmname=res.data[i].getsign.sign_content;
                    mbobj.content=res.data[i].sms_content;
                    mbobj.sign=res.data[i].remark;
                    mbobj.num=res.data[i].sms_content.length;
                    mbobj.tjscore=res.data[i].create_time;
                    mbobj.shscore=res.data[i].update_time;
                    switch(res.data[i].status){
                        case 1:
                            mbobj.status="审核中";
                            break;
                        case 2:
                            mbobj.status="已通过";
                            break;
                        case 3:
                            mbobj.status="已驳回";
                            break;
                        case 4:
                            mbobj.status="审核禁用";
                            break;
                        default:
                            break;
                    }
                    this.rows.push(mbobj);
                }
            }else{
                this.$vux.toast.text(res.msg)
            }
        }).catch(err=>{})
    }
}
</script>
<style lang="less" scoped>
.mbgl{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            padding: 12px 14px 12px 7px;
            .Dxpartbox-tab{
                height: 36px;
                border-bottom: 1px solid #ddd;
                li{
                    float: left;
                    height: 35px;
                    background-color: #fff;
                    padding: 0px 15px;
                    line-height: 35px;
                    cursor: pointer;
                    color: #A7B1C2;
                    margin-right: 3px;
                    border-radius: 3px 3px 0 0;
                    font-size: 14px;
                    color: #666;
                    background: #fff;
                }
                li:hover{
                    background: #e6e6e6;
                }
                .tabactive{
                    height: 36px;
                    border: 1px solid #ddd;
                    border-bottom: none;
                    color: @col-ff6600;
                }
                .tabactive:hover{
                    background: #fff;
                }
            }
            .Dxpartbox-table{
                box-sizing: border-box;
                padding: 12px;
                &/deep/ .cz{
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
