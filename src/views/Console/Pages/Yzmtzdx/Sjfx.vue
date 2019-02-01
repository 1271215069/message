<template>
    <div class="sjfx">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                数据分析
                <div class="Dxpartbox-tablist">
                    <checker class="list-tabbox" selected-item-class="active" v-model="sjfx" @on-change="sjfxchange" :radio-required="true">
                        <checker-item class="tabitem" value="2">月</checker-item>
                        <!-- <checker-item class="tabitem" value="2">周</checker-item> -->
                        <checker-item class="tabitem" value="1">日</checker-item>
                    </checker>
                </div>
            </div>
            <div class="Dxpartbox-content">
                <div class="screen">
                    <selector class="selector type" v-model="fxtype" :options='typelist' @on-change="fxchange"></selector>
                </div>
                <div class="chatone">
                    <ve-line height="320px" :data="sjfxData" :settings="sjfxchartSettings"></ve-line>
                </div>
            </div>
        </div>

        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                短信到达率图
                
                <div class="Dxpartbox-tablist">
                    <checker class="list-tabbox" selected-item-class="active" v-model="dxddl" @on-change="dxddlchange" :radio-required="true">
                        <checker-item class="tabitem" value="2">月</checker-item>
                        <!-- <checker-item class="tabitem" value="2">周</checker-item> -->
                        <checker-item class="tabitem" value="1">日</checker-item>
                    </checker>
                </div>
                
            </div>
            <div class="Dxpartbox-content">
                <div class="screen">
                    <selector class="selector" v-model="chatype" :options="selectliet"></selector>
                    <selector class="selector type" v-model="ddtype" :options='typelist' @on-change="ddchange"></selector>
                </div>
                <div class="chatone">
                    <ve-line v-if="chatype=='line'" height="320px" :data="dxddData" :settings="dxddchartSettings"></ve-line>
                    <ve-histogram v-if="chatype=='histogram'" height="320px" :data="dxddData"></ve-histogram>
                </div>
            </div>
        </div>

        <!-- <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                短信发送失败分析
                <div class="Dxpartbox-tablist">
                    <checker class="list-tabbox" selected-item-class="active" v-model="fssb" @on-change="fssbchange" :radio-required="true">
                        <checker-item class="tabitem" value="1">月</checker-item>
                        <checker-item class="tabitem" value="2">周</checker-item>
                        <checker-item class="tabitem" value="3">日</checker-item>
                    </checker>
                </div>
            </div>
            <div class="Dxpartbox-content">
                <div class="chatone">
                    <ve-histogram height="320px" :data="fssbData"></ve-histogram>
                    <ve-line  height="320px" :data="fssbData" :settings="fssbchartSettings"></ve-line>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common';
