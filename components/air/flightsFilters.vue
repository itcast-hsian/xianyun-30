<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}} 
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item, index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item, index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item, index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item, index) in ariSizeList"
                    :key="index"
                    :label="item.name"
                    :value="item.type">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小

            ariSizeList: [
                { name: "大", type: "L" },
                { name: "中", type: "M" },
                { name: "小", type: "S" },
            ]
        }
    },

    props: {
        data: {
            type: Object,
            default: {}
        }
    },

    methods: {
        // 选择机场时候触发
        handleAirport(value){
            // this.data是缓存的大数据对象，不会被修改
            const arr = this.data.flights.filter(v => {
                return v.org_airport_name === value;
            });

            // 触发修改机票列表的方法 setDataList
            this.$emit("setDataList", arr);
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            // this.data是缓存的大数据对象，不会被修改
            const arr = this.data.flights.filter(v => {
                // 开始的小时数字
                const start = +v.dep_time.split(":")[0];

                return value.from <= start && value.to > start;
            });

            // 触发修改机票列表的方法 setDataList
            this.$emit("setDataList", arr);
        },

        // 选择航空公司时候触发
        handleCompany(value){

            // this.data是缓存的大数据对象，不会被修改
            const arr = this.data.flights.filter(v => {
                return v.airline_name === value;
            });

            // 触发修改机票列表的方法 setDataList
            this.$emit("setDataList", arr);
        },

        // 选择机型时候触发
        handleAirSize(value){
           // this.data是缓存的大数据对象，不会被修改
            const arr = this.data.flights.filter(v => {
                return v.plane_size === value;
            });

            // 触发修改机票列表的方法 setDataList
            this.$emit("setDataList", arr);
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport = "";
            this.flightTimes = "";
            this.company = "";
            this.airSize =  "";
            // 触发修改机票列表的方法 setDataList
            this.$emit("setDataList", this.data.flights);
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>