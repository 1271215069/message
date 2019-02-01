import ZVueDatepicker from './ZVueDatepicker.vue'
import { dateFormat } from "vux"
let $vm;
const plugin = {
    install (vue, pluginOptions = {}) {
        const Toast = vue.extend(ZVueDatepicker)
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        const $ZVueDatepicker = {
            show:(opts)=>{
                opts = opts || {};
                opts.startTime = opts.startTime || {};
                opts.option = opts.option || {};
                opts.onChange = opts.onChange || new Function();
                opts.onCancel = opts.onCancel || new Function();
                if(!opts.startTime.time){
                    opts.startTime.time = dateFormat(new Date(),$vm.optionNew.format);
                }
                for(var i in opts){
                    if(i == 'onChange' || i == 'onCancel'){
                        $vm[i] = ((i)=>{
                            return (v)=>{
                                $vm.$nextTick(()=>{
                                    opts[i](v);
                                });
                                $vm.show = false;
                            }
                        })(i);
                    }else {
                        $vm.$props[i] = opts[i];
                    }
                }
                $vm.show = true;
                $vm.$nextTick(()=>{
                    $vm.$refs.DatePicker.showCheck();
                });
            },
            hide(){
               $vm.show = false;
            }
        };
        if(!vue.$ZVueDatepicker){
            vue.$ZVueDatepicker =  $ZVueDatepicker;
        }
        vue.mixin({
            created: function () {
                this.$ZVueDatepicker = vue.$ZVueDatepicker;
            }
        })
    }
}
export default plugin
export const install = plugin.install