<template>
    <div class="dxfsdrdwj">
        <div class="linetext">
            <span class="title">第 1 步：</span>
            <div class="content">
                请先<span class="download">下载模板</span>，按说明填写信息后上传
            </div>
        </div>
        <div class="linetext">
            <span class="title">第 2 步：</span>
            <div class="content updatabox">
                <div>导入文件</div> 
                <div class="updata">
                    <input type="file">
                    <span>上传</span>
                </div>
                <div class="sign" v-if="hint.show">{{hint.text}}</div>
            </div>
        </div>
        <div class="linetext">
            <span class="title">&nbsp;</span>
            <div class="content">
                <p>* <span>点击确认按钮开始上传</span></p>
                <p>* 文件大小 <span class="emphasize"><1MB</span></p>
                <p>* 支持<span class="emphasize">txt文本(utf-8编码格式)、csv/xls/xlsx</span>文档</p>
            </div>
        </div>
        <div class="btnlist">
            <span @click="checked">确认</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"dxfsdrdwj",
    data(){
        return{
            hint:{
                show:false,
                text:"文件大小不能大于1M",
            },
        }
    },
    methods:{
        checked(){//点击确认按钮的方法
            this.$ZAlert.hide();
            this.$ZAlert.show({
                    components:"Console/Pages/alert/Hmcxq",
                    width:"1000px",
                    title:"号码池详情"
                });
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.dxfsdrdwj{
    padding: 30px 0;
    .linetext{
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        color: #666;
        font-size: 14px;
        .title{
            display: block;
            float: left;
            width: 60px;
            line-height: 36px;
        }
        .content{
            float: left;
            line-height: 36px;
            .download{
                color: @col-ff6600;
                cursor: pointer;
                border-bottom: 1px solid  @col-ff6600;
            }
            p:nth-child(1){
                margin-top: 15px;
            }
            p{
                text-align: left;
                font-size: 12px;
                line-height: 25px;
                .emphasize{
                    color: #ff9400;
                }
                span{
                    color: #ff2b2b;
                }
            }
        }
        .updatabox{
            display: flex;
            flex-wrap: wrap;
                .updata{
                     margin-left: 10px;
                    
                     position: relative;
                    span{
                        display: block;
                        line-height: 36px;
                        background: @col-ff6600;
                        color: #fff;
                        padding: 0 15px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 2;
                        width: 28px;
                        cursor: pointer;
                    }
                    input{
                        display: block;
                        height: 36px;
                        width: 58px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 3;
                        opacity: 0;
                        cursor: pointer;
                    }
                }
                .sign{
                    margin-left: 58px;
                    padding-left: 10px;
                    font-size: 12px;
                }
            }
    }
    .linetext:nth-child(1){
        margin-bottom: 20px;
    }
    .btnlist{
        span{
            display: inline-block;
            line-height: 36px;
            padding: 0 20px;
            margin: 0 auto;
            background: @col-ff6600;
            color: #fff;
            margin-top: 30px;
            cursor: pointer;
        }
    }
}
</style>