import VeHistogram from 'v-charts/lib/histogram.common';
import { Checker, CheckerItem,Selector } from 'vux';
export default {
    name:"sjfx",
    components: {VeLine,VeHistogram,Checker,CheckerItem,Selector},
    data(){
        this.sjfxchartSettings = {
            stack: { '日期': ['发送数量'] },
            area: true
        };
        this.dxddchartSettings = {
            stack: { '日期': ['成功率'] },
            area: true
        };
        this.fssbchartSettings = {
            stack: { '日期': ['数量'] },
            area: true
        }
        return{
            typelist:[
                {
                    key:"1",
                    value:"平台短信"
                },
                {
                    key:"3",
                    value:"接口短信"
                }
            ],
            fxtype:"1",
            ddtype:"1",
            sjfxData: {
                columns: ['日期', '发送数量', '发送成功', '发送失败'],
                rows: [
                    //{ '日期': '2018-11-04', '发送数量': 1393, '发送成功': 1093, '发送失败': 250 ,'未知':50},
                ]
            },
            dxddData:{
                columns:['日期', '成功率', '失败率'],
                rows:[
                    // { '日期': '2018-11-04', '成功率': 0.7, '失败率': 0.24, '未知率': 0.06 },
                ]
            },
            fssbData:{
                columns:['原因', '数量'],
                rows:[
                    { '原因': '黑名单', '数量': 84},
                    { '原因': '号码限制', '数量': 65},
                    { '原因': '空号或停机', '数量': 32},
                    { '原因': '错误代码', '数量': 20},
                ]
            },
            sjfx:"1",//数据分析tab（月周日）的值
            dxddl:"1",//短信到达率tab（月周日）的值
            selectliet:[
                {
                    key:"line",
                    value:"折线图"
                },
                {
                    key:"histogram",
                    value:"柱状图"
                },
            ],
            chatype:"line",//图标类型select的值
            fssb:"3",//短信发送失败分析

        }
    },
    methods:{
        sjfxchange(val){//数据分析tab的值发生变化的方法
            this.getsjfxData();
        },
        dxddlchange(val){//短信到达率tab的值发生变化的方法
            this.getdxddData();
        },
        fssbchange(val){//短信发送失败分析tab的值发生变化的方法
            
        },
        fxchange(){
            this.getsjfxData();
        },
        ddchange(){
            this.getdxddData();
        },
        getdetaildate(e){
            let newobj={};
            var myDate = new Date();
            let yeardate=myDate.getFullYear();//当前年份
            let monthdate=("0" + (myDate.getMonth() + 1)).slice(-2);//当前月份
            let daydate=("0" + myDate.getDate()).slice(-2);//当前日期
            if(e=='1'){//七天前
                var nowMilliSeconds = new Date().getTime();
                var TwoDaysAgo = new Date();
                TwoDaysAgo.setTime(nowMilliSeconds-(7*86400000));
                newobj.end_time=yeardate+"-"+monthdate+"-"+daydate;
                newobj.start_time=TwoDaysAgo.getFullYear()+"-"+("0" + (TwoDaysAgo.getMonth() + 1)).slice(-2)+"-"+("0" + TwoDaysAgo.getDate()).slice(-2);
                
                return newobj;
            }else if(e=='2'){//七月前
                var time = new Date();
                time.setDate(time.getDate());//获取Day天后的日期 
                var y = time.getFullYear();
                var m;
                if (time.getMonth() - 7 + 1<1){
                    y = y-1;
                    m = time.getMonth()+1 - 6 + 12;//获取月份
                }else{
                    m = time.getMonth() - 7 + 1;//获取月份
                }
                if(m<10){
                    m="0"+m;
                }
                newobj.end_time=yeardate+"-"+monthdate;
                newobj.start_time=y+"-"+m;
                return newobj;
            }
        },
        getsjfxData(){//获取数据分析的表格数据
            let axiosurl="";
            let dateobj={};
            if(this.sjfx=="1"){
                axiosurl='datacount';
                dateobj=this.getdetaildate(this.sjfx);
            }else if(this.sjfx=="2"){
                axiosurl='datamonthdata';
                dateobj=this.getdetaildate(this.sjfx);
            }
            this.action({
                moduleName:axiosurl,
                url:axiosurl,
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:this.fxtype,
                    start_time:dateobj.start_time,
                    end_time:dateobj.end_time
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    if(res.data.length<1){
                        this.$vux.toast.text("数据分析暂无数据");
                        return;
                    }
                    this.sjfxData.rows=[];
                    for(let i=0;i<res.data.length;i++){
                        let newobj={};
                        newobj['日期'] = res.data[i].date;
                        if(res.data[i].sm_sum==null){
                            newobj['发送数量']=0;
                        }else{
                            newobj['发送数量']=parseInt(res.data[i].sm_sum);
                        }
                        if(res.data[i].send_sum==null){
                            newobj['发送成功']=0;
                        }else{
                            newobj['发送成功']=parseInt(res.data[i].send_sum);
                        }
                        if(res.data[i].send_error_sum==null){
                            newobj['发送失败']=0;
                        }else{
                            newobj['发送失败']=parseInt(res.data[i].send_error_sum);
                        }
                        
                        newarr.push(newobj);
                    }
                    this.sjfxData.rows=newarr;
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        },
        getdxddData(){//获取短信到达率的表格数据
            let axiosurl="";
            let dateobj={};
            if(this.dxddl=="1"){
                axiosurl='datacount';
                dateobj=this.getdetaildate(this.dxddl);
            }else if(this.dxddl=="2"){
                axiosurl='datamonthdata';
                dateobj=this.getdetaildate(this.dxddl);
            }
            this.action({
                moduleName:axiosurl,
                url:axiosurl,
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:this.ddtype,
                    start_time:dateobj.start_time,
                    end_time:dateobj.end_time
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    if(res.data.length<1){
                        this.$vux.toast.text("短信到达率暂无数据");
                        return;
                    }
                    this.dxddData.rows=[];
                    for(let i=0;i<res.data.length;i++){
                        let newobj={};
                        let senddata={};
                        if(res.data[i].sm_sum==null){
                            senddata.num=0;
                        }else{
                            senddata.num=parseInt(res.data[i].sm_sum);
                        }

                        if(res.data[i].send_sum==null){
                            senddata.success=0;
                        }else{
                            senddata.success=parseInt(res.data[i].send_sum);
                        }

                        if(res.data[i].send_error_sum==null){
                            senddata.fail=0;
                        }else{
                            senddata.fail=parseInt(res.data[i].send_error_sum);
                        }
                        newobj['日期'] = res.data[i].date;
                        if(senddata.success==0||senddata.num==0){
                            newobj['成功率']=0;
                        }else{
                            newobj['成功率'] = senddata.success/senddata.num;
                        }
                        if(senddata.fail==0||senddata.num==0){
                            newobj['失败率']=0;
                        }else{
                            newobj['失败率'] = senddata.fail/senddata.num;
                        }
                        
                        newarr.push(newobj);
                    }
                    this.dxddData.rows=newarr;
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.getsjfxData();
        this.getdxddData();
    }
}
</script>
<style lang="less" scoped>
.active{
    background: @col-ff6600;
    color: #fff;
}
.sjfx{
    box-sizing: border-box;
    padding: 0 20px;

    .Dxpartbox-content{
        // overflow: hidden;
        margin-bottom: 100px;
        .chatone{
            width: 100%;
            height: 360px;
            box-sizing: border-box;
            padding: 20px 25px;
            // .noselect{
            //     width: 100%!important;
            //     height: 300px!important;
            // }
        }
        .screen{
            text-align: right;
            overflow: hidden;
            .selector{
                float:right;
                width: 100px;
                font-size: 14px;
                border: 1px solid #DBDBDB;
                margin: 10px 20px 10px 0;
                &/deep/ .weui-cell__bd:after{
                    transform: rotate(135deg);
                }
                &/deep/ option{
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
