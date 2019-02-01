<template>
    <div class="ZMap">
        <div id="container"></div>
        <x-input class="PlaceSearch" placeholder="请输入地址"></x-input>
        <div class="iconfont dwIcon" v-if="dwIconShow" @click="dwIcon">&#xe62f;</div>
        <div id="PlaceSearch"></div>
        <!--<div id="panel"></div>-->
    </div>
</template>

<script>
    import { XInput } from "vux"
    export default {
        name: "z-maps",
        components:{ XInput },
        data(){
            return {
                map:null,
                position:[121.6389405727, 29.8834345323],
                mapKey:"be9236675e2aa7d52c25cb8349b20256",
                dwIconShow:false,
                dwLngLat:null,
            }
        },
        methods:{
            //todo 定位
            dwIcon(){
                try {
                    if(this.dwLngLat){
                        this.map.setZoomAndCenter(20,new AMap.LngLat(this.dwLngLat.lng, this.dwLngLat.lat));
                        return;
                    }
                    const [ lng, lat ] = this.airforce.login_post.data.lat.split(",");
                    this.map.setZoomAndCenter(20,new AMap.LngLat(lng, lat));
                }catch (e){
                    this.$vux.toast.text("定位失败");
                }
            },
            createScript(Url,IdName){
                if(!document.getElementById(IdName)){
                    var url = Url;
                    var jsapi = document.createElement('script');
                    jsapi.id = IdName;
                    jsapi.charset = 'utf-8';
                    jsapi.src = url;
                    document.head.appendChild(jsapi);
                }else {
                    window.onLoadInitMap();
                }
            },
            //todo 引入地图sdk，参数callback是jsonp回调
            initMap(){
                //引入UI
                this.createScript('https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',"gdamapUI");
                //引入Sdk
                this.createScript('https://webapi.amap.com/maps?v=1.4.9&key='+this.mapKey+'&callback=onLoadInitMap',"gdamap");
            },
            //todo 创建轨迹展示
            PathSimplifier(mapDrivingPosition){
                AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'],(PathSimplifier, $) =>{

                    if (!PathSimplifier.supportCanvas) {
                        alert('当前环境不支持 Canvas！');
                        return;
                    }
                    var pathSimplifierIns = new PathSimplifier({
                        zIndex: 10000,
                        // autoSetFitView:false,
                        map: this.map, //所属的地图实例

                        getPath: function(pathData, pathIndex) {

                            return pathData.path;
                        },
                        // getHoverTitle: function(pathData, pathIndex, pointIndex) {
                        //
                        //     if (pointIndex >= 0) {
                        //         //point
                        //         return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                        //     }
                        //
                        //     return pathData.name + '，点数量' + pathData.path.length;
                        // },
                        renderOptions: {
                            pathLineStyle:{
                                lineWidth:0,
                                borderWidth:0,
                            },
                            pathNavigatorStyle:{
                                lineWidth:10
                            },
                            renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
                        }
                    });

                    window.pathSimplifierIns = pathSimplifierIns;
                    const  paths = [];
                    mapDrivingPosition.routes[0].steps.map(e=>{
                        e.path.map(p=>{
                            paths.push([p.lng,p.lat])
                        });
                    });
                    //设置数据
                    pathSimplifierIns.setData([{
                        name: '路线0',
                        path: paths
                    }]);
                    //对第一条线路（即索引 0）创建一个巡航器
                    var navg1 = pathSimplifierIns.createPathNavigator(0, {
                        loop: true, //循环播放
                        speed: 10000 //巡航速度，单位千米/小时
                    });

                    navg1.start();
                });
            },
            //todo 初始化地图实例
            setMap(confs){
                 this.map =  new AMap.Map('container',Object.assign({
                     zoom:18,//级别
                     center: this.position,//中心点坐标
                     // viewMode:'3D',//使用3D视图
                     // rotation:120,
                     // rotateEnable:false,
                     // pitchEnable:false,
                 },confs));
            },
            //todo 创建圆形覆盖
            createCircle(config){
                  const circle = new AMap.Circle(Object.assign({
                      center: new AMap.LngLat("121.6389405727", "29.8834345323"),// 圆心位置
                      radius: 100, //半径
                      strokeColor: "#F33", //线颜色
                      strokeOpacity: 1, //线透明度
                      strokeWeight: 3, //线粗细度
                      fillColor: "#ee2200", //填充颜色
                      fillOpacity: 0.35//填充透明度
                  },config));
                  // circle.setMap(this.map);
                  return circle;
            },
            //todo 判断是否在圆形区域内
            isRange(position){
                return this.createCircle().contains(new AMap.Marker({position: position,}).getPosition());
            },
            //todo 地图click事件
            mapClick(callback){
                this.map.on("click", callback);
            },
            //todo 地图添加点标记
            mapAddIcon(IconConfigs,config){
                //添加点标记，并使用自己的icon
                const Icon = new AMap.Marker(Object.assign({
                    map: this.map,
                    position: this.position,
                    icon: new AMap.Icon(Object.assign({
                        size: new AMap.Size(40, 50),  //图标大小
                        image: "https://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
                        imageOffset: new AMap.Pixel(0, 0)
                    },IconConfigs))
                },config));
                return Icon;
            },
            //todo 构造路线导航类
            mapDriving(config){
                if(typeof config == "function"){
                    //线路
                    //构造路线导航类
                    AMap.plugin(['AMap.Driving'],config);
                    return;
                }
                config = Object.assign({
                    search:[
                        {keyword: '研发园',city:'宁波'},
                        {keyword: '天一广场',city:'宁波'},
                    ],
                    callback:(status,result)=>{
                        this.map.setZoomAndCenter(18,this.position)
                    },
                    config:{}
                },config);
                //线路
                //构造路线导航类
                AMap.plugin(['AMap.Driving'],()=> {//异步同时加载多个插件
                    this.driving = new AMap.Driving(Object.assign({
                        map: this.map,
                        autoFitView:true,
                        // policy: AMap.DrivingPolicy.LEAST_TIME,
                        // panel: "panel"
                    },config.config));
                    // 根据起终点名称规划驾车导航路线
                    if(config.latlng){
                        this.driving.search(config.latlng.start,config.latlng.end,config.callback);
                        return;
                    }
                    this.driving.search(config.search,config.callback);
                });
            },

            //todo 搜索
            mapPlaceSearch(contents,callback,config){
                AMap.service(["AMap.PlaceSearch"], function() {
                    var placeSearch = new AMap.PlaceSearch(Object.assign({ //构造地点查询类
                        pageSize: 5,
                        pageIndex: 1,
                        city: "宁波市", //城市
                        // map: map,
                        // panel: "PlaceSearch"
                    },config));
                    //关键字查询
                    placeSearch.search(contents,callback );
                });
            },

            //todo 测距离，p1、p2经纬度
            mapDistance(p1,p2){
                return (AMap.GeometryUtil.distance(p1,p2)/1000).toFixed(2);
            },
            //todo sdk回调函数
            onLoadInitMap(){
                this.$emit("onLoad",this);
            }
        },
        mounted(){
            window.onLoadInitMap = this.onLoadInitMap;
            this.initMap();
        }
    }
</script>

<style>
    .amap_lib_placeSearch_poi,.amap-copyright,.amap-logo{
        display: none !important;
    }
</style>
<style lang="less">
    @import "../assets/css/vars";
    .ZMap{
        width: 100%;
        height: 100%;
        position: absolute;
        #container {
            width: 100%;
            height: 100%;
            position: absolute;
        }
        #PlaceSearch{
            position: absolute;
            background-color: white;
            max-height: 90%;
            overflow-y: auto;
            top: 58px;
            left: 50%;
            transform: translateX(-50%);
            width: 50%;
            display: none;
        }
        .PlaceSearch{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 15px;
            z-index: 1000;
            background-color: #fff;
            border-radius: 50px;
            box-shadow: 0 0 5px #e5e5e5;
            width: 50%;
            display: none;
            &:before{
                border: none;
            }
        }
        .amap-icon{
           img{
               width: 100%;
               height: 100%;
           }
        }
        .dwIcon{
            position: absolute;
            right: @pa;
            top: @headerHeight + @pa;
            font-size: 30px;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background-color: #ffffff;
            background-color: rgba(255,255,255,0.5);
            border-radius: 100%;
            color: #ff6c00;
            &:active{
                background-color: #ffffff;
            }
        }
    }
</style>