<template>
  <div>
    <!--操作查询区 start-->
    <el-form :model="data" label-width="80px" :inline="true" size="small">
      <el-form-item label="查询条件">
        <el-input v-model="data.keyword" auto-complete="off" placeholder="用户名/登录账号"></el-input>
      </el-form-item>
      <el-form-item label="部门" >
        <el-input v-model="data.dept" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建日期" >
        <el-date-picker
          v-model="data.createDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchVoucher">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" icon="el-icon-close" @click="cleanSearch">清空</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex">
      <el-button type="success" size="small"  icon="el-icon-plus" @click="addRole">新增</el-button>
    </el-row>
    <!--弹框-->
    <AddRoleDialog :show.sync="show" :title="dialogTitle" :data="roleData"></AddRoleDialog>
    <!--操作按钮区 end-->
    <RoleTable :table="table"></RoleTable>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="table.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="table.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="table.total">
    </el-pagination>
  </div>
</template>

<script>
import RoleTable from './RoleTable'
import AddRoleDialog from './AddRoleDialog'
export default {
  name: 'RoleList',
  components: {RoleTable, AddRoleDialog},
  data () {
    return {
      data: {
        id: '',
        keyword: '',
        dept: '',
        createDate: ''
      },
      roleData:{},
      show: false,
      dialogTitle: '新增角色',
      table: {
        list: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  mounted: function () {
    this.buildData()
  },
  methods: {
    // 清空查询
    cleanSearch: function () {
      this.data = {}
    },
    // 查询数据
    searchVoucher: function () {
      console.log(this.data.createDate)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //新增角色
    addRole(){
      this.roleData={
        id: '',
        name: '',
        functions:[]
      }
      this.dialogTitle = '新增角色'
      this.show=true
    },
    //编辑角色
    editRole(row){
      this.roleData={
        id:row.id,
        name: row.name,
        functions: row.functions
      }
      this.dialogTitle = '修改角色';
      this.show=true
    },
    //删除角色
    handleDelete(row){
      var _this = this
      this.$post('/role/del',{id:row.id})
        .then(function (response) {
          _this.buildData()
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    buildData: function () {
      var _this = this
     this.$get('/role/list')
        .then(function (response) {
          _this.table = response.data
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>

</style>
