<template>
  <div>
    <div class="canvas" style="opacity: .2">
	<iframe frameborder="0" src="js/index.html" style="width: 100%; height: 100%"></iframe>
	</div>
<div class="loading">
  <div class="loadbox"> <img src="picture/loading.gif"> 页面加载中... </div>
</div>
<div class="head">
  <img class="title-text" src="./images/titletext.png" />
  <div class="menu">
    <div class="menu-list">参数设置</div>
    <div class="menu-list menu-list-active">海浪环境监测</div>
    <div class="menu-list">舰艇适战评估</div>
    <div class="menu-list">舰艇平台预报</div>
    <div class="menu-list">帮助</div>
  </div>
  <!-- <h1><a href="https://gitee.com/iGaoWei/big-data-view" style="color: white">大数据可视化展板通用模板</a></h1> -->
  <div class="weather">
    <span id="showTime"></span> 
    <span id="week"></span> 
    <div id="hms"></div> 
  </div>
		
</div>
<div class="mainbox">
  <ul class="clearfix">
    <li>
      <div class="boxall catchBg" style="height: 3.2rem">
        
      </div>
      <div class="boxall hl-main" style="height: 4rem">
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
                <div  class="num"><span >100</span>m</div>
                <div  class="text">波峰波长</div>
              </div>
                
            </div>
            <div class="content-list">
              <div class="gren">
                <div  class="num"><span >162.91</span><span style="font-size: .5rem;">°</span></div>
                <div   class="text">波峰波向</div>
              </div>
                
            </div>
        </div>
      </div>
      <div class="boxall fc-main" style="height: 2.1rem">
        <div class="alltitle fc-box">风场参量</div>
        <div class="content">
          <div class="content-list">
            <img src="./images/fs.png" />
            <div>
              <div class="text">真风速</div>
              <div class="num">
                <span class="numb">8.0</span>
                <span class="numfls">m/s</span></div>
            </div>
              
          </div>

          <div class="content-list fx">
            <img src="./images/fx.png" />
            <div>
              <div class="text">真风向</div>
              <div class="num">
                <span class="numb">22.1</span>
                <span class="numfls">°</span></div>
            </div>
              
          </div>
        </div>
      </div>
    </li>


    <li>
      <div class="chartone">
          <div class="tab">
            <div class="tab1 tab1act">海浪谱</div>
            <div class="tab2">风谱</div>
            <div class="tab3">雷达波面</div>
          </div>
          <div class="select">
            <select>
              <option>一维海浪谱 </option>
              <option>一维海浪谱 </option>
            </select>
            <img class="jt" src="./images/jt.png" />
            <div id="echart4" class="echarts1"></div>
          </div>
      </div>
      <div class="map chartone chartone-bt">
        <div class="alltitle fc-box chartone-bt-box">风场参量</div>
        <div id="echart5" class="echarts1"></div>
      </div>
      <div class="map1"><img src="picture/lbx.png"></div>
        <div class="map2"><img src="picture/jt.png"></div>
    </li>















    <li>
      <div class="boxall catchBg-rt" style="height: 3.2rem">
        
      </div>
      <div class="boxall lj-main" style="height: 4rem">
        <div class="alltitle lj-box">罗经信息</div>
        <div class="content">
            <div class="content-list">
              <div>
                <div class="text">经度</div>
                <div class="num">
                  40°N
                </div>
                <img  class="ft-main"  src="./images/tt.png" />
            </div>
          </div>
          <div class="content-list">
            <div>
              <div class="text">纬度</div>
              <div class="num">
                116°E
              </div>
              <img  class="ft-main"  src="./images/tt.png" />
          </div>
        </div>
        <div class="content-list">
          <div>
            <div class="text">航向</div>
            <div class="num">
              22°13’
            </div>
            <img  class="ft-main"  src="./images/tt.png" />
        </div>
      </div>
      <div class="content-list">
        <div>
          <div class="text">航速</div>
          <div class="num">
            1.2 km
          </div>
          <img  class="ft-main"  src="./images/tt.png" />
      </div>
    </div>
        </div>
      </div>
      <div class="boxall fc-main cz-main" style="height: 2.1rem">
        <div class="alltitle fc-box">船姿信息</div>
        <div class="content">
          <div class="content-list">
            <div>
              <div>
                <div class="num">
                  3°
              </div>
              <div class="text">横摇</div>
            </div>
          </div>
        </div>
        <div class="content-list">
          <div>
            <div>
              <div class="num">
                4°
            </div>
            <div class="text">纵摇</div>
          </div>
        </div>
      </div>
      <div class="content-list">
        <div>
          <div>
            <div class="num">
              3°
          </div>
          <div class="text">艏摇</div>
        </div>
      </div>
    </div>
    <div class="content-list">
      <div>
        <div>
          <div class="num">
            5<span>m</span>
        </div>
        <div class="text">横荡</div>
      </div>
    </div>
  </div>
  <div class="content-list">
    <div>
      <div>
        <div class="num">
          2<span>m</span>
      </div>
      <div class="text">纵荡</div>
    </div>
  </div>
</div>
<div class="content-list">
  <div>
    <div>
      <div class="num">
        3<span>m</span>
    </div>
    <div class="text">垂荡</div>
  </div>
</div>
</div>
      </div>
      </div>
    </li>
  </ul>
</div>
<div class="back"></div>
  </div>
</template>
<script>
// var t = null;
//     t = setTimeout(time,1000);//開始运行
//     function time()
//     {
//        clearTimeout(t);//清除定时器
//        dt = new Date();
// 		var y=dt.getFullYear();
// 		var mt=dt.getMonth()+1;
// 		var day=dt.getDate();
//        var h=dt.getHours();//获取时
//        var m=dt.getMinutes();//获取分
//        var s=dt.getSeconds();//获取秒
//        document.getElementById("showTime").innerHTML = y+"."+mt+"."+day;
//        var week = dt.getDay()
//        document.getElementById('week').innerHTML = `星期${"日一二三四五六".charAt(new Date().getDay())}`
//        document.getElementById('hms').innerHTML = h.toString().padStart(2,'0')+":"+m.toString().padStart(2,'0')+":"+s.toString().padStart(2,'0')
//        t = setTimeout(time,1000); //设定定时器，循环运行
//  }
</script>
<script lang='ts' setup>
</script>
<style scoped>
</style>