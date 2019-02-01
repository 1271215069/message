<template>
    <div class="sjts">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                数据推送
                <div class="notes"></div>
                <div class="notestext">验证码</div>
            </div>
            <div class="Dxpartbox-content">

                <div class="infoline">
                    <div class="linetitle">
                        <!-- <span class="s">*</span> -->
                        <label>推送开关：</label>
                    </div>
                    <div class="lineright">
                        <div class="tskgtop">
                            <l-switch class="sw" textLeft="关闭" textRight="开启" :checkval="tskg" @on-click="tskgclick" @on-change="tskgchange"></l-switch>
                        </div>
                    </div>
                </div>
                
                <div class="infoline">
                    <div class="linetitle">
                        <label>接收推送地址：</label>
                    </div>
                    <div class="lineright">
                        <textarea class="jsaddress" v-model="jstsdz" ref="needable1"></textarea>
                    </div>
                </div>

                <div class="infoline">
                    <div class="linetitle">
                        <label>上行短信推送地址：</label>
                    </div>
                    <div class="lineright">
                        <div class="contentbox">
                            <label class="inputline">
                                <input type="radio" name="shdz" v-model="shtsdz" value="1" ref="needable2">
                                <span class="title">自定义上行地址</span>
                            </label>
                            <textarea class="jsaddress" v-model="zdyshdz" ref="needable3"></textarea>
                        </div>

                        <div class="contentbox">
                            <label class="inputline">
                                <input type="radio" name="shdz" v-model="shtsdz" value="2" ref="needable4">
                                <span class="title">平台接管上行短信</span>
                            </label>
                            <textarea class="jsaddress" v-model="ptjgsh" ref="needable5"></textarea>
                        </div>

                    </div>
                </div>

                <div class="infoline">
                    <div class="linetitle">
                        <label>&nbsp;</label>
                    </div>
                    <div class="lineright">
                        <div class="btnlist">
                            <span class="save" @click.prevent="save">保存</span>
                            <span class="confirm" @click.prevent="confirm">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js"
import SMEditor from 'smeditor'
export default {
    name:"sjts",
    components:{'smeditor': SMEditor,...ConsoleComponents},
    data(){
        return{
            tskg:true,//推送开关的值
            shtsdz:"1",//单选的值
            jstsdz:"",//接收推送地址的值
            zdyshdz:"",//自定义上行地址的值
            ptjgsh:"",//平台接管上行短信的值
            
        }
    },
    methods:{
        tskgclick(){//点击推送开关的方法
            this.tskg=!this.tskg;
        },
        tskgchange(val){//推送开关状态改变的方法
            if(val){
                this.$refs.needable1.disabled=false;
                this.$refs.needable2.disabled=false;
                this.$refs.needable3.disabled=false;
                this.$refs.needable4.disabled=false;
                this.$refs.needable5.disabled=false;
            }else{
                this.$refs.needable1.disabled=true;
                this.$refs.needable2.disabled=true;
                this.$refs.needable3.disabled=true;
                this.$refs.needable4.disabled=true;
                this.$refs.needable5.disabled=true;
            }
        },
        save(){//保存按钮的方法
            
        },
        confirm(){//取消按钮的方法
            
        }
    }
}
</script>
<style lang="less" scoped>
.sjts{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        font-size: 14px;
        .Dxpartbox-content{
            padding: 12px 14px 12px 7px;
            .infoline{
                display: flex;
                margin-bottom: 20px;
                .linetitle{
                    display: inline-block;
                    width:15%;
                    min-width: 100px;
                    text-align: center;
                    color: #666;
                    line-height: 36px;
                    .s{
                        color:#ff2b2b;
                    }
                    label{
                        line-height: 36px;
                    }
                }
                .lineright{
                    width: 84%;
                    margin-left: 1%;
                    .fwb{
                        margin: 0;
                    }
                    .tskgtop{
                        & /deep/ .sw{
                            //transform: translateY(30%);
                            line-height: 63px;
                            input{
                                border: 1px solid #339933;
                                &:checked{
                                    background-color: #339933;
                                    border-color: #339933;
                                    &:after{
                                        background-color: #fff;
                                    }
                                }
                                &:after{
                                    top: 5px;
                                    left: 5px;
                                    width: 20px;
                                    height: 20px;
                                    background-color: #339933;
                                }
                            }
                            .textLeft{
                                line-height: 39px;
                                font-size: 14px;
                            }
                            .textRight{
                                line-height: 43px;
                                color: #339933;
                                font-size: 14px;
                            }
                        }
                    }
                    .jsaddress{
                        box-sizing: border-box;
                        width: 400px;
                        height: 100px;
                        padding: 7px;
                        border: 1px solid #DBDBDB;
                        font-size: 14px;
                        resize: none;
                        color: #666;
                    }
                    .contentbox{
                        .inputline{
                            display: block;
                            position: relative;
                            input[type=radio]{
                                position: absolute;
                                width: 20px;
                                height: 20px;
                                top: 9px;;
                                left: 0;
                            }
                            .title{
                                display: block;
                                line-height: 36px;
                                padding-left: 30px;
                            }
                        }
                        .jsaddress{
                            box-sizing: border-box;
                            width: 400px;
                            height: 100px;
                            padding: 7px;
                            border: 1px solid #DBDBDB;
                            font-size: 14px;
                            resize: none;
                            color: #666;
                        }
                    }
                    .btnlist{
                        span{
                            display: inline-block;
                            line-height: 36px;
                            color: #fff;
                            padding: 0 30px;
                            cursor: pointer;
                        }
                        .save{
                            background: @col-ff6600;
                            margin-right: 20px;
                        }
                        .confirm{
                            background: #c5ced7;
                        }
                    }
                }
            }
        }
    } 
}
</style>
