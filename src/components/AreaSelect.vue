<template>
    <div class="AreaSelect">
        <cell :class="`${(value || valueSelect) ? 'cell-select' : ''}  ${(addressNew.length == 0)? 'address' : ''} ${(top) ? 'top' : ''}`" :title="title" :inline-desc="addressNew" :value="valueNew" :is-link="isLink" @click.native="SelectBoxHind" :valueAlign="valueAlign"></cell>
        <div class="SelectBox" v-if="showSelectBox" :style="{backgroundColor:airforce.layout.bodyColor}">
            <layout-header></layout-header>
            <area-select-item :value="provinces" :list="provincesData" @on-change="provincesChange" @on-hide="provincesHide"></area-select-item>
            <area-select-item :value="city" v-if="cityVal" :list="cityData" @on-change="cityChange" @on-hide="cityHide"></area-select-item>
            <area-select-item :value="area" v-if="areaVal" :list="areaData" @on-change="areaChange" @on-hide="areaHide"></area-select-item>
            <x-input v-if="addressShow" v-model="address" :class="{AreaSelectXIinput:true,select:addressClassBool}" :placeholder="areaPlaceholder"></x-input>
        </div>
    </div>
</template>

<script>
    import { Cell, ChinaAddressV4Data, XInput } from 'vux'
    import  LayoutHeader  from '@/views/Header/ZHeader.vue'
    import { mapGetters, mapActions} from 'vuex'
    import AreaSelectItem from './AreaSelectItem'
    export default {
        name: "area-select",
        components:{ Cell, LayoutHeader, AreaSelectItem, XInput },
        data(){
            return {
                showSelectBox:false,
                pageHeaderData:{},
                cityVal:null,
                areaVal:null,
                addressShow:false,
                addressClassBool:false,
                provinces:null,
                city:null,
                area:null,
                address:'',
                valueSelect:null,
            }
        },
        props:{
            moduleName:{
                type:String,
                default:'AreaSelect'
            },
            fieldName:{
                type:String,
                default:'AreaSelect'
            },
            title:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            },
            valueAlign:{
                type:String,
                default:'right'
            },
            areaPlaceholder:{
                type:String,
                default:'请输入详细地址,如：下应北路110号'
            },
            value:{
                type:String,
                default:null
            },
            isLink:{
                type:Boolean,
                default:false
            },
            isAddress:{
                type:Boolean,
                default:true
            },
            top:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            ...mapActions(['action']),
            SelectBoxHind(){
                this.showSelectBox = true;
            },
            publicFun(){
                this.action({
                    moduleName:'layout',
                    goods:this.pageHeaderData
                });
                this.showSelectBox = false;
            },
            init(){
                try {
                    this.pageHeaderData = JSON.parse(JSON.stringify(this.airforce.layout));
                    const initData = {
                        cityVal:null,
                        areaVal:null,
                        addressShow:false,
                        addressClassBool:false,
                        provinces:null,
                        city:null,
                        area:null,
                        address:'',
                        valueSelect:null,
                    };
                    const moduleNameData = this.airforce[this.moduleName];
                    if(moduleNameData && moduleNameData[this.fieldName]){
                        const fieldName = moduleNameData[this.fieldName];
                        if(fieldName.address){
                            initData.address = fieldName.address;
                        }
                        if(fieldName.provinces){
                            initData.provinces = fieldName.provinces;
                        }
                        if(fieldName.city){
                            initData.city = fieldName.city;
                        }
                        if(fieldName.area){
                            initData.area = fieldName.area;
                        }
                        if(fieldName.provinces && fieldName.city && fieldName.area){
                            initData.valueSelect = `${fieldName.provinces.name}、${fieldName.city.name}、${fieldName.area.name}`;
                        }
                    }
                    for(let  k in initData){
                        this[k] = initData[k];
                    };
                    this.action({
                        moduleName:'layout',
                        goods:{
                            contentText:'地区选择',
                            rightText:'确定',
                            leftClickBool:true,
                            leftClick:()=>{
                                this.publicFun();
                            },
                            rightClick:()=>{
                                let AreaSelectData = {
                                    provinces:this.provinces,
                                    city:this.city,
                                    area:this.area,
                                    address:this.address,
                                };
                                if(!AreaSelectData.provinces){
                                    this.$vux.toast.text("请选择省份");
                                    return;
                                };
                                if(!AreaSelectData.city){
                                    this.$vux.toast.text("请选择市");
                                    return;
                                };
                                if(!AreaSelectData.area){
                                    this.$vux.toast.text("请选区");
                                    return;
                                };
                                if(this.$utils.is_S(AreaSelectData.address) && this.isAddress){
                                    this.$vux.toast.text("请输入详细地址");
                                    return;
                                };
                                this.valueSelect = `${this.provinces.name}、${this.city.name}、${this.area.name}`;
                                AreaSelectData.valueSelect = this.valueSelect;
                                this.action({
                                    moduleName:this.moduleName,
                                    goods:_.set({},this.fieldName,AreaSelectData)
                                });
                                this.publicFun();
                            }
                        }
                    })
                }catch (e){}
            },
            provincesChange(e){
                this.cityVal = e.value;
                this.provinces = e;
            },
            provincesHide(){
                this.cityVal = null;
                this.areaVal = null;
                this.addressShow = false;
                this.provinces = null;
                this.city = null;
                this.area = null;
                this.address = '';
            },
            cityChange(e){
                this.areaVal = e.value;
                this.city = e;
            },
            cityHide(){
                this.areaVal = null;
                this.addressShow = false;
                this.city = null;
                this.area = null;
                this.address = '';
            },
            areaChange(e){
                this.addressShow = true;
                this.area = e;
            },
            areaHide(){
                this.addressShow = false;
                this.area = null;
            },
        },
        computed:{
            ...mapGetters(['airforce']),
            provincesData(){
                return ChinaAddressV4Data.filter(e=>!e.parent);
            },
            cityData(){
                if(this.cityVal){
                    return ChinaAddressV4Data.filter(e=>e.parent == this.cityVal);
                }
                return [];
            },
            areaData(){
                if(this.areaVal){
                    return ChinaAddressV4Data.filter(e=>e.parent == this.areaVal);
                }
                return [];
            },
            valueNew(){
                if(this.valueSelect){
                    return this.valueSelect;
                };
                if(this.value){
                    return this.value;
                };
                try {
                    const moduleNameData = this.airforce[this.moduleName][this.fieldName];
                    if(moduleNameData.provinces && moduleNameData.city && moduleNameData.area){
                        this.valueSelect = `${moduleNameData.provinces.name}、${moduleNameData.city.name}、${moduleNameData.area.name}`;
                        return this.valueSelect;
                    }
                }catch (e){}
                return this.placeholder;
            },
            addressNew(){
                try {
                    if(this.airforce[this.moduleName][this.fieldName].address){
                        return this.airforce[this.moduleName][this.fieldName].address;
                    }
                }catch (e){}
                return this.address;
            }
        },
        watch:{
            showSelectBox(val){
                if(val){
                    this.init();
                }else {
                    this.publicFun();
                }
            },
            addressNew(val){
                if(val.length > 0){
                    this.addressClassBool = true;
                }else {
                    this.addressClassBool = false;
                }
            },
        },
        mounted(){
            // this.init();
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
//todo 公共方法
//禁止文字换行
.textNowrap(){
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
}
.AreaSelect{
    &/deep/ .top{
        position: relative;
        &:after{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            left: 15px;
        }
    }
    &/deep/ .cell-select{
        padding-bottom: 40px;
        position: relative;
        .weui-cell__ft{
            color: @cor_000000;
        }
        .vux-label-desc{
            position: absolute;
            right: @paIndex;
            bottom: 0;
            width: 90%;
            line-height: 40px;
            .textNowrap();
            text-align: right;
        }
        &.address{
            padding-bottom: @paIndex;
        }
    }
    .SelectBox{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 600;
        overflow-x: hidden;
        background-color: @themeBj-color;
        .AreaSelectXIinput{
            background-color: @cor_ffffff;
            padding: 0 @paIndex;
            line-height: 40px;
            margin-bottom: 2px;
            &.select{
                background-color: @cor_d7e8f4;
                color: @theme-color;
            }
        }
    }
}
</style>