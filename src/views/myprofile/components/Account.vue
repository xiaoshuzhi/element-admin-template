<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-upload" style="float:right" @click="imagecropperShow=true">修改头像</el-button>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="技术爱好" :span="11">
        <el-select v-model="skills" multiple placeholder="请选择技术爱好">
          <el-option
            v-for="item in options "
            :key="item.data1.id"
            :label="item.data1.skillType"
            :value="item.data1.id"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="/api/header"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>

</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import { getAllSkills } from '@/api/skills'
import { getUserInfo, updateInfo, checkUsernameForUpdate } from '@/api/user'
export default {
  components: { ImageCropper },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      // image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      form: {
        username: '',
        address: '',
        gender: '',
        skills: ''
      },
      options: [],
      skills: []
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      getUserInfo().then(response => {
        this.form = response.data
        var i = 0
        this.form.skills.split(',').forEach((value) => {
          this.skills[i] = Number.parseInt(value)
          i++
        })
      })
      getAllSkills().then(response => {
        this.options = response.data.skills
      })
    },
    onSubmit() {
      var str = ''
      this.skills.forEach(value => {
        str = str + value + ','
      })
      this.form.skills = str.substring(0, str.length - 1)
      console.log(this.form.skills)
      checkUsernameForUpdate({ username: this.form.username }).then(response => {
        if (response.code === 20400) {
          this.$message({ type: 'error', message: response.message })
        } else {
          console.log(this.form)
          updateInfo({
            username: this.form.username,
            address: this.form.address,
            gender: this.form.gender,
            skills: this.form.skills
          },).then(response => {
            this.$message({ type: 'success', message: response.message })
            this.$store.dispatch('user/getInfo')
          })
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      // this.image = resData.files.avatar
      this.$store.dispatch('user/getInfo')
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
