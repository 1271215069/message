<template>
    <div class="Menus" :class="{children:!logoShow}">
        <div class="logo" @click="go" v-if="logoShow">
            <img :src="require('@/assets/img/logo/logo.png')" alt="">
        </div>
        <div class="content" v-if="logoShow">
            <ul class="list">
                <li :class="{select:item.keyName == airforce.layout.ConsoleLayout.keyName}" v-for="item in menusData" :style="{marginLeft:maIndex+'px'}">
                    <span @click="itemClick(item,menus)" v-if="item.icon" v-html="item.icon" :style="{fontSize:item.fontSize}" class="iconfont icon">●</span>
                    <span @click="itemClick(item,menus)" v-else>●</span>
                    <span @click="itemClick(item,menus)">{{item.name}}</span>
                    <span @click="itemClick(item,menus)" class="iconfont xiala" v-if="item.children && item.children.length">&#xe60a;</span>
                    <menus v-if="item.children && item.show" :menus="item.children" :logoShow="false" :maIndex="maIndex + ma"></menus>
                </li>
            </ul>
        </div>
        <ul v-else class="list">
            <li :class="{select:item.keyName == airforce.layout.ConsoleLayout.keyName}" v-for="item in menus" class="child" :style="{marginLeft:maIndex+'px'}">
                <span @click="itemClick(item,menus)" v-if="item.icon" v-html="item.icon" :style="{fontSize:item.fontSize}" class="iconfont icon">●</span>
                <span @click="itemClick(item,menus)" v-else>●</span>
                <span @click="itemClick(item,menus)">{{item.name}}</span>
                <span @click="itemClick(item,menus)" class="iconfont xiala" v-if="item.children && item.children.length">&#xe60a;</span>
                <menus  v-if="item.children && item.show" :menus="item.children" :logoShow="false" :maIndex="maIndex"></menus>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "menus",
        props:{
            logoShow:{
              type:Boolean,
              default:true,
            },
            maIndex:{
              type:Number,
              default:0,
            },
            ma:{
              type:Number,
              default:32,
            },
            menus:{
                type:Array,
                default:()=>[
                    // {name:"a1",select:true},
                    // {name:"a2",icon:"&#xe608;"},
                    // {name:"a3",icon:"&#xe608;",children:[]},
                    // {name:"a4",icon:"&#xe608;",show:true,children:[
                    //         {name:"a4-1"},
                    //         {name:"a4-2"},
                    //         {name:"a4-3"},
                    //         {name:"a4-4",icon:"&#xe608;",children:[
                    //                 {name:"a4-4-1"},
                    //                 {name:"a4-4-2"},
                    //                 {name:"a4-4-3"},
                    //                 {name:"a4-4-5",icon:"&#xe608;",children:[
                    //                         {name:"a4-4-5-1"},
                    //                         {name:"a4-4-5-2"},
                    //                         {name:"a4-4-5-3"},
                    //                     ]},
                    //             ]},
                    //     ]},
                    // {name:"a5",icon:"&#xe608;"},
                ]
            },
        },
        data(){
          return {
              newData:null
          }
        },
        methods:{
            go(){
                this.$router.push("/");
            },
            clearSelect(menusParent,item,callback){
                return menusParent.map((e,i)=>{
                    callback(e,i);
                    if(e.children){
                       this.clearSelect(e.children,item,callback);
                    }
                    return e;
                });
            },
            findData(newData,vm){
                if(vm.logoShow){
                    vm.newData = JSON.parse(JSON.stringify(newData));
                    return;
                }
                this.findData(newData,vm.$parent);
            },
            itemClick(item,menus){
                if(item.children && item.children.length > 0){
                    // 下拉
                    this.findData(this.clearSelect((this.newData || menus),item,(e,i)=>{
                        if(item.name == e.name){
                            e.show = !e.show;
                        }
                    }),this);
                    this.$emit("itemClickSelect",item,(this.newData || menus))
                    return;
                }
                //菜单
                // this.findData(this.clearSelect((this.newData || menus),item,(e)=>{
                //     e.select = false;
                //     if(item.name == e.name){
                //         e.select = true;
                //     }
                // }),this);
                this.$emit("itemClick",item,(this.newData || menus))
                if(item.link){
                    this.$router.push(item.link);
                }
            },
            findParent(parents,child){
                let findParent = undefined;
                parents.forEach(e=>{
                    let findChild = _.find(e.children,{name:child.name})
                    if(findChild){
                        findParent = e;
                        return
                    }
                    if(e.name == child.name){
                        e.show = true;
                    }
                });
                if(findParent){
                    this.findParent(parents,findParent);
                };
            },
            selectClass(menus,parent,parents){
                parents = parents || [];
                menus.forEach((e)=>{
                    if(e.keyName == this.airforce.layout.ConsoleLayout.keyName && parent){
                        e.show = true;
                        this.findParent(parents,parent);
                    };
                    if(e.children && e.children.length > 0){
                        parents.push(e);
                        this.selectClass(e.children,e,parents);
                    }
                });
            }
        },
        computed:{
            menusData(){
                if(this.newData && this.logoShow){
                    return this.newData;
                }
                return this.menus;
            },
        },
        created(){
            if(this.$parent.newData){
                this.newData = this.$parent.newData;
            }else {
                this.newData = this.menus;
            }
            if(this.logoShow){
                this.selectClass(this.menus);
            }
        },
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.Menus{
    @h:36px;
    padding-top: @h + @pa*2 + 10px;
    &.children{
      padding: 0;
    }
    .logo{
        overflow: hidden;
        height: @h;
        padding: @pa 0;
        background-color: @cor_ffffff;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        cursor: pointer;
        img{
            height: @h;
            margin: auto;
            display: block;
        }
    }
    .content{
        padding:0 @pa/2;
        overflow: auto;
        *{
            color: #a9a9a9;
        }
        .list{
            line-height: 30px;
            li{
                font-size: 16px;
                cursor: default;
                span{
                    cursor: pointer;
                }
                .icon{
                    font-size: 14px;
                    width: 30px;
                    display: inline-block;
                    text-align: center;
                }
                .xiala{
                    font-size: 18px;
                }
                &.child{
                    font-size: 14px;
                    .xiala{
                        font-size: 18px;
                    }
                }
                &.select{
                    color: @themeColor;
                    *{
                        color: @themeColor;
                    }
                }
            }
        }
    }
}
</style>