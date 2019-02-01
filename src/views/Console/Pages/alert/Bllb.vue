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
                <span class="qx" @click.prevent="qx">取消</span>
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
            columns:[],
            rows:[],
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
            this.getrowsdata();
            this.geterrnum();
        },
        showerr(){//显示错误项按钮的方法
            this.showtype=0;
            let Bllist=JSON.parse(JSON.stringify(this.that.airforce.Bllist.data));
            let rowarr=[];
            for(let i=0;i<Bllist.length;i++){
                let rowobj={};
                rowobj=Bllist[i];
                let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                if (!telzz.test(Bllist[i].A)){
                    rowobj.status="错误";
                    rowobj.id=i;
                    rowarr.push(rowobj);
                }
            }
            this.rows=rowarr;
            this.geterrnum();
        },
        delerr(){//删除错误项按钮的方法
            let Bllist=JSON.parse(JSON.stringify(this.that.airforce.Bllist.data));
            let rowarr=[];
            for(let i=0;i<Bllist.length;i++){
                let rowobj={};
                rowobj=Bllist[i];
                let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                if (telzz.test(Bllist[i].A)){
                    // rowobj.status="正确";
                    // rowobj.id=i;
                    rowarr.push(rowobj);
                }
            };
            this.that.action({
                moduleName:"Bllist",
                goods:{
                    data:null,
                }
            });
            this.that.action({
                moduleName:"Bllist",
                goods:{
                    data:rowarr,
                }
            });
            this.getrowsdata();
            this.geterrnum();
            this.showtype=1;
            this.that.$vux.toast.text("执行成功")
        },
        delall(){//全部删除按钮的方法
            this.that.action({
                moduleName:"Bllist",
                goods:{
                    data:null,
                }
            });
            this.rows=[];
            this.errnum=0;
            this.that.$vux.toast.text("执行成功")
        },

        // edit(){//编辑按钮的方法

        // },
        del(e){//删除按钮的方法
            console.log(e.row.id)
            let Bllist=JSON.parse(JSON.stringify(this.that.airforce.Bllist.data));
            console.log(Bllist)
            Bllist.splice(e.row.id,1);
            console.log(Bllist)
            this.that.action({
                moduleName:"Bllist",
                goods:{
                    data:null,
                }
            });
            this.that.action({
                moduleName:"Bllist",
                goods:{
                    data:Bllist,
                }
            });
            this.getrowsdata();
            this.geterrnum();
            this.showtype=1;
            this.that.$vux.toast.text("删除成功")
        },
        tj(){//提交按钮的方法
            if(this.that.airforce.Bllist.data){//判断airforce有无号码池数据
                let Bllist=JSON.parse(JSON.stringify(this.that.airforce.Bllist.data));
                let rowarr=[];
                for(let i=0;i<Bllist.length;i++){//取正确号码的数量
                    let rowobj={};
                    rowobj=Bllist[i];
                    let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                    if (telzz.test(Bllist[i].A)){
                        rowarr.push(rowobj);
                    }
                };
                let errnum=(this.that.airforce.Bllist.data.length)-(rowarr.length);//获取错误号码的数量
                if(errnum>0){
                    let then=this;
                    this.that.$vux.confirm.show({
                        title: '提示',
                        content: '当前列表内存在'+errnum+'条错误项，是否删除？',
                        onConfirm () {
                                then.that.action({
                                    moduleName:"Bllist",
                                    goods:{
                                        data:null,
                                    }
                                });
                                then.that.action({
                                    moduleName:"Bllist",
                                    goods:{
                                        data:rowarr,
                                    }
                                });
                                then.that.action({
                                    moduleName:"Bllist",
                                    goods:{
                                        show:true,
                                    }
                                });
                                then.$ZAlert.hide();
                            },
                    });
                }else{
                    this.that.action({
                        moduleName:"Bllist",
                        goods:{
                            show:true,
                        }
                    });
                    this.$ZAlert.hide();
                }
            }else{
                this.that.$vux.toast.text("当前变量列表无内容")
            }
        },
        qx(){//取消按钮的方法

            this.$ZAlert.hide();
        },
        geterrnum(){//获取错误号码的数量
            if(this.that.airforce.Bllist.data){
                let Bllist=JSON.parse(JSON.stringify(this.that.airforce.Bllist.data));
                let rowarr=[];
                for(let i=0;i<Bllist.length;i++){//取正确号码的数量
                    let rowobj={};
                    rowobj=Bllist[i];
                    let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                    if(!telzz.test(Bllist[i].A)){
                        rowarr.push(rowobj);
                    }
                };
                
                this.errnum=rowarr.length;//获取错误号码的数量
            }else{
                this.errnum=0;
            }
        },
        getrowsdata(){//通过airforce获取rows的数据
            let Bllist=JSON.parse(JSON.stringify(this.that.airforce.Bllist.data));
            let rowarr=[];
            for(let i=0;i<Bllist.length;i++){
                let rowobj={};
                rowobj=Bllist[i];
                let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                if (telzz.test(Bllist[i].A)){
                    rowobj.status="正确";
                }else{
                    rowobj.status="错误";
                }
                rowobj.id=i;
                rowarr.push(rowobj);
            }
            this.rows=rowarr;
        }
    },

    
    mounted(){
        this.columns=[];
        this.rows=[];
        
        if(this.that.airforce.Bllist.data){
            let Bllist=JSON.parse(JSON.stringify(this.that.airforce.Bllist.data));
            for(let o in Bllist[0]){
                 this.columns.push({
                        label:(o == 'A')?"手机号":"变量"+o,
                        field:o
                    })
            }

            this.columns.push({label:'状态',field: 'status'});
            this.columns.push({label:'操作',field: 'operate',html:true});
            this.getrowsdata();
            this.geterrnum();
        }
        
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
