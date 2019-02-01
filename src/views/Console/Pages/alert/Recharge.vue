<template>
    <div class="Recharge">
        <div class="title">联系方式</div>
        <p class="textBox">
            <span class="lable">充值方式：</span>
            <span class="txt">请联系您的专属对接人-系统</span>
        </p>
        <p class="textBox">
            <span class="lable">联系客服：</span>
            <span class="txt kefu"><span class="iconfont">&#xe994;</span>客服交谈</span>
        </p>
        <p class="textBox">
            <span class="lable">联系号码：</span>
            <span class="txt">15299999999</span>
        </p>
        <div class="title">收款方式</div>
        <p class="textBox">
            <span class="lable">选择银行：</span>
            <span class="txt">
                <checker v-model="checker" default-item-class="checker-item" selected-item-class="checker-item-selected">
                  <checker-item v-for="(item,index) in list" :key="index" :value="item.value">
                      <span class="iconfont" v-if="checker == item.value">&#xe65c;</span>
                      <span class="iconfont" v-else>&#xe651;</span>
                      {{item.type}}
                  </checker-item>
                </checker>
            </span>
        </p>
        <p class="textBox">
            <span class="lable">收款银行：</span>
            <span class="txt">{{list[checker].bankName}}</span>
            <x-button class="XButton"
                      v-clipboard:copy="list[checker].bankName"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
            >复制</x-button>
        </p>
        <p class="textBox">
            <span class="lable">收款名称：</span>
            <span class="txt">{{list[checker].name}}</span>
            <x-button class="XButton"
                      v-clipboard:copy="list[checker].name"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
            >复制</x-button>
        </p>
        <p class="textBox">
            <span class="lable">收款账号：</span>
            <span class="txt">{{list[checker].bankNumber}}</span>
            <x-button class="XButton"
                      v-clipboard:copy="list[checker].bankNumber"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
            >复制</x-button>
        </p>
        <x-button class="XButton all"
                  v-clipboard:copy="copyAll"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
        >复制全部</x-button>
    </div>
</template>

<script>
    import { XButton, Checker, CheckerItem } from "vux"
    export default {
        name: "recharge",
        components:{ XButton, Checker, CheckerItem },
        data(){
            return {
                checker:0,
                list:[
                    {
                        value:0,
                        type:"招商银行",
                        bankName:"招商银行",
                        name:"asdadas",
                        bankNumber:"2222",
                    },
                    {
                        value:1,
                        type:"招商银行1",
                        bankName:"招商银行1",
                        name:"asdadas1",
                        bankNumber:"11111",
                    }
                ]
            }
        },
        computed:{
            copyAll(){
                const data =  this.list[this.checker];
                return `收款银行：${data.bankName}\n
                         收款名称：${data.name}\n
                         收款账号：${data.bankNumber}`;
            }
        },
        methods:{
            onCopy(){
                this.$vux.toast.text("复制成功！");
            },
            onError(){
                this.$vux.toast.text("复制失败！");
            }
        }
    }
</script>

<style scoped lang="less">
.Recharge{
    padding:@pa;
    text-align: left;
    line-height: 40px;
    overflow: hidden;
    .title{
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        font-weight: bold;
    }
    .textBox{
        font-size: 14px;
        position: relative;
        .lable{
            color: #999;
        }
        .kefu{
            background-color: #afe4fd;
            padding: 0 @pa;
            line-height: 20px;
            border-radius: 5px;
            display: inline-block;
            .iconfont{
                color: #5383ff;
                margin-right: @mg;
                font-size: 18px;
                line-height: 40px;
            }
        }
        .XButton{
            width: auto;
            float: right;
            position: absolute;
            right: 0;
            top: 0;
            line-height: 30px;
            font-size: 12px;
            cursor: pointer;
            &:hover{
                background-color: #e5e5e5;
            }
        }
        .checker-item{
            margin-right: 30px;
            line-height: 30px;
            cursor: pointer;
            .iconfont{
                font-size: 18px;
                float: left;
                margin-right: 10px;
                font-weight: bold;
                color: #999;
            }
            &:active{
                background-color: transparent;
            }
        }
        .checker-item-selected{
            .iconfont{
                color: #ff6c00;
            }
        }
    }
    .all{
        float: right;
        width: 100px;
        background-color: #ff6c00;
        color: #ffffff;
        margin-top: 30px;
        cursor: pointer;
    }
}
</style>