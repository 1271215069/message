export default {
    //消息推送
    goEasyPush(data,channelName = "goEasyChannel"){
        return new Promise((resolve, reject) => {
            this.GoEasy.publish({
                channel:channelName,
                message: JSON.stringify(data),
                onSuccess:(res)=> {
                    //成功
                    resolve(res);
                },
                onFailed:(err) =>{
                    //失败
                    reject(err);
                }
            });
        })
    },
    //消息订阅
    goEasySub(channelName = "goEasyChannel",onSuccess){
        onSuccess = onSuccess || new Function();
        return new Promise((resolve, reject) => {
            this.GoEasy.subscribe({
                channel: channelName,
                onMessage:(Message)=>{
                    Message.content = JSON.parse(Message.content);
                    resolve(Message);
                },
                onSuccess: (res)=> {
                    // console.log("Channel订阅成功。");
                    onSuccess(res);
                },
                onFailed:(error)=> {
                    // console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
                    reject(error);
                }
            })
        });
    },
    //取消消息订阅
    goEasyUnSub(channelName = "goEasyChannel"){
        return new Promise((resolve, reject) => {
            this.GoEasy.unsubscribe ({
                channel: channelName,
                onSuccess: function (res) {
                    // console.log("订阅取消成功。");
                    resolve(res)
                },
                onFailed: (error)=> {
                    // console.log("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
                    reject(error)
                }
            })
        });
    },
    //订阅封装
    goEasySubReconnect(channelName,callback){
        this.goEasySub(channelName).then(res=>{
            try {
                callback(res.content);
            }catch (e){}
            this.goEasySubReconnect(channelName,callback);
        }).catch(()=>{
            this.goEasySubReconnect(channelName,callback);
        });
    },
    //消息推送重连
    goEasyReconnect(){
        var _this = this;
        var i = 0;
        var aa = function () {
            _this.goEasySub("test").then(res=>{
                aa();
            }).catch(err=>{
                aa();
            });
        }
        aa();
        var bb = function bb() {
            _this.goEasyPush({test:i},"test").then(res=>{
            }).catch(err=>{
                if(err.code == 901){
                    _this.goEasyInitIndex += 1;
                    _this.goEasyInit();
                }
            });
            i++;
        }
        bb();
    },
    goEasyInitIndex:0,
    //创建消息渠道
    goEasyInit(index){
        ///只订阅
        const Subscribe_key = [
            "BS-c7cf7cba870843f8bbeb3933b1b18ca5",
            "BS-7528d552fd8b446395ca9f7a78dad486",
            "BS-11691636abcc4a28a80dbfcbc51313f0",
            "BS-0e9cd269db8f477786fd65ebbc7b36fc",
            "BS-b4b1d5789e2249fa937b9fdd316dc836",
            "BS-966187d6d79841c3bb68a63c1e62c3ae",
            "BS-586dfedee9c54385841b89ef3ba395ed",
            "BS-0a4be76bbf6e428a9c26431b9c295482",
            "BS-d8b21ecf08214a2fb5e46e57e0d82ed8",
            "BS-6c9da76c958e443e9d4d47148a934f3d",
            "BS-cf93a994ff1b4d56affbbde63be45907",
            "BS-2aa4c27586c8492d8129e80523425f4e",
        ];
        //只推送
        const Common_key = [
            "BC-6c3a7a2bb332417a855598b15a51e572",
            "BC-8e3711b3d91747808b7c7f0efd0e1050",
            "BC-62742bef79ae49ffac18fe117cc08c8c",
            "BC-6202cc76da6a4b6aaafc2bbcf04eeb13",
            "BC-c0271d7820584787be6303d873d1a4de",
            "BC-1590144d62d141a5a8ffd1ff0362dfdc",
            "BC-274ae473b76c45f78210cd978d76fb04",
            "BC-0957a49beb7841e1a75cd1f2547c3701",
            "BC-19b0714992444ecaab78d135f6b6efe0",
            "BC-299167c8341e456fbb10ff4e9d2c8323",
            "BC-feaf3fd459ba41958440fd532a963af4",
            "BC-0bf980565e964fa1978b5d7d5a757976",
        ];
        let appkey = null;
        try {
            appkey = Common_key[this.goEasyInitIndex];
        }catch (e){
            appkey = Common_key[0];
        }
        this.GoEasy =  new GoEasy({
            appkey:appkey ,
            onConnected: function () {
                // console.log("成功连接GoEasy。");
            },
            onDisconnected: function () {
                // console.log("与GoEasy连接断开。");
            },
            onConnectFailed: function (error) {
                // console.log("与GoEasy连接失败，错误编码："+error.code+"错误信息："+error.content);
            }
        });
        this.goEasyReconnect();
        return this;
    },
    // 颗粒动画
    particleAnimationsAction(fillStyle){
        var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

        var container;
        var camera, scene, renderer;

        var particles, particle, count = 0;

        var mouseX = 0, mouseY = - window.innerHeight / 2;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        function init(fillStyle) {
            if(document.getElementById("particleAnimationsActionId")){
                document.body.removeChild(document.getElementById("particleAnimationsActionId"))
            }
            container = document.createElement( 'div' );
            container.id = "particleAnimationsActionId";
            document.body.appendChild( container );
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 1000;

            scene = new THREE.Scene();

            particles = new Array();

            var PI2 = Math.PI * 2;
            var material = new THREE.ParticleCanvasMaterial( {

                color: 0xffffff,
                program: function ( context ) {

                    context.beginPath();
                    context.arc( 0, 0, 1, 0, PI2, true );
                    // console.log(context);
                    // context.fillStyle = "#ff6600";
                    if(fillStyle){
                        context.fillStyle = fillStyle;
                    }
                    context.fill();

                }

            } );

            var i = 0;

            for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                    particle = particles[ i ++ ] = new THREE.Particle( material );
                    particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                    particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                    scene.add( particle );

                }

            }

            renderer = new THREE.CanvasRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            document.addEventListener( 'touchstart', onDocumentTouchStart, false );
            document.addEventListener( 'touchmove', onDocumentTouchMove, false );

            //

            window.addEventListener( 'resize', onWindowResize, false );

        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function onDocumentMouseMove( event ) {

            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY/2 - windowHalfY;

        }

        function onDocumentTouchStart( event ) {

            if ( event.touches.length === 1 ) {

                event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                mouseY = event.touches[ 0 ].pageY - windowHalfY;

            }

        }

        function onDocumentTouchMove( event ) {

            if ( event.touches.length === 1 ) {

                event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                mouseY = event.touches[ 0 ].pageY - windowHalfY;

            }

        }

        //

        let animate = () =>{
            this.requestAnimationFrame = requestAnimationFrame( animate );

            render();
        }

        function render() {

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;
            camera.lookAt( scene.position );

            var i = 0;

            for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                    particle = particles[ i++ ];
                    particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                    particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

                }

            }

            renderer.render( scene, camera );

            count += 0.1;

        }

        init(fillStyle);

        animate();
    },
    particleAnimations(fillStyle){
        try {
            //停止动画
            cancelAnimationFrame(this.requestAnimationFrame);
        }catch (e){}

        if(!document.getElementById("threeJsId")){
            var threeJs = document.createElement("script");
            threeJs.src = "https://cdn.bootcss.com/three.js/r56/three.min.js";
            threeJs.id = "threeJsId";
            threeJs.onload = ()=>{
                this.particleAnimationsAction(fillStyle);
            }
            document.head.appendChild(threeJs);
        }else {
            this.particleAnimationsAction(fillStyle);
        }
    },
    //鼠标滚轮
    windowAddMouseWheel(upCallback,downCallback) {
        var scrollFunc = function (e) {
            e = e || window.event;
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    upCallback(e.wheelDelta,e);
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    downCallback(e.wheelDelta,e);
                }
            } else if (e.detail) {  //Firefox滑轮事件
                if (e.detail> 0) { //当滑轮向上滚动时
                    upCallback(e.detail,e)
                }
                if (e.detail< 0) { //当滑轮向下滚动时
                    downCallback(e.detail,e);
                }
            }
        };
        //给页面绑定滑轮滚动事件
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //滚动滑轮触发scrollFunc方法
        window.onmousewheel = document.onmousewheel = scrollFunc;
    },
    //路由跳转
    go(link,router){
        router.push(link);
    },
    //更新用户信息
    updataUserInfo(_vm,data){
        if(typeof data == "object"){
            _vm.action({
                moduleName:"login",
                goods:{
                    data:{
                        user:data
                    }
                }
            });
            localStorage.login = JSON.stringify(_vm.airforce.login);
        }

    }
    





    
}
