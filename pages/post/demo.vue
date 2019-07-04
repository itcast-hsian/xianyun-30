<template>
    <div style="padding:50px;">
        <h2>组件的递归</h2>

        <Digui :data="list"/>

        <!-- <div class="item" v-for="(item, index) in list" :key="index">
            {{item.type}}

            <div class="item" v-for="(item2, index2) in item.children" :key="index2">
                {{item2.type}}

                <div class="item" v-for="(item3, index3) in item2.children" :key="index3">
                    {{item3.type}}
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import Digui from "@/components/post/digui.vue"

export default {
    components: {
        Digui
    },

    data(){
        return {
            // 商品分类
            list: [
                {
                    type: "衣服",
                    children: [
                        {
                            type: "男装",
                            children: [
                                { 
                                    type: "上衣",
                                    children: [
                                        { type: "不穿" },
                                        { type: "背心" },
                                    ]
                                },
                                { type: "裤衩" },
                            ]
                        },
                        {
                            type: "女装",
                            children: [
                                { type: "连衣裙" },
                                { type: "吊带裙" },
                                { type: "短裤" },
                            ]
                        }
                    ]
                },
                {
                    type: "电器",
                    children: [
                        {
                            type: "冰箱"
                        },
                        {
                            type: "电视"
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style>
.item > div{
    margin-left:20px;
}
    
</style>
