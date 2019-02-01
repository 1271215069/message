<template>
    <div class="address">
        <group class="addressbox">
            <selector class="shen"  v-model="shen" :options="shenlist"></selector>
            <selector class="shi"  v-model="shi" :options="shilist"></selector>
            <selector class="qu"  v-model="qu" :options="qulist"></selector>
        </group>
    </div>
</template>
<script>
import { Selector,Group } from 'vux'
export default {
    name:"address-select",
    components:{Selector,Group},
    data(){
        return{
            shen:"",
            shi:"",
            qu:"",
            shenlist:["四川","重庆","云南"],
            shilist:[],
            shi:[["成都","达州","绵阳"],
              ["万州","沙坪坝"],
              ["昆明","大理","丽江"]],
            qulist:[],

        }
    },
    props:{
        data:{
            type:Array,
            default:()=>[]
        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
.address{
    .addressbox{
        &/deep/ .weui-cells:before{
            border: none;
        }
        &/deep/ .weui-cells:after{
            border: none;
        }
        &/deep/ .weui-cells{
            overflow: hidden;
            .shen{
                width: 30%;
                float: left;
                margin-right: 3%;
            }
            .shi{
                width: 30%;
                float: left;
                margin-right: 3%;
            }
            .qu{
                width: 30%;
                float: left;
            }
        }
        
    }
}
</style>
