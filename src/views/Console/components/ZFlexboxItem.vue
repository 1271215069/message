<template>
    <li class="flexbox-item">
        <div class="flexbox-item-right" v-if="type == 'right'" :style="{width:`calc(100% - ${spanIndex || 0})`}">
            <slot></slot>
        </div>
        <div class="flexbox-item-left" :class="{typeRight:(type == 'right')}" ref="left" :style="{width:spanIndex}">
            <slot name="left"></slot>
        </div>
        <div class="flexbox-item-right" v-if="type != 'right'" :style="{width:`calc(100% - ${spanIndex || 0})`}">
            <slot></slot>
        </div>
    </li>
</template>

<script>
    export default {
        name: "z-flexbox-item",
        data(){
            return {
                sapnPx:null
            }
        },
        props:{
            span:String,
            type:String,
        },
        methods:{
            calcWidth(){
                if(this.newSpan){
                    return this.newSpan;
                }
                if(window && !window.getComputedStyle){
                    return +getComputedStyle(this.$refs.left).width.replace(/px|%/g,"");
                }else {
                    return this.$refs.left.clientWidth || this.$refs.left.offsetWidth;
                }
            }
        },
        computed:{
            leftWidth(){
                return this.calcWidth();
            },
            spanIndex(){
                if(this.sapnPx){
                    return this.sapnPx;
                }
                return this.span;
            }
        }
    }
</script>

<style scoped lang="less">
.flexbox-item{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    overflow: hidden;
    .flexbox-item-left{
        float: left;
        overflow: hidden;
        &.typeRight{
            float: right;
        }
    }
    .flexbox-item-right{
        float: left;
        overflow: hidden;
    }
}
</style>