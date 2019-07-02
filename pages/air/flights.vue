<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">

                <!-- 过滤条件 -->
                <FlightsFilters 
                :data="cacheFlightsData" 
                @setDataList="setDataList"/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
  
                <!-- 航班信息 -->
                <div>
                    <FlightsItem
                    v-for="(item, index) in dataList"
                    :key="index"
                    :data="item"/>
                    
                    <!-- 分页 -->
                    <!-- size-change: 显示条数切换触发 -->
                    <!-- current-change: 切换页数时候触发 -->
                    <!-- current-page: 当前页数 -->
                    <!-- total: 总条数 -->
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"

export default {
    data(){
        return {
            // flightsData 航班的总数据
            flightsData: {
                info: {},
                options: {}
            },

            // 缓存对象，缓存对象一旦赋值之后不会被修改
            cacheFlightsData: {
                info: {},
                options: {}
            },

            pageIndex: 1, // 默认的当前页
            pageSize: 5, // 默认的条数
            total:0, // 默认的总条数

            dataList: [], // 存当前页的数据
        }
    },

    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters
    },

    methods: {
        // 切换条数时候触发
        handleSizeChange(value){
            this.pageSize = value;
            this.setDataList();
        },

        // 切换页数时候触发
        handleCurrentChange(value){
            this.pageIndex = value;
            this.setDataList();
        },

        // 设置机票列表的数据
        // 给当前页面使用，没有传参数
        // 在过滤组件中调用时候会传过滤后的数组
        setDataList(arr){
            
            if(arr){
               this.flightsData.flights = arr;

               // 初始化分页数据
               this.pageIndex = 1;
               this.total = arr.length;
            }

            // 在总列表中截取出当前页的数据
            this.dataList = this.flightsData.flights.slice( 
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            )
        }
    },

    mounted(){
        
        // 请求机票列表
        this.$axios({
            url: "/airs",
            params: this.$route.query
        }).then(res => {
            // 总数据，flightsData。flights是会修改的
            this.flightsData = res.data;
            // 缓存数据，一旦被赋值之后不能修改
            this.cacheFlightsData = {...res.data};

            this.dataList = this.flightsData.flights.slice(0, 5);

            this.total = this.flightsData.total;
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>