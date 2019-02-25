<template>
  <el-dialog :title="title" :visible.sync="visible" :center="false" width="40%" @close="closeDialog">
    <el-form :model="data" :inline="true" :rules="rules" ref="data">
      <el-input v-model="data.id" type="hidden" auto-complete="off"></el-input>
      <el-form-item label="角色名称" :label-width="formLabelWidth"  prop="name">
        <el-input v-model="data.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限列表" :label-width="formLabelWidth"  prop="functions">
        <div style="border: solid 1px #ebebeb;overflow: auto;height: 300px;width: 200px">
          <el-tree
            :props="functionProps"
            ref="tree"
            :data="functionData"
            node-key="id"
            show-checkbox>
          </el-tree>
        </div>
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
      functionProps: {
        label: 'functionName',
        children: 'children',
      },
      functionData:this.getData(),
      formLabelWidth: '80px',
      visible: this.show,
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { validator: validateLoginName, message: '请输入角色名称', trigger: 'blur' }
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
      this.$refs['data'].clearValidate()
      this.$emit("update:show",false)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.data.functions=this.$refs.tree.getCheckedNodes(false,true);
          console.log(this.$refs.tree.getHalfCheckedKeys	())
         /* this.$post('/role/add',this.data).then(function (response) {

          })*/
        } else {
          return false;
        }
      });
    },
    getData(){
      let _this = this
      var param = {tree:true}
      this.$get('/function/listAll',param)
        .then(function (response) {
          _this.functionData = response.data;
        })
    }
  }
}
</script>

<style>
  .el-tree{
    padding-top: 10px;
  }
</style>
