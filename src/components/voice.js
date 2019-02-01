import voice from './voice.vue'
let $vm;
const plugin = {
    install (vue, pluginOptions = {}) {
        const Toast = vue.extend(voice)
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        const $voice = {
            next:opt=>$vm.next(opt),
        };
        if(!vue.$voice){
            vue.$voice =  $voice;
        }
        vue.mixin({
            created: function () {
                this.$voice = vue.$voice;
            }
        })
    }
}
export default plugin
export const install = plugin.install