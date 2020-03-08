<template>

  <div class=" mycontainer">
    <div class="mystep">
      <el-steps :active="active" finish-status="success">
        <el-step title="邮箱验证 " />
        <el-step title="修改密码 " />
        <el-step title="修改成功 " />
      </el-steps>
    </div>
    <div class="myform" :hidden="flag">
      <el-form ref="form" :model="form" :rules="findRules" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" name="email" style="width:70%" @blur="checkEmail" />
          <el-button type="primary" style="width:29%" :disabled="!emailVlidate || sendEmailButton" @click="sendEmail">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="token">
          <el-input v-model="form.token" name="token" type="textarea" rows="6" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!emailVlidate || sendEmailButton || !tokenValidate" @click="onSubmitCode">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="myform" :hidden="flag1">
      <el-form ref="form" :model="form" :rules="findRules" label-width="80px">
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" name="password" style="width:70%" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="form.repassword" name="repassword" style="width:70%" type="password" @blur="checkPasswrodSame" />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!passwordVlidate || samePassword" type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="myform" :hidden="flag2">
      <!-- <span class="myspan">
        密码修改成功，点击返回登陆界面
      </span> -->
      <el-button type="primary" class="mybutton" @click="onGo">密码修改成功，点击返回登陆界面</el-button>
    </div>
  </div>
</template>

<script>
import { validEmail, validToken, validPassword } from '@/utils/validate'
import { checkEmailExist, sendEmail, validataToken, changePassword } from '@/api/getpassword'
import { Message } from 'element-ui'
export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validateToken = (rule, value, callback) => {
      if (!validToken(value)) {
        callback(new Error('验证码格式不正确'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码不能少于六位'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      flag: false,
      flag1: true,
      flag2: true,
      sendEmailButton: true,
      samePassword: true,
      uid: '',
      form: {
        email: '',
        token: '',
        password: '',
        repassword: ''
      },
      findRules: {
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        repassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        token: [{ required: true, trigger: 'blur', validator: validateToken }]
      }

    }
  },
  computed: {
    emailVlidate: function() {
      return validEmail(this.form.email)
    },
    tokenValidate: function() {
      return validToken(this.form.token)
    },
    passwordVlidate: function() {
      return validPassword(this.form.password) && validPassword(this.form.repassword)
    }

  },
  methods: {
    onSubmit() {
      changePassword({ uid: this.uid, password: this.form.password }).then(response => {
        this.flag1 = true
        this.flag2 = false
        this.flag = true
        this.active = 2
      })
    },
    onSubmitCode() {
      console.log('submit!')
      validataToken({ email: this.form.email, token: this.form.token.replace('\n', '').trim() }).then(response => {
        if (response.code === 20040) {
          this.uid = response.uid
          this.flag = true
          this.flag1 = false
          this.flag2 = true
          this.active = 1
        }
        this.uid = response.uid
      })
    },
    sendEmail() {
      sendEmail({ email: this.form.email }).then(response => {
        var type = ''
        if (response.code === 24000) {
          type = 'error'
        } else {
          type = 'success'
        }
        Message({
          type: type,
          message: response.message
        })
      })
    },
    checkEmail() {
      if (this.emailVlidate) {
        checkEmailExist({ email: this.form.email }).then(response => {
          console.log(response)
          if (response.code === 24000) {
            Message({
              type: 'error',
              message: response.message
            })
            this.sendEmailButton = true
          } else {
            this.sendEmailButton = false
          }
        })
      }
    },
    checkPasswrodSame() {
      if (this.passwordVlidate) {
        if (this.form.password === this.form.repassword) {
          this.samePassword = false
        } else {
          Message({
            type: 'error',
            message: '两次密码输入不一致'
          })
        }
      }
    },
    onGo() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>
.mycontainer{
  min-height:100%;
  width:100%;

}
.mystep{
    width:70%;
    height:30%;
    margin:100px auto;

}
.myform{

    width:35%;
    height:50%;
    margin:100px auto;
}
.mybutton{
  display: block;
  margin: 10px auto;
}
</style>
