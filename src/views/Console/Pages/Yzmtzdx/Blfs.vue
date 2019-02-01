<template>
    <div class="sxfs">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                变量发送
                <!-- <div class="notes"></div>
                <div class="notestext">验证码</div> -->
            </div>
            <div class="Dxpartbox-content">
                <ul class="Dxpartbox-tab">
                    <li ref="tabitem" v-for="(item,index) in tablist" :key="index" @click.prevent="tabclick(index,item)">{{item.title}}</li>
                </ul>

                <div class="dxfs">
                    <div class="left">
                        <ul>
                            <li>
                                <div class="linetitle">
                                    <span class="s">*</span>
                                    <label>选择签名</label>
                                </div>
                                <div class="lineright">
                                    <selector v-model="graph" class="qmselect" @on-change="choseqm" :options="graphlist"></selector> 
                                    <span class="qmbtn addqm" @click.prevent="addqm">新建签名</span>
                                    <span class="qmbtn qmactive" ref="qz" @click.prevent="qzbtn">前置</span>
                                    <span class="qmbtn" ref="hz" @click.prevent="hzbtn">后置</span>
                                </div>
                            </li>




                            <li class="infoline" v-if="tabval=='1'">
                                <div class="linetitle">
                                    <span class="s">*</span>
                                    <label>变量内容</label>
                                </div>
                                <div class="lineright">
                                    <span class="hmcbtn" @click.prevent="drbl"><span class="iconfont">&#xe656;</span> 导入变量内容</span>
                                    <span class="hmnum" @click.prevent="showmbc" v-if="airforce.Bllist.show">号码数量（{{blnum}}）</span>
                                </div>
                            </li>
                            <!-- <li class="infoline" v-if="tabval=='2'">
                                <div class="linetitle">
                                    <span class="s">*</span>
                                    <label>变量内容</label>
                                </div>
                                <div class="lineright">
                                    <span class="hmcbtn" @click.prevent="drdwj">导入大文件</span>
                                </div>
                            </li> -->





                            <li>
                                <div class="linetitle">
                                    <span class="s">*</span>
                                    <label>选择模板</label>
                                </div>
                                <div class="lineright">
                                    <span class="mbbtn" @click.prevent="xzmb">选择模板</span>
                                </div>
                            </li>
                            <li>
                                <div class="linetitle">
                                    <span class="s">*</span>
                                    <label>短信内容</label>
                                </div>
                                <div class="lineright">
                                    <span ref="dxnrqm" class="dxnr-qm dxnr-qz">【{{qmshowtext}}】</span>
                                    <div class="hfselect">
                                        <input type="checkbox" v-model="hfselect.hfbol" @change="hfchange">
                                        <selector class="selector lxkselect" :readonly="hfselect.readonly" @on-change="getdxlen" v-model="hfselect.hftext" :options="hfselect.option"></selector>
                                    </div>
                                    <textarea ref="dxnr" v-model="nrtext" @input="contentchange" class="dxnr" placeholder="请输入短信内容，链接网址须用空格结尾"></textarea>
                                    <p class="dxnrfoot">
                                        <span class="btn" @click.prevent="cclj">插入超链接</span>
                                        <span class="btn" @click.prevent="zhlj">短链接转换</span>
                                        <span class="text">总计 {{textlen}} 字, {{textlen}} / 70字</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div class="linetitle">
                                    <label>定时发送</label>
                                </div>
                                <div class="lineright">
                                    <div class="dsfs">
                                        <label class="subtitle"><input @change="dsfs" type="checkbox" v-model="ds">定时发送</label>
                                        <timeinput v-if="ds" :showtime="true" class="dsfstime" :timetext="fandata" @closeMain="gettime" placeholder="请选择日期"></timeinput>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="linetitle"></div>
                                <div class="lineright">
                                    <span v-if="!ds" class="subbtn fbbtn" @click.prevent="release">发布</span>
                                    <span v-else class="subbtn bcbtn" @click.prevent="save">保存</span>
                                </div>
                            </li>
                            <li>
                                <div class="linetitle">
                                    <label>内容规范</label>
                                </div>
                                <div class="lineright">
                                    <p>* 必须带有【签名】，签名内容为：公司或品牌名称，字数要求2-16个字符，运营商规定必填。</p>
                                    <p>* 签名只能选择审核过的签名,内容首尾不能添加【】</p>
                                    <p>* 内容合法，不能发送房产、发票、移民等国家法律法规严格禁止的内容。</p>
                                    <p>* 超链接地址请写在短信内容中，便于核实，部分安卓系统存在超链接识别问题，需在超链接前后添加空格。</p>
                                    <p>* 变量均用{s}代替，短信发送时根据顺序依次替换为变量内容。</p>
                                </div>
                            </li>
                            <li>
                                <div class="linetitle">
                                    <label>计费规则</label>
                                </div>
                                <div class="lineright">
                                    <p>* 短信字数<=70个字，按照70个字一条短信计算。中文英文符号统一计算为一个字符。</p>
                                    <p>* 短信字数>70个字，占用3个字符作为分条字符，按照67个字记为一条短信计算，多条短信可能在部分手机系统上呈现为一条短信的形态，测试时请注意。</p>
                                </div>
                            </li>
                            <li>
                                <div class="linetitle">
                                    <label>审核规则</label>
                                </div>
                                <div class="lineright">
                                    <p>* 签名跟模板报备的情况下，短信发送将直接提交给网关。</p>
                                    <p>* 如果出现批量短信发送驳回的情况，可能为“敏感词拦截”进入人工审核，请联系客服。</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <div class="ws-show">
                            <div class="sms" :style="{backgroundImage:`url('${phonebj}')`}">
                                <div class="smscontainer">
                                    <ul>
                                        <li>
                                            {{imgtext}}
                                            <span class="imgicon"></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
    <!-- <x-input @on-change="airforce.input($event,'test','Dxfs')"></x-input> -->
    </div>
