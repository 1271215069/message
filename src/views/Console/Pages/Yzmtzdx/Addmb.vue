<template>
    <div class="addmb">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                添加模板
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
                <span class="titlebtn" @click.prevent="togl">返回模板管理</span>
            </div>
            <div class="Dxpartbox-content">
                <div class="infoline">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>选择签名</label>
                    </div>
                    <div class="lineright">
                        <selector class="selector" :options="qmlist" v-model="qm" placeholder="请选择签名"></selector>
                        <span class="addqm" @click.prevent="addqm">新建签名</span>
                    </div>
                </div> 
                <div class="infoline">
                    <div class="linetitle">
                        <span class="s">*</span>
                        <label>短信内容</label>
                    </div>
                    <div class="lineright">
                        <!-- <smeditor class="dxcontent" v-model="dxcontent"></smeditor> -->
                        <!-- <vue-editor></vue-editor> -->
                        <textarea class="dxcontent" v-model="dxcontent" placeholder="请输入短信内容，链接前后需加空格"></textarea>
                    </div>
                </div>
                <div class="infoline">
                    <div class="linetitle">
                        <label>备注</label>
                    </div>
                    <div class="lineright">
                        <input class="inputtext" type="text" v-model="bz" placeholder="可选填备注信息，50字以内">
                    </div>
                </div>
                <div class="infoline">
                    <div class="linetitle">
                        <label>&nbsp;</label>
                    </div>
                    <div class="lineright">
                        <div class="btnlist">
                            <span class="savemb" @click.prevent="savemb">保存模板</span>
                            <span class="confirm" @click.prevent="confirm">返回</span>
                        </div>
                    </div>
                </div>
                <div class="infoline">
                    <div class="linetitle">
                        <label>内容规范</label>
                    </div>
                    <div class="lineright">
                        <p class="gzline">* 必须带有<span class="tagging">【签名】</span>，签名内容为：公司或品牌名称，字数要求<span class="tagging">2-16</span>个字符，运营商规定必填。</p>
                        <p class="gzline">* 签名只能选择审核过的签名,内容首尾不能添加<span class="tagging">【】</span></p>
                        <p class="gzline">* 内容合法，不能发送<span class="tagging">发票、移民</span> 等国家法律法规严格禁止的内容。</p>
                        <p class="gzline">* 超链接地址请写在短信内容中，便于核实，部分安卓系统存在超链接识别问题，需在超链接前后添加空格。</p>
                        <p class="gzline">* 变量用<span class="tagging">{s数字}</span>代替，数字代表变量最大长度，视情况填写任意数值。例，亲爱的{s6}先生/女士。则变量位置最多填入六位昵称，超过六位则无法发送。短信发送时根据顺序依次替换为变量内容。</p>
                    </div>
                </div>

                <div class="infoline">
                    <div class="linetitle">
                        <label>计费规则</label>
                    </div>
                    <div class="lineright">
                        <p class="gzline">* 短信字数<span class="tagging"><=70</span>个字，按照<span class="tagging">70个字一条</span>短信计算。中文英文符号统一计算为一个字符。</p>
                        <p class="gzline">* 短信字数<span class="tagging">>70</span>个字，占用3个字符作为分条字符，按照<span class="tagging">67个字</span>记为一条短信计算，多条短信可能在部分手机系统上呈现为一条短信的形态，测试时请注意。</p>
                    </div>
                </div>

                <div class="infoline">
                    <div class="linetitle">
                        <label>审核规则</label>
                    </div>
                    <div class="lineright">
                        <p class="gzline">* 签名跟模板报备的情况下，短信发送将直接提交给网关。</p>
                        <p class="gzline">* 如果出现批量短信发送<span class="tagging">驳回</span>的情况，可能为“<span class="tagging">敏感词拦截</span>”进入人工审核，请联系客服。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Selector  } from "vux";
import SMEditor from 'smeditor';
import { setTimeout } from 'timers';
// import vueEditor from 'vue-editor';
export default {
    name:"addmb",
    components:{'smeditor': SMEditor,Selector},
    data(){
        return{
            qmlist:[
                // {
                //     key:1,
                //     value:"云通讯"
                // },
                // {
                //     key:2,
                //     value:"签名测试"
                // },
            ],
            qm:"",
            dxcontent:"",
            bz:""
        }
    },
    methods:{
        togl(){//返回模板管理按钮的方法
            this.$router.push("/Mbgl");
        },
        addqm(){//点击新建签名按钮的方法
            this.$router.push("/Addqm");
        },
        savemb(){//保存模板按钮的方法
            if(this.qm==""){
                this.$vux.toast.text("请选择签名");
                return;
            }
            if(this.dxcontent==""){
                this.$vux.toast.text("请输入短信内容");
                return;
            }
            if(this.dxcontent.length>70){
                this.$vux.toast.text("短信内容不能大于70个字");
                return;
            }
            // if(this.bz==""){
            //     this.$vux.toast.text("请输入备注内容");
            //     return;
            // }
            this.action({
                moduleName:'add_templet',
                url:"add_templet",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token},
                isFormData:true,
                data:{
                    sms_sign:this.qm,
                    sms_content:this.dxcontent,
                    remark:this.bz,
                    type:"1",
                }
            }).then(res=>{
                if(res.code==20000){
                    this.$vux.toast.text("保存模板成功");
                    setTimeout(()=>{
                        this.$router.push("/Mbgl")
                    },2000)
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        confirm(){//返回按钮的方法
            this.$router.back(-1);
        },
        getqmlist(){//获取已审核签名列表
            this.action({
                moduleName:'sign',
                url:"sign",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token},
                isFormData:true,
                data:{
                    type:"1",
                }
            }).then(res=>{
                if(res.code==20000){
                    if(res.data.length<1){
                        this.$vux.toast.text("您目前没有通过审核的签名")
                    }else{
                        for(let i=0;i<res.data.length;i++){
                            let qmobj={};
                            qmobj.key=res.data[i].id;
                            qmobj.value=res.data[i].sign_content;
                            this.qmlist.push(qmobj);
                        }
                    }
                    
                }else{
                    this.$vux.toast.text(res.msg);
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.getqmlist();
    }
}
</script>
<style lang="less" scoped>
.addmb{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        font-size: 14px;
        .Dxpartbox-content{
            // margin-top: 30px;
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
                }
                .s{
                    color:#ff2b2b;
                }
                label{
                    line-height: 36px;
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
                    .addqm{
                        display: inline-block;
                        line-height: 36px;
                        background: @col-ff6600;
                        color: #fff;
                        padding: 0 30px;
                        margin-top: 20px;
                        cursor: pointer;
                    }
                    .dxcontent{
                        margin-top: 10px;
                        resize: none;
                        box-sizing: border-box;
                        width: 70%;
                        height: 200px;
                        border: 1px solid #ddd;
                        padding: 7px;
                        line-height: 22px;
                    }
                    .btnlist{
                        margin-top: 20px;
                        margin-bottom: 30px;
                        .savemb{
                            display: inline-block;
                            line-height: 36px;
                            background: @col-ff6600;
                            color: #fff;
                            padding: 0 30px;
                            cursor: pointer;
                            margin-right: 20px;
                        }
                        .confirm{
                            display: inline-block;
                            line-height: 36px;
                            color: #fff;
                            cursor: pointer;
                            padding: 0 10px;
                            background: #c5ced7;
                        }
                    }
                    .gzline{
                        line-height: 30px;
                        font-size: 14px;
                        color: #666;
                        .tagging{
                            color: @col-ff6600;
                        }
                    }
                }
            }
            
        }
    }
}
</style>
