<template>
    <div class="UserData console-PagePadding">
        <p class="console-PageTitle">我的收藏</p>
        <div class="cardList">
            <div class="card" v-for="i in 5">
                <z-flexbox>
                    <z-flexbox-item span="80px">
                        <div slot="left" class="icon">
                            <div class="iconfont">&#xe62c;</div>
                        </div>
                        <div>
                            <p class="textNowrap">短信API服务</p>
                            <div>￥<span>9.00</span>/121次</div>
                            <div><span class="iconfont">&#xe62d;</span><span>200次</span></div>
                        </div>
                    </z-flexbox-item>
                </z-flexbox>
                <div class="close iconfont">&#xe62f;</div>
            </div>
        </div>
        <paging :pages="40" @on-change="change" :select="2"></paging>
    </div>
</template>

<script>
    import { XButton } from "vux"
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    import Paging from "../../components/Paging";
    export default {
        name: "user-data",
        components:{
            Paging,
            ZFlexboxItem,
            ZFlexbox,
            XButton },
        data(){
            return {
                a:123
            }
        },
        methods:{
            change(item){
                // console.log(item.value)
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.UserData{
    .cardList{
        overflow: hidden;
        .card{
            background-color: @cor_ffffff;
            border-radius: 5px;
            border:1px solid @col-999999;
            padding: @pa;
            width: 280px;
            color: @col-999999;
            position: relative;
            float: left;
            margin-right: @mg;
            margin-bottom: @mg;
            .icon{
                .iconfont{
                    font-size: 50px;
                    width: 50px;
                    text-align: center;
                    display: block;
                }
            }
            p{
                font-size: 20px;
                font-weight: bold;
            }
            div{
                font-size: 14px;
            }
            span{
                color: @col-ff3333;
                &.iconfont{
                    margin-right: @mg;
                }
            }
            .close{
                position: absolute;
                right: @mg;
                top: @mg;
                width: 30px;
                height: 30px;
                font-size: 30px;
                overflow: hidden;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                &:hover{
                    color: @col-ff3333;
                }
            }
            &:hover{
                background-color: @cor_ffffff*0.99;
                border-color: @themeColor;
            }
        }
    }
}
</style>