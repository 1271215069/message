<template>
    <div class="Layout">
        <z-header v-if="airforce.layout.headerShow"></z-header>
        <z-hefu></z-hefu>
        <router-view/>
        <z-footer v-if="airforce.layout.footerShow"></z-footer>
    </div>
</template>

<script>
    import ZHeader from "../Header/ZHeader"
    import ZHefu from "./ZHefu"
    import ZFooter from "../Footer/ZFooter"
    export default {
        name: "index",
        components:{ ZHeader, ZHefu, ZFooter }
    }
</script>

<style scoped lang="less">
.Layout{
}
</style>