import {Message} from "element-ui";

// obj是一个nuxt对象
export default ({$axios}) => {
    
    // 监听axios请求的错误
    $axios.onError(res => {
        const {message, statusCode} = res.response.data;

        // 如果是参数
        if(statusCode === 400){
            // this.$message
            Message.warning(message);
        }
    });
}