<template>
    <div class="hmcxq">
        <div class="headlist">
            <div class="box">
                <span class="title">错误项（{{errnum}}）条</span>
                <span class="btn" v-if="showtype==0" @click.prevent="showall">显示全部项</span>
                <span class="btn" v-if="showtype==1" @click.prevent="showerr">显示错误项</span>
                <span class="btn" @click.prevent="delerr">删除错误项</span>
                <span class="btn" @click.prevent="delall">全部删除</span>
                <!-- <span class="btn" @click.prevent="delcheck">删除选中</span> -->
            </div>  
            
        </div>
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
                            <!-- <span @click.prevent="edit" class="edit">编辑</span> -->
                            <span @click.prevent="del(props)" class="del">删除</span>
                            <!-- <span @click.prevent="del">删除</span> -->
                        </div>
                        <div class="12" v-else>{{props.formattedRow[props.column.field]}}</div>
                    </template>
                </vue-good-table>
            </div>
            <div class="btnlist">
                <span class="tj" @click.prevent="tj">提交</span>
                <!-- <span class="qx" @click.prevent="qx">取消</span> -->
            </div>
    </div>
</template>
<script>
export default {
    name:"hmcxq",
    data(){
        return{
            errnum:0,//错误项条数
            showtype:1,
            columns:[
                // {
                //     label:"序号",
                //     field:"serial",
                //     type: 'number',
                // },
                {
                    label:"手机号",
                    field:"tel"
                },
                {
                    label:"状态",
                    field:"status"
                },
                {
                    label: '操作',
                    field: 'operate',
                    html:true
                },
            ],
            lsrows:[],
            rows:[
                //{tel:"15958123761",status:"正确"}
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
        selectionChanged(){//table勾选的方法
            
        },
        showall(){//显示全部项按钮的方法
            this.showtype=1;
            this.rows=this.that.airforce.Phonelist.data;
            this.geterrnum();
        },
        showerr(){//显示错误项按钮的方法
            this.showtype=0;
            let newarr=[];
            let bdlist=JSON.parse(JSON.stringify(this.that.airforce.Phonelist.data));
            for(let i=0;i<bdlist.length;i++){
                if(bdlist[i].status=="错误"){
                    newarr.push(bdlist[i]);
                }
            }
            this.rows=newarr;
            this.geterrnum();
        },
        delerr(){//删除错误项按钮的方法
            let newarr=[];
            let bdlist=JSON.parse(JSON.stringify(this.that.airforce.Phonelist.data));
            for(let i=0;i<bdlist.length;i++){
                if(bdlist[i].status=="正确"){
                    newarr.push(bdlist[i]);
                }
            }
            this.rows=newarr;
            this.that.action({
                moduleName:"Phonelist",
                goods:{
                    data:null,
                }
            })
            this.that.action({
                moduleName:"Phonelist",
                goods:{
                    data:newarr,
                }
            })
            this.showtype=1;
            this.rows=this.that.airforce.Phonelist.data;
            this.errnum=0;
            this.that.$vux.toast.text("执行成功")
        },
        delall(){//全部删除按钮的方法
            this.rows=[];
            this.that.action({
                moduleName:"Phonelist",
                goods:{
                    data:null,
                }
            })
            this.errnum=0;
            this.that.$vux.toast.text("执行成功")
        },
        delcheck(){//删除选中按钮的方法
            
        },
        // edit(){//编辑按钮的方法

        // },
        del(e){//删除按钮的方法
            console.log(e)
            let oldlist=JSON.parse(JSON.stringify(this.that.airforce.Phonelist.data));
            //let oldlist=this.that.airforce.Phonelist.data;
            //console.log(oldlist,654874)
            oldlist.splice(e.row.id,1);
            
            console.log(oldlist)
            this.that.action({
                moduleName:"Phonelist",
                goods:{
                    data:null,
                }
            })
            this.that.action({
                moduleName:"Phonelist",
                goods:{
                    data:oldlist,
                }
            })
            this.getrowdata();
            this.showtype=1;
            this.geterrnum();
        },
        tj(){//提交按钮的方法
            let newarr=[];
            if(this.that.airforce.Phonelist.data){//判断airforce有无号码池数据
                for(let i=0;i<this.that.airforce.Phonelist.data.length;i++){//取正确号码的数量
                    if(this.that.airforce.Phonelist.data[i].status=="正确"){
                        newarr.push(this.that.airforce.Phonelist.data[i]);
                    }
                }
                
                let errnum=(this.that.airforce.Phonelist.data.length)-(newarr.length);//获取错误号码的数量
                console.log(errnum,333)
                if(errnum>0){
                    let then=this;
                    this.that.$vux.confirm.show({
                        title: '提示',
                        content: '当前列表内存在'+errnum+'条错误项，是否删除？',
                        onConfirm () {
                                then.that.action({
                                    moduleName:"Phonelist",
                                    goods:{
                                        data:null,
                                    }
                                });
                                then.that.action({
                                    moduleName:"Phonelist",
                                    goods:{
                                        data:newarr,
                                    }
                                });
                                then.that.action({
                                    moduleName:"Phonelist",
                                    goods:{
                                        show:true,
                                    }
                                });
                                then.$ZAlert.hide();
                            },
                    });
                }else{
                    this.that.action({
                        moduleName:"Phonelist",
                        goods:{
                            show:true,
                        }
                    });
                    this.$ZAlert.hide();
                }
            }else{
                this.that.$vux.toast.text("当前号码池无内容")
            }
        },
        qx(){//取消按钮的方法

            this.$ZAlert.hide();
        },
        geterrnum(){//获取错误号码的数量
            let newarr=[];
            if(this.that.airforce.Phonelist.data){
                for(let i=0;i<this.that.airforce.Phonelist.data.length;i++){//取正确号码的数量
                    if(this.that.airforce.Phonelist.data[i].status=="错误"){
                        newarr.push(this.that.airforce.Phonelist.data[i]);
                    }
                }
                
                this.errnum=newarr.length;//获取错误号码的数量
            }else{
                this.errnum=0;
            }
        },
        getrowdata(){//从airforce内获取表格的数据
            if(this.that.airforce.Phonelist.data){
                let newarr=JSON.parse(JSON.stringify(this.that.airforce.Phonelist.data));
                for(let i=0;i<newarr.length;i++){
                    newarr[i].id=i;
                }
                this.that.action({
                    moduleName:"Phonelist",
                    goods:{
                        data:null,
                    }
                })
                this.that.action({
                    moduleName:"Phonelist",
                    goods:{
                        data:newarr,
                    }
                })
                this.rows=newarr;
            }
        }
    },
    mounted(){
        this.getrowdata();
        this.geterrnum();
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.hmcxq{
    .headlist{
        overflow: hidden;
        .box{
            float: right;
            display: flex;
            margin: 20px 0;
            margin-right: 9px;
            .title{
                color: #666;
                font-size: 14px;
                line-height: 36px;
                margin-right: 5px;
            }
            .btn{
                cursor: pointer;
                background: @col-ff6600;
                color: #fff;
                font-size: 14px;
                padding: 0 10px;
                line-height: 36px;
                margin: 0 5px;
                
            }
        }
    }
    .tablebox{
        padding: 14px;
        &/deep/ .cz{
            span{
                cursor: pointer;
                margin: 0 5px;
            }
            .del{
                color: #FF6E6E;
            }
            .edit{
                color:#4c88f5;
            }
        }
    }
    .btnlist{
        display: flex;
        text-align: center;
        padding: 20px 0;
        .tj{
            line-height: 50px;
            background: @col-ff6600;
            color: #fff;
            font-size: 14px;
            padding: 0 60px;
            margin-right: 20px;
            cursor: pointer;
            margin-left: 380px;
        }
        .qx{
            line-height: 50px;
            background: #c5ced7;
            color: #fff;
            font-size: 14px;
            padding: 0 20px;
            cursor: pointer;
        }
    }
}
</style>
