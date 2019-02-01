<template>
    <div class="timestart">
        <input id="timestart" type="input" v-model="inputtext" :placeholder="placeholder">
        <span class="iconfont timeicon" @click.prevent="changeshow">&#xe63b; &nbsp;&nbsp;</span>
        <div class="timeconfir animate FadeIn" v-if="timeshow">
            <div class="timgyear">
                <span class="iconfont yearpart" @click.prevent="reduceyear">&#xeb8e;</span>
                <span class="iconfont yearpart" @click.prevent="reducemon">&#xe63a;</span>
                <span class="yearpart title">{{year}}年 {{months}}月</span>
                <span class="iconfont yearpart" @click.prevent="plusmon">&#xe63c;</span>
                <span class="iconfont yearpart" @click.prevent="plusyear">&#xeb8f;</span>
            </div>
            <div v-if="justmouth" class="mounthbtn" @click.prevent="getmounth">确定</div>
            <div v-else>
                <ul class="week">
                    <li v-for="(item,index) in weeklist" :key="index+'weekname'">{{item}}</li>
                </ul>
                <ul class="timeday">
                    <li v-for="(item,index) in nulldays" :key="index+'weeknum'">&nbsp;</li>
                    <li class="dayitem" v-for="(item,index) in days" :key="index" @click.prevent="gettimedata(item,index)">{{item}}</li>
                </ul>
                <div class="btnlist" v-if="!showtime">
                    <span class="btn" @click.prevent="checkday">确定</span>
                    <span class="btn" @click.prevent="qxday">取消</span>
                </div>
                <div class="specific" v-if="showtime">
                    <span class="title">时间</span>
                    <selector class="xinput" :options="hourlist" v-model="hour"></selector>
                    <!-- <x-input class="xinput" v-model="hour" type="number" text-align="right" @on-change="hourchange"></x-input> -->
                    <span class="jg">:</span>
                    <selector class="xinput" :options="minutelist" v-model="minute"></selector>
                    <!-- <x-input class="xinput" v-model="minute" type="number" text-align="right" @on-change="minutechange"></x-input> -->
                    <span class="jg">:</span>
                    <selector class="xinput" :options="secondlist" v-model="second"></selector>
                    <!-- <x-input class="xinput" v-model="second" type="number" text-align="right" @on-change="secondchange"></x-input> -->
                    <span class="btn" @click.prevent="checktime">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { XInput,Selector  } from "vux"
export default {
    name:"timeinput",
    components:{XInput,Selector },
    data(){
        return{
            tstar:"",
            timeshow:false,
            year:"",
            months:"",
            days:[],//每个月的日期数组
            nulldays:[],//每个月顶空白星期的数组
            weeklist:["日","一","二","三","四","五","六"],
            fandata:"",//最终获取的时间
            hour:"",//小时字段
            minute:"",//分钟字段
            second:"",//秒字段
            hourlist:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            minutelist:["00",'05','10','15','20','25','30','35','40','45','50','55'],
            secondlist:["00",'15','30','45']
        }
    },
    props:{
        data:{
            type:Array,
            default:()=>[]
        },
        timetext:{
            type:String,
            default:""
        },
        placeholder:{
            type:String,
            default:"请选择日期"
        },
        showtime:{
            type:Boolean,
            default:false
        },
        justmouth:{
            type:Boolean,
            default:false
        },
    },
    computed:{
        inputtext(){
            if(this.tstar==""){
                return this.timetext;
            }else{
                return this.tstar;
            }
        }
    },
    methods:{
        hourchange(val){//小时input改变时的方法
            if(val>24 || val<0){
                this.$vux.toast.text("请输入0-24之间的小时")
            }
        },
        minutechange(val){//分钟input改变时的方法
            if(val>60 || val<0){
                this.$vux.toast.text("请输入0-60之间的分钟")
            }
        },
        secondchange(val){//秒input改变时的方法
            if(val>60 || val<0){
                this.$vux.toast.text("请输入0-60之间的秒钟")
            }
        },
        changeshow(){//改变时间弹窗显示
            this.timeshow=!this.timeshow;
            // if(this.timeshow){
            //     //this.tstar="";
            //     this.fandata="";
            // }
            this.geteverymindays();
        },
        reduceyear(){//减少年份的方法
            this.year=this.year-1;
            this.geteverymindays();
        },
        reducemon(){//减少月份的方法
            if(this.months<=1){
                this.months=12;
                this.year=this.year-1;
            }else{
                this.months=this.months-1;
            }
            this.geteverymindays();
        },
        plusmon(){//添加月份的方法
            if(this.months>=12){
                this.months=1;
                this.year=this.year+1;
            }else{
                this.months=this.months+1;
            }
            this.geteverymindays();
        },
        plusyear(){//添加年份的方法
            this.year=this.year+1;
            this.geteverymindays();
        },
        geteverymindays(){//获取每月天数的方法
            this.days=[];
            let newtime=new Date(this.year,this.months,0);//获取当前月份的时间戳
            let mdays=newtime.getDate();//通过时间戳获取当月天数
            let daynum=1;
            for(let o=0;o<mdays;o++){
                this.days.push(daynum);
                daynum=daynum+1;
            }
            //下面是获取当前月份1号是星期几
            let odatef = new Date(); 
            odatef.setFullYear(this.year); 
            odatef.setMonth((this.months-1));
            odatef.setDate(1);
            this.nulldays=[];
            let week = odatef.getDay(); 
            //console.log(odatef.toLocaleString())
            //console.log(week,"kkk")
            for(let i=0;i<week;i++){
                this.nulldays.push(i);
            }
            //console.log(this.nulldays)
        },
        gettimedata(item,p){//点击具体日期获得时间
            let strmon="";
            let strday="";
            //转换字符串统一时间格式
            if(this.months<10){
                strmon="0"+(this.months.toString());
            }else{
                strmon=this.months.toString();
            }
            if(item<10){
                strday="0"+(item.toString());
            }else{
                strday=item.toString();
            }
            this.fandata=this.year+"-"+strmon+"-"+strday;
            
            for(let k=0;k<document.getElementsByClassName("dayitem").length;k++){
                document.getElementsByClassName("dayitem")[k].classList.remove("checked");
            }
            document.getElementsByClassName("dayitem")[p].classList.add("checked");
            
            //console.log(this.fandata)
        },
        checkday(){
            this.tstar=this.fandata;
            this.timeshow=false;
            this.$emit('closeMain',this.tstar);
        },
        qxday(){
            this.timeshow=false;
        },
        checktime(){//点击获取精确到秒的日期时间
            console.log(typeof(this.hour))
            if(this.hour==""){
                this.hour="00";
            }
            if(this.hour.length==1){
                this.hour="0"+this.hour;
            }
            if(this.minute==""){
                this.minute="00";
            }
            if(this.minute.length==1){
                this.minute="0"+this.minute;
            }
            if(this.second==""){
                this.second="00";
            }
            if(this.second.length==1){
                this.second="0"+this.second;
            }
            if(this.fandata==""){
                var myDate = new Date();
                let year=myDate.getFullYear();//获取完整的年份(4位,1970-????)
                let mouth=myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
                let day=myDate.getDate();
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
                this.fandata=year+"-"+mouth+"-"+day;
            }
            //this.fandata=this.fandata+" "+this.hour+":"+this.minute+":"+this.second;
            this.tstar=this.fandata+" "+this.hour+":"+this.minute+":"+this.second;
            this.timeshow=false;
            this.$emit('closeMain',this.tstar);
        },
        getmounth(){//点击确定获取月份的方法
            let strmon;
            let finmon;
            if(this.months<10){
                strmon="0"+(this.months.toString());
            }else{
                strmon=this.months.toString();
            }
            finmon=this.year+"-"+strmon;
            this.tstar=finmon;
            this.timeshow=false;
            this.$emit('closeMain',finmon);
        }
    },
    mounted(){
        let mytime = new Date();
        this.year=mytime.getFullYear();//获取当前年份
        this.months=mytime.getMonth()+1;//获取当前月份
        this.geteverymindays();
        //this.tstar=this.timetext;
    }
}
</script>
<style lang="less" scoped>

