<template>
  <div id="appraisal">
    <div ref="titRef" class="title">填写信息并评价</div>
    <div class="content">
      <div class="con-title">问题调查</div>
      <div class="pro-con" :style="radioGroupStyle">
        <div
          class="pro-item"
          v-for="(item, index) in starAry"
          :key="`pro-${index}`"
        >
          <div class="pro-item-h">{{ index + 1 }}.{{ item.title }}</div>
          <van-rate
            class="rate"
            v-model="item.fenshu"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
      <div style="width: 100%; text-align: center">
        <span @click="submit" ref="btnRef" class="submit">提交</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, onMounted, computed, reactive, toRefs, watch } from "vue";
import { UserService } from "@/api/api";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Toast } from "vant";
interface radioGroupStyleType {
  height: string;
  "overflow-y": string;
  "-webkit-overflow-scrolling": string;
}
interface starObjItemType {
  id: string;
  fenshu: number;
}
interface reactiveType {
  starAry: any;
  radioGroupHeight: string;
  documentHeight: number;
}
declare var window: Window & { WeixinJSBridge: any };
export default {
  name: "",
  setup() {
    const value = ref(3);
    const route = useRoute();
    const router = useRouter();
    const data = reactive<reactiveType>({
      radioGroupHeight: "",
      documentHeight: 0,
      starAry: [],
    });
    window.onresize = () => {
      return (() => {
        data.documentHeight = document.body.clientHeight;
      })();
    };
    const titRef = ref<HTMLElement>();
    const btnRef = ref<HTMLElement>();
    let formdate = new FormData();
    formdate.append("open_id", localStorage.getItem("open_id") as string);
    UserService.register(formdate).then((res) => {
      if (res.data.data === 0) {
        router.push({ path: "/" });
      }
    });
    const getRadioGroupHeight = (documentHeight: number) => {
      documentHeight == 0
        ? (documentHeight = document.body.clientHeight)
        : documentHeight;
      data.radioGroupHeight =
        documentHeight -
        Number(titRef.value?.clientHeight) -
        Number(btnRef.value?.clientHeight) -
        230 +
        "px";
    };
    watch(data, (val) => {
      getRadioGroupHeight(val.documentHeight);
    });
    const radioGroupStyle = computed((): radioGroupStyleType => {
      return {
        "overflow-y": "auto",
        height: data.radioGroupHeight,
        "-webkit-overflow-scrolling": "touch",
      };
    });

    const getMatterList = async () => {
      let res = await UserService.matter({});
      data.starAry = JSON.parse(res.data.data);
      data.starAry.forEach((i: any) => (i.fenshu = 0));
    };
    const submit = async () => {
      let datas = data.starAry.map((i: { id: string; fenshu: number }) => ({
        matter_id: Number(i.id),
        fenshu: Number(i.fenshu),
      }));
      let catchData = datas.filter((i: { fenshu: number }) => i.fenshu > 0);
      if (data.starAry.length > catchData.length) {
        Toast.fail("请答完全部题目在提交");
        return false;
      }
      let params = new FormData();
      let id = route.query.debris_id as string;
      params.append("debris_id", id);
      params.append("open_id", localStorage.getItem("open_id") as string);
      params.append("data", JSON.stringify(datas));

      let res = await UserService.addkcinfo(params);
      if (res.data.code == 200) {
        Toast.success("提交成功");

        if (window.WeixinJSBridge) {
          window.WeixinJSBridge.call("closeWindow");
        }
      }
    };
    onMounted(() => {
      getRadioGroupHeight(data.documentHeight);
      getMatterList();
    });
    return {
      value,
      titRef,
      btnRef,
      submit,
      radioGroupStyle,
      ...toRefs(data),
      activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
      inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png",
    };
  },
};
</script>
<style lang="less" scoped>
#appraisal {
  background: #008681;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  .title {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .content {
    background: #fff;
    border-radius: 8px;
    padding: 0 20px 20px 20px;

    box-sizing: border-box;
    .con-title {
      font-size: 28px;
      width: 100%;
      text-align: center;
      padding-top: 50px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
    .pro-item {
      font-size: 20px;
      margin-bottom: 20px;
      .pro-item-h {
        margin-bottom: 10px;
      }
      .rate {
        padding-left: 15px;
      }
    }
  }
  .submit {
    font-size: 20px;
    padding: 2px 30px;
    color: #fff;
    background: #005a57;
    border: 1px solid #fff;
    display: inline-block;
    margin: 0 auto;
    margin-top: 20px;
  }
  .img-icon {
    height: 20px;
  }
}
/deep/ .radio .van-radio__icon {
  font-size: 28px;
}
/deep/ .radio span {
  font-size: 28px;
  color: #fff;
  margin-left: 30px;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>