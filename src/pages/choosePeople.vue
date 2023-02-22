<template>
  <div id="choose-people">
    <div ref="titRef" class="title">选择勘察员</div>
    <van-radio-group class="radio-group-c" :style="radioGroupStyle" v-model="checked">
      <van-radio
        class="radio"
        :disabled="state"
        :name="item.id"
        shape="square"
        checked-color="#ee0a24"
        v-for="(item,index) in surveyorList"
        :key="`surveyorList-${index}`"
      >
        {{item.title}}
      </van-radio>
    </van-radio-group>
    <span @click="jump" ref="btnRef" class="submit">确定</span>
  </div>
</template>

<script lang='ts'>
import { ref,onMounted, computed, reactive,watch,toRefs } from "vue";
import { useRouter } from 'vue-router';
import {UserService} from '@/api/api'
import useCurrentInstance from '@/hooks/useCurrentInstance'
interface radioGroupStyleType {
  'height':string,
  'overflow-y':string,
  '-webkit-overflow-scrolling':string
}
export default {
  name: "",
  setup() {
    const checked = ref();
    const titRef = ref<HTMLElement>()
    const btnRef = ref<HTMLElement>()
    const { globalProperties } = useCurrentInstance();
    const data = reactive({
      documentHeight:0,
      radioGroupHeight:'',
      surveyorList:[],
      state:false
    })
    const router =useRouter()

    let formdate = new FormData()
    formdate.append('open_id',localStorage.getItem('open_id') as string)
    UserService.register(formdate).then(res =>{
        if(res.data.data  === 0){
            router.push({path:'/'})
        }
    })

    //以下部分两个组件出现重复代码 可以封装一个hook
    const getRadioGroupHeight = (documentHeight:number) =>{
      documentHeight == 0? documentHeight = document.body.clientHeight:documentHeight
        data.radioGroupHeight = documentHeight - Number(titRef.value?.clientHeight) - Number(btnRef.value?.clientHeight)  - 100  + 'px'
    }
    window.onresize = () => {
      return (() => {
        data.documentHeight = document.body.clientHeight;
      })();
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
    

    const jump = () =>{
      if(data.state){
        globalProperties.$toast('您今天已经填写过了')
        return
      }
      if(!checked.value){
         globalProperties.$toast('请先选择勘察员')
         return
      }
        router.push({
          path:'/appraisal',
          query:{debris_id:checked.value}
        })
    }
    const limits = async () =>{
      let formdate = new FormData()
      formdate.append('open_id',localStorage.getItem('open_id') as string)
      let res  = await UserService.limits(formdate)
      if(res.data.data === '0'){
          globalProperties.$toast('您今天已经填写过了')
          data.state = true
      }else{
        data.state = false
      }
    }
    onMounted(async ()=>{
      getRadioGroupHeight(data.documentHeight);

      limits()


      let res = await UserService.surveyor({})
       data.surveyorList =  JSON.parse(res.data.data) 
    })
    return {
      checked,
      titRef,
      btnRef,
      jump,
      ...toRefs(data),
      radioGroupStyle
    };
  },
};
</script>
<style lang="less" scoped>
#choose-people {
  background: #008681;
  width: 100vw;
  height: 100vh;
  padding: 40px 30px 20px 30px;
  box-sizing: border-box;
  .title {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 30px;
    margin-bottom: 40px;
  }
  ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
  .radio,
  .radio span {
    font-size: 28px;
    margin-bottom: 30px;
    color: #fff;
  }
  .submit{
    font-size: 26px;
    padding: 2px 30px;
    color: #fff;
    background: #005A57;
    border: 1px solid #fff;
    display: inline-block;
    position: absolute;
    right: 30px;
    bottom: 20px;
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