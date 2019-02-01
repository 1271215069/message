<template>
    <div class="service">
        <div class="detail-banner" :style="{backgroundImage:`url('${smsdg.banner}')`}">
            
        </div>
        <div class="detail-item detail-youshi">
            <div class="item-tit">
                <h3>产品优势</h3>
                <p class="desc">三网合一的专属通道,大容量、高并发，通道状态实时监控</p>
            </div>
            <div class="item-cont container">
                <ul class="list">
                    
                    <li v-for="(item,index) in smsdg.datalist" :key="index">
                        <span class="icon iconfont" v-html="item.icon"></span>
                        <span class="name">{{item.title}}</span>
                        <span class="desc">{{item.content}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="detail-item detail-cj">
            <div class="item-tit">
                <h3>应用场景</h3>
                <p class="desc">以用户需求为导向，提供安全、稳定、快速的产品和服务</p>
            </div>
            <div class="item-cont container">
                <div class="fl">
                    <div class="item fitem active" id="fl1" @mouseover="omouseover('fl1',0)" >
                        <span class="icon iconfont">&#xe6e8;</span>
                        <p class="info">
                            <span class="name">快速注册</span>
                            <span class="text">用户注册验证身份,杜绝恶意注册,确保时效性</span>
                        </p>
                    </div>
                    <div class="item fitem" id="fl2" @mouseover="omouseover('fl2',2)" >
                        <span class="icon iconfont">&#xe672;</span>
                        <p class="info">
                            <span class="name">支付确认</span>
                            <span class="text">用户注册验证身份,杜绝恶意注册,确保时效性</span>
                        </p>
                    </div>
                </div>
                <div class="priview" :style="{backgroundImage:`url('${phonebj}')`}">
                   
                    <div class="mms">
                        <span class="arrow" :style="{backgroundImage:`url('${arrowbj}')`}"></span>
                        <div class="txt">
                            {{smstext}}
                        </div>
                    </div>
                </div>
                <div class="fr">
                    <div class="item fitem" id="fr1" @mouseover="omouseover('fr1',1)" >
                        <span class="icon iconfont">&#xe676;</span>
                        <p class="info">
                            <span class="name">安全登录</span>
                            <span class="text">用户注册验证身份,杜绝恶意注册,确保时效性</span>
                        </p>
                    </div>
                    <div class="item fitem" id="fr2" @mouseover="omouseover('fr2',3)" >
                        <span class="icon iconfont">&#xe848;</span>
                        <p class="info">
                            <span class="name">信息修改</span>
                            <span class="text">用户注册验证身份,杜绝恶意注册,确保时效性</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-item detail-lc">
            <div class="item-tit">
                <h3>接入流程</h3>
                <p class="desc">简单，美好，高效</p>
            </div>
            <div class="item-cont container">
                <ul class="lclist">
                    <li>
                        <span class="num n1" :style="{backgroundImage:`url('${n1bj}')`}"></span>
                        <span class="text">注册账号</span>
                    </li>
                    <li>
                        <span class="num n2" :style="{backgroundImage:`url('${n2bj}')`}"></span>
                        <span class="text">账户认证</span>
                    </li>
                    <li>
                        <span class="num n3" :style="{backgroundImage:`url('${n3bj}')`}"></span>
                        <span class="text">接口调试</span>
                    </li>
                    <li>
                        <span class="num n4" :style="{backgroundImage:`url('${n4bj}')`}"></span>
                        <span class="text">上线使用</span>
                    </li>
                </ul>
                <div class="go" @click="go">立即体验 >></div>
                <div class="fivepx"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"service",
    data(){
        return{
            phonebj:require('@/assets/img/dxbj/phone_bg.png'),
            arrowbj:require('@/assets/img/dxbj/sms-arrow.jpg'),
            n1bj:require('@/assets/img/dxbj/icon_n1.png'),
            n2bj:require('@/assets/img/dxbj/icon_n2.png'),
            n3bj:require('@/assets/img/dxbj/icon_n3.png'),
            n4bj:require('@/assets/img/dxbj/icon_n4.png'),
            smsdg:{},
            yzmdxadg:{
                banner:require('@/assets/img/dxbj/banner1.png'),
                title:"",
                datalist:[
                    {
                        icon:"&#xe671;",
                        title:"一键接入",
                        content:"7*24h客服，5-8秒响应，团队作业，快速应对各种难题",
                    },
                    {
                        icon:"&#xe670;",
                        title:"三网合一",
                        content:"支持各种开发环境的API接口，快速集成，一次接入永久稳定，免除重复开发之劳",
                    },
                    {
                        icon:"&#xec36;",
                        title:"5秒必达",
                        content:"数十条运营商直连短信通道，服务器集群部署",
                    },
                ]
            },
            hydxadg:{
                banner:require('@/assets/img/dxbj/banner2.png'),
                title:"",
                datalist:[
                    {
                        icon:"&#xe679;",
                        title:"稳定极速",
                        content:"106优质通道，发送渠道稳定独享，分布式服务器架构，毫秒响应",
                    },
                    {
                        icon:"&#xe6d8;",
                        title:"高到达率",
                        content:"运营商106直连通道，高并发、无遗漏、无高峰延迟",
                    },
                    {
                        icon:"&#xe67a;",
                        title:"海量并发",
                        content:"持每次提交10万个手机号，支持Txt、Excel等多种格式的压缩文件，批量快速发送",
                    },
                ]
            },
            yxdxdg:{
                banner:require('@/assets/img/dxbj/banner3.png'),
                title:"",
                datalist:[
                    {
                        icon:"&#xe67b;",
                        title:"助力企业降本提效",
                        content:"10万线并发支持，满足超规模业务量使用需求，持续稳定、零堵塞",
                    },
                    {
                        icon:"&#xeb3c;",
                        title:"创造更大商业价值",
                        content:"多种超值套餐按需选择，高品质、低投入,及时反馈状态报告，明细清晰可查",
                    },
                ]
            },
            smstext:"【易网互联】验证码442951，您正在注册成为易网互联服务用户，感谢您的支持！",
            smslist:[
                "【易网互联】验证码442951，您正在注册成为易网互联服务用户，感谢您的支持！",
                "【易网互联】您本次手机验证码登录的验证码是：287580，请在10分钟内使用该验证码完成校验，如有疑问请咨询在线客服，谢谢！",
                "【易网互联】您好，您在易网互联的订单206****99已经支付成功！我们将会按照订单顺序陆续发货，请耐心等待。",
                "【易网互联】验证码6686，用于更改密码，5分钟内有效。验证码提供给他人可能导致账号被盗，请勿泄露，谨防被骗。"
            ],
        }
    },
    computed:{
        smstype(){
            return this.$route.query.type;
        },
 
    },
    watch:{
        smstype(){
            switch(this.$route.query.type){
                case "1":
                    this.smsdg=this.yzmdxadg;
                    break;
                case "2":
                    this.smsdg=this.hydxadg;
                    break;
                case "3":
                    this.smsdg=this.yxdxdg;
                    break;
                default:
                    break;
            }
        }
    },
    methods:{
        omouseover(elname,num){
            let eldom=document.getElementById(elname);
            let domlist=document.getElementsByClassName("fitem");
            for(let i=0;i<domlist.length;i++){
                domlist[i].classList.remove("active");
            }            
            eldom.classList.add("active");
            this.smstext=this.smslist[num];
        },
        go(){
            window.open('http://admin.ywhl106.com')
            // this.$router.push("/Uinfo")
        }
    },
    mounted(){
        switch(this.$route.query.type){
                case "1":
                    this.smsdg=this.yzmdxadg;
                    break;
                case "2":
                    this.smsdg=this.hydxadg;
                    break;
                case "3":
                    this.smsdg=this.yxdxdg;
                    break;
                default:
                    break;
            }
        console.log(this.smstype)
    }
}
</script>
<style lang="less" scoped>
.service{
    color: #666;
    .detail-banner{
        width: 100%;
        height: 460px;
        background-repeat:no-repeat;
        background-position: center;
        background-size:auto;
    }
    
    .detail-item{
        
        .item-tit{
            padding-top: 80px;
            padding-bottom: 50px;
            text-align: center;
            h3{
                font-weight: lighter;
                font-size: 24px;
                line-height: 28px;
                margin: 0 0 5px;
                padding-bottom: 10px;
            }
            .desc{
                font-size: 12px;
            }
        }
        .item-cont{
            width: 1200px;
            margin: 0 auto;
            .list{
                display: flex;
                justify-content: space-around;
                li{
                    width: 400px;
                    text-align: center;
                    .icon{
                        display: block;
                        width: 94px;
                        height: 94px;
                        margin: 0 auto 40px;
                        border-radius: 50%;
                        background: rgba(85, 131, 207, 0.3);
                        color: @themeColor;
                        font-size: 50px;
                        line-height: 94px;
                    }
                    .name{
                        font-size: 18px;
                        display: block;
                        text-align: center;
                        line-height: 30px;
                        color: #555;
                        margin-bottom: 25px;
                    }
                    .desc{
                        box-sizing: border-box;
                        width: 100%;
                        padding: 0 50px;
                        text-align: center;
                        display: block;
                        color: #787878;
                        font-size: 14px;
                    }
                }
            }
        }
        
    }
    .detail-youshi {
        padding-bottom: 80px;
        background: #fff;
    }
    .detail-cj{
        background: #f5f5f5;
        &/deep/ .priview{
            float: left;
             box-sizing: border-box;
            width: 246px;
            height: 456px;
            margin-left: 83px;
            padding: 130px 20px 20px;
            
            background-repeat: no-repeat;
            .mms{
                box-sizing: border-box;
                padding: 10px 13px;
                position: relative;
                width: 100%;
               
                .arrow {
                    display: block;
                    width: 13px;
                    height: 13px;
                    background-repeat: no-repeat;
                    position: absolute;
                    left: 0;
                    bottom: 10px;
                }
                .txt{
                     box-sizing: border-box;
                    width: 100%;
                    position: relative;
                    margin: 0 auto;
                    line-height: 20px;
                    background: #ebebeb;
                    padding: 10px;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    font-size: 12px;
                }
            }
        }
        &/deep/ .item-cont{
            width: 1100px;
            padding-bottom: 70px;
            overflow: hidden;
            .fl,.fr{
                box-sizing: border-box;
                padding: 15px;
                
                .item{
                    width: 310px;
                    height: 120px;
                    margin-top: 50px;
                    border-radius: 5px;
                    transition: all .3s ease 0s;
                    position: relative;
                    .icon{
                        display: block;
                        width: 110px;
                        height: 120px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        line-height: 120px;
                        text-align: center;
                        font-size: 60px;
                        color: @themeColor;
                    }
                    .info{
                        width: 100%;
                        box-sizing: border-box;
                        padding-left: 110px;
                        padding-top: 15px;
                        padding-right: 30px;
                        .name{
                            display: block;
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            font-size: 18px;
                            margin-bottom: 3px;
                        }
                        .text{
                            color: #777;
                            line-height: 1.5em;
                            font-size: 14px;
                        }
                    }
                }
                .item:hover{
                    background: #fff;
                    box-shadow: 0 0 15px 0 #ddd;
                }
                .active{
                    background: #fff;
                    box-shadow: 0 0 15px 0 #ddd;
                }
            }
            .fl{
                float: left;
            }
            .fr{
                float: right;
            }
        }
    }
    .detail-lc{
        background: #fff;
        .item-cont{
            ul{
                width: 100%;
                height: 90px;
                overflow: hidden;
                text-align: center;
                margin-bottom: 50px;
                li{
                    display: inline-block;
                    text-align: left;
                    width: 195px;
                    margin-right: 50px;
                    line-height: 90px;
                    
                    
                    .num{
                        box-sizing: border-box;
                        display: block;
                        float: left;
                        width: 90px;
                        height: 90px;
                        border: 1px dashed  @themeColor;
                        border-radius: 50%;
                        background-repeat: no-repeat;
                        background-position: center center;
                    }
                    .text{
                        font-size: 18px;
                        color: #666;
                        margin-left: 28px;
                    }
                }
            }
            .go{
                margin: 0 auto;
                text-align: center;
                line-height: 40px;
                color: @themeColor;
                cursor: pointer;
            }
            .fivepx{
                width: 100%;
                height: 50px;
            }
        }
    }
}
</style>
