<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    methods:{

    },
    created(){

    },
    mounted(){

    },
    watch:{

    }
}
</script>

<style lang="less">
/*
@font-face {
  font-family: 'iconfont';
  src: url('./assets/fonts/iconfont.eot');
  src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/iconfont.woff') format('woff'),
  url('./assets/fonts/iconfont.ttf') format('truetype'),
  url('./assets/fonts/iconfont.svg#iconfont') format('svg');
}
//*/

//*
@Nb:"font_856108_0cocj451wbc7";
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/@{Nb}.eot');
  src: url('//at.alicdn.com/t/@{Nb}.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/@{Nb}.woff') format('woff'),
  url('//at.alicdn.com/t/@{Nb}.ttf') format('truetype'),
  url('//at.alicdn.com/t/@{Nb}.svg#iconfont') format('svg');
}
//*/
.iconfont{
  font-family: 'iconfont';
}
@import "./assets/css/animate.min.less";
@import "./assets/css/vars.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/reset.less";

*{
  margin: 0;
  padding: 0;
  border: none;
  list-style: none;
  text-decoration: none;
  outline: medium;
}
body{
  @import "./assets/css/public.less";
  #particleAnimationsActionId{
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: @ZIndex;
  }
}
.anchorBL{display:none}
</style>
