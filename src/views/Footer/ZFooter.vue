<template>
    <div class="ZFooter" id="ZFooter">
        <div class="footerBox">
            <flexbox class="footerBoxRow">
                <flexbox-item class="vux-1px-r rowObj">
                    <span class="iconfont">&#xe767;</span>服务咨询 4008-123-106
                </flexbox-item>
                <flexbox-item class="vux-1px-r rowObj">
                    <span class="iconfont">&#xe66c;</span>一对一 贵宾级服务
                </flexbox-item>
                <flexbox-item class="rowObj">
                    <span class="iconfont">&#xe67e;</span>7X24小时技术保障
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item v-for="(item,index) in footerData" :key="index">
                    <div class="title">{{item.title}}</div>
                    <ul class="footerList">
                        <li  v-for="itemList in item.menus" @click="go(itemList)">{{itemList.name}}</li>
                    </ul>
                </flexbox-item>
                <flexbox-item>
                    <div class="title qr_title">微信公众号</div>
                    <div class="footerList qr_content">
                        <p class="qr_text">易网互联106</p>
                        <img class="qr_img" :src="require('@/assets/img/footer/qr.jpg')">
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <p class="copyright">Copyright © 2018-2019 <a href="http://ywhl106.com">ywhl106.com </a>易网互联（北京）科技有限公司上海分公司  版权所有 浙ICP备 18050952 号-1</p>
    </div>
</template>

<script>
    import footerData from "./footerData"
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "z-footer",
        data(){
          return {
              footerData:footerData
          }
        },
        components:{ Flexbox, FlexboxItem },
        methods:{
            go(item){
                if(item.link){
                    this.$router.push(item.link);
                }
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.ZFooter{
    background-color: #f3f5f8;
    padding-top: 50px;
    .footerBox{
        width: @layoutInitWidth;
        text-align: left;
        margin: auto;
        .title{
            color: #666;
            font-size: 18px;
            position: relative;
            &:before{
                content: '';
                position: absolute;
                left: -20px;
                width: 10px;
                height: 10px;
                background-color: @themeColor;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .footerList{
            margin-top: @pa;
            min-height: 200px;
            li{
                font-size: 14px;
                cursor: pointer;
            }
        }
        .qr_title{
            text-align: right;
            font-weight: initial;
            font-size: 18px;
            &:before{
                background-color: transparent;
            }
        }
        .qr_content{
            margin-top: 0;
            padding-bottom: @pa;
            .qr_text{
                text-align: right;
                color: #666;
                font-size: 14px;
            }
            .qr_img{
                width: 60%;
                margin-left: 40%;
            }
        }
        .footerBoxRow{
            margin-bottom: 20px;
            border-bottom: 1px solid #999999;
            padding-bottom: 20px;
            .rowObj{
                line-height: 50px;
                overflow: hidden;
                .iconfont{
                    font-size: 30px;
                    float: left;
                    margin-right: 15px;
                    margin-left: 15px;
                    font-weight: bold;
                }
            }
        }
    }
    .copyright{
        width: @layoutInitWidth;
        margin: auto;
        margin-top: @pa;
        border-top: 1px solid @col-D9D9D9;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
}
</style>