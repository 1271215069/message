<template>
    <div class="SystemMessageDetails console-PagePadding">
        <div class="console-card">
            <div class="console-PageTitleV2">
                <span>消息中心</span><ul class="left"><li @click="back">返回上级</li></ul>
            </div>
            <div class="content">
                <h1 class="t1">【更新通知】253云通讯4.9.28版本更新</h1>
                <h3 class="t2">2018-04-27 10:45:04</h3>
                <div class="textssss">
                    sdfsdf
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "system-message-details",
        methods:{
            back(){
                this.$router.back();
            }
        }
    }
</script>

<style scoped lang="less">
.SystemMessageDetails{
    .content{
        text-align: center;
        .t1{
            margin-top: 40px;
        }
        .t2{
            font-weight: initial;
            border-bottom: 1px solid #ccc;
            padding-bottom: 30px;
            margin-top: 20px;
        }
        .textssss{
            color: #666;
            text-align: left;
        }
    }
}
</style>