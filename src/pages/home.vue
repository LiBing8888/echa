<template>
  <div class="">
    <div class="canvas" style="opacity: .2" >
      <canvas id="canv" width="1920" height="572"></canvas>
	  </div>
    <div class="mainbox">
      <ul class="clearfix">
        <li>
          <div class="boxall catchBg" style="height:3.2rem;"></div>
          <div class="boxall hl-main" style="height:4rem;">
            <div class="alltitle hl-box">海浪参数</div>
            <div class="content">
              <div class="content-list">
                <div>
                  <div class="num"><span>1.22</span>m</div>
                  <div class="text">有效波高</div>
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div class="num"><span>5.20</span>s</div>
                  <div class="text">波峰周期</div>
                </div>
              </div>
              <div class="content-list">
                <div class="gren">
                  <div class="num"><span>100</span>m</div>
                  <div class="text">波峰波长</div>
                </div>
              </div>
              <div class="content-list">
                <div class="gren">
                  <div class="num">
                    <span>162.91</span><span >°</span>
                  </div>
                  <div class="text">波峰波向</div>
                </div>
              </div>
            </div>
          </div>
          <div class="boxall fc-main" style="height:2.1rem;">
            <div class="alltitle fc-box">风场参量</div>
            <div class="content">
              <div class="content-list">
                <img src="../assets/images/fs.png" />
                <div>
                  <div class="text">真风速</div>
                  <div class="num">
                    <span class="numb">8.0</span>
                    <span class="numfls">m/s</span>
                  </div>
                </div>
              </div>

              <div class="content-list fx">
                <img src="../assets/images/fx.png" />
                <div>
                  <div class="text">真风向</div>
                  <div class="num">
                    <span class="numb">22.1</span>
                    <span class="numfls">°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div class="chartone">
            <div class="tab">
              <div v-for="(item,index) in data.tabs" :key="index" 
              :class="index == acTabInxe?'tabact'+index:''"
              @click="tabChange(index)"
              >{{ item }}</div>
              <!-- <div class="tab2">风谱</div>
              <div class="tab3">雷达波面</div> -->
            </div>
            <div class="select">
              <select>
                <option>一维海浪谱</option>
                <option>一维海浪谱</option>
              </select>
              <img class="jt" src="../assets/images/jt.png" />
              
            </div>
            <div id="echart4" class="echarts1" ref="echart4"></div>
          </div>
          <div class="map chartone chartone-bt">
            <div class="alltitle fc-box chartone-bt-box">海浪数据</div>
            <div id="echart5" class="echarts1" ref="echart5"></div>
          </div>
          <div class="map1"><img src="../assets/pic/lbx.png" /></div>
          <div class="map2"><img src="../assets/pic/jt.png" /></div>
        </li>

        <li>
          <div class="boxall catchBg-rt" style="height:3.2rem;"></div>
          <div class="boxall lj-main" style="height:4rem;">
            <div class="alltitle lj-box">罗经信息</div>
            <div class="content">
              <div class="content-list">
                <div>
                  <div class="text">经度</div>
                  <div class="num">40°N</div>
                  <img class="ft-main" src="../assets/images/tt.png" />
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div class="text">纬度</div>
                  <div class="num">116°E</div>
                  <img class="ft-main" src="../assets/images/tt.png" />
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div class="text">航向</div>
                  <div class="num">22°13’</div>
                  <img class="ft-main" src="../assets/images/tt.png" />
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div class="text">航速</div>
                  <div class="num">1.2 km</div>
                  <img class="ft-main" src="../assets/images/tt.png" />
                </div>
              </div>
            </div>
          </div>
          <div class="boxall fc-main cz-main" style="height:2.1rem;">
            <div class="alltitle fc-box">船姿信息</div>
            <div class="content">
              <div class="content-list">
                <div>
                  <div>
                    <div class="num">3°</div>
                    <div class="text">横摇</div>
                  </div>
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div>
                    <div class="num">4°</div>
                    <div class="text">纵摇</div>
                  </div>
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div>
                    <div class="num">3°</div>
                    <div class="text">艏摇</div>
                  </div>
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div>
                    <div class="num">5<span>m</span></div>
                    <div class="text">横荡</div>
                  </div>
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div>
                    <div class="num">2<span>m</span></div>
                    <div class="text">纵荡</div>
                  </div>
                </div>
              </div>
              <div class="content-list">
                <div>
                  <div>
                    <div class="num">3<span>m</span></div>
                    <div class="text">垂荡</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script  setup>

import bus from "../libs/bus";
// import * as echarts from 'echarts'
import { echarts_4 } from "./hooks/echartsFuc";
import { echarts_5 } from "./hooks/echartsFucNext";
import { ref, onMounted, computed, reactive, watch, toRefs, onUpdated, nextTick, watchEffect } from "vue";
import { useRoute,useRouter } from "vue-router";
let router = useRouter()
let data = reactive(
  {
    tabs:['海浪谱','风谱','雷达波面']
  }
)

let acTabInxe = ref(0)
const tabChange = (index) =>{
  acTabInxe.value = index
  
  echarts_4([0+index, 0.2+index, 0.1+index, 0.3+index, 0+index, 2+index, 0.3+index, 0])
}
const goRouter = (path) => {
  router.push(path)
}

//bus.emit('showLoading', true)
let isShow = ref(false)
onMounted(() => {
  setTimeout(() => {
    require('../utiles/anima.js')
    echarts_4([0, 0.2, 0.1, 0.3, 0, 2, 0.3, 0]);
    let data = {
      data1:[1.2, 2, 2.1, 1.3, 1.5, 1.9, 2.4, 3.3, 2.9, 3, 2.7, 1.5, 1.8, 1.9],
      data2:[8.1, 8.2, 7.1, 7.3, 8.5, 9.9, 8.4, 8.3, 7.9, 8, 7.7, 8.5, 9.8, 7.9]
    }
    echarts_5(data);
     bus.emit('showLoading', false)
  }, 1500);
});

</script>
<style scoped>
@import url("../assets/css/comon0.css");
</style>