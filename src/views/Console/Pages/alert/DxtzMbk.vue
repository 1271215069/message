<template>
    <div class="dxtzmbk">
        <ul class="headtab">
            <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
        </ul>
        <div class="tablebox">
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
                            <span @click.prevent="chose(props.formattedRow)" class="chose">选择</span>
                            
                            <!-- <span @click.prevent="del">删除</span> -->
                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table>
        </div>
    </div>
</template>
<script>
export default {
    name:"dxtzmbk",
    data(){
        return{
            tablist:[//tab页的数据
                {
                    title:"自定义模板",
                    val:"1"
                },
                // {
                //     title:"电商订单",
                //     val:"2"
                // },
                // {
                //     title:"通知短信",
                //     val:"3"
                // },
                // {
                //     title:"物流订单",
                //     val:"4"
                // },
                // {
                //     title:"验证码",
                //     val:"5"
                // },
                // {
                //     title:"医疗行业",
                //     val:"6"
                // },
            ],
            tabval:"1",//判断tab页的值
            columns:[
                {
                    label:"序号",
                    field:"serial",
                    type: 'number',
                },
                {
                    label:"短信内容",
                    field:"content"
                },
                {
                    label:"短信字数",
                    field:"num",
                    type: 'number',
                },
                {
                    label:"签名",
                    field:"qm",
                    hidden: true,
                },
                {
                    label:"签名",
                    field:"qmid",
                    hidden: true,
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            rows:[
                //{serial:1,content:"用户名{S10}您好，您在{S20}的订单已支付成功，您的订单号为{S20}",num:38}
            ]
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
    },
    methods:{
        tabclick(i,item){//点击tab的方法
            for(let n=0;n<this.$refs.tabitem.length;n++){
                this.$refs.tabitem[n].classList.remove("tabactive");
            }
            this.$refs.tabitem[i].classList.add("tabactive");
            this.tabval=item.val;
        },
        selectionChanged(){//table复选框的方法

        },
        chose(e){//点击选择的方法
            this.$emit("mbclick",e)
            this.$ZAlert.hide();
        }
    },
    mounted(){
        this.$refs.tabitem[0].classList.add("tabactive");
        this.rows=[];
        this.that.action({
            moduleName:'templetlist',
            url:"templetlist",
            method:"post",
            headers: {'XX-token': this.that.airforce.login.data.token,},
            isFormData:true,
            data:{
                status:"2",
                type:"1",
            }
        }).then(res=>{
            if(res.code==200){
                for(let i=0;i<res.data.length;i++){
                    let mbobj={};
                    mbobj.serial=res.data[i].id;
                    mbobj.content=res.data[i].sms_content;
                    mbobj.num=res.data[i].sms_content.length;
                    mbobj.qm=res.data[i].sign_content;
                    mbobj.qmid=res.data[i].sms_sign;
                    this.rows.push(mbobj);
                }
            }else{
                this.that.$vux.toast.text(res.msg)
            }
        }).catch(err=>{})
    }
}
</script>
<style lang="less" scoped>
.dxtzmbk{
    box-sizing: border-box;
    padding: 14px;
    .headtab{
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
    .tablebox{
        &/deep/ .cz{
            .chose{
                cursor: pointer;
                color: #4c88f5;
            }
        }
    }
}
</style>