</template>
<script>
import ConsoleComponents  from "../../components/index.js"
import { XInput,Selector  } from "vux"
export default {
    name:"sxfs",
    components:{ XInput,Selector,...ConsoleComponents },
    data(){
        return{
            phonebj: require('@/assets/img/dxbj/iphone.png'),
            tablist:[//tab页的数据
                {
                    title:"变量发送",
                    val:"1"
                },
                // {
                //     title:"大文件发送",
                //     val:"2"
                // }
            ],
            tabval:"1",//判断tab页的值
            graphlist:[
               // "阿斯顿维拉","应具备工号","库引天然","们好办法"
            ],//签名selsect的下拉数据
            graph:"",//签名的值
            qmshowtext:"--请选择签名--",
            nrtext:"",//短信内容
            textlen:0,//短信内容字数长度
            ds:false,//定时发送的选择值
            dstime:"",//定时发送的时间
            qmposition:1,//签名前置或后置的值
            imgtext:"",//右侧演示短信内容
            sendswitch:true,
            fandata:"",//显示当前的时间作为定时时间
            qmlen:2,//为方便签名长度计数的字段
            hfselect:{//选择select回复的参数值
                hfbol:false,
                hftext:"回T退订",
                readonly:true,
                option:[
                    'TD退订',
                    '回T退订',
                    '回N退订',
                    '退订T',
                    '退订回T',
                    '退订回D',
                    '退订回N',
                    '退订回TD',
                    '退订回复T',
                    '退订回复D',
                    '退订回复N',
                    '退订回复TD',
                ]
             },
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
        drdwj(){//导入大文件的方法
             this.$ZAlert.show({
                    components:"Console/Pages/alert/DxfsDrdwj",
                    width:"550px",
                    title:"导入大文件"
                })
        },
        drbl(){//导入变量内容的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/DxfsDrbl",
                    width:"550px",
                    title:"导入变量",
                    props:{
                        that:()=>this,
                    },
                })
        },
        showmbc(){//点击变量数量显示变量池的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Bllb",
                    width:"1000px",
                    title:"变量列表",
                    props:{
                        that:()=>this,
                    },
                });
        },
        getdxcontent(){//获取右侧演示短信内的内容
            switch(this.qmposition){
                case 1:
                    if(this.hfselect.hfbol){
                        this.imgtext="【"+this.qmshowtext+"】 "+this.nrtext+" "+this.hfselect.hftext;
                    }else{
                        this.imgtext="【"+this.qmshowtext+"】 "+this.nrtext;
                    }
                    break;
                case 2:
                    if(this.hfselect.hfbol){
                        this.imgtext=this.nrtext+" "+this.hfselect.hftext+" 【"+this.qmshowtext+"】";
                    }else{
                        this.imgtext=this.nrtext+" 【"+this.qmshowtext+"】";
                    }
                    break;
                default:
                    break;
            }
        },
        choseqm(val){//签名select变化触发的方法
            for(let i=0;i<this.graphlist.length;i++){
                if(val==this.graphlist[i].key){
                    this.qmshowtext=this.graphlist[i].value;
                }
            }
            this.getdxlen();
            this.getdxcontent();
        },
        addqm(){//新建签名的按钮方法
            this.$router.push("/Addqm");
        },
        qzbtn(){//前置按钮的方法
            this.qmposition=1;
            this.$refs.hz.classList.remove("qmactive");
            this.$refs.qz.classList.add("qmactive");

            this.$refs.dxnrqm.classList.remove("dxnr-hz");
            this.$refs.dxnrqm.classList.add("dxnr-qz");
            this.$refs.dxnr.setAttribute("style","text-indent:123px");
            this.getdxcontent();   
        },
        hzbtn(){//后置按钮的方法
            this.qmposition=2;
            this.$refs.qz.classList.remove("qmactive");
            this.$refs.hz.classList.add("qmactive")

            this.$refs.dxnrqm.classList.remove("dxnr-qz");
            this.$refs.dxnrqm.classList.add("dxnr-hz");
            this.$refs.dxnr.setAttribute("style","text-indent:0px");
            this.getdxcontent();   
        },
        xzmb(){//选择模板按钮的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/DxtzMbk",
                    width:"900px",
                    title:"短信通知模板库",
                    _event:{
                        mbclick:(e)=>{//转换链接窗口点击确定的方法
                            this.nrtext=e.content;
                        },
                    },
                    props:{
                        that:()=>this,
                    },
                })
        },
        hfchange(){//选择是否回复的方法
            if(this.hfselect.hfbol){
                this.hfselect.readonly=false;
            }else{
                this.hfselect.readonly=true;
            }
            this.getdxlen();
            this.getdxcontent();
        },
        cclj(){//插入超链接按钮的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/DxfsCrlj",
                    width:"550px",
                    title:"插入超链接",
                    _event:{
                        ljclick:(e)=>{//转换链接窗口点击确定的方法
                            this.nrtext=this.nrtext+" "+e+" ";
                        },
                    },
                    props:{
                        that:()=>this,
                    },
                })
        },
        zhlj(){//短链接转换按钮的方法
            this.$ZAlert.show({
                    components:"Console/Pages/alert/DxfsZhlj",
                    width:"550px",
                    title:"短链接转换",
                    _event:{
                        ljclick:(e)=>{//转换链接窗口点击确定的方法
                            this.nrtext=this.nrtext+" "+e+" ";
                        },
                    },
                    props:{
                        that:()=>this,
                    },
                })
        },
        getdxlen(){//获取短信内容字数的方法
            let hfnum;
            if(this.hfselect.hfbol){
                hfnum=this.hfselect.hftext.length;
            }else{
                hfnum=0;
            }
            if(this.qmshowtext=="--请选择签名--"){
                this.textlen=this.nrtext.length+hfnum;
            }else{
                this.textlen=this.nrtext.length+this.qmlen+hfnum; 
            }
            this.getdxcontent();
            
        },
        contentchange(){//监听textarea的方法
            this.getdxlen();
            this.getdxcontent();   
        },
        dsfs(){//点击定时发送的方法
            if(this.ds){
                var myDate = new Date();
                let year=myDate.getFullYear();//获取完整的年份(4位,1970-????)
                let mouth=myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
                let day=myDate.getDate();
                let hour=myDate.getHours();
                let mintes=myDate.getMinutes();
                let seconds=myDate.getSeconds();
                if(mouth<10){
                    mouth="0"+mouth;
                }else{
                    mouth=mouth.toString();
                }
                if(day<10){
                    day="0"+day;
                }else{
                    day=day.toString();
                }
                if(hour<10){
                    hour="0"+hour;
                }else{
                    hour=hour.toString();
                }
                if(mintes<10){
                    mintes="0"+mintes;
                }else{
                    mintes=mintes.toString();
                }
                if(seconds<10){
                    seconds="0"+seconds;
                }else{
                    seconds=seconds.toString();
                }
                this.fandata=year+"-"+mouth+"-"+day+" "+hour+":"+mintes+":"+seconds;
                this.dstime=this.fandata;
            }
        },
        gettime(e){//获取日期时间的方法
            this.dstime=e;
        },
        release(){//发布按钮的方法
            this.senddx();
        },
        save(){//保存按钮的方法
            this.senddx();
        },
        // encode(input){
        //     let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; 
        //     var output = ""; 
        //     var chr1, chr2, chr3, enc1, enc2, enc3, enc4; 
        //     var i = 0; 
        //     input = this.UTFencode(input); 
        //     while (i < input.length) { 
        //         chr1 = input.charCodeAt(i++); 
        //         chr2 = input.charCodeAt(i++); 
        //         chr3 = input.charCodeAt(i++); 
        //         enc1 = chr1 >> 2; 
        //         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); 
        //         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); 
        //         enc4 = chr3 & 63; 
        //         if (isNaN(chr2)) { 
        //             enc3 = enc4 = 64; 
        //         } else if (isNaN(chr3)) { 
        //             enc4 = 64; 
        //         } 
        //         output = output + 
        //         _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + 
        //         _keyStr.charAt(enc3) + _keyStr.charAt(enc4); 
        //     } 
        //     return output; 
        // },
        // UTFencode(string){
        //     string = string.replace(/\r\n/g,"\n"); 
        //     var utftext = ""; 
        //     for (var n = 0; n < string.length; n++) { 
        //         var c = string.charCodeAt(n); 
        //         if (c < 128) { 
        //             utftext += String.fromCharCode(c); 
        //         } else if((c > 127) && (c < 2048)) { 
        //             utftext += String.fromCharCode((c >> 6) | 192); 
        //             utftext += String.fromCharCode((c & 63) | 128); 
        //         } else { 
        //             utftext += String.fromCharCode((c >> 12) | 224); 
        //             utftext += String.fromCharCode(((c >> 6) & 63) | 128); 
        //             utftext += String.fromCharCode((c & 63) | 128); 
        //         } 
        
        //     } 
        //     return utftext; 
        // },
         htmlEncode(str) {
            str = str.replace(/s+/ig, '');
            str = str.replace(/&/g, '');
            str = str.replace(/</g, '');
            str = str.replace(/>/g, '');
            str = str.replace(/(?:t| |v|r)*n/g, '<br />');
            str = str.replace(/t/g, '    ');
            str = str.replace(/x22/g, '"');
            str = str.replace(/x27/g, "'");
            str = str.replace(/"/g, "");
            return str;
        },
        senddx(){//发送的方法
            let is_timing;//是否定时的字段
            let dxcontent;
            let fintelist="";
            if(this.graph==""){
                this.$vux.toast.text("请选择签名");
                return;
            }
            if(this.blnum<1){
                this.$vux.toast.text("变量列表不能为空");
                return;
            }
            if(this.nrtext==""){
                this.$vux.toast.text("短信内容不能为空");
                return;
            }
            if(this.nrtext.length>70){
                this.$vux.toast.text("短信内容不能大于70个字");
                return;
            }
            if(this.ds){
                is_timing="2";
                if(this.dstime==" "){
                    this.$vux.toast.text("请选择定时时间");
                    return;
                }
            }else{
                is_timing="1";
            }
            if(this.qmposition=1){
                dxcontent="【"+this.qmshowtext+"】 "+this.nrtext;
            }else if(this.qmposition=2){
                dxcontent=this.nrtext+" 【"+this.qmshowtext+"】";
            }
            
            // for(let i=0;i<this.airforce.Bllist.data.length;i++){
            //     if(i==0){
            //         fintelist+=JSON.stringify(this.airforce.Bllist.data[i]);
            //     }else{
            //         fintelist+=","+JSON.stringify(this.airforce.Bllist.data[i]);
            //     }
                
            // }
            
            //fintelist=this.encode(fintelist)
            
            fintelist=JSON.stringify(this.airforce.Bllist.data);
            // fintelist=this.htmlEncode(fintelist);
            this.$vuz.loading.show();
            if(this.sendswitch){//设置短信开关
                this.sendswitch=false;
            }else{
                return;
            }
            this.action({
                moduleName:'variableSms',
                url:"variableSms",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                //isFormData:true,
                data:{
                    phone:fintelist,
                    sms_content:dxcontent,
                    is_timing:is_timing,
                    regular_time:this.dstime,
                    type:"1",
                }
            }).then(res=>{
                this.$vuz.loading.hide();
                if(res.code==20000){
                    this.$vux.toast.text("发送成功");
                     this.sendswitch=true;
                }else{
                    this.sendswitch=true;
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{
                this.$vuz.loading.hide();
            })
        },
        getqmlist(){//获取签名列表的方法
            this.action({
                moduleName:'sign',
                url:"sign",
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                isFormData:true,
                data:{
                    type:"1",
                }
            }).then(res=>{
                if(res.code==20000){
                    for(let i=0;i<res.data.length;i++){
                        let qmobj={};
                        qmobj.key=res.data[i].id;
                        qmobj.value=res.data[i].sign_content;
                        this.graphlist.push(qmobj);
                    }
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }

    },
    computed:{
        blnum(){
            if(this.airforce.Bllist.data){
                return this.airforce.Bllist.data.length;
            }else{
                return 0;
            }
        }
    },
    mounted(){
        this.$refs.tabitem[0].classList.add("tabactive");
        this.getdxcontent();   
        this.getqmlist();
        // this.$ZAlert.show({
        //         components:"Console/Pages/alert/Verification",
        //         title:"温馨提示",
        //         // props:{
        //         //     checked:this.checked,
        //         //     vm:()=>this
        //         // }
        //     });
        // this.$ZAlert.show({
        //     components:"Console/Pages/alert/Verification",
        //     title:"dsfsfs",
        //     props:{
        //         a:1545,
        //         vm:()=>this
        //     }
        // })
        
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.sxfs{
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
            .dxfs{
                font-size: 14px;
                color: #666;
                overflow: hidden;
                .left{
                    width: 65%;
                    min-width: 625px;
                    float: left;
                    ul{
                        padding: 20px 0;
                        li,.infoline{
                            display: flex;
                            margin-bottom: 30px;
                            .linetitle{
                                display: inline-block;
                                position: relative;
                                width:15%;
                                min-width: 100px;
                                text-align: center;
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
                                position: relative;
                                .hmcbtn{
                                    display: inline-block;
                                    background: @col-ff6600;
                                    color: #fff;
                                    line-height: 36px;
                                    width: 150px;
                                    text-align: center;
                                    margin-right: 5px;
                                    cursor: pointer;
                                    .iconfont{
                                        margin-right: 5px;
                                    }
                                }
                                .qmselect{
                                    width: 160px;
                                    display: inline-block;
                                    box-sizing: border-box;
                                    line-height: 34px;
                                    border-bottom: 1px solid #dbdbdb;
                                    &/deep/ .weui-select{
                                        height: 35px;
                                        line-height: 35px
                                    }
                                }
                                .qmbtn{
                                    display: inline-block;
                                    line-height: 36px;
                                    box-sizing: border-box;
                                    border: 1px solid #DBDBDB;
                                    padding: 0 10px;
                                    margin-left: 5px;
                                    cursor: pointer;
                                }
                                .addqm{
                                    background: @col-ff6600;
                                    color: #fff;
                                    border: none;
                                    padding: 0 20px;
                                }
                                .qmactive{
                                    background: @col-ff6600;
                                    color: #fff;
                                    border: none;
                                }
                                .mbbtn{
                                    display: inline-block;
                                    line-height: 36px;
                                    box-sizing: border-box;
                                    background: @col-ff6600;
                                    color: #fff;
                                    width: 150px;
                                    cursor: pointer;
                                    text-align: center;
                                }
                                .hfselect{
                                    position: absolute;
                                    right: 0;
                                    top: 115px;
                                    display: flex;
                                    justify-content: space-between;
                                    .selector{
                                        width: 130px;
                                        &/deep/ .weui-select{
                                            line-height: 30px;
                                            height: 30px;
                                        }
                                        &/deep/ .vux-selector-readonly{
                                            text-align: center;
                                            padding: 0;
                                            line-height: 10px;
                                             height: 10px;
                                        }
                                    }
                                    input{
                                        width: 16px;
                                        height: 16px;
                                        margin-top: 7px;
                                        margin-right: 5px;
                                    }
                                }
                                .dxnr-qm{
                                    position: absolute;
                                }
                                .dxnr-qz{
                                    top: 7px;
                                    left:7px;
                                }
                                .dxnr-hz{
                                    top: 81px;
                                    right: 7px;
                                }
                                .dxnr{
                                    width: 100%;
                                    height: 150px;
                                    box-sizing: border-box;
                                    padding: 7px;
                                    resize: none;
                                    text-indent: 123px;
                                    font-size: 14px;
                                    line-height: 22px;
                                }
                                .dxnrfoot{
                                    border-top:1px solid #DBDBDB;
                                    padding-top: 10px;
                                    overflow: hidden;
                                    .btn{
                                        background: @col-ff6600;
                                        color: #fff;
                                        cursor: pointer;
                                        display: inline-block;
                                        line-height: 25px;
                                        padding: 0 10px;
                                    }
                                    .text{
                                        float: right;
                                    }
                                }
                                .dsfs{
                                    display: flex;
                                    .subtitle{
                                        display: inline-block;
                                        line-height: 36px;
                                        padding-left: 30px;
                                        position: relative;
                                        input[type=checkbox]{
                                            position: absolute;
                                            display: inline-block;
                                            line-height: 36px;
                                            width: 20px;
                                            height: 20px;
                                            left: 5px;
                                            top: 8px;
                                        }
                                    }
                                    .dsfstime{
                                        width: 30%;
                                        margin-left: 20px;
                                    }
                                }
                                .subbtn{
                                    display: inline-block;
                                    background: @col-ff6600;
                                    color: #fff;
                                    line-height: 36px;
                                    padding: 0 15px;
                                }
                                p:nth-child(1){
                                    margin-top: 3px;
                                }
                                p{
                                    line-height: 30px;
                                }
                            }
                        }
                    }
                }
                .right{
                    width: 35%;
                    float: left;
                    .ws-show{
                        padding-top: 50px;
                        .sms{
                            max-width: 257px;
                            min-width: 257px;
                            height: 533px;
                            background-repeat:no-repeat;
                            margin: 0 auto;
                            .smscontainer{
                                width: 217px;
                                height: 295px;
                                padding-top: 130px;
                                margin: 0 auto;
                                ul{
                                    width: 100%;
                                    height: 100%;
                                    //background: red;
                                    li{
                                        display: block;
                                        width: 185px;
                                        margin-left: 20px;
                                        background-color: #e6e5ea;
                                        border: 1px solid #e2e1e7;
                                        box-sizing: border-box;
                                        padding: 6px 10px;
                                        font-size: 12px;
                                        border-radius: 10px;
                                        min-height: 40px;
                                        line-height: 18px;
                                        word-break: break-all;
                                        position: relative;
                                        .imgicon{
                                            position: absolute;
                                            height: 14px;
                                            width: 24px;
                                            background: url(../../../../assets/img/dxbj/sms.png) no-repeat;
                                            background-size: cover;
                                            left: -13px;
                                            bottom: 0px;
                                        }
                                    }
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