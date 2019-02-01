<template>
    <div class="apisend">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                接口短信
            </div>
        </div>
        <div class="Dxpartbox-content">
            <div class="contentbox">
                <div class="left">
                    <p class="title"><span class="iconfont">&#xe664;</span>API接口<span class="doc" @click="$router.push('/Docs')">接口</span></p>
                    <ul>
                        <li>
                            <span class="label">accesskey :</span>
                            <p class="text">{{accesskey}} </p>
                            <!-- <span class="copybtn">复制</span> -->
                        </li>
                        <li>
                            <span class="label">secret :</span>
                            <p class="text"><span @click.prevent="takeshow" v-if="secretshow=='1'" class="iconfont eyes">&#xe666;</span><span @click.prevent="takeshow" v-if="secretshow=='2'" class="iconfont eyes">&#xe665;</span>{{secret}}</p>
                        </li>
                        <li>
                            <span class="label">API接口 :</span>
                            <p class="text">短信发送{{apiurl}}</p>
                        </li>
                            <!-- <li>
                                <span class="label"> </span>
                                <p class="text">余额查询http://api.1cloudsp.com/query/account</p>
                            </li> -->
                    </ul>
                </div>
                <div class="right">
                    <p class="title">当前余额（条）</p>
                    <p class="num">{{yenum}}</p>
                    <span class="czbtn" @click.prevent="gocz">充值</span>
                </div>
            </div>
            <div class="chat">
                <ve-line height="320px" :data="sjfxData" :settings="sjfxchartSettings"></ve-line>
            </div>
        </div>
    </div>
</template> 
<script>
import VeLine from 'v-charts/lib/line.common';
import VeHistogram from 'v-charts/lib/histogram.common';
export default {
    name:"apisend",
    components: {VeLine,VeHistogram},
    data(){
        this.sjfxchartSettings = {
            stack: { '日期': ['发送数量'] },
            area: true
        };
        return{
            accesskey:"",
            secret:"******",
            secrettext:"",
            apiurl:"",
            secretshow:"1",//secret是否显示的值
            yenum:"",
            sjfxData: {
                columns: ['日期', '发送数量', '发送成功', '发送失败'],
                rows: [
                    //{ '日期': '2018-11-04', '发送数量': 1393, '发送成功': 1093, '发送失败': 250 ,'未知':50},
                ]
            },
        }
    },
    methods:{
        gocz(){
            this.$router.push("/Zhcz");
        },
        takeshow(){
            if(this.secretshow=="1"){
                this.secret=this.secrettext;
                this.secretshow="2";
            }else if(this.secretshow=="2"){
                this.secret="******";
                this.secretshow="1";
            }
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
        getchatdata(){//获取图表数据
            let dateobj={};
            let axiosurl='datacount';
            dateobj=this.getdetaildate('1');
            this.action({
                moduleName:axiosurl,
                url:axiosurl,
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:"3",
                    start_time:dateobj.start_time,
                    end_time:dateobj.end_time
                }
            }).then(res=>{
                if(res.code==200){
                    let newarr=[];
                    // if(res.data.length<1){
                    //     this.$vux.toast.text("数据分析暂无数据");
                    //     return;
                    // }
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
        getapidata(){
            this.action({
                moduleName:'dataPushDetail',
                url:'dataPushDetail',
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:"3",
                }
            }).then(res=>{
                if(res.code==200){
                    this.accesskey=res.data.api_account;
                    this.secrettext=res.data.api_pwd;
                    this.apiurl=res.data.api_url;
                    if(res.data.strip==null){
                        this.yenum=0;
                    }else{
                        this.yenum=res.data.strip;
                    }
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.getapidata();
        this.getchatdata();
        
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.apisend{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox-content{
        padding: 12px 14px 12px 7px;
        .contentbox{
            display: flex;
            justify-content: space-between;
            .left{
                width: 47%;
                box-sizing: border-box;
                padding: 15px;
                box-shadow:1px 1px 5px #888888;
                .title{
                    font-size: 16px;
                    overflow: hidden;
                    .iconfont{
                        margin-right: 7px;
                    }
                    .doc{
                        float: right;
                        cursor: pointer;
                        color: @themeColor;
                    }
                }
                ul{
                    display: block;
                    color:#848a9f;
                    margin: 10px 0;
                    li{
                        font-size: 12px;
                        display: flex;
                        .label{
                            flex-basis: 110px;
                            text-align: right;
                            padding-right: 5px;
                            height: 35px;
                            line-height: 35px;
                        }
                        .text{
                            line-height: 35px;
                            flex-grow: 1;
                            .copybtn{
                                float: right;
                                padding: 0 10px;
                                box-sizing: border-box;
                                box-shadow:1px 1px 5px #888888;
                                cursor: pointer;
                            }
                            .eyes{
                                margin-right: 5px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
            .right{
                width: 47%;
                box-sizing: border-box;
                padding: 15px;
                box-shadow:1px 1px 5px #888888;
                .title{
                    font-size: 14px;
                    color:#848a9f;
                }
                .num{
                    margin: 20px 0 20px 20px;
                    font-size: 40px;
                    color: @col-ff6600;
                }
                .czbtn{
                    display: inline-block;
                    line-height: 35px;
                    padding: 0 20px;
                    font-size: 14px;
                    box-shadow:1px 1px 5px #888888;
                    cursor: pointer;
                    color:#848a9f;
                }
            }
        }
        .chat{
            margin: 50px 0 20px 0;
        }
    }
}
</style>
