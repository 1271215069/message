<template>
    <div class="AreaSelectItem">
        <div class="SelectBox-List" v-if="showProvincesNew">
            <div v-for="item in list"  @click="selectProvinces(item)" class="SelectBox-List-item">{{item.name}}<span class="iconfont">&#xe798;</span></div>
        </div>
        <div class="SelectBox-List-Select" v-else  @click="clearProvinces">{{showProvincesSelect}}<span class="iconfont">&#xe61e;</span></div>
    </div>
</template>

<script>
    export default {
        name: "area-select-item",
        data(){
            return {
                showProvinces:true,
                showProvincesSelect:'',
            }
        },
        props:{
            list:{
                type:Array,
                default:()=>[],
            },
            value:null
        },
        methods:{
            selectProvinces(e){
                this.showProvinces = false;
                this.showProvincesSelect = e.name;
                this.$emit("on-change",e);
            },
            clearProvinces(){
                this.showProvinces = true;
                this.showProvincesSelect = '';
                this.$emit("on-hide");
            }
        },
        computed:{
            showProvincesNew(val){
                if(this.value && _.find(this.list,this.value)){
                    this.showProvincesSelect = this.value.name;
                    this.$emit("on-change",this.value);
                    return false;
                };
                return this.showProvinces;
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/vars.less";
@cor_176eb0:#176eb0;
@cor_1b82d2:#1b82d2;
@cor_57a2dd:#57a2dd;
@cor_91c8f2:#91c8f2;
@cor_d7e8f4:#d7e8f4;
@cor_1bd182:#1bd182;
@cor_a9a7ab:#a9a7ab;
@cor_f2f0f5:#f2f0f5;
@cor_c31bd2:#c31bd2;
@cor_ff3366:#ff3366;
@cor_D9D9D9:#D9D9D9;
@cor_000000:#000000;
@cor_ffffff:#ffffff;
@cor_ff0000:#ff0000;
@cor_e19d3d:#e19d3d;
@cor_CE0000:#CE0000;
@cor_6959CD:#6959CD;
@rgba_ffffff_5:rgba(255,255,255,0.5);
@rgba_ffffff_05:rgba(255,255,255,0.05);
@rgba_ffffff_18:rgba(255,255,255,0.18);
@rgba_000000_5:rgba(0,0,0,0.5);
@rgba_000000_3:rgba(0,0,0,0.3);

@cor_e5e5e5:#e5e5e5;
@maTop:10px;
@paIndex:15px;
@header_hright:40px;
@footer_hright:85px;

@cor_e5e5e5:#e5e5e5;
@theme-color:@cor_1b82d2;
@themeBj-color:@cor_f2f0f5;
//todo 公共方法
//禁止文字换行
.textNowrap(){
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
}
.AreaSelectItem{
    .SelectBox-List{
        .SelectBox-List-item{
            background-color: @cor_ffffff;
            line-height: 40px;
            padding: 0 @paIndex;
            margin-bottom: 2px;
            overflow: hidden;
            &:active{
                background-color: @cor_e5e5e5;
            }
            .iconfont{
                float: right;
            }
        }
    }
    .SelectBox-List-Select{
        .SelectBox-List.SelectBox-List-item;
        background-color: @cor_d7e8f4;
        color: @theme-color;
    }
}
</style>