.timestart{
    width: 15%;
    height: 37px;
    // box-sizing : content-box;
    // border: 1px solid #737373;
    position: relative;
    
    input{
        position: absolute;
        width: 100%;
        line-height: 25px;
        top: 0;
        //transform: translateY(-10%);
        left: 0;
        box-sizing: border-box;
        border: 1px solid #000;
        padding: 5px 8px;
    }
    .timeicon{
        position: absolute;
        text-align: right;
        right: 0;
        top: 0;
        display: block;
        width: 100%;
        height:37px;
        cursor: pointer;
        line-height: 37px;
        //transform: translateY(-10%);
    }
    .timeconfir{
        width: 350px;
        position: absolute;
        top: 40px;
        left: 0;
        box-sizing: border-box;
        //padding: 20px 20px;
        background: #fff;
        border: 1px solid #d2d2d2;
        box-shadow: 0 2px 4px rgba(0,0,0,.12);
        z-index: 5000;
        .timgyear{
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            border-bottom: 1px solid #e2e2e2;
            
            .yearpart{
                cursor:pointer;
                color:#999;
            }
            .title{
                width: 40%;
                font-size: 14px;
                text-align: center;
                line-height: 25px;
            }
        }
        .mounthbtn{
            display: block;
            width: 52px;
            line-height: 30px;
            background: #ff6600;
            padding: 0 10px;
            color: #fff;
            margin: 20px auto;
            cursor: pointer;
            text-align: center;
        }
        .week{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 10px 1% 0;
            li{
                list-style: none;
                width: 14%;
                float: left;
                text-align: center;
                font-size: 14px;
            }
        }
        .timeday{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 10px 1%;
            li{
                list-style: none;
                width: 14%;
                float: left;
                text-align: center;
                color: #666;
                font-size: 14px;
                line-height: 48px;
                border-radius: 50%;
            }
            .dayitem:hover{
                background: #e5e5e5;
            }
            .dayitem{
                cursor: pointer;
            }

        }
        .btnlist{
            display: flex;
            flex-wrap: wrap;
            padding: 20px 0;
            border-top: 1px solid #e2e2e2;
            .btn{
                display: inline-block;
                line-height: 30px;
                background: #ff6600;
                padding: 0 10px;
                color: #fff;
                margin-left: 15px;
                cursor: pointer;
            }
        }
        .specific{
            display: flex;
            flex-wrap: wrap;
            padding: 20px 0;
            border-top: 1px solid #e2e2e2;
            .title{
                display: inline-block;
                line-height: 30px;
                margin: 0 7px 0 7px;
            }
            .jg{
                display: inline-block;
                line-height: 30px;
                margin: 0 7px;
            }
            .xinput{
                width: 50px;
                border: 1px solid #000;
                padding: 0 5px;
                line-height: 30px;
                &/deep/ select{
                    line-height: 30px;
                    height:30px;
                    padding: 0 10px 0 8px;
                }
            }
            .btn{
                display: inline-block;
                line-height: 30px;
                background: #ff6600;
                padding: 0 10px;
                color: #fff;
                margin-left: 15px;
                cursor: pointer;
            }
        }
    }
}
.checked{
    background: #ec521c;
    color:#fff!important;
}
</style>
