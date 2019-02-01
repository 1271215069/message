<template>
    <div class="UserApp console-PagePadding">
        <p class="console-PageTitle">应用管理列表</p>
        <table border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>服务名称</th>
                    <th>免费配额</th>
                    <th>付费配额</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in listdata" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.fwname}}</td>
                    <td class="mfpe">
                        <span>已用{{item.bfb}}</span>
                        <span>上限：{{item.toplimit}} 万次/天</span>
                        <span @click.prevent="promote(item)">提升</span>
                    </td>
                    <td class="ffpe">
                        <span>流量包：{{item.llb}}</span>
                        <span>余额：{{item.balance}}元（支持{{item.toplimit}} 万次/天）</span>
                        <div class="btnlist">
                            <span @click.prevent="buy(item)">购买</span>
                            <span>|</span>
                            <span @click.prevent="rechange(item)">充值</span>
                        </div>
                    </td>
                    <td class="iconlist">
                        <span class="iconfont" @click.prevent="pic(item)">&#xe6f5;</span>
                        <span class="iconfont" @click.prevent="feather(item)">&#xe815;</span>
                        <span class="iconfont" @click.prevent="del(item)">&#xe6be;</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "user-app",
        components:{},
        data(){
            return{
                listdata:[
                    {
                        id:"01",
                        fwname:"地点检索地点检索地点检索地点检索地点检索地点检索",
                        bfb:"15%",
                        toplimit:"1.05",
                        llb:"未购买",
                        balance:"500",
                    },
                    {
                        id:"02",
                        fwname:"地点检索地点检索地点检索地点检索地点检索地点检索",
                        bfb:"15%",
                        toplimit:"1.05",
                        llb:"未购买",
                        balance:"500",
                    },
                    {
                        id:"03",
                        fwname:"地点检索地点检索地点检索地点检索地点检索地点检索",
                        bfb:"15%",
                        toplimit:"1.05",
                        llb:"未购买",
                        balance:"500",
                    },
                    {
                        id:"04",
                        fwname:"地点检索地点检索地点检索地点检索地点检索地点检索",
                        bfb:"15%",
                        toplimit:"1.05",
                        llb:"未购买",
                        balance:"500",
                    }
                ],
            }
        },
        methods:{
            buy(item){//点击购买的方法
                console.log(item.id)
            },
            rechange(item){//点击充值的方法

            },
            promote(item){//点击提升的方法

            },
            pic(item){//点击图片icon的方法

            },
            feather(item){//点击羽毛icon的方法
                this.$router.push("/UserEditApp");
            },
            del(item){//点击删除icon的方法

            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.UserApp{
    table{
        width: 100%;
        thead{
            tr{
                background: #ff6600;
                line-height: 45px;
                th{
                    color: #fff;
                    font-size: 16px;
                    border: none;
                }
            }
        }
        tbody{
            tr{
                font-size: 14px;
                color: #999999;
                line-height: 45px;
                td{
                    text-align: center;
                    border: none;
                    border-bottom: 1px solid #ababac;
                }
                .mfpe{
                    span:nth-child(1){
                        padding-right: 15px;
                    }
                    span:nth-child(2){
                        padding-right: 15px;
                    }
                     span:nth-child(3){
                        color: #339933;
                        cursor: pointer;
                    }
                }
                .ffpe{
                    span:nth-child(1){
                        padding-right: 15px;
                    }
                    span:nth-child(2){
                        padding-right: 15px;
                    }
                    .btnlist{
                        display: inline-block;
                        span{
                            padding: 0;
                           
                        }
                        span:nth-child(1){
                            color:#ff6600;
                             cursor: pointer;
                        }
                        span:nth-child(3){
                            color:#27c8ff;
                             cursor: pointer;
                        }
                    }
                }
                .iconlist{
                    span{
                        cursor: pointer;
                        font-size: 22px;
                        line-height: 48px;
                    }
                    span:nth-child(1){
                        padding-right: 10px;
                        color: #33ccff;
                    }
                    span:nth-child(2){
                        padding-right: 10px;
                        color: #339933;
                    }
                    span:nth-child(3){
                        color: #999999;
                    }
                }
            }
            tr{
                cursor: default;
                &:nth-child(odd){
                    background: #f3f5f8;
                }
                &:nth-child(even){
                    background: #fff;
                }
                &:hover{
                    background: @consoleColor;
                    *{
                        color: @cor_ffffff;
                    }
                }
            }
        }
    }
}
</style>