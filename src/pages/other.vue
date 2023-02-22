<template>
    <div class="set">
        <div class="content">
            <div class="top-content">
                <div class="con">
                    <div class="title">采集时间</div>
                    <div class="form-con">
                        <div class="form-dom">
                            <div class="label">采样时长</div>
                            <a-input v-model:value="tiemLength" placeholder="Basic usage" />
                        </div>
                        <div class="form-dom">
                            <div class="label">采样时长</div>
                            <a-input v-model:value="tiemLength1" placeholder="Basic usage" />
                        </div>
                    </div>
                </div>
                <div class="con">
                    <div class="title">采集区域</div>
                    <div class="form-con">
                        <div class="form-dom">
                            <div class="label">采集区域</div>
                            <a-input v-model:value="tiemLength2" placeholder="Basic usage" />
                        </div>
                        <div class="form-dom">
                            <div class="label">采集区域</div>
                            <a-input v-model:value="tiemLength3" placeholder="Basic usage" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="top-content bottom-content">
                <div class="con">
                    <div class="title">显示设置</div>
                    <div class="form-con">
                        <div class="form-dom">
                            <div class="label">有效波高</div>
                            <a-input v-model:value="tiemLength2" placeholder="Basic usage" />
                        </div>
                        <div class="form-dom">
                            <div class="label">平均周期</div>
                            <a-input v-model:value="tiemLength3" placeholder="Basic usage" />
                        </div>
                    </div>
                    <div class="form-con">
                        <div class="form-dom">
                            <div class="label">显示时长</div>
                            <a-input v-model:value="tiemLength2" placeholder="Basic usage" />
                        </div>
                        <div class="form-dom">
                            <div class="label">比例因数</div>
                            <a-input v-model:value="tiemLength3" placeholder="Basic usage" />
                        </div>
                    </div>
                    <div class="form-con" >
                        <div class="form-dom form-dom-lang">
                            <div class="label label-big">海浪输出时间间隔</div>
                            <a-input v-model:value="tiemLength4" placeholder="Basic usage" />
                        </div>
                    </div>
                    <div class="form-con">
                        <div class="form-dom form-dom-lang" >
                            <div class="label label-big">风场输出时间间隔</div>
                            <a-input v-model:value="tiemLength5" placeholder="Basic usage" />
                        </div>
                    </div>
                    <div class="form-con">
                        <div class="form-dom" style="width:100%">
                            <div class="label">角度校正</div>
                            <div class="bd-main">
                                <a-checkbox v-model:checked="checked">罗经</a-checkbox>
                                <a-input v-model:value="tiemLength6" style="width:149px"/>
                                <a-checkbox v-model:checked="checked">岸基</a-checkbox>
                                <a-input v-model:value="tiemLength7" style="width:149px"/>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="con">
                    <div class="title"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tiemLength:'10 分钟',
            tiemLength1:'5 分钟',
            tiemLength2:'100 米',
            tiemLength3:'180 度',
            tiemLength4:'20 分钟',
            tiemLength5:'20 分钟',
            tiemLength6:'',
            tiemLength7:'30 度'
        }
    }
}
</script>
<style lang="less" scoped>
.set{
    margin: 0 auto;
    margin-top: 92px;
    .content{
        width: 100%;
        height: 100%;
        .top-content{
            display: flex;
            justify-content: center;
            .con{
                width: 810px;
                height: 215px;
                background: url('../assets/images/ff.png') no-repeat;
                background-size: 100% 100%;
                margin-bottom: 33px;
                margin-right: 32px;
                .title{
                    font-family: 'douyu';
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    color: #fff;
                    margin-bottom: 61px;
                }
                .form-con{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 43px;
                    box-sizing: border-box;
                    .form-dom{
                        width: 351px;
                        height: 59px;
                        display: flex;
                        .bd-main{
                            border: 1px solid #00CCFF;
                            border-left: none;
                            background: rgba(1,20,79,0.5);
                            display: flex;
                            align-items: center;
                            flex-grow: 1;
                            input{
                                height: 40px;
                                width: 149px;
                                border-left: 1px solid #00CCFF;
                            }
                        }
                        .label{
                            border: 1px solid #00CCFF;
                            opacity: 0.7;
                            border-right: 0;;
                            color: #fff;
                            font-size: 18px;
                            line-height: 59px;
                            text-align: center;
                            width: 122px;
                            height: 59px;
                            border-image: linear-gradient(40deg, #00C6FF, #00AEFF) 10 10;
                            background: linear-gradient(90deg, rgba(43,110,179,0.3) 0%, rgba(1,93,188,0.8) 50%, rgba(43,110,179,0.3) 100%);
                        }
                        input{
                            background: none;
                            font-size: 20px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #00FFFF;
                            background: rgba(1,20,79,0.5);
                            border: 1px solid #00CCFF;
                            opacity: 0.7;
                            border-left: none;

                        }
                        .ant-checkbox-wrapper{
                            color: #fff;
                            font-size: 18px;
                            width:76px;
                            align-items: center;
                            margin: 0 15px;
                           span{
                                font-size: 18px; 
                            }
                          /deep/  .ant-checkbox{
                                top: 0;
                                background: #0C6DC4;
                            }
                          /deep/ .ant-checkbox-inner{
                                width: 20px;
                                height: 20px;
                                top:0 !important;
                                border: 1px solid #0C6DC4;
                                background: #0C6DC4;
                                
                            }
                        }
                    }
                }
            }
        }
        .bottom-content{
            display: flex;
            justify-content: center;
            .con{
                width: 810px;
                height: 527px;
                background: url('../assets/images/gg.png') no-repeat;
                background-size: 100% 100%;
                margin-right: 32px;
                .title{
                    font-family: 'douyu';
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    color: #fff;
                }
                .form-con{
                    margin-top: 0;
                    margin-bottom: 19px;
                    .form-dom-lang{
                        width: 447px;
                        .label-big{
                        width: 360px !important;
                    }
                    }
                    
                }
            }
        }
    }
}
</style>