import ZXDialog from './ZXDialog.vue'
let $vm;
const plugin = {
    install (vue, pluginOptions = {}) {
        const Toast = vue.extend(ZXDialog)
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        const $ZXDialog = {
            show:(opts)=>{
                for(var i in opts){
                    if(i == 'onShow' || i == 'onHide'){
                        $vm[i] = opts[i];
                    }else {
                        $vm.$props[i] = opts[i];
                    }
                }
                $vm.show = true;
            },
            hide(){
                $vm.show = false;
            }
        };
        if(!vue.$ZXDialog){
            vue.$ZXDialog =  $ZXDialog;
        }
        vue.mixin({
            created: function () {
                this.$ZXDialog = vue.$ZXDialog;
            }
        })
    }
}
export default plugin
export const install = plugin.install