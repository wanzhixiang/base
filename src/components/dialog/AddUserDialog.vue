<template>
  <el-dialog :title="title" :visible.sync="visible" :center="false" width="40%" @close="closeDialog">
    <el-form :model="data" :inline="true" :rules="rules" ref="data">
      <el-input v-model="data.id" type="hidden" auto-complete="off"></el-input>
      <el-form-item label="登录账号" :label-width="formLabelWidth"  prop="loginName">
        <el-input v-model="data.loginName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="初始密码" :label-width="formLabelWidth">
        <el-input v-model="data.password" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="userName">
        <el-input v-model="data.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户性别" :label-width="formLabelWidth">
        <el-input v-model="data.sex"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" :label-width="formLabelWidth" prop="telephone">
        <el-input v-model="data.telephone"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm('data')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddUserDialog',
  props: {
    title: '',
    show: false
  },
  data () {
    var validateLoginName = (rule, value, callback) => {
      callback()
    };
    return {
      data: {
        id: '',
        loginName: '',
        password: '123456',
        userName: '',
        sex: '',
        telephone: '',
      },
      formLabelWidth: '80px',
      visible: this.show,
      rules: {
        loginName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { validator: validateLoginName, message: '请输入登录账号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    show: function () {
      this.visible = this.show
    }
  },
  methods: {
    closeDialog: function() {
      this.data = {}
      this.$emit("update:show",false)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>

</style>
