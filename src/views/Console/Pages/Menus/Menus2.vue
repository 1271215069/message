<template>
    <div class="Menus2">
        <div class="logo" @click="$router.push('/')" v-if="show">
            <img :src="require('@/assets/img/logo/logo.png')" alt="">
        </div>
        <liquor-tree v-if="show" class="liquor-tree"
            :data="menusData"
            :options="options"
        >
            <div slot-scope="{ node }" @click="onSelected(node)">
                <template>
                    <span v-if="node.data.icon" class="iconfont" :style="{fontSize:node.data.fontSize}" v-html="node.data.icon"></span>
                    <span :class="{selectText:node.states.selected}" v-else>●</span>
                    <span :class="{selectText:node.states.selected}">{{node.data.name}}</span>
                </template>
            </div>
        </liquor-tree>
    </div>
</template>

<script>
    import LiquorTree from "liquor-tree"
    export default {
        name: "menus2",
        components:{ LiquorTree },
        props:{
            menus:{
                type:Array,
                default:()=>[]
            }
        },
        data: () => ({
            options:{
            },
            menusData:[],
            show:false,
            copyMenus:[],
        }),
        methods:{
            forMenus(menus,parent){
                 let bool = true;
                 return menus.map((e,i)=>{
                    if(e.data.keyName == this.airforce.layout.ConsoleLayout.keyName){
                        e.state = e.state || {};
                        e.state.selected = true;
                        bool = false;
                        if(parent){
                            parent.forEach(p=>{
                                p.state = p.state || {};
                                p.state.expanded = true;
                            });
                        }
                    }else {
                        if(e.children && e.children.length > 0){
                            parent = parent || [];
                            if(e.bool){
                                parent = [e];
                            };
                            parent.push(e);
                            this.forMenus(e.children,parent);
                        }
                    }
                     if(i == menus.length -1 && bool){
                         parent.pop();
                     }
                    return e;
                })
            },
            onSelected(node){
                try {
                    if((!node.children || node.children.length == 0) && node.data && node.data.link){
                        this.$router.push(node.data.link);
                    }
                }catch (e){}
            },
            init(){
                this.copyMenus = JSON.parse(JSON.stringify(this.menus));
                this.menusData = [];
                this.menusData = this.forMenus(this.copyMenus.map(e=>{e.bool = true; return e}));
                this.$nextTick(()=>{
                    this.show = true;
                });
            }
        },
        mounted(){
            this.init();
            this.$watch("airforce.layout.ConsoleLayout.keyName",() =>{
                this.show = false;
                this.init();
                this.$nextTick(()=>{
                    this.show = true;
                });
            })
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.Menus2{
    @h:36px;
    padding-top: @h + @pa*2 + 10px;
    .logo{
        overflow: hidden;
        height: 50px;
        padding: 18px 0;
        background-color: @cor_ffffff;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        cursor: pointer;
        z-index: 1;
        img{
            height: 50px;
            width: 90%;
            margin: auto;
            display: block;
        }
    }
    &/deep/ .liquor-tree{
        .tree-arrow{
            display: none;
        }
        .tree-anchor{
            color: #a9a9a9;
        }
        .tree-node{
            &.selected{
                .tree-content{
                    background-color: @consoleColor/0.7;
                    .tree-anchor{
                        .selectText{
                            color: @themeColor;
                        }
                    }
                }
            }
        }

    }

}
</style>