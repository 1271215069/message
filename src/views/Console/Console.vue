<template>
    <div class="Console">
        <div class="ConsoleLayoutLeft" :style="{height:height+'px',width:airforce.layout.ConsoleLayout.menuWidth+'px'}">
            <div class="contentBox" :style="{height:height+'px',width:airforce.layout.ConsoleLayout.menuWidth+100+'px'}">
                <div class="contentBoxBox" :style="{width:airforce.layout.ConsoleLayout.menuWidth+'px',paddingRight:'100px'}">
                    <menus :menus="menus"></menus>
                </div>
            </div>
        </div>
        <div class="ConsoleLayoutRight" :style="{height:height+'px',width:width+'px'}">
            <div class="contentBox" :style="{height:height+'px',width:width + 100+'px'}">
                <div class="contentBoxBox" :style="{width:widthBox+'px',paddingRight:'100px'}">
                    <console-header></console-header>
                    <router-view calss="console-router-view"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MenusData from './Pages/Menus/Data.js'
    import Menus from "./Pages/Menus/Menus2"
    import ConsoleHeader from "./Pages/Header/ConsoleHeader"
    export default {
        name: "console",
        components:{ Menus, ConsoleHeader },
        data(){
          return {
              width:0,
              height:0,
              menus:MenusData
          }
        },
        methods:{
            init(){
                this.width = window.innerWidth - this.airforce.layout.ConsoleLayout.menuWidth - 1;
                this.height = window.innerHeight;
            }
        },
        computed:{
            widthBox(){
                let minWidth = 800;
                if(this.width > minWidth){
                    return this.width;
                }
                return minWidth;
            }
        },
        created(){
            this.init();
        },
        mounted(){
            window.addEventListener( 'resize', ()=>{
                this.init();
            },false);
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.Console{
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    width: 110%;
    height: 100%;
    .ConsoleLayoutLeft{
        float: left;
        position: relative;
        overflow: hidden;
        .contentBox{
            overflow:auto;
        }
        background-color: @consoleColor;
    }
    .ConsoleLayoutRight{
        .ConsoleLayoutLeft;
        background-color: transparent;
        .contentBox{
            .contentBoxBox{
                padding-bottom:@pa;
            }
        }
    }
}
</style>