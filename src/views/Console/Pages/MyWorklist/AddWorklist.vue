<template>
    <div class="addworklist">
        <div class="console-card">
            <div class="console-PageTitleV2">
                创建新工单
                <ul class="left">
                    <li @click="$router.back()">返回上级</li>
                </ul>
            </div>
            <div class="content">
                <div class="addcontent">
                    <z-flexbox>
                        <z-flexbox-item class="row" span="150px">
                            <div slot="left" class="UserEditAppBox—left"><span class="titleicon">*</span>&nbsp; 标题：</div>
                            <div class="UserEditAppBox—right">
                                <input type="text" v-model="alldata.title" placeholder="最多不超过30个字">
                            </div>
                        </z-flexbox-item>
                        <z-flexbox-item class="row" span="150px">
                            <div slot="left" class="UserEditAppBox—left">手机号码：</div>
                            <div class="UserEditAppBox—right">
                                <input type="text" v-model="alldata.tel" placeholder="输入手机号码">
                            </div>
                        </z-flexbox-item>
                        <z-flexbox-item class="row" span="150px">
                            <div slot="left" class="UserEditAppBox—left">咨询模块：</div>
                            <group gutter="0" class="UserEditAppBox—right">
                                <selector class="addselect" v-model="alldata.mk" :options="selectlist"></selector>
                            </group>
                        </z-flexbox-item>
                        <z-flexbox-item class="row" span="150px">
                            <div slot="left" class="UserEditAppBox—left"><span class="titleicon">*</span>&nbsp; 问题描述：</div>
                            <div class="UserEditAppBox—right">
                                <textarea class="addarea" placeholder="输入问题描述" v-model="alldata.ms"></textarea>
                            </div>
                        </z-flexbox-item>
                    </z-flexbox>
                    <span class="btn" @click.prevent="subtn">确认提交</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import consoleVue from "../../components/index"
import { Selector,Group } from 'vux'
export default {
    name:"addworklist",
    components:{Selector,Group,...consoleVue},
    data(){
        return{
            alldata:{
                title:"",
                tel:"",
                mk:"",
                ms:""
            },
            selectlist:["Api试用","Api试用"]
        }
    },
    methods:{
        subtn(){//点击确认提交的方法
            
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.addworklist{
    box-sizing: border-box;
    padding: 0 20px;
    .addcontent{
        background: #fff;
        box-sizing: border-box;
        padding: 25px 0;
        .btn{
            margin-left: 150px;
            background: @col-ff6600;
            color: #fff;
            font-size: 16px;
            display: inline-block;
            line-height: 32px;
            padding: 0 30px;
            margin-top: 30px;
        }
        &/deep/ .row{
               line-height: 40px;
               margin-bottom: 10px;
               &/deep/ .UserEditAppBox—right{
                  input{
                      border: 1px solid @col-999999;
                      line-height: 32px;
                      box-sizing: border-box;
                      padding: 0 7px;
                      width: 450px;
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
                  .addarea{
                      box-sizing: border-box;
                      border:1px solid @col-999999;
                      display: block;
                      padding: 8px;
                      width: 450px!important;
                      height :100px!important;
                      font-size: 14px;
                      resize: none;
                      margin-top: 5px!important;
                  }
                  .addselect{
                      width: 250px;
                      height: 30px;
                      border: 1px solid @col-999999;
                      line-height: 32px;
                      margin-top: 7px;
                  }
                  &/deep/ .weui-select{
                      line-height: 32px;
                      height:32px;
                  }
               }
               &/deep/ .UserEditAppBox—left{
                   text-align: right;
                   .titleicon{
                       color: #FF4B4B;
                   }
               }
           }
    }
}
</style>
