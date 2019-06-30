<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">

            <el-form-item label="出发城市">

                <!-- fetch-suggestions: 获取搜索的建议 -->
                <!-- select: 选中下拉列表数据时候触发的事件 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from "moment";

export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,

            // 表单的数据对象
            form: {
                departCity: "",
                departCode: "",
                destCity: "",
                destCode: "",
                departDate: ""
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index == 1){
                this.$confirm('业务暂时不提供往返', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                })
            }
        },
        
        // 触发的搜索建议
        // value 是输入框的值
        // cb 是回调函数是必须要执行，接收数组，数组内部必须是由对象组件，对象必须要value属性
        queryDepartSearch(value, cb){
            if(!value) return;

            // 请求机票城市的接口
            this.$axios({
                url: "/airs/city?name=" + value,
                method: "GET",
            }).then(res => {
                const {data} = res.data;

                // 给data每一项都加value
                const newData = data.map(v => {
                    return {
                        ...v,
                        value: v.name.replace("市", "")
                    }
                })

                // 默认选中第一项
                this.form.departCode = newData[0].sort;
                this.form.departCity = newData[0].value;

                cb(newData);
            })
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){ 
            if(!value) return;

            // 请求机票城市的接口
            this.$axios({
                url: "/airs/city?name=" + value,
                method: "GET",
            }).then(res => {
                const {data} = res.data;

                // 给data每一项都加value
                const newData = data.map(v => {
                    return {
                        ...v,
                        value: v.name.replace("市", "")
                    }
                })

                // 默认选中第一项
                this.form.destCode = newData[0].sort;
                this.form.destCity = newData[0].value;

                cb(newData);
            })
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            this.form.departCity = item.value;
            this.form.departCode = item.sort;
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value;
            this.form.destCode = item.sort;
        },

        // 确认选择日期时触发
        handleDate(value){
           this.form.departDate =  moment(value).format("YYYY-MM-DD");
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            const {departCity, departCode, destCity, destCode} = this.form;

             // 到达城市传给出发城市
            this.form.departCity = destCity;
            this.form.departCode = destCode;

            // 把出发城市传给到达城市
            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 提交表单是触发
        handleSubmit(){
           
            // 自定义表单验证
            const rules = {
                depart: {
                    value: this.form.departCity,
                    message: "请选择出发城市"
                },
                dest: {
                    value: this.form.destCity,
                    message: "请选择到达城市"
                },
                departDate: {
                    value: this.form.departDate,
                    message: "请选择出发时间"
                }
            };

            // 验证变量哦，默认验证通过
            let valid = true;

            // 循环验证对象
            Object.keys(rules).forEach(v => {
                if(!valid) return;

                // 如果有一项数据不存在
                if(!rules[v].value){
                    this.$message.warning(rules[v].message);
                    // 验证不通过
                    valid = false;
                }
            })

            // 验证不通过，直接返回
            if(!valid) return;

            this.$router.push({
                path: "/air/flights",
                query: this.form
            })
        }
    },

    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
