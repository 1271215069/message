<template>
    <div class="Uinfo">
        <div class="contentbox">
            <div class="left">
                <p class="title">Hi,<span class="sign">{{username}}</span></p>
                <div class="listitem">
                    <div class="subtitle">
                        手机绑定：
                    </div>
                    <div class="content">
                        <span class="btn" @click.prevent="bdtel" v-if="!teltext">去绑定</span>
                        <span class="text" v-else>{{teltext}}</span>
                        <!-- <span class="btn" @click.prevent="bdtel" v-if="!telshow">重新绑定</span> -->
                    </div>
                </div>
                <div class="listitem">
                    <div class="subtitle">
                        邮箱绑定：
                    </div>
                    <div class="content">
                        <span class="btn" @click.prevent="bdemail" v-if="!emailtext">去绑定</span>
                        <span class="text" v-else>{{emailtext}}</span>
                        <!-- <span class="btn" @click.prevent="bdemail" v-if="!emailshow">重新绑定</span> -->
                    </div>
                </div>
            </div>
            <!-- <div class="right">
                <p class="title">余额</p>
                <p class="content">{{num}}</p>
            </div> -->
        </div>
        <div class="chat">
            <ve-line height="320px" :data="sjfxData" :settings="sjfxchartSettings"></ve-line>
        </div>
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common';
export default {
    name:"uinfo",
    components:{VeLine},
    data(){
        this.sjfxchartSettings = {
            stack: { '日期': ['平台短信'] },
            area: true
        };
        return{
             sjfxData: {
                columns: ['日期', '平台短信', '接口短信'],
                rows: []
            },
        }
    },
    
    methods:{
        bdemail(){
            let that=this;
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Bdemail",
                    width:"550px",
                    title:"邮箱绑定",
                    _event:{
                        aftersave:(e)=>{
                            this.$utils.updataUserInfo(this,{
                                user_email:e
                            });
                        }
                    },
                    props:{
                        that:()=>this,
                    },
                })
        },
        bdtel(){
            let that=this;
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Bdtel",
                    width:"550px",
                    title:"手机绑定",
                    _event:{
                        aftersave:(e)=>{
                            let smxx=JSON.parse(JSON.stringify(this.airforce.login.data));
                            smxx.user.mobile=e;
                            this.action({
                                moduleName:"login",
                                goods:{
                                    data:smxx
                                }
                            })
                            localStorage.login=this.airforce.login;
                        }
                    },
                    props:{
                        that:()=>this,
                    },
                })
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
        gettabledata(){
            let dateobj={};
            dateobj=this.getdetaildate('1');
            this.action({
                moduleName:'datacount',
                url:'datacount',
                method:"post",
                headers: {'XX-token': this.airforce.login.data.token,},
                data:{
                    type:"1",
                    start_time:dateobj.start_time,
                    end_time:dateobj.end_time
                }
            }).then(res=>{
                if(res.code==200){
                    
                    this.action({
                        moduleName:'datacount',
                        url:'datacount',
                        method:"post",
                        headers: {'XX-token': this.airforce.login.data.token,},
                        data:{
                            type:"3",
                            start_time:dateobj.start_time,
                            end_time:dateobj.end_time
                        }
                    }).then(result=>{
                        if(result.code==200){
                            let newarr=[];
                            for(let i=0;i<res.data.length;i++){
                                let newobj={};
                                newobj['日期'] = res.data[i].date;
                                if(res.data[i].sm_sum==null){
                                    newobj['平台短信']=0;
                                }else{
                                    newobj['平台短信']=parseInt(res.data[i].sm_sum);
                                }
                                if(result.data[i].sm_sum==null){
                                    newobj['接口短信']=0;
                                }else{
                                    newobj['接口短信']=parseInt(result.data[i].sm_sum);
                                }
                                newarr.push(newobj);
                            }
                            this.sjfxData.rows=newarr;
                        }else{
                            this.$vux.toast.text(res.msg)
                        }
                    }).catch(error=>{})

                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})

        }
    },
    computed:{
        username(){
            if(!this.airforce.login.data.user.name==""){
                    return this.airforce.login.data.user.name;
                }else if(!this.airforce.login.data.user_email==""){
                    return this.airforce.login.data.user.user_email;
                }else if(!this.airforce.login.data.user.mobile==""){
                    return this.airforce.login.data.user.mobile;
                }
        },
        num(){
            if(this.airforce.login.data.user.balance==""){
                return 0;
            }else{
                return this.airforce.login.data.user.balance;
            }
            
        },

        teltext(){
            if(!this.$utils.is_S(this.airforce.login.data.user.mobile)){
                return this.airforce.login.data.user.mobile;
            }
        },
        emailtext(){
            if(!this.$utils.is_S(this.airforce.login.data.user.user_email)){
                return this.airforce.login.data.user.user_email;
            }
        }
    },
    mounted(){
        
        this.gettabledata();
    }
}
</script>
<style lang="less" scoped>
.Uinfo{
    box-sizing: border-box;
    padding: 0 20px;
    .contentbox{
        display: flex;
        justify-content: space-between;
        .left{
            width: 47%;
            box-sizing: border-box;
            padding: 15px;
            box-shadow: 1px 1px 5px #888888;
            .title{
                font-size: 16px;
                line-height: 35px;
                .sign{
                    color: @col-ff6600;
                    margin-left: 7px;
                }
            }
            .listitem{
                line-height: 35px;
                overflow: hidden;
                font-size: 12px;
                .subtitle{
                    float: left;
                    width: 60px;
                    text-align: right;
                }
                .content{
                    float: left;
                    .btn{
                        display: inlin-block;
                        line-height: 30px;
                        height: 30px;
                        box-shadow: 0 1px 4px rgba(0,0,0,.2);
                        padding: 7px 10px;
                        margin-left: 7px;
                        cursor: pointer;
                        margin-top: 2px;
                    }
                    .text{
                        margin-left: 7px;
                    }
                }
            }
        }
        .right{
            width: 47%;
            box-sizing: border-box;
            padding: 15px;
            box-shadow: 1px 1px 5px #888888;
            .title{
                text-align: center;
                font-size: 14px;
                line-height: 30px;
            }
            .content{
                font-size: 60px;
                color: @col-ff6600;
                text-align: center;
            }
        }
    }
    .chat{
        margin-top: 60px;
    }
}
</style>
