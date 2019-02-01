<template>
    <div class="Ptgk">
        <div class="Dxpartbox">
            <div class="Dxpartbox-head">
                短信发送
            </div>
            <div class="Dxpartbox-content">
                <p class="title">当前余额（条）</p>
                <p class="num">{{num}}</p>
                <span class="czbtn" @click.prevent="gocz">充值</span>
                <div class="chat">
                    <ve-line height="320px" :data="sjfxData" :settings="sjfxchartSettings"></ve-line>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common';
import VeHistogram from 'v-charts/lib/histogram.common';
export default {
    name:"ptgk",
    components: {VeLine,VeHistogram},
    data(){
        this.sjfxchartSettings = {
            stack: { '日期': ['发送数量'] },
            area: true
        };
        return{
            num:"",
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
            let dateobj={};
            let axiosurl='datacount';
            dateobj=this.getdetaildate('1');
            this.action({
                moduleName:axiosurl,
                url:axiosurl,
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:"1",
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
        getnumdata(){
            this.action({
                moduleName:'dataPushDetail',
                url:'dataPushDetail',
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:"1",
                }
            }).then(res=>{
                if(res.code==200){
                     if(res.data.strip==null){
                        this.num=0;
                    }else{
                        this.num=res.data.strip;
                    }
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    },
    mounted(){
        this.getnumdata();
        this.getsjfxData();
    }
}
</script>
<style lang="less" scoped>
.Ptgk{
    box-sizing: border-box;
    padding: 0 20px;
    .Dxpartbox{
        .Dxpartbox-content{
            padding: 12px 14px 12px 7px;
            .title{
                font-size: 14px;
                color:#848a9f;
                padding-left: 20px;
            }
            .num{
                margin: 20px 0 20px 40px;
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
                margin-left: 20px;
            }
            .chat{
                margin-top: 50px;
            }
        }
    }
}
</style>
