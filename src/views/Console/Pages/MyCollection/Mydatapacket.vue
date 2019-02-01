<template>
    <div class="Mydatapacket">
        <p class="console-PageTitle">我的收藏</p>
        <div class="tabhead">
            <div class="tabont ygtab tabselect" @click.prevent="yg">已购</div>
            <div class="tabont gmtab" @click.prevent="gm">购买</div>
        </div>
        <div class="yg" v-if="tabcard=='1'">
            <table class="ygtable" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>数据包</th>
                        <th>购买时间</th>
                        <th>失效时间</th>
                        <th>价格</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in 10" :key="index">
                        <td>{{index}}</td>
                        <td>宁波力拓信息科技有限公司</td>
                        <td>2018-10-29</td>
                        <td>2018-10-29</td>
                        <td>500元（支持1.05万次）</td>
                        <td>
                            <span class="iconfont" @click.prevent="look(item)">&#xe618;</span>
                            <span class="iconfont" @click.prevent="del(item)">&#xe617;</span>
                            <span class="iconfont" @click.prevent="edit(item)">&#xe648;</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="gm" v-if="tabcard=='2'">
            <table class="ygtable" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>数据包</th>
                        <th>购买时间</th>
                        <th>失效时间</th>
                        <th>价格</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in 5" :key="index">
                        <td>{{index}}</td>
                        <td>数据包数据包数据包数据包数据包数据包数据包</td>
                        <td>2018-10-29</td>
                        <td>2018-10-29</td>
                        <td>500元（支持1.05万次）</td>
                        <td>
                            <span class="iconfont" @click.prevent="look(item)">&#xe618;</span>
                            <span class="iconfont" @click.prevent="del(item)">&#xe617;</span>
                            <span class="iconfont" @click.prevent="edit(item)">&#xe648;</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name:"mydatapacket",
    data(){
        return{
            tabcard:"1",
        }
    },
    methods:{
        yg(){
            this.tabcard="1";
            document.getElementsByClassName("gmtab")[0].classList.remove("tabselect");
            document.getElementsByClassName("ygtab")[0].classList.add("tabselect");
        },
        gm(){
            this.tabcard="2";
            document.getElementsByClassName("ygtab")[0].classList.remove("tabselect");
            document.getElementsByClassName("gmtab")[0].classList.add("tabselect");
        },
        look(item){

        },
        del(item){

        },
        edit(item){

        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars";
.Mydatapacket{
     box-sizing: border-box;
     padding: 0 20px;
     .tabhead{
        border-bottom: 1px solid @col-999999;
        overflow: hidden;
        margin-bottom: 30px;
        .tabont{
            line-height: 35px;
            font-size: 16px;
            float:left;
            border: 1px solid #e0e1e2;
            border-bottom: none;
            width: 100px;
            text-align: center;
            background: #fff;
            cursor:pointer;
        }
        .tabselect{
            background: @col-ff6600;
            color: #fff;
            position: relative;
        }
        .tabselect:after{
            content: " ";
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #fff;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;
        }
     }
     .yg,.gm{
         .ygtable{
            width: 100%;
            thead{
                tr{
                    line-height: 45px;
                    th{
                        background: @col-ff6600;
                        color: #fff;
                        text-align: center;
                    }
                    th:last-child{
                        width: 15%;
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
}
</style>
