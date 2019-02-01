<template>
    <div class="shhfhfsz">
        <!-- <div class="top">
            <p class="title">下发内容（选填）</p>
            <textarea placeholder="【签名】 请对我们客服进行评价，回复字母A:100 B:80 C:60 D<60"></textarea>
        </div> -->
        <div class="bottom">
            <dl class="addkey title">
                <dd>触发关键字</dd>
                <dd></dd>
                <dd>
                    <!-- 自动回复（需要模板报备，<span class="lj" @click.prevent="gomob">点击前往</span>） -->
                </dd>
                <dd></dd>
            </dl>
            <dl class="addkey" v-for="(item,index) in backdata" :key="index">
                <dd><input type="text" v-model="item.reply" placeholder="回复A"></dd>
                <dd><span class="iconfont">&#xe65e;</span></dd>
                <dd><input type="text" v-model="item.content" placeholder="【签名】谢谢配合，我们将竭诚为您服务"></dd>
                <dd><span class="del" v-if="index>0" @click.prevent="deldd(index)">—</span></dd>
            </dl>
            <dl class="addkey">
                <dd><span class="addbtn" @click.prevent="addbtn">+ 添加新的触发规则</span></dd>
            </dl>
        </div>
        <div class="btnlist">
            <span class="sure" @click.prevent="sure">确认</span>
            <span class="confirm" @click.prevent="confirm">取消</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"shhfhfsz",
    data(){
        return{
            backdata:[
                {
                    reply:"",
                    content:"",
                },
            ],
            apicontent:{
                api_account:"",
                api_pwd:""
            }
        }
    },
    props:{
        that:{
            type:Object,
            default:()=>{}
        },
        dxdata:{
            type:Object,
            default:()=>{}
        },
        type:{
            type:String,
            default:""
        },
    },
    methods:{
        gomob(){
            this.$ZAlert.hide();
            this.that.$router.push("/Mbgl");
        },
        deldd(i){//点击删除按钮的方法
            this.backdata.splice(i,1);
        },
        addbtn(){//点击添加规则的方法
            let nobj={
                reply:"",
                content:"",
            }
            this.backdata.push(nobj);
        },
        sure(){//点击确定的方法
       
            let newarr=[];
            for(let i=0;i<this.backdata.length;i++){
                let newobj={};
                if(this.backdata[i].reply==""){
                    this.that.$vux.toast.text("关键字不能为空！");
                    return;
                }
                if(this.backdata[i].content==""){
                    this.that.$vux.toast.text("回复内容不能为空！");
                    return;
                }
                newobj.name=this.backdata[i].reply;
                newobj.content=this.backdata[i].content;
                newarr.push(newobj);
            }
            let newstr=JSON.stringify(newarr);
            console.log(newstr)
            // return;
            this.that.action({
                moduleName:'up',
                url:"up",
                method:"post",
                headers: {'XX-token': this.that.airforce.login.data.token,},
                data:{
                    id:this.dxdata.row.id,
                    up:newstr
                }
            }).then(res=>{
                console.log(res)
                if(res.code==20000){
                    this.that.$vux.toast.text(res.msg)
                    setTimeout(()=>{
                        this.$ZAlert.hide();
                    },2000)
                    
                }else{
                    this.that.$vux.toast.text(res.msg)
                }
            }).catch(err=>{
                this.that.$vux.toast.text(err)
            })
            //this.$ZAlert.hide();
        },
        confirm(){//点击取消的方法
            this.$ZAlert.hide();
        }
    },
    mounted(){
        this.that.action({
            moduleName:'selectup',
            url:"selectup",
            method:"post",
            headers: {'XX-token': this.that.airforce.login.data.token,},
            data:{
                id:this.dxdata.row.id,
            }
        }).then(res=>{
            if(res.code==200){
                let pardata=JSON.parse(res.data);
                let newarr=[];
                if(pardata.length>0){
                    for(let i=0;i<pardata.length;i++){
                        let newobj={};
                        newobj.reply=pardata[i].name;
                        newobj.content=pardata[i].content;
                        newarr.push(newobj)
                    }
                    this.backdata=newarr;
                }else{
                    this.backdata=[
                        {
                            reply:"",
                            content:"",
                        },
                    ]
                }
                
            }else{
                this.that.$vux.toast.text(res.msg)
            }
        }).catch(err=>{
            // this.that.$vux.toast.text(err)
        })
 
    }
}
</script>
<style lang="less" scoped>
.shhfhfsz{
    padding: 30px 40px;
    .top{
        text-align: left;
        .title{
            color: #666;
            font-size: 14px;
        }
        textarea{
            width: 100%;
            height: 150px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 7px;
            resize: none;
            margin-top: 10px;
        }
    }
    .bottom{
        margin-top: 20px;
        .title{
            font-size: 14px;
            color: #666;
        }
        .addkey{
            display: table;
            width: 100%;
            margin: 15px 0;
            dd{
                display: table-cell;
                vertical-align: middle;
                text-align: left;
            }
            dd:nth-child(1){
                width: 210px;
                input{
                    width: 100%;
                    box-sizing: border-box;
                    border: 1px solid #e0e0e0;
                    line-height: 36px;
                    padding: 0 12px;
                }
                .addbtn{
                    width: 30%;
                    text-align: center;
                    display: inline-block;
                    background: @col-ff6600;
                    color: #fff;
                    font-size: 14px;
                    line-height: 36px;
                    cursor: pointer;
                }
            }
            dd:nth-child(2){
                width: 78px;
                span{
                    display: block;
                    text-align: center;
                    font-size: 24px;
                }
            }
            dd:nth-child(3){
                input{
                    width: 100%;
                    box-sizing: border-box;
                    border: 1px solid #e0e0e0;
                    line-height: 36px;
                    padding: 0 12px;
                }
                .lj{
                    color: forestgreen;
                    cursor: pointer;
                }
            }
            dd:nth-child(4){
                width: 68px;
                .del{
                    display: block;
                    text-align: center;
                    width: 50px;
                    margin: 0 auto;
                    color: #fff;
                    background: @col-ff6600;
                    line-height: 38px;
                    cursor: pointer;
                    font-weight: 600;
                }
            }
        }
    }
    .btnlist{
        text-align: left;
        margin-top: 20px;
        span{
            display: inline-block;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
        }
        .sure{
            background: @col-ff6600;
            padding: 0 30px;
            margin-right: 20px;
        }
        .confirm{
            background: #c5ced7;
            padding: 0 30px;
        }
    }
}
</style>


