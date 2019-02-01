<template>
    <div class="lfile">
        <ul>
            <li v-for="(item,index) in data" :key="index">
                <div class="sina_addImg_btn" ref="filebox">
                    <input type="file" ref="filput" @change="updata(index)" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <div class="showimg" v-if="item.imgshow">
                        <img :src="item.img" alt="">
                        <span class="delicon iconfont" @click.prevent="delfile(index)">&#xe937;</span>
                    </div>
                </div>
                <p class="title">{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"l-file",
    data(){
        return{
            
        }
    },
    props:{
        data:{
                type:Array,//格式为[{title:（下方标题文字，字符串）,imgshow:（上传的图片是否显示的值，初始为false，布尔值）,img:（上传图片的显示路径，初始为空，字符串）,filedata:（上传的File文件，初始为空，对象）}]
                default:[]
            },
    },
    methods:{
        updata(i){
            let inputfile=this.$refs.filput[i].files[0];//获取input的file
            let reader=new FileReader();
            reader.readAsDataURL(inputfile);//将图片读取为DataURL
            reader.onload = (x)=>{//图片上传完成后的方法
                this.data[i].imgshow=true;//显示上传图片
                this.data[i].img=x.target.result;//赋值图片路径
                this.data[i].filedata=inputfile;//赋值file文件
                // 'require('+x.target.result+')'
                this.$refs.filebox[i].classList.add("noneshow");
                this.$emit('on-change',this.data);
            }
        },
        delfile(i){//点击删除图片的方法
            //this.$refs.filput[i].outerHTML=this.$refs.filput[i].outerHTML;//直接将上传文件input按钮的内容直接清空
            this.$refs.filebox[i].classList.remove("noneshow");
            this.data[i].imgshow=false;
            this.data[i].img="";
            this.data[i].filedata={};
            this.$emit('on-change',this.data);
        }
    }
}
</script>
<style lang="less" scoped>
.lfile{
    ul{
        // overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        li{
            // float: left;
            margin: 0 20px;
            .sina_addImg_btn{
                margin: 0 auto;
                width: 85px;
                height: 85px;
                border-radius: 5px;
                border: 1px solid #dbdbdb;
                position: relative;
                z-index: 0;
                background-color: #f2f2f2;
                cursor: pointer;
                // overflow: hidden;
                input[type=file]{
                    display: block;
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    position: absolute;
                    z-index: 10;
                    left: 0;
                    top: 0;
                }
                .showimg{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                    .delicon{
                        position: absolute;
                        top: -11px;
                        right: -11px;
                        display: block;
                        width: 22px;
                        height: 22px;
                        line-height: 22px;
                        font-size: 18px;
                        color: red;
                        border-radius: 50%;
                        z-index: 20;
                        overflow: hidden;
                    }
                }
            }
            .title{
                width: 120px;
                text-align: center;
                font-size: 14px;
                color: #666;
                margin-top: 7px;
            }
            .sina_addImg_btn:after{
                content: ' ';
                display: block;
                height: 50px;
                width: 2px;
                position: absolute;
                background-color: #ccc;
                left: 42px;
                top: 20px;
                z-index: 1;
            }
            .noneshow:after{
                content: ' ';
                opacity: 0;
            }
            .sina_addImg_btn:before{
                content: ' ';
                display: block;
                height: 2px;
                width: 50px;
                position: absolute;
                background-color: #ccc;
                left: 20px;
                top: 42px;
                z-index: 1;
            }
            .noneshow:before{
                content: ' ';
                opacity: 0;
            }
        }
    }
}
</style>
