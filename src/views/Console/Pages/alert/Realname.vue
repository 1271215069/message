<template>
    <div class="Realname console-PagePadding">
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>公司名称
                </div>
                <div>
                    <x-input class="XInput" placeholder="请输入公司名称"></x-input>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>公司地址
                </div>
                <selector placeholder="省" value="" class="selector XInput" @on-change="choseqm" :options="graphlist"></selector>
                <selector placeholder="市" value="" class="selector XInput" @on-change="choseqm" :options="graphlist"></selector>
                <selector placeholder="区" value="" class="selector XInput" @on-change="choseqm" :options="graphlist"></selector>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>详细地址
                </div>
                <div>
                    <x-input class="XInput" placeholder="请输入公司名称"></x-input>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">
                    <span class="r">*</span>详细地址
                </div>
                <div>
                    <div class="console-mainfile">
                        <div class="filebox">
                            <label><input type="file"><span class="iconfont">&#xe6a0;</span>选择文件</label>
                            <span class="msg">未选择任何文件</span>
                        </div>
                        <p><span>* 营业执照需要加盖公章，否则无效</span></p>
                        <p>* 认证图片格式需为gif,jpg,jpeg,png格式，文件<2M</p>
                        <p>* 为保证证件真实性，认证图片为以下组合，图片样板</p>
                        <p>（营业执照/组织机构代码证）+（公章）+（仅供运营商认证使用）</p>
                    </div>
                </div>
            </z-flexbox-item>
        </z-flexbox>
        <z-flexbox>
            <z-flexbox-item span="100px" class="row">
                <div slot="left">&nbsp;</div>
                <x-button class="XButton themeXButton r">认证</x-button>
            </z-flexbox-item>
        </z-flexbox>
    </div>
</template>

<script>
    import ZFlexbox from "../../components/ZFlexbox";
    import ZFlexboxItem from "../../components/ZFlexboxItem";
    import { XInput, Selector, XButton } from "vux"
    export default {
        components: {
            ZFlexboxItem,
            ZFlexbox, XInput, Selector, XButton },
        name: "realname",
        data(){
            return {
                graphlist:[
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                    "阿斯顿维拉","应具备工号","库引天然","们好办法",
                ],
                options:[
                    {label: 'foo', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                    {label: 'faaao', value: 'Foo'},
                ],
                height:null
            }
        },
        methods:{
            choseqm(v){
                // console.log(v)
            }
        },
        mounted(){
        }
    }
</script>

<style scoped lang="less">
@import "../../../../assets/css/vars";
.Realname{
    font-size: 14px;
    .row{
        line-height: 40px;
        margin: @pa 0;
        text-align: left;
        .r{
            color: #f00;
            margin-right: @mg;
        }
        .XInput{
            border: 1px solid #CCCCCC;
            width: 80%;
            display: block;
            line-height: 40px;
            height: 40px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .selector{
            .XInput;
            float: left;
            width: 29%;
            margin-right: 1%;
            max-width: 200px;
            padding: 4px 0;
        }
        .XButton{
            width: 120px;
            margin: 0;
            font-size: 14px;
            &.r{
                color: @cor_ffffff;
            }
        }
    }
}
</style>