<template>
    <div class="head">
      <img class="title-text" src="../assets/images/titletext.png" />
      <div class="menu">
        <div class="menu-list"
        v-for="(item,index) in menuList"
        :key="index"
        :class="actIndex == index?'menu-list-active':''"
         @click="goRouter(item.path)">
         {{ item.name }}
        </div>
      </div>
      <div class="weather">
        <span id="showTime">{{ showTime }}</span>
        <span id="week">{{ week }}</span>
        <div id="hms">{{ hms }}</div>
      </div>
    </div>
</template>
<script  setup>
import bus from "../libs/bus";
import { ref, onMounted, computed, reactive, watch, toRefs, onUpdated, nextTick, watchEffect } from "vue";
import { useRoute,useRouter } from "vue-router";

let router = useRouter()
let route = useRoute()
let actIndex = ref(1)
let menuList = reactive([
    {
        name:'参数设置',
        path:'/other'
    },
    {
        name:'海浪环境监测',
        path:'/'
    },{
        name:'舰艇适战评估',
        path:'/other1'
    },{
        name:'舰艇平台预报',
        path:'/other2'
    },{
        name:'帮助',
        path:'/other3'
    }

])
watchEffect(() =>{
    switch(route.path){
        case '/':
        actIndex.value = 1
        break;
        case '/other':
        actIndex.value = 0
        break; 
        case '/other1':
        actIndex.value = 2
        break; 
        case '/other2':
        actIndex.value = 3
        break; 
        case '/other3':
        actIndex.value = 4
        break; 
        
    }
})
const goRouter = (path) => {
  router.push(path)
}

let showTime = ref("");
let week = ref("");
let hms = ref("");
let t= null;
let time = () => {
  clearTimeout(t); //清除定时器
  let dt = new Date();
  let y = dt.getFullYear();
  let mt = dt.getMonth() + 1;
  let day = dt.getDate();
  let h = dt.getHours(); //获取时
  let m = dt.getMinutes(); //获取分
  let s = dt.getSeconds(); //获取秒
  showTime.value = y + "." + mt + "." + day;
  week.value = `星期${"日一二三四五六".charAt(new Date().getDay())}`;
  hms.value =
    h.toString().padStart(2, "0") +
    ":" +
    m.toString().padStart(2, "0") +
    ":" +
    s.toString().padStart(2, "0");
  t = setTimeout(time, 1000); //设定定时器，循环运行
};
t = setTimeout(time, 1000); //開始运行

</script>
<style scoped>
@import url("../assets/css/comon0.css");
</style>