// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store-vue'
import layoutInitState from '@/store/layoutData.js'
import LoginVue from 'login-vue'
// import Vconsole from 'vconsole'
// new Vconsole();
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    //关闭加载层
    try{
        window.$vuz.loading.hide();
    }catch(e){}
    try {
        //默认停止定时器
        clearInterval(store.state.airforce.layout.time_vue);
    }catch (e){}
    if(document.getElementById("particleAnimationsActionId")){
        document.body.removeChild(document.getElementById("particleAnimationsActionId"))
    }
    LoginVue(to, from, next,store, {
        layoutInitState,
        isLogin(data){
            if(data.code == 20000){
                return true;
            }
            return false;
        }
    });
});
import  { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin  } from 'vux'
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
// import voice from "@/components/voice.js"
// Vue.use(voice)
import ZXDialog from "@/components/ZXDialog.js"
Vue.use(ZXDialog)
import ZXDialogAlert from "@/views/Console/components/ZXDialogAlert.js"
Vue.use(ZXDialogAlert)
import ZVueDatepicker from "@/views/Console/components/ZVueDatepicker.js"
Vue.use(ZVueDatepicker)
import ZLoading from "@/views/Console/components/z-loading-plugin.js"
Vue.use(ZLoading)
// import plusVue from "plus-vue"
// Vue.use(plusVue)

//==========表格插件====start
import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);
//==========表格插件====end

//==========复制剪切板====start
import VueClipboard from 'vue-clipboard2'
import { tr } from "date-fns/esm/locale";

Vue.use(VueClipboard)
//==========复制剪切板====end

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
