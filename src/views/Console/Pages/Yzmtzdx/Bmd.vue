<template>
    <div class="bmd">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                白名单
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
                <ul class="Dxpartbox-btnlist">
                    <li @click.prevent="add"><span class="iconfont">&#xe657;</span>新增</li>
                </ul>
            </div>
            <div class="Dxpartbox-content">
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
                                <span @click.prevent="del(props.formattedRow)">移除</span>
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
    name:'bmd',
    data(){
        return{
            columns:[
                {
                    label:"ID",
                    field:"serial",
                    type: 'number'
                },
                {
                    label:"号码",
                    field:"tel",
                },
                {
                    label: '添加时间',
                    field: 'score',
                    type: 'date',
                    dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
                    dateOutputFormat: 'YYYY-MM-DD HH:mm:ss',
                },
                {
                    label:"状态",
                    field:"status",
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                // {serial:1,tel:"15958123761",score:"2011-05-17 08:54:13",status:"添加成功"}
            ]
        }
    },
    methods:{
        add(){//新增白名单的方法
            let that=this;
            this.$ZAlert.show({
                    components:"Console/Pages/alert/BmdSdtj",
                    width:"550px",
                    title:"手动添加",
                    _event:{
                        afteradd:()=>{
                            that.gettabledata();
                        }
                    },
                    props:{
                        that:()=>this,
                        },
                })
        },
        selectionChanged(){//table选中方法

        },
        del(item){//删除的方法
           
            this.action({
                moduleName:'delPhoneWhite',
                url:"delPhoneWhite",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    id:item.serial
                }
            }).then(res=>{
                if(res.code==200){
                    this.$vux.toast.text("删除成功")
                    this.gettabledata();
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        gettabledata(){
            this.action({
                moduleName:'phoneWhiteList',
                url:"phoneWhiteList",
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
                        nullobj.tel=res.data.data[i].content;
                        nullobj.score=res.data.data[i].create_time;
                        nullobj.status="添加成功";
                        this.rows.push(nullobj)
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
.bmd{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            .Dxpartbox-table{
                background: #fff;
                padding: 14px;
                margin-top: 15px;
                &/deep/ .cz{
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
