<template>
    <div class="dxfsdtwj">
        <div class="linetext">
            <span class="title">第 1 步：</span>
            <div class="content">
                请先<a :href="'/test.zip'" download="test.zip" class="download">下载模板</a>，按说明填写信息后上传
            </div>
        </div>
        <div class="linetext">
            <span class="title">第 2 步：</span>
            <div class="content updatabox">
                <div>导入文件</div> 
                <div class="updata">
                    <input type="file" @change="updata" ref="filput">
                    <span>上传</span>
                </div>
                <div class="sign" v-if="hint.show">{{hint.text}}</div>
            </div>
        </div>
        <div class="linetext" v-if="filedata.show">
            <span class="title">&nbsp;</span>
            <div class="content">
                <div class="xprogretext">
                    <span class="left">{{filedata.name}}</span>
                    <span class="right">{{filedata.size}}&nbsp;&nbsp;{{percent}}%</span>
                </div>
                <x-progress :show-cancel="false" class="xprogre" :percent="percent"></x-progress>
            </div>
        </div>
        <div class="linetext">
            <span class="title">&nbsp;</span>
            <div class="content">
                <p>* 文件大小 <span class="emphasize"><10MB</span></p>
                <p>* 支持<span class="emphasize">txt文本(utf-8编码格式)、xls/xlsx</span>文档</p>
            </div>
        </div>
        <div class="btnlist">
            <span @click.prevent="checked">确认</span>
        </div>
    </div>
</template>
<script>
import { XProgress } from 'vux'
import { setInterval, clearInterval } from 'timers';
export default {
    name:"dxfsdtwj",
    components:{XProgress},
    data(){
        return{
            hint:{
                show:false,
                text:"文件大小不能大于10M",
            },
            filedata:{//上传文件的信息
                show:false,
                name:"",
                size:""
            },
            filetext:"",
            percent:0,//进度条的值
            findata:[],//上传完成后处理的都的文件数据
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
    },
   computed:{
       domain(){
           return window.location.host;
       }, 
   },
    methods:{
        foo(str){
            var temp = str.split(/[\n,]/g);
            for(var i =0;i<temp.length;i++){
                if(temp[i] == ""){
                temp.splice(i, 1);
                //删除数组索引位置应保持不变
                i--;
                }
            }
            return temp;
            console.log(temp);
        },
        updata(){
            this.percent=0;
            let dsq=setInterval(()=>{//设置进度条动画
                if(this.percent<99){
                    this.percent+=1;
                }else{
                    this.percent=99; 
                }
            },200)
            this.filedata.show=true;
            let inputfile=this.$refs.filput.files[0];//获取input的file
            this.filedata.name=inputfile.name;
            this.filedata.size=(inputfile.size/1024).toFixed(3) + "kb";
            this.filetext=this.filedata.name+","+this.filedata.size;
            console.log(inputfile)
            let filesize=(inputfile.size/1024/1024).toFixed(3);
            if(!(filesize<10)){
                this.that.$vux.toast.text("上传文件不得大于10MB");
                clearInterval(dsq);
                this.percent=0;
                return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(inputfile);
            let then=this;
            reader.onload = function (e) {//文件转base64
                then.that.action({
                    moduleName:'importfile',
                    url:"importfile",
                    method:"post",
                    headers: {'XX-token': then.that.airforce.login.data.token,},
                    isFormData:true,
                    data:{
                        type:"1",
                        files:inputfile,
                    }
                }).then(res=>{
                    if(res.code==200){
                        clearInterval(dsq);
                        then.percent=100;
                        let telzz= /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                        let telarr=[];
                        if(res.data.ext[0]=="txt"){
                            let newarr=[];
                            newarr=res.data.data[0].split(/\r?\n/);
                            for(let i=0;i<newarr.length;i++){
                                let telobj={};
                                try {
                                    telobj.tel=newarr[i].toString();
                                }catch (e){
                                    telobj.tel = newarr[i]
                                }
                                if (telzz.test(telobj.tel)){
                                    telobj.status="正确";
                                }else{
                                    telobj.status="错误";
                                }
                                telarr.push(telobj);
                            }
                            then.findata=telarr;
                        }else{
                            for(let i=0;i<res.data.data.length;i++){//循环得到的数据
                                let telobj={};
                                try {
                                    telobj.tel=res.data.data[i].toString();
                                }catch (e){
                                    telobj.tel = res.data.data[i]
                                }
                                if (telzz.test(telobj.tel)){
                                    telobj.status="正确";
                                }else{
                                    telobj.status="错误";
                                }
                                telarr.push(telobj);
                            }
                            then.findata=telarr;
                        }
                    }else{
                        then.that.$vux.toast.text(res.msg)
                        clearInterval(dsq);
                        then.percent=0;
                    }
                }).catch(err=>{
                    clearInterval(dsq);
                    then.percent=0;
                })
            }
        },
        checked(){//点击确认按钮的方法
            if(this.percent!=100){
                this.that.$vux.toast.text("请上传文件并等待文件上传完成");
                return
            }
            if(this.that.airforce.Phonelist.data){//已有号码的情况
                let newarr=this.that.airforce.Phonelist.data.concat(this.findata);
                this.that.action({
                    moduleName:"Phonelist",
                    goods:{
                        data:newarr,
                    }
                })
            }else{
                this.that.action({
                    moduleName:"Phonelist",
                    goods:{
                        data:this.findata,
                    }
                })
            }
            
            

            this.$ZAlert.hide();
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Hmcxq",
                    width:"1000px",
                    title:"号码池详情",
                    props:{
                        that:()=>this.that,
                    },
                });
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.dxfsdtwj{
    padding: 30px 0;
    .linetext{
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        color: #666;
        font-size: 14px;
        .title{
            display: block;
            float: left;
            width: 60px;
            line-height: 36px;
        }
        .content{
            float: left;
            line-height: 36px;
            .download{
                color: @col-ff6600;
                cursor: pointer;
                border-bottom: 1px solid  @col-ff6600;
            }
            p:nth-child(1){
                margin-top: 15px;
            }
            p{
                text-align: left;
                font-size: 12px;
                line-height: 25px;
                .emphasize{
                    color: #ff9400;
                }
            }
            .xprogretext{
                width: 380px;
                overflow: hidden;
                line-height: 25px;
                margin-top: 15px;
                .left{
                    float: left;
                    width: 50%;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    text-align: left;
                }
                .right{
                    float: right;
                    width: 50%;
                    text-align: right;
                }
            }
            .xprogre{
                width: 380px;
            }
        }
        .updatabox{
            display: flex;
            flex-wrap: wrap;
                .updata{
                     margin-left: 10px;
                    
                     position: relative;
                    span{
                        display: block;
                        line-height: 36px;
                        background: @col-ff6600;
                        color: #fff;
                        padding: 0 15px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 2;
                        width: 28px;
                        cursor: pointer;
                    }
                    input{
                        display: block;
                        height: 36px;
                        width: 58px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 3;
                        opacity: 0;
                        cursor: pointer;
                    }
                }
                .filename{
                    width: 100%;
                    text-align: left;
                    margin-top: 5px;
                }
                .sign{
                    margin-left: 58px;
                    padding-left: 10px;
                    font-size: 12px;
                }
            }
    }
    .linetext:nth-child(1){
        margin-bottom: 20px;
    }
    .btnlist{
        span{
            display: inline-block;
            line-height: 36px;
            padding: 0 20px;
            margin: 0 auto;
            background: @col-ff6600;
            color: #fff;
            margin-top: 30px;
            cursor: pointer;
        }
    }
}
</style>
