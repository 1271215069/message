<template>
    <div class="lselect">
        <ul class="selectbox">
            <li class="selestitem" v-for="(item,index) in data" :key="index">
                <label>
                    <input @change.prevent="bolchange" type="checkbox" v-model="item.bol">
                    <span :class="(item.bol)? 'text active':'text'">{{item.title}}</span>
                </label>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"l-select",
    data(){
        return{
            
        }
    },
    props:{
        data:{
                type:Array,
                default:[]
            },
    },
    methods:{
        bolchange(){
            this.$emit('on-change',this.data);
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/vars.less";
.lselect{

    .selectbox{
        height: 36px;
        .selestitem{
            display: inline-block;
            line-height: 36px;
            margin-right: 20px;
            label{
                
                input[type=checkbox]{
                     display: none;
                }
                .text{
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                    display: inline-block;
                    line-height: 30px;
                    padding: 0 18px;
                    cursor: pointer;
                    color: #4c4c4c;
                }
                .active{
                    border-color: @col-ff6600;
                    position: relative;
                }
                .active:after{
                    content:"";
                    display:block;
                    height: 18px;
                    width: 18px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: url(../../../assets/img/dxbj/active.png) no-repeat;
                    background-size: cover;
                }
            }
        }
    }
}
</style>
