<template>
    <div class="about">
        <div class="top" :style="{backgroundImage:`url('${bj}')`}" >
            <div class="content">
                <div class="contentBox">
                    <h1 class="title">| 关于我们
                        <svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80px" height="45px">
                            <path name="三角形" style="fill:transparent;stroke:#fff;stroke-width:2" d="M0 0 L80 0 L80 30 L35 30 L15 45 L15 30 L0 30 Z"/>
                        </svg>
                        <span>new 01</span>
                    </h1>
                </div>
            </div>
        </div>
        <div class="aboutContent" ref="aboutContent">
            <!-- <h2>公司概述</h2>
            <p style="text-indent: 32px">
                易网互联2015年创立于上海，现在北京、宁波等多个城市均设有分部，注册资本过千万，是中国移动、中国电信、中国联通的资深战略合作伙伴。作为专业的云通讯服务商，易网互联从产品战略到全球化布局均位于行业前列。</p>
            <h2>卓越资源</h2>

            <p style="text-indent: 32px"><span class="sign">·</span>权威核准资质</p>
            <p style="text-indent: 32px;margin:0">先后获得国家工信部颁发的《中华人民共和国增值电信业务经营许可证》、《中华人民共和国电信网码号资源使用证书》，国家版权局颁发的多项计算机软件著作权证书。</p>
            <p style="text-indent: 32px;margin:0"><span class="sign">·</span>丰富电信资源</p>    
            <p style="text-indent: 32px;margin:0">创建全国20多个省份、近60个地级市的落地资源合作布局，确保不同资源的饱和调度、不同地区的盲区补漏，减少南北网络延迟，并有效规避个别局端网络、机房、政策带来的突发性风险。</p>
            <p style="text-indent: 32px;margin:0"><span class="sign">·</span>资深运营团队</p>    
            <p style="text-indent: 32px;margin:0">团队成员有原上海移动高管，拥有10多年行业运营管理经验，熟悉了解运营商政策机制和产品服务，可充分整合运营商资源。</p>
            
            <h2>技术实力</h2>
            <p style="text-indent: 32px">
                易网互联拥有一支技术过硬、经验丰富的高素质研发团队，超80人，平均从业经验5年以上，并特设产品部门，对通信互联网行业有着深刻感知，具备超强的技术应用及模式创新能力。
            </p> -->
        </div>
        <div class="bj" :style="{boxShadow:boxShadow }"></div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "about",
        components:{ Flexbox, FlexboxItem },
        data(){
            return {
                bj:require('@/assets/img/about/bj.png'),
            }
        },
        methods:{
        },
        computed:{
            boxShadow(){
                const cor1 = "#e5e5e5";
                const cor2= this.airforce.layout.bodyBaColor;
                const maxIndex = 100;
                let boxShadowValue = "";
                let f = ",";
                let index = 1;
                for(let i = 0 ;i < maxIndex; i++){
                    if(i == maxIndex - 1){
                        f = ""
                    }
                    if(i % 2){
                        boxShadowValue += "0 0 0 "+index+"px "+cor2+f;
                        index += 1;
                    }else {
                        boxShadowValue += "0 0 0 "+index+"px "+cor1+f;
                        index += 15;
                    }
                }
                return boxShadowValue;
            }
        },
        mounted(){
            this.$utils.particleAnimations("#666");
            this.action({
                moduleName:'about_us',
                url:"about_us",
                method:"post",
                // headers: {'XX-token': this.airforce.login.data.token},
                isFormData:true,
                data:{}
            }).then(res=>{
                if(res.code.code==200){
                    let setdiv = document.createElement('div');
                    setdiv.innerHTML=res.data.data;
                    this.$refs.aboutContent.appendChild(setdiv);
                }else{
                    this.$vux.toast.text(res.msg)
                }
            }).catch(err=>{})
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/vars";
    .about{
        .bj{
            position: fixed;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 100%;
            z-index: -1;
        }
        .top{
            padding: 80px 0 30px 0;
            color: @cor_ffffff;
            overflow: hidden;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            .content{
                width: 100%;
                color: #ffffff;
                .contentBox{
                    width: @layoutInitWidth;
                    margin: auto;
                    .title{
                        font-size: 60px;
                        font-weight: initial;
                        display: inline-block;
                        position: relative;
                        margin-bottom: 50px;
                        @w:80px;
                        .svg{
                            position: absolute;
                            right: -@w;
                            top: -15px;
                            z-index: 1;
                        }
                        span{
                            font-size: 16px;
                            z-index: 2;
                            position: absolute;
                            width: @w;
                            right: -@w;
                            top: -15px;
                            text-align: center;
                            line-height: 30px;
                        }
                    }
                }

            }
        }
        .aboutContent{
            width: @layoutInitWidth;
            margin: auto;
            font-size: 16px;
            text-align: justify;
            line-height: 30px;
            p{
                margin-top: 30px;
            }
            h2{
                margin-top: 40px;
            }
        }
        
    }
    .sign{
        font-size: 20px;
        font-weight: 900;
        margin-right: 7px;
    }
</style>