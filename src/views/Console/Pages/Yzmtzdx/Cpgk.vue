<template>
    <div class="cpgk">
        <div class="firstline">
            <div class="Dxpartbox jbzl">
                <div class="Dxpartbox-head">
                    基本资料
                    <div class="notes"></div>
                    <div class="notestext">验证码</div>
                </div>
                <div class="Dxpartbox-content">
                    <flexbox>
                        <flexbox-item>
                            <div>&nbsp;&nbsp;&nbsp;等级</div>
                            <x-button class="btn XButton btn2" @click.native="Recharge">充值</x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <div>|&nbsp;&nbsp;&nbsp;通道拓展码</div>
                            <p class="v">111635</p>
                        </flexbox-item>
                        <flexbox-item>
                            <div>|&nbsp;&nbsp;&nbsp;累计充值（元）</div>
                            <p class="v">0</p>
                        </flexbox-item>
                        <flexbox-item>
                            <div>|&nbsp;&nbsp;&nbsp;余额（条）</div>
                            <p class="v">322</p>
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
            <div class="Dxpartbox jkxx">
                <div class="Dxpartbox-head">
                    API接口信息
                    <ul class="Dxpartbox-btnlist">
                        <li @click.prevent="editpsd"><span class="iconfont">&#xe648;</span>修改密码</li>
                    </ul>
                </div>
                <div class="Dxpartbox-content">
                    <flexbox>
                        <flexbox-item>
                            <div>账号：S7256081</div>
                            <div>密码：pwd1402714 <span class="iconfont">&#xe64c;</span></div>
                        </flexbox-item>
                        <flexbox-item>
                            <x-button class="btn XButton btn2">对接文档</x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <x-button class="btn XButton btn2">联系我们</x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <div>(您的专属对接人-我是昵称)</div>
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
        </div>
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                今日发送
            </div>
            <div class="Dxpartbox-content">
                <flexbox>
                    <flexbox-item class="lineRigth">
                        <p class="v2">0</p>
                        <div class="msg">发送总数</div>
                    </flexbox-item>
                    <flexbox-item class="lineRigth">
                        <p class="v2">0</p>
                        <div class="msg">成功数（<span class="tag">0%</span>）</div>
                    </flexbox-item>
                    <flexbox-item>
                        <p class="v2">0</p>
                        <div class="msg">失败数（<span class="tag">0%</span>）</div>
                    </flexbox-item>
                    <flexbox-item>
                        <p class="v2">0</p>
                        <div class="msg">未知数</div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="Dxpartbox jrzn">
            <div class="Dxpartbox-head">
                接入指南
            </div>
            <div class="Dxpartbox-content">
                <p class="zntitle">不同产品有如何区分？产品适用哪些应用场景？平台功能如何操作？API对接所需要注意的问题有哪些？——详情见接入指南</p>
                <div class="btnlist">
                    <x-button class="btn XButton btn2">查看介绍</x-button>
                    <x-button class="btn XButton btn2">说明下载</x-button>
                    <x-button class="btn XButton btn2">短信测试</x-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem, XButton, XInput } from "vux"
export default {
    name:"cpgk",
    components:{Flexbox, FlexboxItem, XButton, XInput },
    data(){
        return{

        }
    },
    methods:{
        editpsd(){//点击修改密码的方法

        },
        Recharge(){
                this.$ZAlert.show({
                    components:"Console/Pages/alert/Recharge",
                    width:"500px",
                    title:"充值"
                })
            }
    }
}
</script>
<style lang="less" scoped>
.cpgk{
    box-sizing: border-box;
    padding: 0 20px;
    .firstline{
        overflow: hidden;
        background: transparent;
        margin-bottom: 30px;
        .jbzl{
            width: 50%;
            float:left;
            .Dxpartbox-content{
                font-size: 14px;
            }
        }
        .jkxx{
            width: 45%;
            margin-left: 5%;
            float:left;
            .Dxpartbox-content{
                font-size: 14px;
                padding: 21px 20px;
            }
        }
    }
    .Dxpartbox{
        .Dxpartbox-content{
            padding: 20px 20px;
            .zntitle{
                color: #666;
                line-height: 36px;
                font-size: 14px;
            }
            .btnlist{
                text-align: left;
                overflow: hidden;
                margin-top: 20px;
                .XButton{
                    float: left;
                    margin: 0 20px;
                }
            }
        }
    }
    .jrzn{
        margin-top: 30px;
    }
}
.btn{
        background-color: @themeColor;
        color: @cor_ffffff;
        width: auto;
        padding: 0 @pa;
        border-radius: 0;
        cursor: pointer;
        &.btn2{
            background-color: @col-00ccff;
            font-size: 14px;
        }
        &.btn3{
            margin-top: 40px;
            font-size: 14px;
        }
    }
.v{
    font-size: 18px;
    margin: 10px 0;
    
}
.v2{
    text-align: center;
    font-size: 50px;
}
.msg{
        text-align: center;
        color: #666;
        margin-bottom: @pa;
        .tag{
            color: @col-ff6600;
        }
        &.msg2{
            text-align: left;
            line-height: 40px;
            margin-bottom: 0;
        }
        &.msg3{
            margin-top: @pa;
        }
    }
    .msgTitle{
        line-height: 40px;
    }
</style>
