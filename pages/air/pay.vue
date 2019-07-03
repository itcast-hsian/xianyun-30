<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{order.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>

                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// 生成二维码的包
import QRCode from "qrcode";

export default {
    data(){
        return {
            order: {},

            // 检查付款的定时器对象
            timer: null
        }
    },

    methods: {
        // 检测付款结果
        isPay(){
            return this.$axios({
                url: "/airorders/checkpay",
                method: "POST",
                data: {
                    id: this.$route.query.id,
                    nonce_str: this.order.price,
                    out_trade_no: this.order.orderNo
                },
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                }
            }).then(res => {
                const {statusTxt} = res.data;

                if(statusTxt == "支付完成"){
                    return true;
                }else{
                    return false;
                }
            })
        },
    },

    destroyed(){
        // 当页面离开后停止定时器
        clearInterval(this.timer);
    },

    mounted(){
        // 因为本地的读取的时间是比组件加载慢，需要延时执行
        setTimeout(() =>{

            this.$axios({
                url: `/airorders/${this.$route.query.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                }
            }).then(res => {
                // console.log(res.data)
                this.order = res.data;
                // 价格保留两位小数点
                this.order.price = Number(this.order.price).toFixed(2);

                // 生成二维码到canvas
                const stage = document.querySelector("#qrcode-stage");

                // 调用qrcode包生成二维码
                // stage: canvas的dom元素
                // url: 付款的链接
                // 配置：配置宽高
                QRCode.toCanvas(stage, this.order.payInfo.code_url, {
                    width: 200
                }); 

                // 判断当前付款是否成功
                this.timer = setInterval(async () => {
                    const isPay = await this.isPay();

                    if(isPay){
                        this.$message.success("付款成功");
                        clearInterval(this.timer);
                        return;
                    }
                }, 3000);
                
            });
        }, 100);
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>