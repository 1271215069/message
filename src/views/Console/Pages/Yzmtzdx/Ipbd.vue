<template>
    <div class="ipbd">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                IP绑定
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">
                <div class="left">
                    <p>添加服务器IP地址：</p>
                </div>
                <div class="right">
                    <textarea v-model="ipcintent" placeholder="多个IP地址用回车分开"></textarea>
                    <p>绑定IP后，只有被绑定IP地址发送过来的服务器请求才会被正常处理，该功能开启后，可以减少您的接口被盗用盗发的可能性</p>
                    <span class="save" @click.prevent="save">保存</span>
                </div>
            </div>
        </div>
        <div class="Dxpartbox iplist">
            <div class="Dxpartbox-head">
                IP绑定列表
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
                    @on-selected-rows-change="selectionChanged"
                    >
                        <template slot="table-row" slot-scope="props">
                            <div class="cz" v-if="props.column.field == 'operate'">
                                <span class="edit" @click.prevent="edit(props.formattedRow)">编辑</span>
                                <span class="del" @click.prevent="del(props.formattedRow)">移除</span>
                            </div>
                            <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                        </template>
                    </vue-good-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"ipbd",
    data(){
        return{
            ipcintent:"",//填写服务器ip内容
            columns:[
                {
                    label:"ID",
                    field:"serial",
                    type: 'number'
                },
                {
                    label:"服务器地址",
                    field:"address"
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                // {id:1,address:"198.126.1.112"}
            ]
        }
    },
    methods:{
        selectionChanged(){

        },

        edit(item){//编辑的方法
            let that=this;
            this.$ZAlert.show({
                    components:"Console/Pages/alert/editip",
                    width:"550px",
                    title:"编辑IP",
                    _event:{
                        afteredit:()=>{
                            that.gettabledata();
                        }
                    },
                    props:{
                        that:()=>this,
                        data:()=>{
                            return item;
                            },
                        },
                })
        },
        del(item){//删除的方法=
            this.action({
                moduleName:'delIpWhite',
                url:"delIpWhite",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    id:item.serial,
                }
            }).then(res=>{
                if(res.code==200){
                    this.$vux.toast.text('删除成功');
                    this.gettabledata();
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        foo(str){
            var temp = str.replace(/\n/g,",");
             return temp;
        },
        save(){//保存按钮的方法
            if(this.ipcintent==""){
                this.$vux.toast.text("请输入服务器IP地址");
                return;
            }
            this.action({
                moduleName:'addwhite',
                url:"addwhite",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"1",
                    content:this.foo(this.ipcintent),
                }
            }).then(res=>{
                if(res.code==20000){
                    this.ipcintent="";
                    this.$vux.toast.text("添加成功")
                    this.gettabledata();
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        gettabledata(){//获取跟新表格内的数据的方法
            this.action({
                moduleName:'ipWhiteList',
                url:"ipWhiteList",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"1"
                }
            }).then(res=>{
                if(res.code==200){
                    this.rows=[];
                    for(let i=0;i<res.data.data.length;i++){
                        let nullobj={};
                        nullobj.serial=res.data.data[i].id;
                        nullobj.address=res.data.data[i].content;
                        this.rows.push(nullobj);
                    }
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.gettabledata();
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.ipbd{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            background: #fff;
            overflow: hidden;
            padding: 5px 0 20px;
            .left{
                color: #666;
                float: left;
                width: 180px;
                text-align: right;
                font-size: 14px;
                line-height: 26px;
                margin-top: 7px;
            }
            .right{
                float: left;
                font-size: 14px;
                color:#666;
                textarea{
                    width: 400px;
                    height: 110px;
                    box-sizing: border-box;
                    padding: 7px;
                    border-bottom: 1px solid #666;
                    resize: none;
                    line-height: 26px;
                }
                p{
                    line-height: 40px;
                }
                .save{
                    display: block;
                    line-height: 40px;
                    background: @col-ff6600;
                    color: #fff;
                    text-align: center;
                    width: 90px;
                    cursor: pointer;
                }
            }

        }
    }
    .iplist{
        margin-top: 30px;
        &/deep/ .edit{
            color: #2252af;
            cursor: pointer;
            margin: 0 4px;
        }
        &/deep/ .del{
            color: #FF6E6E;
            cursor: pointer;
            margin: 0 4px;
        }
    }
}
</style>
