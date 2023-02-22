<template>
  <div id="register">
    <div class="main">
      <div class="shade"></div>
      <div class="content">
        <div class="info">请您先成为我们的会员，以便我们进行后续服务。</div>
        <div class="info info-red">*我们保证将严格对您的个人信息进行保密，仅用于奖励发放等信息核对。</div>
        <van-form @failed="onFailed" @submit="sub">
          <van-cell-group inset>
            <van-field
              v-model="form.phone"
              name="validatorPhone"
              label-align="left"
              input-align="right"
              label="手机号码"
              placeholder="请输入手机号码"
              :rules="[{ validator:validatorPhone, message: '请输入正确的手机号' }]"
            />
            <van-field
              v-model="form.name"
              name="name"
              label-align="left"
              input-align="right"
              label="姓名"
              placeholder="请输入姓名"
              :rules="[{ validator:validatorName, message: '请输入姓名' }]"
            />
            <van-field
              v-model="form.chepai"
              name="chepai"
              label-align="left"
              input-align="right"
              label="车牌号"
              placeholder="请输入车牌号"
              :rules="[{ validator:validatorCarNum, message: '请输入车牌号' }]"
            />
            <van-field name="sex" label="性别">
              <template #input>
                <van-radio-group v-model="form.sex" direction="horizontal">
                  <van-radio name="男">男</van-radio>
                  <van-radio name="女">女</van-radio>
                </van-radio-group>
                <div style="position: absolute; right: 0; opacity: 0.4">
                  请选择性别
                </div>
              </template>
            </van-field>
            <van-field name="is_bao" label-width="129" label="是否在英大承保">
              <template #input>
                <van-radio-group v-model="form.is_bao" direction="horizontal">
                  <van-radio name="是">是</van-radio>
                  <van-radio name="否">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>

            <van-field name="danwei" label="工作单位">
              <template #input>
                <van-radio-group v-model="form.danwei" direction="horizontal">
                  <van-radio name="其他用户">其他用户</van-radio>
                  <van-radio name="国家电网">国家电网</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="form.adress"
              readonly
              clickable
              name="adress"
              label-width="129"
              label="工作所在单位区域"
              placeholder="点击选择地址"
              @click="showArea = true"
              :rules="[{ validator:validatorAdress, message: '请选择地址' }]"
            />
            <van-field
              v-model="form.adressdetail"
              name="name"
              type="textarea"
              label-align="left"
              placeholder="填写详细地址"
              :rules="[{ validator:validatorAdress, message: '请填写详细地址' }]"
            />
            <van-cell>
              <div class="update-img">请上传您的的家用车行驶证照片</div>
              <van-uploader v-model="fileList" :after-read="afterRead" />
            </van-cell>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button
              class="submit-btn"
              round
              block
              type="primary"
              native-type="submit"
            >
              注册
            </van-button>
          </div>
        </van-form>

        <van-popup v-model:show="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted,ref } from "vue";
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import {UserService} from '@/api/api'
import {pattern} from '@/utiles/pattern'
import {
    saveToken,
    saveLoginStatus,
    saveUserInfo,
    removeToken,
    removeUserInfo,
    removeLoginStatus,
    loadLoginStatus,
    loadToken,
    loadUserInfo
} from '@/utiles/cache'
export default {
  name: "",
  setup() {
    const router = useRouter();
    const data = reactive({
      form: {
        phone: "",
        name: "",
        chepai: "",
        sex: "男",
        is_bao: "是",
        danwei:'其他用户',
        adress: "",
        adressdetail:'',
        gongzuodizhi:''
      },
      showArea: false,
      fileList: [],
    });
    //手机号校验
    const validatorPhone = (val) => pattern.phone.test(val);
    const validatorName = (val) => val !== ''
    const validatorCarNum = (val) => val !== ''
    const validatorAdress = (val) => val !== ''
    const onFailed = (errorInfo) => {
    //   router.push({
    //     path: "/appraisal",
    //   });
      console.log("failed", errorInfo);
    };
    const sub = async () => {
        data.form.gongzuodizhi =  data.form.adress + data.form.adressdetail
        let datas = JSON.parse(JSON.stringify(data.form))
        delete datas.adress
        delete datas.adressdetail
        datas.is_bao == "是"?datas.is_bao = '1':datas.is_bao = '0'
        datas.sex == "男"?datas.sex = '1':datas.sex = '0'
        datas.open_id = localStorage.getItem('open_id')
        if(data.fileList.length <= 0){
            Toast.fail('请上传行驶证')
            return false
        }
        datas.xingshiz = data.fileList[0].url || ''
        console.log(datas)
        let formDate = new FormData()
        for(let i in datas){
            formDate.append(i,datas[i])
        }
        
       let r = await UserService.adduser(formDate)
       if(r.data.code == 200){
           Toast.success('提交成功')
           router.push({
             path:'/chooseUrl'
           })
       }
    //   router.push({
    //     path: "/choosePeople",
    //   });
    };

    const onConfirm = (val) => {
      data.form.adress = "";
      if (val.length > 0) {
        data.form.adress += val.map((i) => i.name);
      }
      data.showArea = false
    };

    const afterRead = async (file) => {
        data.fileList = []
      file.status = "uploading";
      file.message = "上传中...";
      let formDate = new FormData()
      formDate.append('image',file.file)
      let r = await UserService.upload(formDate)
      if(r.data.code === 200){
            data.fileList.push({url:`${r.data.url}`})
            console.log(data.fileList)
      }else{
          file.status = "failed";
        file.message = "上传失败";
      }
    };
    const urlList = ref()
    
    onBeforeMount(() => {});
    onMounted(() => {});
    return {
      ...toRefs(data),
      validatorPhone,
      validatorName,
      validatorCarNum,
      validatorAdress,
      onFailed,
      onConfirm,
      areaList,
      afterRead,
      sub,
      urlList
    };
  },
};
</script>
<style lang="less" scoped>
#register {
  
  background: url(../assets/bj.png) no-repeat;
  width: 100vw;
  min-height: 100vh;
  background-size: contain;
  padding-top: 23vh;
  box-sizing: border-box;
  .main {
    .content {
      background: #fff;
      border-radius: 60px 0 0 0;
      margin-top: -60px;
      padding: 80px 0 45px 0;
      box-sizing: border-box;
      position: relative;
      .info{
    font-size: 13px;
    position: absolute;
    top: 13px;
    padding: 0 40px;
    color: #000;
    font-weight: bold;
  }
  .info-red{
    color: red;
    top: 35px;
    font-size: 12px;
  }
    }
    .shade {
      background: rgba(0, 0, 0, 0.2);
      height: 80px;
    }
    .update-img {
      opacity: 0.4;
      margin-bottom: 20px;
    }
  }
  .submit-btn {
    width: 282px;
    height: 35px;
    background: #006f6c;
    color: #fff;
    margin: 0 auto;
  }
}
/deep/ .van-cell-group--inset {
  margin: 0;
}
/deep/ ::placeholder {
  color: #000 !important;
  opacity: 0.4;
}
/deep/ .van-field__label {
  color: #000;
}
/deep/ .van-radio__icon .van-icon {
  font-size: 0.6em;
}
/deep/ .van-radio__icon {
  height: auto;
  line-height: normal;
}
/deep/ .van-form .van-cell {
  padding: 15px 20px;
}
</style>