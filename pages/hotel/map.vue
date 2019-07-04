<template>
    <div style="padding:50px;">
        
        高德地图
        <div id="container"></div>
        <div id="panel"></div>
        <div >
            <select v-model="city">
                <option value="广州">广州</option>
                <option value="深圳">深圳</option>
            </select>
            <input type="text" v-model="start" placeholder="请输入起点位置">
            <input type="text" v-model="end" placeholder="你要去哪里">
            <button @click="handleDriving">驾车路线</button>
            <button @click="handleBus">公交路线</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            city: "广州",
            start: "",
            end: "",
            map: null
        }
    },
    methods: {
        // 公交路线
        handleBus(){
            // 初始化地区
            this.map = new AMap.Map('container', {
                zoom:11,//放大级别
                viewMode:'3D' //使用3D视图
            });

            // 驾车路线规划
            var bus = new AMap.Transfer({
                // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map: this.map,
                panel: "panel"
            })

            var points = [
                { keyword: this.start, city: this.city },
                { keyword: this.end, city:this.city }
            ]

            bus.search(points, function (status, result) {
                // 未出错时，result即是对应的路线规划方案
                console.log(result)
            });
        },
        // 开车路线
        handleDriving(){
            // 初始化地区
            this.map = new AMap.Map('container', {
                zoom:11,//放大级别
                viewMode:'3D' //使用3D视图
            });

            // 驾车路线规划
            var driving = new AMap.Driving({
                // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map: this.map,
            })

            var points = [
                { keyword: this.start, city: this.city },
                { keyword: this.end, city:this.city }
            ]

            driving.search(points, function (status, result) {
                // 未出错时，result即是对应的路线规划方案
            });
        }
    },
    mounted(){
        window.onLoad  = function(){
            // 初始化地区
            var map = new AMap.Map('container', {
                zoom:11,//放大级别
                // center: [118.871, 31.328], //中心点坐标
                viewMode:'3D' //使用3D视图
            });

            this.map = map;

            // 初始化toolbar插件
            var toolbar = new AMap.ToolBar();
            // 调用插件
            map.addControl(toolbar);

            // 创建一个 标记 实例：
            // var marker1 = new AMap.Marker({
            //     content: "<div class='iconfont icon-dingwei' style='color:red; font-size:50px;'></div>",
            //     position: new AMap.LngLat(118.871, 31.328),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            //     title: '亮哥我喜欢你'
            // });

            // // 创建一个 标记 实例：
            // var marker2 = new AMap.Marker({
            //     position: new AMap.LngLat(118.861, 31.338),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9] 
            //     title: '亮哥我喜欢你'
            // });

            // // 将创建的点标记添加到已有的地图实例：
            // map.add([marker1, marker2 ]);
        }

        var key = "763aebf096e7824f4d4e14237beddac0";
        var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad&plugin=AMap.ToolBar,AMap.Driving,AMap.Transfer`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>

<style>
#container{
    width:500px;
    height:500px;
}

#panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
}
#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
}
</style>
