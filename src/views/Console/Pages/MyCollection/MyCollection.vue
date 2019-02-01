<template>
    <div class="collection">
        <p class="console-PageTitle">我的收藏</p>
        <table class="collectiontable" border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>数据包</th>
                    <th>收藏时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in 10" :key="index">
                    <td>{{index}}</td>
                    <td>宁波力拓信息科技有限公司</td>
                    <td>2018-10-29</td>
                    <td>
                        <span class="iconfont" @click.prevent="look(item)">&#xe618;</span>
                        <span class="iconfont" @click.prevent="del(item)">&#xe617;</span>
                        <span class="iconfont" @click.prevent="edit(item)">&#xe648;</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name:"mycollection",
    data(){
        return{

        }
    },
    methods:{
        look(item){//点击图标1的方法
            console.log("look",item)
        },
        del(item){//点击图标2的方法
            console.log("del",item)
        },
        edit(item){//点击图标3的方法
            console.log("edit",item)
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.collection{
    box-sizing: border-box;
    padding: 0 20px;
    .collectiontable{
        width: 100%;
        thead{
            tr{
                line-height: 45px;
                th{
                    background: @col-ff6600;
                    color: #fff;
                    text-align: center;
                }
            }
        }
        tbody{
            tr{
                line-height: 45px;
                td{
                    text-align: center;
                    font-size: 16px;
                    color: #b4b4b5;
                }
                td:last-child{
                    width: 25%;
                    span{
                        font-size: 20px;
                        cursor: pointer;
                        margin: 0 7px;
                    }
                }
            }
            tr{
                cursor: default;
                &:nth-child(odd){
                    background: #f3f5f8;
                }
                &:nth-child(even){
                    background: #fff;
                }
                &:hover{
                    background: @consoleColor;
                    *{
                        color: @cor_ffffff;
                    }
                }
            }
        }
    }
}


</style>
