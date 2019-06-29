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
            
        },
        
        // 触发的搜索建议
        // value 是输入框的值
        // cb 是回调函数是必须要执行，接收数组，数组内部必须是由对象组件，对象必须要value属性
        queryDepartSearch(value, cb){
            if(!value) return;

            // 请求机票城市的接口
            this.$axios({
                url: "http://157.122.54.189:9095/airs/city?name=" + value,
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

                cb(newData);
            })
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){ 
            if(!value) return;

            // 请求机票城市的接口
            this.$axios({
                url: "http://157.122.54.189:9095/airs/city?name=" + value,
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

                cb(newData);
            })
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            console.log(item)
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            
        },

        // 确认选择日期时触发
        handleDate(value){
           
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            
        },

        // 提交表单是触发
        handleSubmit(){
           
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
