<template>
    <div class="addqm">
        <div class="Dxpartbox">
           <div class="Dxpartbox-head">
                添加签名
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">

                <!-- <div class="infoline">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>选择签名</label>
                    </div>
                    <div class="lineright">
                        <l-select :data="qmtype" @on-change="qmtypechage"></l-select>
                    </div>
                </div> -->

                <div class="infoline">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>输入签名</label>
                    </div>
                    <div class="lineright">
                        <input class="inputtext" type="text" placeholder="【请输入签名内容要求2-20个字符】" v-model="qmtext">
                    </div>
                </div>

                <!-- <div class="infoline">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>行业选择</label>
                    </div>
                    <div class="lineright">
                        <selector class="selector" :options="hylist" v-model="hy" placeholder="请选择行业"></selector>
                    </div>
                </div> -->

                <!-- <div class="infoline">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>应用场景</label>
                    </div>
                    <div class="lineright">
                        <ul class="yycj">
                            <li v-for="(item,index) in yycjlist" :key="index">
                                <label>
                                    <input type="radio" name="cjradios" :value="item.val" v-model="cjparam" @change.prevent="cjchange">
                                    <span>{{item.title}}</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div> -->

                <!-- <div class="infoline" v-if="cjparam==3">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>详细资料</label>
                    </div>
                    <div class="lineright">
                        <ul class="xxzl">
                            <li v-for="(item,index) in xxzllist" :key="index">
                                <label>
                                    <input type="radio" name="zlradios" :value="item.val" v-model="zlparam" @change.prevent="zlchange">
                                    <span>{{item.title}}</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div> -->

                <!-- <div class="infoline" v-if="cjparam==3 && zlparam==1">
                    <div class="linetitle">
                        <label>官网网址</label>
                    </div>
                    <div class="lineright">
                        <input class="inputtext" type="text" v-model="gwwz" placeholder="web产品请填写此项">
                    </div>
                </div> -->

                <!-- <div class="infoline" v-if="cjparam==3 && zlparam==1">
                    <div class="linetitle">
                        <label>APP链接</label>
                    </div>
                    <div class="lineright">
                        <input class="inputtext" type="text" v-model="applj" placeholder="APP产品请填写此项">
                    </div>
                </div> -->

                <!-- <div class="infoline" v-if="cjparam==3 && zlparam==2">
                    <div class="linetitle">
                        <label>&nbsp;</label>
                    </div>
                    <div class="lineright">
                        <l-file :data="wsxfile" @on-change="wsxchange"></l-file>
                        <p class="filetitle">* 支持jpg,png,gif,jpeg格式图片，每张图片不得大于2M</p>
                    </div>
                </div> -->


                <!-- <div class="infoline" v-if="cjparam==4">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>证明文件</label>
                    </div>
                    <div class="lineright">
                        <span class="mbdownload" @click.prevent="wtsdownload">授权委托书模板下载</span>
                        <l-file :data="sqwtfile" @on-change="sqwtchange"></l-file>
                        <p class="filetitle">* 支持jpg,png,gif,jpeg格式图片，每张图片不得大于2M</p>
                    </div>
                </div> -->





                <!-- <div class="infoline">
                    <div class="linetitle">
                        <label>审核提醒</label>
                    </div>
                    <div class="lineright">
                        <div class="shtxtop">
                            <l-switch class="sw" textLeft="关闭" textRight="开启" :checkval="shtx" @on-click="shtxclick"></l-switch>
                        </div>
                        <div class="shtxbottom" v-if="shtx">
                            <span class="subtitle">接收手机号</span>
                            <input type="text" placeholder="请输入接收手机号">
                        </div>
                    </div>
                </div> -->

                <div class="infoline">
                    <div class="linetitle">
                        <label>&nbsp;</label>
                    </div>
                    <div class="lineright">
                        <div class="btnlist">
                            <span class="submit" @click.prevent="subqm">提交签名</span>
                            <span class="confirm" @click.prevent="confirm">返回</span>
                        </div>
                    </div>
                </div>

                <!-- <div class="infoline">
                    <div class="linetitle">
                        <label>签名规范</label>
                    </div>
                    <div class="lineright">
                        <p class="gfline">* 签名内容：公司或品牌名称，字数要求2-20个字符，不能使用空格和特殊符号"- + * & % # @ ~"等，运营商规定发送短信必须带签名</p>
                        <p class="gfline">* 签名审核：签名将由人工审核后方可启用，填写的应用场景可视情况填写，至少填写一个，越详细真实的应用场景，审核通过概率越高</p>
                        <p class="gfline">* 签名符号：无须在签名内容前后添加【】、()、[]，以避免重复</p>
                        <p class="gfline">* 在线发送：发送时选择可用签名，默认前置，可选择后置，自带【】</p>
                        <p class="gfline">* API发送：发送时默认带签名，如果您的短信通道为固定签名，内容中可选择不带签名，具体咨询您的客户经理通道配置属性</p>
                        <p class="gfline">* 签名个数：账号默认启用一个签名，如需更多签名个数，请咨询您的客户经理</p>
                    </div>
                </div> -->


            </div>
        </div>
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js"
import { Selector  } from "vux"
export default {
    name:"addqm",
    components:{Selector,...ConsoleComponents},
    data(){
        return{
            qmtype:[
                    {
                        title:"验证码通知短信",
                        val:1,
                        bol:true
                    },
                    {
                        title:"会员营销短信",
                        val:2,
                        bol:false
                    },
                    {
                        title:"国际短信",
                        val:3,
                        bol:false
                    },
                ],
            qmtext:"",//签名内容的值
            hylist:[//行业选择的选项列表
                {
                    key:1,
                    value:"互联网金融"
                },
                {
                    key:2,
                    value:"网络游戏"
                },
                {
                    key:3,
                    value:"电子商务"
                },
                {
                    key:4,
                    value:"O2O"
                },
                {
                    key:5,
                    value:"互联网工具"
                },
                {
                    key:6,
                    value:"其他互联网服务"
                },
                {
                    key:7,
                    value:"传统行业"
                }
            ],
            hy:"",//行业选择的值
            yycjlist:[//应用场景选择项列表
                {
                    title:"签名为公司",
                    val:1,
                },
                {
                    title:"签名为媒体，报社，学校，医院机关事业单位名称",
                    val:2,
                },
                {
                    title:"签名为自己产品名/网站名/APP名称等",
                    val:3,
                },
                {
                    title:"签名为他人产品名/网站名等",
                    val:4,
                }
            ],
            cjparam:"",//应用场景的值
            xxzllist:[//详细资料选择项列表
                {
                    title:"已上线",
                    val:1,
                },
                {
                    title:"未上线",
                    val:2,
                }
            ],
            zlparam:1,//详细资料的值
            gwwz:"",//官网网址的值
            applj:"",//APP链接的值
            wsxfile:[//未上线的上传框数据
                        {
                            title:"具有版权的商标或logo",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                        {
                            title:"设计图——首页",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                        {
                            title:"设计图——功能一",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                        {
                            title:"设计图——功能二",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                        {
                            title:"设计图——个人中心",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                    ],
            sqwtfile:[
                        {
                            title:"授权委托书",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                        {
                            title:"授权人手持授权书半身照",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                        {
                            title:"授权人身份证正面",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                        {
                            title:"授权人身份证背面",
                            imgshow:false,
                            img:"",
                            filedata:{}
                        },
                    ],
            shtx:true,//审核提醒的值
        }
    },
    methods:{
        qmtypechage(val){//签名类型发生变化的方法(返回的是改变后的data)
            
        },
        cjchange(){//应用场景选择发生变化时的方法
            
        },
        zlchange(){//详细资料选择发生变化时的方法
            
        },
        wsxchange(val){//未上线上传文件change的方法
            
        },
        wtsdownload(){//点击下载授权委托书按钮的方法

        },
        sqwtchange(val){//证明文件上传文件change的方法
            
        },
        shtxclick(){//审核开关的方法
            this.shtx=!this.shtx;
        },
        subqm(){//提交签名按钮的方法
            if(this.qmtext==""){
                this.$vux.toast.text("请输入签名");
                return;
            }
            let textlen=this.qmtext.length;
            if(textlen>21 || textlen<2){
                this.$vux.toast.text("签名需要2~20个字符");
                return;
            }
            this.action({
                moduleName:'addsign',
                url:"addsign",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    sign_content:this.qmtext,
                    type:"3",
                    is_type:"1"
                }
            }).then(res=>{
                if(res.code==200){
                    this.qmtext="";
                    this.$vux.toast.text("添加成功");
                }else{
                    this.$vux.toast.text(res.msg);
                }
            }).catch(err=>{})
        },
        confirm(){//取消按钮的方法
            this.$router.back(-1);
        }
    },
}
</script>
<style lang="less" scoped>
.addqm{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        font-size: 14px;
        .Dxpartbox-content{
            padding: 30px 14px 12px 7px;

            .infoline{
                display: flex;
                margin-bottom: 20px;
                .linetitle{
                    display: inline-block;
                    width:15%;
                    min-width: 100px;
                    text-align: center;
                    color: #666;
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
                    .inputtext{
                        box-sizing: border-box;
                        line-height: 35px;
                        width: 240px;
                        border-bottom: 1px solid #ddd;
                        padding: 0 7px;
                    }
                    .mbdownload{
                        width: 150px;
                        display: block;
                        line-height: 36px;
                        color: #fff;
                        background: @col-ff6600;
                        text-align: center;
                        cursor: pointer;
                        margin-bottom: 30px;
                    }
                    .filetitle{
                        font-size: 14px;
                        color: #666;
                        line-height: 50px;
                    }
                    .selector{
                        width: 240px;
                        line-height: 36px;
                        height: 35px;
                        color: #666;
                        border-bottom: 1px solid #ddd;
                        &/deep/ select{
                            color: #666;
                        }
                        &/deep/ option{
                            color: #666;
                        }
                    }
                    .yycj{
                        li{
                            line-height: 30px;
                            label{
                                position: relative;
                                input{
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                }
                                span{
                                    font-size: 14px;
                                    color: #666;
                                    padding-left: 30px;
                                }
                            }
                        }
                    }
                    .xxzl{
                        li{
                            display: inline-block;
                            margin-right: 30px;
                            label{
                                position: relative;
                                input{
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                }
                                span{
                                    font-size: 14px;
                                    color: #666;
                                    padding-left: 30px;
                                }
                            }
                        }
                    }
                    .shtxtop{
                        margin-bottom: 15px;
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
                    .shtxbottom{
                        margin-bottom:15px;
                        .subtitle{
                            line-height: 36px;
                            font-size: 14px;
                            color: #666;
                            margin-right: 20px;
                        }
                        input{
                            line-height: 34px;
                            box-sizing: border-box;
                            width: 150px;
                            border: 1px solid #ddd;
                            padding: 0 7px;
                            text-align: left;
                        }
                    }
                    .btnlist{
                        margin-bottom: 50px;
                        span{
                            display: inline-block;
                            line-height: 36px;
                            color: #fff;
                            cursor: pointer;
                        }
                        .submit{
                            background: @col-ff6600;
                            padding: 0 50px;
                            margin-right: 20px;
                        }
                        .confirm{
                            background: #a7b5c2;
                            padding: 0 20px;
                        }
                    }
                    .gfline{
                        line-height: 30px;
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
        }
    }
}
</style>
