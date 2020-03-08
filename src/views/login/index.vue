<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :hidden="flag"
    >
      <div class="title-container">
        <h3 class="title">登陆</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="账号"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登陆</el-button>

      <div class="tips">
        <el-button type="text" @click="gotoGetPassword">忘记密码</el-button>
      </div>
      <div class="tips">
        <el-button type="text" @click="showRejest">注册</el-button>
      </div>
    </el-form>
    <el-form
      ref="rejestForm"
      :model="rejestForm"
      :rules="rejestRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :hidden="!flag"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="rejestForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="rejestForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
          :blur="checkEmail"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="rejestForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="repassword"
          v-model="rejestForm.repassword"
          :type="passwordType"
          placeholder="确认密码"
          name="repassword"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="token" style="width:60%;float:left;">
        <el-input
          ref="token"
          v-model="rejestForm.token"
          type="textarea"
          placeholder="验证码"
          name="token"
          tabindex="2"
          auto-complete="on"
          rows="6"
        />
      </el-form-item>
      <el-form-item prop="token" style="width:40%;float:left;">
        <el-button type="primary" style="width:100%;" :disabled="!sendButton" @click="getCode">获取验证码</el-button>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        :disabled="!submitButton"
        @click.native.prevent="submitRejest"
      >注册</el-button>

      <div class="mytip">
        <el-button type="text" @click="gotoGetPassword">忘记密码</el-button>
      </div>
      <div class="mytip">
        <el-button type="text" @click="showLogin">登陆</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validEmail, validToken, validPassword } from '@/utils/validate'
import { checkEmailExist, sendEmailRejest } from '@/api/getpassword'
import { checkUsernameExist, rejest } from '@/api/user'
import { Message } from 'element-ui'
// import { getCodeImg } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      this.emailFlag = false
      if (!validEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        checkEmailExist({ email: value.trim() }).then((response) => {
          if (response.code === 20000) {
            Message({
              type: 'error',
              message: '邮箱已经注册'
            })
            callback(new Error('邮箱已经注册'))
          } else {
            this.$nextTick(() => {
              this.emailFlag = true
            })
            callback()
          }
        })
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码不能少于六位'))
      } else {
        callback()
      }
    }
    const validateToken = (rule, value, callback) => {
      if (!validToken(value)) {
        callback(new Error('验证码格式不正确'))
      } else {
        this.$nextTick(() => {
          this.codeFlag = true
        })
        callback()
      }
    }
    const validateUser = (rule, value, callback) => {
      this.usernameFlag = false
      if (value.trim().length === 0) {
        callback(new Error('请输入用户名'))
      } else {
        checkUsernameExist({ username: value.trim() }).then((response) => {
          if (response.code === 20400) {
            Message({
              type: 'error',
              message: response.message
            })
            callback(new Error('用户名重复'))
          } else {
            this.$nextTick(() => {
              this.usernameFlag = true
            })
            callback()
          }
        })
      }
    }
    return {
      usernameFlag: false,
      emailFlag: false,
      codeFlag: false,
      flag: false,
      loginForm: {
        email: '',
        password: '',
        thecode: ''
      },
      rejestForm: {
        email: '',
        username: '',
        password: '',
        repassword: '',
        token: ''
      },
      rules: {
        email: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      rejestRules: {
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        repassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        token: [
          { required: true, trigger: 'blur', validator: validateToken }
        ],
        username: [
          { required: true, trigger: 'blur', validator: validateUser }
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      codeDate: {
        date: ''
      }
    }
  },
  computed: {
    sendButton: function() {
      return validPassword(this.rejestForm.password) && validPassword(this.rejestForm.repassword) && this.usernameFlag && this.emailFlag && this.rejestForm.password === this.rejestForm.repassword
    },
    submitButton: function() {
      return this.sendButton && this.codeFlag
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    gotoGetPassword() {
      console.log('test')
      this.$router.push({ path: '/find' })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitRejest() {
      rejest(this.rejestForm).then(response => {
        this.$nextTick(() => {
          this.usernameFlag = false
          this.emailFlag = false
          this.codeFlag = false
          this.flag = false
        })
      })
    },
    showLogin() {
      this.flag = true
      this.$nextTick(() => {
        this.flag = false
      })
    },
    showRejest() {
      this.flag = false
      this.$nextTick(() => {
        this.flag = true
      })
    },
    getCode() {
      sendEmailRejest({ email: this.rejestForm.email }).then(response => {
        Message({
          type: 'success',
          message: response.message
        })
      })
    }
    // getCode() {
    //   const date = new Date()
    //   this.codeDate.date = date.toLocaleString()
    //   getCodeImg(this.codeDate)
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .codeDiv {
    width: 100%;
    height: 47px;

    .inputItem {
      width: 65%;
      float: left;
    }

    .imgDiv {
      width: 35%;
      height: 47px;
      float: left;

      img {
        height: 100%;
        width: 100%;

        display: block;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .mytip {
    width:50%;
    float:left;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .getCode{
    width:30%;
    border:1px solid red;
    float:left;
  }
}
</style>
