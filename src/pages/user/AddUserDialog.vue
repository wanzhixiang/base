<template>
  <el-dialog :title="title" :visible.sync="visible" :center="false" width="40%" @close="closeDialog">
    <el-form :model="data" :inline="true" :rules="rules" ref="data">
      <el-input v-model="data.id" type="hidden" auto-complete="off"></el-input>
      <el-form-item label="登录账号" :label-width="formLabelWidth"  prop="userName">
        <el-input v-model="data.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="trueName">
        <el-input v-model="data.trueName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="data.phone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="data.email"></el-input>
      </el-form-item>
      <el-form-item label="所在部门" :label-width="formLabelWidth">
        <el-input v-model="data.dept" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="roles">
        <el-transfer :titles="['角色列表','已选择']"  :props="{key: 'id', label: 'name'}" v-model="data.roles" :data="roles"></el-transfer>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm('data')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddUserDialog',
  props: {
    title: '',
    data: {},
    show: false
  },
  data () {
    var validateLoginName = (rule, value, callback) => {
      callback()
    };
    return {
      roles:[],
      formLabelWidth: '80px',
      visible: this.show,
      rules: {
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { validator: validateLoginName, message: '请输入登录账号', trigger: 'blur' }
        ],
        roles:[
          { required: true, message: '请选择角色', trigger: 'blur' },
        ]
      }
    }
  },
  watch: {
    show: function () {
      this.visible = this.show
    }
  },
  mounted: function () {
    this.getRoles()
  },
  methods: {
    closeDialog: function() {
      this.$refs['data'].clearValidate()
      this.$emit("update:show",false)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post('/user/add',this.data).then(function (response) {

          })
        } else {
          return false;
        }
      });
    },
    getRoles(){
      var _this = this
      this.$get('/role/listAll')
        .then(function (response) {
          _this.roles = response.data;
        })
    },
  }
}
</script>

<style>

</style>
