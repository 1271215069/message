<template>
    <div class="Address console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">地址管理</div>
            <div class="content">
                <div class="AddressCard select">
                    <p class="t1"><span>宁波市</span>（张山 收）</p>
                    <p class="t2">宁波市 高新区 详细地址 187777777</p>
                    <p class="t3"><span class="b1">修改</span><span class="b2">删除</span></p>
                    <i class="icon"></i>
                </div>
                <div class="AddressCard">
                    <p class="t1"><span>宁波市</span>（张山 收）</p>
                    <p class="t2">宁波市 高新区 详细地址 187777777</p>
                    <p class="t3"><span class="b1">修改</span><span class="b2">删除</span></p>
                    <i class="icon"></i>
                </div>
                <div class="AddressCard">
                   <div class="btn">新增地址</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "account-address"
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.Address{
    .content{
        overflow: hidden;
        padding-bottom: 0;
        @h:100px;
        .AddressCard{
            font-size: 14px;
            border:2px solid #CCCCCC;
            width: 350px;
            height: @h;
            padding: @pa;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            float: left;
            margin-bottom:@pa;
            margin-right: @pa;
            .t1{
                color: #666;
                span{
                    color: #000000;
                    font-weight: bold;
                }
            }
            .t2{
                max-height: 40px;
                margin: @mg 0;
                overflow: hidden;
                color: #666;
            }
            .t3{
                span{
                    margin-right: @pa;
                    &.b1{
                        color: @col-00ccff;
                    }
                    &.b2{
                        color: #CCCCCC;
                        &:hover{
                            color: #f00;
                        }
                    }
                }
            }
            .icon{
                position: absolute;
                right: -25px;
                bottom: 0;
                background-color: @themeColor;
                width: 50px;
                height: 50px;
                transform: skewX(-45deg);
                display: none;
                &:before{
                    content: '';
                    position: absolute;
                    left: 11px;
                    top: 24px;
                    transform:rotate(25deg) skewX(45deg);
                    width: 10px;
                    height: 10px;
                    border-right: 3px solid @cor_ffffff;
                    border-bottom:3px solid @cor_ffffff;
                }
            }
            &:hover{
                border-color: @themeColor;
            }
            &.select{
                border-color: @themeColor;
                .icon{
                    display: block;
                }
            }
            .btn{
                color: @col-00ccff;
                text-align: center;
                line-height: @h;
            }
        }
    }
}
</style>