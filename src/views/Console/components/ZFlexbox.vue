<template>
    <ul class="ZFlexbox">
        <slot></slot>
    </ul>
</template>

<script>
    export default {
        name: "z-flexbox",
        methods:{
            init(){
                this.childs.forEach(c=>{
                    c.sapnPx = null;
                    setTimeout(()=>{
                        c.sapnPx = Math.max.apply(null,this.childs.map(e=>{
                            return e.calcWidth();
                        }))+"px";
                    });
                });
            }
        },
        computed:{
            childs(){
                return this.$children.filter(e=>{
                    return e.$options._componentTag == "z-flexbox-item" && !e.span;
                });
            }
        },
        updated(){
            this.init();
        },
        mounted(){
            this.init();
        }
    }
</script>

<style scoped lang="less">
.ZFlexbox{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
}
</style>