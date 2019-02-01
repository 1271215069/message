<template>
    <div class="soluTIon">
        <img class="bj" :src="require('@/assets/img/soluTIon/bj.png')">
        <div class="bj2" :style="{width:i*size+'px',height:i*size+'px'}" v-for="i in 7"></div>
        <h1 class="title">每一次连接 都是互动</h1>
        <ul class="content" :style="{width:7*size+'px',height:7*size+'px'}">
            <li class="row1">[验证码短信]<span class="iconfont">&#xe606;</span></li>
            <li class="row2">[行业短信]<span class="iconfont">&#xe608;</span></li>
            <li class="row3"><span class="iconfont">&#xe607;</span>[营销短信]</li>
            <!-- <li class="row4"><span class="iconfont">&#xe607;</span>[合作伙伴]</li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        name: "solu-t-ion",
        data(){
            return {
                size:80
            }
        },
        mounted(){
            this.$utils.particleAnimations("rgba(255,255,255,0.08)");
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.soluTIon{
    .bj{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .bj2{
        position: fixed;
        left: 50%;
        top: 50%;
        top:~"calc((100% + 60px)/2)";
        transform: translate(-50%, -50%);
        border-radius: 100%;
        z-index: 1;
        border:1px dashed #fff;
    }
    .content{
        .bj2;
        color: #fff;
        z-index: 2;
        border-radius: 100%;
        li{
            font-size:20px;
            @index:80px;
            line-height: @index;
            cursor: pointer;
            @keyframes aa {
                0%{
                    transform: scale(1);
                }
                100%{
                    transform: scale(1.5);
                }
            }
            &:hover{
                transform: scale(1.5);
                animation: aa ease-in-out .5s;
                span{
                    box-shadow: 0 0 10px #e5e5e5;
                }
            }
            span{
                width: @index;
                height: @index;
                display: inline-block;
                background-color: @themeColor;
                border-radius: 100%;
                margin-left: 30px;
                text-align: center;
                font-size: @index/2;
            }
            &.row1{
                position: absolute;
                top: 4%;
                left: -14%;
            }
            &.row2{
                position: absolute;
                bottom: 4%;
                left: -12%;
            }
            &.row3{
                position: absolute;
                top: 40%;
                right: -29%;
                span{
                    margin-left: 0;
                    margin-right: 30px;
                }
            }
            &.row4{
                .row3;
                top: initial;
                bottom: 20%;
                right: -22%;
            }
        }
    }
    .title{
        color: #fff;
        position: relative;
        z-index: 100;
        width: 100%;
        text-align: center;
        font-weight: initial;
        font-size: 50px;
        margin-top: 50px;
    }
}
</style>