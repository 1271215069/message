<template>
    <div class="AddData">
        <div class="title">新建数据</div>
        <div class="content">
            <div class="MenusLeft">
                <div class="MenusLeft_Left">
                    <div class="MenusLeft_Left_Box">
                        <ul>
                            <li @click="clickLeft(item,index)" :class="{select:item.select}" v-for="(item,index) in list">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="MenusLeft_Content">
                    <div class="iconfont"> &#xe60e;</div>
                </div>
                <div class="MenusLeft_right">
                    <div class="MenusLeft_Right_Box">
                        <ul>
                            <li @click="clickRight(item,index)" :class="{select:item.select}" v-for="(item,index) in listChild">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="MenusRight">
                <p>当前选择的数据为： {{value[0].name}}<span v-if="value[1].name"> > {{value[1].name}}</span></p>
                <div class="msg" v-if="value[1].name">
                    <span class="mintitle">初始赠送：</span>
                    <span v-if="value[1].type == 'free'">{{value[1].index}}次</span>
                    <span v-else-if="value[1].type == 'charge'">免费使用（根据会员等级不同，每日可调用次数不同）</span>
                    <span v-else>0次</span>
                </div>
                <x-button class="btn" v-if="value[1].name">立即申请</x-button>
                <div class="msgText">
                    <p>* 次数调用类API在成功申请日起，需要在2个月内提交认证审核，否则可能会影响调用！</p>
                    <p>* 如需要延长审核期限，请于工作日与我们的在线客服联系！</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vue from "vue"
    import { Flexbox, FlexboxItem, XButton } from "vux"
    export default {
        name: "add-data",
        components:{ Flexbox, FlexboxItem, XButton },
        data(){
            return {
                list:[
                    {
                        name:"分类A",
                        data:[
                            {name:"菜单A",type:"free",index:500},
                            {name:"菜单A2",type:"charge"},
                        ],
                    },
                    {
                        name:"分类B",
                        data:[
                            {name:"菜单B-1"},
                            {name:"菜单B-2"},
                            {name:"菜单B-3"},
                            {name:"菜单B-4"},
                            {name:"菜单B-5"},
                            {name:"菜单B-6"},
                        ],
                    },
                    {
                        name:"分类C",
                        data:[
                            {name:"菜单C-1"},
                            {name:"菜单C-2"},
                            {name:"菜单C-3"},
                            {name:"菜单C-4"},
                            {name:"菜单C-5"},
                            {name:"菜单C-6"},
                        ],
                    },
                    {
                        name:"分类D",
                        data:[
                        ],
                    },
                ],
                listChild:[],
                select:0,
                parentIndex:0,
                value:[{},{}]
            }
        },
        methods:{
            /**
             * @change 选中的菜单
             * @Param type { object } 选中的分类
             * @Param menu { object|null } 选中的分类菜单
             */
            change(type, menu){
                if(!type){
                    type = {};
                };
                if(!menu){
                    menu = {};
                };
                this.value = [type,menu];
            },
            init(index1,index2,Bool){
                if(!Bool){
                    this.parentIndex = index1;
                    this.list[index1].select = true;
                    vue.set(this.list,index1,this.list[index1]);
                    try {
                        this.list[index1].data[index2].select = true;
                        this.listChild = this.list[index1].data;
                        this.change(this.list[index1],this.list[index1].data[index2]);
                    }catch (e){
                        this.listChild = [];
                        this.change(this.list[index1],null);
                    }
                    return;
                }
                this.listChild = this.listChild.map(e=>{
                    e.select = false;
                    return e;
                });
                this.listChild[index2].select = true;
                vue.set(this.listChild,index2,this.listChild[index2]);
                this.change(this.list[this.parentIndex],this.listChild[index2]);
            },
            clickLeft(item,index){
                this.list = this.list.map(e=>{
                    e.select = false;
                    return e;
                });
                item.data = item.data.map(c=>{
                    c.select = false;
                    return c;
                });
                this.init(index,0);
            },
            clickRight(item,index){
                this.init(null,index,true);
            }
        },
        mounted(){
           this.init(this.select,this.select);
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.AddData{
    padding:0 @pa;
    .title{
        color: @themeColor;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .content{
        background-color: @cor_ffffff;
        padding: @pa;
        overflow: hidden;
        .MenusLeft{
            float: left;
            width: 600px;
            overflow: hidden;
            margin-right: 100px;
            margin-bottom: @pa;
            @h:400px;
            .MenusLeft_Left{
                overflow: hidden;
                float: left;
                width: 240px;
                height: @h;
                background-color: #ffcc99;
                .MenusLeft_Left_Box{
                    width: 260px;
                    height: @h;
                    overflow: auto;
                    padding-right: 100px;
                    ul{
                        padding: @pa 0;
                        li{
                            color: #666666;
                            padding: 0 @pa;
                            line-height: 30px;
                            font-size: 16px;
                            cursor: pointer;
                            &:hover{
                                background-color: #ffcc99*0.7;
                                color: @cor_ffffff;
                            }
                            &.select{
                                background-color: @themeColor;
                                color: @cor_ffffff;
                            }
                        }
                    }
                }
            }
            .MenusLeft_Content{
                float: left;
                width: 120px;
                height: @h;
                .iconfont{
                    color: @col-999999;
                    font-size: 80px;
                    text-align: center;
                    line-height:@h;
                }
            }
            .MenusLeft_right{
                overflow: hidden;
                float: left;
                width: 240px;
                height: @h;
                background-color: #f3f5f8;
                .MenusLeft_Right_Box{
                    .MenusLeft_Left.MenusLeft_Left_Box;
                    ul{
                        li{
                            &:hover{
                                background-color: #f3f5f8*0.7;
                                color: @cor_ffffff;
                            }
                            &.select{
                                background-color: @col-00ccff;
                                color: @cor_ffffff;
                            }
                        }
                    }
                }
            }
        }
        .MenusRight{
            float: left;
            color: @col-999999;
            font-size: 14px;
            .msg{
                margin: @pa 0;
                .mintitle{
                    font-weight: bold;
                    margin-left: 50px;
                }
            }
            .btn{
                border:none;
                border-radius: 0;
                background-color: @col-00ccff;
                color: @cor_ffffff;
                width: 120px;
                line-height: 30px;
                font-size: 14px;

                margin-left: 125px;
                &:hover{
                    background-color: @col-00ccff / 0.9;
                    cursor: pointer;
                }
                &:after{
                    border:none;
                }
            }
            .msgText{
                margin-top: 50px;
                color: #f00;
            }
        }
    }
}
</style>