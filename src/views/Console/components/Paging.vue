<template>
    <div class="Paging">
        <ul class="PagingBox">
            <li class="start pages iconfont" @click="go(1)" v-if="showPageUp">&#xe64b;</li>
            <li class="pages iconfont" :class="{start:!showPageUp}" @click="PageUp">&#xe63a;</li>
            <li class="pages" v-for="(item,index) in list" :class="{select:item.select}" @click="pageClick(item,index)">{{item.value}}</li>
            <li class="end pages iconfont" @click="PageDown">&#xe63c;</li>
            <li class="start pages iconfont" @click="go(pages)" v-if="showPageDown">&#xe66f;</li>
            <li class="pages calc" v-if="showPageText">共{{selectPage.value}}/{{pages}}页</li>
            <li class="pages calc" v-if="showInput">跳到</li>
            <li class="pages input" v-if="showInput">
                <x-input ref="input" text-align="center" class="xinput" @on-change="change($event)" @on-enter="enter" :value="selectPage.value" :show-clear="false"></x-input>
            </li>
        </ul>
    </div>
</template>

<script>
    import { XInput } from "vux"
    export default {
        name: "paging",
        components:{ XInput },
        data(){
          return {
              //页数数据
              list:[],
              //计算
              index:0,
              //选中的数据，默认第一页
              selectPage:{type:"d",value:1},
          }
        },
        props:{
            //总页数
            pages:{
                required:true,
                type:Number,
                default:1
            },
            //最大显示页数
            pagesMax:{
                type:Number,
                default:8
            },
            //自定义选中页数
            select:{
                type:Number,
                default:null
            },
            //控制输入
            showInput:{
                type:Boolean,
                default:true
            },
            //控制页码文字
            showPageText:{
                type:Boolean,
                default:true
            },
            //控制到顶页
            showPageUp:{
                type:Boolean,
                default:true
            },
            //控制到底页
            showPageDown:{
                type:Boolean,
                default:true
            },
        },
        created(){
            //判断select字段
            this.init(true);
        },
        methods:{
            /**
             * @init 初始化组件，重新渲染
             * @param bool {Boolean} 用于控制是否进行初始化，是否只进行select字段判断
             * */
            init(bool){
                //判断select
                if(typeof this.select == "number"){
                    if(this.select < 1 || this.select > this.pages){
                        throw "【Paging组件】：select 字段超出范围，应该取值(1-"+this.pages+")之间.";
                    }
                    this.selectPage.value = this.select;
                }
                if(bool){
                    return;
                }
                //初始化
                this.list = this.pageList();
                this.initSelect(this.selectPage.value);
            },
            /**
             * @go 跳转指定页
             * @param val {number|string} 页数
             * */
            go(val){
                //判断为空
                if(!/\S/.test(val)){
                    this.$refs.input.currentValue = 1;
                    this.list = this.pageList();
                    this.initSelect(1);
                    return;
                }
                //计算页数
                var index = val-parseInt(this.pagesMax/2);
                if(index < parseInt(this.pagesMax/2)){
                    this.list = this.pageList();
                }else {
                    this.list = this.pageList(index);
                }
                //更改状态
                this.initSelect(parseInt(val));
            },
            /**
             * @PageIp 上一页
             * */
            PageUp(){
                if(this.selectPage.value <= 1){
                    return;
                }
                let min = Math.min.apply(null,this.list.filter(e=>e.type == 'd').map(e=>e.value));
                if(this.selectPage.value - 1 < min){
                    if(this.selectPage.value - 1 - parseInt(this.pagesMax/2) > 0){
                        this.list = this.pageList(this.selectPage.value - 1 - parseInt(this.pagesMax/2));
                    }else {
                        this.list = this.pageList(0);
                    }
                }
                this.initSelect(this.selectPage.value - 1);
            },
            /**
             * @PageDown 下一页
             * */
            PageDown(){
                if(this.selectPage.value >= this.pages){
                    return;
                }
                let max = Math.max.apply(null,this.list.filter(e=>e.type == 'd').map(e=>e.value));
                if(this.selectPage.value + 1 > max ){
                    this.list = this.pageList(this.selectPage.value + 1 - parseInt(this.pagesMax/2));
                }
                this.initSelect(this.selectPage.value + 1);
            },
            /**
             * @getData 数据转换，将props通道page转成数组
             * @param index {number} pages数
             */
            getData(index){
              return new Array(index).join("0").split("0").map((e,i)=>i+1)
            },
            /**
             * @getData 页数按钮点击
             * @param item {object} 当前点击的数据
             */
            pageClick(item){
                switch (item.type){
                    case "d":
                        //page
                        // 更改状态
                        this.selectPage = item;
                        this.initSelect(item.value);
                        break;
                    default:
                        //更多页码
                        if(item.type == "es"){
                            // 向上更多
                            this.index -= this.pagesMax;
                        }else {
                            //向下更多
                            this.index += this.pagesMax;
                        }
                        // 更改状态
                        this.list = this.pageList(this.index);
                        this.initSelect(this.selectPage.value);
                        break;
                }
            },
            /**
             * @pageList 页码显示数据转换
             * @param index { number} 需要展显的页码
             * */
            pageList(index=0){
                //获取页码数据
                let data = this.getData(this.pages);
                //处理页码数据结构
                if(this.pages <= this.pagesMax){
                    return data.map((e,i)=>{
                        return {
                            value:e,
                            type:"d"
                        }
                    });
                }
                //初始为空
                let s = [];
                // 根据展示页码index字段，截取对应的页码数
                let l = data.slice(index,this.pagesMax+index).map(e=>({value:e,type:"d"}));
                s = s.concat(l);
                //判断是否还有更多页码没有展示出来，如果是添加更多按钮
                //向下更多
                if(s.length > 0 && s[s.length - 1].value < this.pages){
                    s = s.concat([{
                        value:"...",
                        type:"s"
                    }]);
                }
                //向上更多
                if(s.length > 0 && s[0].value > 1){
                    s = [{
                        value:"...",
                        type:"es"
                    }].concat(s);
                }
                return s;
            },
            /**
             * @initSelect 页码选中状态样式处理
             * @param index {number} 需要选中的页码数
             * */
            initSelect(index){
                //清除所有状态
                this.list = this.list.map(e=>{e.select = false; return e;});
                //查找当前页码
                let findPage = _.find(this.list,{value:index});
                //处理当前页码状态及样式
                if(findPage){
                    findPage.select = true;
                    this.selectPage = findPage;
                    /**
                     * @on-change 选择页码的暴露回调
                     * @param selectPage {object} 当前选择的页码数据
                     *
                     * */
                    this.$emit("on-change",this.selectPage)
                }
            },
            /**
             * @enter 输入回车页码事件
             * @param val {number|string} 输入的页码数
             * */
            enter(val){
                this.go(val);
            },
            /**
             * @change 输入页码的change事件
             * @param val {string} 输入的页码数
             * */
            change(val){
                let val2 = parseInt(val);
                if(val2 < 1){
                    this.$refs.input.currentValue = 1;
                   return;
                }
                if(val2 > this.pages){
                    this.$refs.input.currentValue = this.pages;
                    return;
                }
                this.$refs.input.currentValue = val2.toString().replace(/[^0-9]/g,"")
            }
        },
        watch:{
            //监听pages，变化后初始化数据
            pages(){
                this.init();
            },
            //select，变化后初始化数据
            select(){
                this.init();
            }
        },
        mounted(){
            //初始化数据
            this.init();
        }
    }
</script>

<style scoped lang="less">
@import "../../../assets/css/vars";
.Paging{
    margin-top: 50px;
    .PagingBox{
        text-align: center;
        .pages{
            display: inline-block;
            @w:40px;
            width: @w;
            height: @w;
            text-align: center;
            line-height: @w;
            background-color: @cor_ffffff;
            color: @col-999999;
            border:1px solid @col-999999;
            margin-left: @mg;
            cursor: pointer;
            border-radius: 4px;
            margin-bottom: @mg;
            &:hover{
                background-color: @cor_ffffff*0.95;
                color: initial;
            }
            &.select{
                background-color: @themeColor;
                border-color: @themeColor;
                color: @cor_ffffff;
            }
            &.start{
                margin: 0;
            }
            &.calc{
                width: auto;
                background-color: transparent;
                border:none;
            }
            &.input{
                border-color: @themeColor;
               .xinput{
                   padding: 0;
                   line-height: @w;
                   text-align: center;
                   display: inline-block;
               }
            }
        }
    }
}
</style>