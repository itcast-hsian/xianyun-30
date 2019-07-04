<template>
    <div>
        <div class="item" v-for="(item, index) in data" :key="index">
            {{item.type}}

            <digui :data="item.children" v-if="item.children"/>
        </div>   
    </div>
</template>

<script>
export default {

// name指定组件名字
name: "digui",

props: ["data"],

}
</script>

<style>

</style>
