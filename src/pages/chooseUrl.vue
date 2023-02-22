<template>
  <div class="choose-url">
    <img
      class="top-img"
      :src="`http://ydcx.qianhaoqiche.com/${one.avatar}`"
    />
    <div class="content">
      <div class="content-item">
        <div class="c-img">
            <a :href="two.url">
          <img
            :src="`http://ydcx.qianhaoqiche.com/${two.avatar}`"
          />
          <div class="shade">{{two.title}}</div>
            </a>
        </div>
        <div class="info">{{two.wenz}}</div>
      </div>
      <div class="content-item">
        <div class="c-img">
              <a :href="three.url">
          <img
            class="c-img"
            :src="`http://ydcx.qianhaoqiche.com/${three.avatar}`"
          />
          <div class="shade">{{three.title}}</div>
             </a>
        </div>
        <div class="info">{{three.wenz}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, ref } from "vue";
import { UserService } from "@/api/api";
export default {
  name: "",
  setup() {
    const urlList = reactive({
        one:{},
        two:{},
        three:{}
    });
    const getUrl = async () => {
      let r = await UserService.addimages({});
      let data  = JSON.parse(r.data.data);
      urlList.one = data.filter(i =>i.biaoji == 'one')[0]
      urlList.two = data.filter(i =>i.biaoji == 'two')[0]
      urlList.three = data.filter(i =>i.biaoji == 'three')[0]
      debugger
    };
    getUrl();
    onBeforeMount(() => {});
    onMounted(() => {});
    return {
      ...toRefs(urlList),
    };
  },
};
</script>
<style lang="less" scoped>
.choose-url {
  .c-img {
    height: 20vh;
    position: relative;
    font-size: 14px;
    img{
        height: 100%;
        width: 100%;
    }
  }
   .shade {
          position: absolute;
          height: 30px;
          line-height: 30px;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          width: 100%;
          bottom: 0;
          font-size: 14px;
          padding-left: 8px;
          box-sizing: border-box;
        }
        .info {
          font-size: 14px;
          color: #ccc;
        }
  .top-img {
    width: 100%;
    height: 25vh;
    
  }
  .content {
      padding: 10px 20px;
      .content-item {
        margin-bottom: 10px;

       
      }
    }
}
</style>