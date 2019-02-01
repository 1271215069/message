<template>
    <div class="zhcz">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                账户充值
            </div>
            <div class="Dxpartbox-content">
                <ul class="Dxpartbox-tab">
                    <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
                </ul>
                <div class="zh" v-if="tabval=='1'">
                    <ul class="list">
                        <li>
                            <span class="title">当前余额：</span>
                            <div class="context"><span class="sign">{{balance}}</span>元</div>
                        </li>
                        <li>
                            <span class="title">充值金额：</span>
                            <div class="context">
                                <input type="text" v-model="rechargenum" class="rechargenum">元
                            </div>
                        </li>
                        <li>
                            <span class="title">充值方式：</span>
                            <div class="context">
                                <label :class="czfs=='1'? 'ischecked':' '">
                                    <input type="radio" v-model="czfs" value="1">
                                    <img :src="require('@/assets/img/cz/zfb.png')">
                                </label>
                                <!-- <label :class="czfs=='2'? 'ischecked':' '">
                                    <input type="radio" v-model="czfs" value="2">
                                    <img :src="require('@/assets/img/cz/weixin.png')">
                                </label> -->
                            </div>
                        </li>
                    </ul>
                    <div class="btn">
                        <span @click.prevent="surezf">确认支付</span>
                    </div>
                </div>
                <div class="xx" v-if="tabval=='2'">
                    <ul class="list">
                        <li>
                            <span class="title">联系人：</span>
                            <div class="context">{{lxname}}</div>
                        </li>
                        <li>
                            <span class="title">企业QQ：</span>
                            <div class="context">{{qq}}</div>
                        </li>
                        <li>
                            <span class="title">联系电话：</span>
                            <div class="context">{{tel}}</div>
                        </li>
                        <li>
                            <span class="title">打款方式：</span>
                            <div class="context"> </div>
                        </li>
                    </ul>
                    <div class="dktype">
                        <div class="typehead">
                            <span class="title">选择支付：</span>
                            <div class="context">
                                <label class="item">
                                    <input type="radio" v-model="zftype" value="1">
                                    <span>对公账户</span>
                                </label>
                                <label class="item">
                                    <input type="radio" v-model="zftype" value="2">
                                    <span>支付宝支付</span>
                                </label>
                                <label class="item">
                                    <input type="radio" v-model="zftype" value="3">
                                    <span>微信支付</span>
                                </label>
                            </div>
                        </div>
                        <ul class="list">
                            <li v-if="zftype=='1'">
                                <span class="title">开户行：</span>
                                <div class="context">交通银行新松江路支行</div>
                            </li>
                            <li v-if="zftype=='1'">
                                <span class="title">开户名：</span>
                                <div class="context">易网互联（北京）科技有限公司上海分公司</div>
                            </li>
                            <li v-if="zftype=='1'">
                                <span class="title">开户行账号：</span>
                                <div class="context">3100 6900 8018 8181 2032 7</div>
                            </li>
                            <li v-if="zftype=='2'">
                                <span class="title">支付宝名称：</span>
                                <div class="context">易网互联（北京）科技有限公司上海分公司</div>
                            </li>
                            <li v-if="zftype=='2'">
                                <span class="title">支付宝账号：</span>
                                <div class="context">ywhl106@163.com</div>
                            </li>
                            <li v-if="zftype=='2'">
                                <span class="title">扫码支付：</span>
                                <div class="context">
                                    <img :src="require('@/assets/img/cz/alipay.png')" alt="">
                                </div>
                            </li>
                            <li v-if="zftype=='3'">
                                <span class="title">微信名称：</span>
                                <div class="context">易网互联（北京）科技有限公司上海分公司</div>
                            </li>
                            <!-- <li v-if="zftype=='3'">
                                <span class="title">微信账号：</span>
                                <div class="context">ywhl106</div>
                            </li> -->
                            <li v-if="zftype=='3'">
                                <span class="title">扫码支付：</span>
                                <div class="context">
                                    <img :src="require('@/assets/img/cz/weipay.png')" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"zhcz",
    data(){
        return{
            tablist:[//tab页的数据
                // {
                //     title:"账户充值",
                //     val:"1"
                // },
                {
                    title:"线下充值",
                    val:"2"
                },
            ],
            tabval:"2",
            lxname:"客服人员",
            qq:"3593131307 721864097",
            tel:"4008-123-106",
            zftype:"1",//支付类别的值
            balance:"0",//余额的值
            rechargenum:"1000",//充值金额绑定的值
            czfs:"1",//选择充值方式的值
        }
    },
    methods:{
        tabclick(i,item){//点击tab的方法
            for(let n=0;n<this.$refs.tabitem.length;n++){
                this.$refs.tabitem[n].classList.remove("tabactive");
            }
            this.$refs.tabitem[i].classList.add("tabactive");
            this.tabval=item.val;
        },
        surezf(){//点击确认支付的方法

        }
    },
    mounted(){
        this.$refs.tabitem[0].classList.add("tabactive");
    }
}
</script>
<style lang="less" scoped>
.zhcz{
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
            .zh{
                 box-sizing: border-box;
                padding: 10px;
                .list{
                    display: block;
                    width: 100%;
                    margin-top: 20px;
                    li{
                        overflow: hidden;
                        margin: 5px 0;
                        .title{
                            display: block;
                            width: 90px;
                            font-size: 12px;
                            float: left;
                            line-height: 40px;
                        }
                        .context{
                            float: left;
                            font-size: 12px;
                            line-height: 40px;
                            overflow: hidden;
                            .sign{
                                color: @col-ff6600;
                                font-size: 14px;
                                margin-right: 5px;
                            }
                            .rechargenum{
                                width: 150px;
                                line-height: 28px;
                                border: 1px solid #e6e6e6;
                                box-sizing: border-box;
                                padding: 0 7px;
                                text-align: right;
                                margin-right: 5px;
                            }
                            label{
                                float: left;
                                margin-right: 10px;
                                display: block;
                                width: 90px;
                                height: 34px;
                                margin-top: 3px;
                                line-height: 40px;
                                box-sizing: border-box;
                                border: 1px solid #ddd;
                                padding: 5px;
                                cursor: pointer;
                                input{
                                    display: none;
                                }
                                img{
                                    display: block;
                                    margin: 0 auto;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .ischecked{
                                border-color: #67c23a;
                                background: url("../../../../assets/img/cz/icon-check.png") no-repeat 100% 0;
                            }
                        }
                    }
                }
                .btn{
                    margin-top: 20px;
                    span{
                        display: block;
                        width: 90px;
                        line-height: 38px;
                        margin-left: 90px;
                        background: @col-ff6600;
                        color: #fff;
                        font-size: 12px;
                        border-radius: 4px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
            .xx{
                box-sizing: border-box;
                padding: 10px;
                .list{
                    display: block;
                    width: 100%;
                    margin-top: 20px;
                    li{
                        overflow: hidden;
                        .title{
                            display: block;
                            width: 90px;
                            font-size: 12px;
                            float: left;
                            line-height: 40px;
                        }
                        .context{
                            float: left;
                            font-size: 12px;
                            line-height: 40px;
                            
                        }
                    }
                }
                .dktype{
                    border-top: 1px solid #e6e6e6;
                    margin-top: 10px;
                    padding-top: 10px;
                    .typehead{
                        overflow: hidden;
                        .title{
                            display: block;
                            width: 90px;
                            font-size: 12px;
                            float: left;
                            line-height: 40px;
                        }
                        .context{
                            float: left;
                            font-size: 12px;
                            line-height: 40px;
                            overflow: hidden;
                            .item{
                                float: left;
                                margin-right: 15px;
                                display: flex;
                                input{
                                    margin-top: 14px;
                                    margin-right: 7px;
                                }
                            }
                        }
                    }
                    .list{
                        display: block;
                        width: 100%;
                        margin-top: 20px;
                        li{
                            overflow: hidden;
                            .title{
                                display: block;
                                width: 90px;
                                font-size: 12px;
                                float: left;
                                line-height: 40px;
                            }
                            .context{
                                float: left;
                                font-size: 12px;
                                line-height: 40px;
                                img{
                                    /*width: 100px;*/
                                    /*height: 100px;*/
                                    max-width: 300px;
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
