<template>
    <div class="AccountInfo console-PagePadding">
        <div class="AccountInfoLeft">
            <div class="AccountInfoLeftContent">
                <div class="console-card">
                    <div class="console-PageTitleV2">认证信息
                        <ul class="left">
                            <li>说明下载</li>
                        </ul>
                    </div>
                    <div class="content rz">
                        <z-flexbox class="rzRow">
                            <z-flexbox-item span="100px">
                                <div slot="left">
                                    <img class="img" :src="require('@/assets/img/about/bj.png')" alt="">
                                </div>
                                <div class="row">
                                    <span>18768527014</span>
                                    <p>已认证</p>
                                    <x-button class="XButton themeXButton" @click.native="rzbtn">重新认证</x-button>
                                </div>
                                <div class="row">
                                    <div class="icons">
                                        星级：<div class="iconfont">&#xe658;</div>
                                    </div>
                                </div>
                            </z-flexbox-item>
                        </z-flexbox>
                        <z-flexbox class="rzRow">
                            <z-flexbox-item span="100px">
                                <div slot="left" class="lable">企业名称：</div>
                                <div class="row text">上海创蓝项坤测试账号</div>
                            </z-flexbox-item>
                        </z-flexbox>
                        <z-flexbox class="rzRow">
                            <z-flexbox-item span="100px">
                                <div slot="left" class="lable">公司地址：</div>
                                <div class="row text">上海市 上海市 徐汇区 古美路1528号A4栋研祥科技大厦7楼</div>
                            </z-flexbox-item>
                        </z-flexbox>
                        <z-flexbox class="rzRow">
                            <z-flexbox-item span="100px">
                                <div slot="left" class="lable">营业执照：</div>
                                <div class="row text">
                                    <img class="img1" :src="require('@/assets/img/about/bj.png')" alt="">
                                </div>
                            </z-flexbox-item>
                        </z-flexbox>
                        <z-flexbox class="rzRow">
                            <z-flexbox-item span="100px">
                                <div slot="left" class="lable">营业执照号：</div>
                                <div class="row text">28000000201511050180</div>
                            </z-flexbox-item>
                        </z-flexbox>
                    </div>
                </div>
                <div class="console-card">
                    <div class="console-PageTitleV2">账号绑定</div>
                    <div class="content rz">
                        <z-flexbox class="rzRow">
                            <z-flexbox-item span="100px" type="right">
                                <div slot="left" class="lable">
                                    <x-button class="XButton themeXButton r" @click.native="bdbtnPhone">重新绑定</x-button>
                                </div>
                                <div class="row text">
                                    <div class="zh">
                                        <span class="iconfont icon1">&#xe669;</span>
                                        <span>手机（</span>
                                        <span class="iconfont icon2 select">&#xe659;</span>
                                        <span class="iconfont text select">已绑定</span>
                                        <span>）| 18768527014</span>
                                    </div>
                                </div>
                            </z-flexbox-item>
                        </z-flexbox>
                        <z-flexbox class="rzRow">
                            <z-flexbox-item span="100px" type="right">
                                <div slot="left" class="lable">
                                    <x-button class="XButton themeXButton r" @click.native="bdbtnEmail">激活邮箱</x-button>
                                </div>
                                <div class="row text">
                                    <div class="zh">
                                        <span class="iconfont icon1">&#xe65a;</span>
                                        <span>手机（</span>
                                        <span class="iconfont icon2">&#xe659;</span>
                                        <span class="iconfont text">已绑定</span>
                                        <span>）| 未填写</span>
                                    </div>

                                </div>
                            </z-flexbox-item>
                        </z-flexbox>
                    </div>
                </div>
                <div class="console-card">
                    <div class="console-PageTitleV2">基本资料</div>
                    <div class="content info">
                        <flexbox wrap="wrap" :gutter="0">
                            <flexbox-item :span="1/2">
                                <z-flexbox>
                                    <z-flexbox-item span="100px">
                                        <div slot="left" class="lable">联系人：</div>
                                        <div v-if="infoEdit" class="val">张先生</div>
                                        <x-input v-else class="XInput" :showClear="false"></x-input>
                                    </z-flexbox-item>
                                </z-flexbox>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                <z-flexbox>
                                    <z-flexbox-item span="100px">
                                        <div slot="left" class="lable">联系人手机：</div>
                                        <div v-if="infoEdit" class="val">张先生</div>
                                        <x-input v-else class="XInput" :showClear="false"></x-input>
                                    </z-flexbox-item>
                                </z-flexbox>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                <z-flexbox>
                                    <z-flexbox-item span="100px">
                                        <div slot="left" class="lable">联系邮箱：</div>
                                        <div v-if="infoEdit" class="val">张先生</div>
                                        <x-input v-else class="XInput" :showClear="false"></x-input>
                                    </z-flexbox-item>
                                </z-flexbox>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                <z-flexbox>
                                    <z-flexbox-item span="100px">
                                        <div slot="left" class="lable">联系QQ：</div>
                                        <div v-if="infoEdit" class="val">张先生</div>
                                        <x-input v-else class="XInput" :showClear="false"></x-input>
                                    </z-flexbox-item>
                                </z-flexbox>
                            </flexbox-item>
                        </flexbox>
                        <z-flexbox>
                            <z-flexbox-item span="100px">
                                <div slot="left" class="lable">项目名称：</div>
                                <div v-if="infoEdit" class="val">张先生</div>
                                <x-input v-else class="XInput" :showClear="false"></x-input>
                            </z-flexbox-item>
                        </z-flexbox>
                        <z-flexbox>
                            <z-flexbox-item span="100px">
                                <div slot="left" class="lable">项目网址：</div>
                                <div v-if="infoEdit" class="val">张先生</div>
                                <x-input v-else class="XInput" :showClear="false"></x-input>
                            </z-flexbox-item>
                        </z-flexbox>
                        <div>
                            <x-button class="XButton themeXButton r" v-if="infoEdit" @click.native="infoEdit = false">修改</x-button>
                        </div>
                        <div>
                            <x-button class="XButton themeXButton r" v-if="!infoEdit" @click.native="infoEdit = false">提交修改</x-button>
                            <x-button class="XButton themeXButton r cancel" v-if="!infoEdit" @click.native="infoEdit = true">取消</x-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="AccountInfoRight">
            <div class="console-card">
                <div class="console-PageTitleV2">登录日志</div>
                <div class="content">
                    <vue-good-table
                            :columns="columns"
                            :rows="rows" class="tables"
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
                            styleClass="vgt-table striped"
                    >
                    </vue-good-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XButton, XInput } from "vux"
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    export default {
        name: "account-info",
        components:{
            ZFlexboxItem,
            ZFlexbox,
            Flexbox, FlexboxItem, XButton, XInput },
        data(){
            return {
                
                columns: [
                    {
                        label: '订单号',
                        field: 'title',
                    },
                    {
                        label: '产品名称',
                        field: 'time',
                    },
                    {
                        label: '订单金额',
                        field: 'type',
                    },
                    {
                        label: '优惠金额',
                        field: 'type',
                    },
                    {
                        label: '实际金额',
                        field: 'type',
                    },
                    {
                        label: '订单类型',
                        field: 'type',
                    },
                    {
                        label: '产品数量',
                        field: 'type',
                    },
                    {
                        label: '支付方式',
                        field: 'type',
                    },
                    {
                        label: '下单时间',
                        field: 'type',
                    },
                    {
                        label: '订单状态',
                        field: 'type',
                    },
                    {
                        label: '操作',
                        field: 'operate',
                    },
                ],
                rows: [
                    { id:1, title:"John", time: '201-10-31',type:"更新通知"},
                ],
                infoEdit:true,
            }
        },
        methods:{
            rzbtn(){
                this.$ZAlert.show({
                    maxWidth:"700px",
                    title:"企业认证",
                    components:"Console/Pages/alert/Realname",
                });
            },
            bdbtnPhone(){
                this.$ZAlert.show({
                    maxWidth:"400px",
                    title:"重新绑定手机",
                    components:"Console/Pages/alert/AccountBuild",
                });
            },
            bdbtnEmail(){
                this.$ZAlert.show({
                    maxWidth:"400px",
                    title:"激活邮箱",
                    props:{
                        showBtn:false,
                    },
                    components:"Console/Pages/alert/AccountBuildEmail",
                });
            }
        },
        mounted(){
            // this.bdbtnPhone();
            
            this.action({
                moduleName:'userinfo',
                url:"userinfo",
                method:"post",
                isFormData:true,
                headers: {'XX-token': this.airforce.login.data.token},
                data:{}
            }).then(res=>{
                if(res.code==200){

                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.AccountInfo{
    overflow: hidden;
    .AccountInfoLeft{
        float: left;
        width: 60%;
        .AccountInfoLeftContent{
            padding-right: @mg;
        }
    }
    .AccountInfoRight{
        float: left;
        width: 40%;
    }
    .rz{
        .rzRow{
            margin-bottom: @pa;
            .img{
                width: 100%;
                display: block;
                height: 100px;
                border-radius: 100%;
            }
            .lable{
                color: #666;
                line-height: 40px;
                font-size: 14px;
                text-align: right;
            }
            .row{
                padding-left: @pa;
                color: @themeColor;
                line-height: 40px;
                span{
                    font-weight: bold;
                    margin-right: @pa;
                    font-size: 20px;
                }
                p{
                    display: inline-block;
                    margin-right: @pa;
                }
                .XButton{
                    border-radius: 0;
                    display: inline-block;
                    width: auto;
                }
                .icons{
                    color: #666;
                    font-size: 14px;
                    .iconfont{
                        display: inline-block;
                        color: @themeColor;
                    }
                }
                &.text{
                    color: #666;
                    font-size: 14px;
                    .img1{
                        width:  200px;
                        height: 200px;
                    }
                    .zh{
                        line-height: 40px;
                        span{
                            margin: 0;
                            font-size: 14px;
                            font-weight: initial;
                        }
                        .icon1{
                            color: #999;
                        }
                        .icon2{
                            .icon1;
                            &.select{
                                color: @col-339933;
                            }
                        }
                        .text{
                            .icon2;
                            &.select{
                                color: @themeColor;
                            }
                        }
                    }
                }
            }
        }
    }
    .info{
        line-height: 40px;
        overflow: hidden;
        .lable{
            text-align: right;
        }
        .val{
            padding-left: @pa;
        }
        .XButton{
            width: auto;
            margin: 0;
            margin-left: @pa;
            margin-top: 10px;
            margin-bottom: 10px;
            float: left;
            &.cancel{
                background-color: @col-888888;
                &:active{
                    background-color: @col-D8D8D8 !important;
                    color: #000000 !important;
                }
            }
        }
    }
    .XInput{
        display: block;
        padding:0 @pa;
        border-bottom: 1px solid #CCCCCC;
    }
}
</style>