import ZLoading from './z-loading'

let $vm

const plugin = {
    install (vue) {
        const Loading = vue.extend(ZLoading)
        if (!$vm) {
            let elDiv = document.createElement('div');
            $vm = new Loading({
                el: elDiv,
            });
            document.body.appendChild($vm.$el)
        }
        const loading = {
            show (options = {}) {
                try {
                    switch (typeof options){
                        case 'string':
                            $vm.text = options;
                            break;
                        case 'object':
                            for(let i in options){
                                $vm.$props[i] = options[i];
                            }
                            break;
                    }
                }catch (e){}
                $vm.show = true;
            },
            hide () {
                $vm.show = false;
            }
        }
        if (!vue.$vuz) {
            vue.$vuz = {
                loading
            }
        } else {
            vue.$vuz.loading = loading
        }
        window.$vuz = vue.$vuz;
        vue.mixin({
            created: function () {
                this.$vuz = vue.$vuz
            },
            mounted(){
                try {
                    if(this.$route.matched && this.$route.matched.length > 0 && this.$route.matched[0].name == "控制台布局"){
                        try{
                            document.body.removeChild(document.querySelector(".z-loading-plugun"))
                            let contentBoxBoxEl = document.querySelector(".ConsoleLayoutRight .contentBoxBox");
                            contentBoxBoxEl.appendChild($vm.$el);
                        }catch(e){
                            // document.body.appendChild($vm.$el)
                        };
                    }else{
                        document.body.appendChild($vm.$el)
                    }
                }catch (e){}
            }
        })
    }
}

export default plugin
export const install = plugin.install

