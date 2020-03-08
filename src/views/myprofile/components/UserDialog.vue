<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="80%"
    :append-to-body="true"
  >
    <el-form ref="dataConfigRules" label-width="30%" :rules="dataConfigRules" :model="config">
      <el-form-item label="url" prop="projectUrl">
        <el-input v-model="config.projectUrl" placeholder="name" style="width: 60%" />
      </el-form-item>

      <el-form-item label="简介" prop="projectIntroduce">
        <el-input v-model="config.projectIntroduce" placeholder="location" style="width: 60%" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存配置</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" />
  </el-dialog>
</template>

<script>
// import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { updateProjects, createProjects } from '@/api/project'
import { Message } from 'element-ui'
export default {
  name: 'DragDialogDemo',
  props: {
    dialogshow: {
      type: Boolean,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataConfigRules: {},
      isShow: this.dialogshow,
      operatorList: []
    }
  },
  computed: {
    title: function() {
      return this.isAdd ? '添加项目' : '修改项目'
    }
  },
  created() {
  },
  methods: {
    save() {
      if (this.isAdd) {
        createProjects(this.config).then((response) => {
          if (response.code === 20400) {
            Message({
              type: 'success',
              message: response.message
            })
            this.isShow = false
            this.$emit('dialogChange', this.isShow)
          } else {
            this.isShow = false
            this.$emit('dialogChange', this.isShow)
          }
        })
      } else {
        updateProjects(this.config).then(() => {
          console.log('update')
          this.isShow = false
          this.$emit('dialogChange', this.isShow)
        })
      }
    }
  }
}
</script>
