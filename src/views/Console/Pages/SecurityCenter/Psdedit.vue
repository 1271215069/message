<template>
    <div class="Psdedit">
        <p class="console-PageTitle">密码修改</p>
        <div class="psdeditcontainer">
            <div class="psdeditcontent">
                <z-flexbox>
                    <z-flexbox-item class="row" span="150px">
                        <div slot="left" class="UserEditAppBox—left">用户名：</div>
                        <div class="UserEditAppBox—right">
                            {{username}}
                        </div>
                    </z-flexbox-item>
                    <z-flexbox-item class="row" span="150px">
                        <div slot="left" class="UserEditAppBox—left">原始密码：</div>
                        <div class="UserEditAppBox—right">
                            <input type="text" v-model="ypsd">
                        </div>
                    </z-flexbox-item>
                    <z-flexbox-item class="row" span="150px">
                        <div slot="left" class="UserEditAppBox—left">新建密码：</div>
                        <div class="UserEditAppBox—right">
                            <input type="text" v-model="xpsd">
                        </div>
                    </z-flexbox-item>
                    <z-flexbox-item class="row" span="150px">
                        <div slot="left" class="UserEditAppBox—left">确认密码：</div>
                        <div class="UserEditAppBox—right">
                            <input type="text" v-model="qpsd">
                        </div>
                    </z-flexbox-item>
                    <z-flexbox-item class="row" span="150px">
                        <div slot="left" class="UserEditAppBox—left">&nbsp </div>
                        <div class="UserEditAppBox—right">
                            <span class="btn" @click.prevent="checkbtn">确定</span>
                        </div>
                    </z-flexbox-item>
                </z-flexbox>
            </div>
        </div>
    </div>
</template>
<script>
import consoleVue from "../../components/index"
import ZFlexboxItem from "../../components/ZFlexboxItem";
export default {
    namr:"psdedit",
    components:{ZFlexboxItem,...consoleVue},
    data(){
        return{
            username:"15912345555",
            ypsd:"",
            xpsd:"",
            qpsd:"",
        }
    },
    methods:{
        checkbtn(){
            let pwdzz = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
            if(this.ypsd==""){
                this.$vux.toast.text("原密码不能为空");
                return;
            }
            if(this.xpsd==""){
                this.$vux.toast.text("新密码不能为空");
                return;
            }
            if (!pwdzz.test(this.xpsd)){
                this.$vux.toast.text("请输入8到16位数字与字母的新密码！")
                return;
            }
            if(this.qpsd==""){
                this.$vux.toast.text("确认密码不能为空");
                return;
            }
            if(this.qpsd!=this.xpsd){
                this.$vux.toast.text("确认密码必须与新密码一致");
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.Psdedit{
    box-sizing: border-box;
    padding: 0 20px;
    .psdeditcontainer{
        border-top:1px solid @col-999999;
        .psdeditcontent{
            background: #fff;
            box-sizing: border-box;
            padding: 25px 0;
            margin-top: 20px;
            &/deep/ .row{
               line-height: 40px;
            //    padding: 5px 0;
               &/deep/ .UserEditAppBox—right{
                  input{
                      border: 1px solid @col-999999;
                      line-height: 27px;
                      box-sizing: border-box;
                      padding: 0 7px;
                      width: 250px;
                  }
                  .btn{
                      display: inline-block;
                      color: #fff;
                      background: @col-ff6600;
                      line-height: 35px;
                      padding: 0 25px;
                      margin-top: 20px;
                      cursor: pointer;
                  }
               }
               &/deep/ .UserEditAppBox—left{
                   text-align: right;
               }
           }
        }
    }
}
</style>
