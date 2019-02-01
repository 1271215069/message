<template>
    <div class="UserDataCard" :style="{marginRight:ma}">
        <div class="UserDataCardContent" v-if="type != 'add'">
            <div class="UserDataCardLeft">
                <div class="UserDataCardLeftContent">
                    <img class="img" :src="require('@/assets/img/about/bj.png')">
                </div>
            </div>
            <div class="UserDataCardRight">
                <div class="title">历史天气</div>
                <div>申请时间 2018-10-15</div>
                <div>剩余 <span>500</span>次</div>
                <div class="btn">立即续费</div>
            </div>
        </div>
        <div v-else class="UserDataCardContent add">
            <div class="iconfont addIcon">&#xe60d;</div>
            <x-button class="addBtn">申请一个新数据</x-button>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XButton } from "vux"
    export default {
        name: "user-data-card",
        props:{
            ma:{
                type:String,
                default:"0px"
            },
            type:String
        },
        components:{ Flexbox, FlexboxItem, XButton }
    }
</script>

<style scoped lang="less">
@import "../../../assets/css/vars";
.UserDataCard{
    background-color: @cor_ffffff;
    border-radius: 5px;
    @mediaWidth:1650px;
    .UserDataCardContent{
        padding: @pa;
        overflow: hidden;
        @w:100px;
        position: relative;
        .UserDataCardLeft{
            width:@w;
            position: absolute;
            height: 100%;
            top: 0;
            .UserDataCardLeftContent{
                position: absolute;
                height: 100%;
                left: 0;
                top: 0;
                width: 100%;
                .img{
                    width: 100%;
                    height: @w;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
            }
        }
        .UserDataCardRight{
            float: left;
            margin-left: @w + @pa;
            color: @col-999999;
            font-size: 14px;
            .title{
                font-size: 18px;
                margin-bottom: @mg;
            }
            span{
                color: @themeColor;
            }
            .btn{
                color: @col-00ccff;
                cursor: pointer;
                line-height: 40px;
                @media ( min-width: @mediaWidth) {
                    position: absolute;
                    right: @pa;
                    top: @pa;
                    text-align: center;
                    border-left: 1px solid @col-D8D8D8;
                    line-height: @w;
                    width: @w;
                    height: @w;
                }
            }
        }
        @media ( max-width: @mediaWidth) {
            height: 144px;
        }
        &.add{
            cursor: pointer;
            height: 144px;
            overflow: hidden;
            @media ( min-width: @mediaWidth) {
                height: 82px;
            }
            .addIcon{
                text-align: center;
                font-size: 50px;
                margin-bottom: @mg;
                color: @themeColor;
                line-height: 90px;
                @media ( min-width: @mediaWidth) {
                    line-height: 50px;
                }
            }
            .addBtn{
                border-radius: 0;
                background-color: @themeColor;
                border:none;
                color: @cor_ffffff;
                font-size: 14px;
                height: 40px;
                width: 120px;
                line-height: 40px;
                @media ( min-width: @mediaWidth) {
                    height: 30px;
                    width: 200px;
                    line-height: 30px;
                }
                &:after{
                    border: none;
                }
            }
        }

    }
}
</style>