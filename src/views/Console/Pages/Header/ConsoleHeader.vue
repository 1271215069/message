<template>
    <div class="ConsoleHeader">
        <div class="ConsoleHeaderContent">
            <!-- <x-input class="input" placeholder="请输入关键字" :show-clear="false">
                <div slot="right" class="iconfont" @click="showInput">&#xe600;</div>
            </x-input> -->
            <span class="out iconfont" @click.prevent="loginout">&#xe697;</span>
            <ul class="menu">
                <li @click.prevent="go">欢迎，{{username}}</li>
                <!-- <li>用户名称</li>
                <li>常见问题</li>
                <li class="last">联系我们</li> -->
            </ul>
        </div>
    </div>
</template>

<script>
    import { XInput } from "vux"
    export default {
        name: "console-header",
        components:{ XInput },
        data(){
            return{
                
            }
        },
        methods:{
            showInput(){
                
            },
            go(){
                this.$router.push('/Uinfo');
            },
            loginout(){
                this.action({
                    moduleName:'logout',
                    url:"logout",
                    method:"post",
                    isFormData:true,
                    headers: {'XX-token': this.airforce.login.data.token,},
                    data:{}
                }).then(res=>{
                    if(res.code==20000){
                        delete localStorage.login;
                        this.action({
                            moduleName:"login",
                            goods:{
                                code:null,
                                data:null,
                            }
                        });
                        this.$router.push("/Login");
                    }else{
                        this.$vux.toast.text(res.msg)
                    }
                }).catch(err=>{})
            }
        },
        computed:{
            username(){
                if(!this.airforce.login.data.user.name==""){
                    return this.airforce.login.data.user.name;
                }else if(!this.airforce.login.data.user_email==""){
                    return this.airforce.login.data.user.user_email;
                }else if(!this.airforce.login.data.user.mobile==""){
                    return this.airforce.login.data.user.mobile;
                }
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.ConsoleHeader{
    height: @headerHeight;
    @index:30px;
    overflow: hidden;
    margin-bottom: @pa;
    .ConsoleHeaderContent{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 101;
        width: 100%;
        background-color: @cor_ffffff;
        height: @headerHeight;
        overflow: hidden;
        border-left: 1px solid @col-D8D8D8;
        border-bottom: 1px solid  @col-D8D8D8;
        box-shadow: 0 2px 2px @col-D8D8D8;
        .input{
            background-color: #cccccc;
            line-height: @index;
            border-radius: @index/2;
            padding: 0 15px;
            width: 200px;
            margin-top: (@headerHeight - @index) / 2;
            float: left;
            margin-left: @pa;
            .iconfont{
                border:none;
            }
        }
        .out{
            display: block;
            float: right;
            line-height: 61px;
            padding: 0 25px;
            cursor: pointer;
        }
        .out:hover{
            color: red;
        }
        .menu{
            float: right;
            overflow: hidden;
            li{
                float: left;
                line-height: @headerHeight;
                border-right: 1px solid @col-D8D8D8;
                padding: 0 @mg;
                cursor: pointer;
                &.last{
                    border:none;
                }
                &:hover{
                    background-color: @col-D8D8D8;
                    color: @consoleColor;
                    border-bottom: 2px solid @consoleColor;
                    line-height: @headerHeight - 2px;
                }
            }
        }
    }
}
</style>