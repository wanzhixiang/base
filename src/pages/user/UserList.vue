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
      <el-button type="success" size="small"  icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
    </el-row>
    <!--弹框-->
    <AddUserDialog :dialogFormVisible.sync="dialogFormVisible" :title="dialogTitle"></AddUserDialog>
    <!--操作按钮区 end-->
    <BasicTable :table="table"></BasicTable>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import BasicTable from "../../components/table/BasicTable";
import AddUserDialog from "../../components/dialog/AddUserDialog";
export default {
  name: 'UserList',
  components: {BasicTable,AddUserDialog},
  data () {
    return {
      data: {
        id: '',
        keyword: '',
        dept: '',
        createDate: ''
      },
      dialogFormVisible: false,
      dialogTitle: '新增用户',
      table: {
        columns: [
          {
            name: '用户名',
            alias: 'userName'
          }, {
            name: '登录名',
            alias: 'loginName'
          },
          {
            name: '部门',
            alias: 'dept'
          },
          {
            name: '角色',
            alias: 'roles'
          },
          {
            name: '状态',
            alias: 'status'
          },
          {
            name: '创建时间',
            alias: 'createTime'
          },
        ],
        data: [
          {
            userName: 'wzx',
            loginName: 'wzx',
            dept: '管理部',
            roles: '超级管理员',
            status: '启用',
            createTime: '2018-01-01',
          }
        ]
      },
      page: {
        total: 4,
        pageSize: 10,
        currentPage: 1
      }
    }
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
    }
  }
}
</script>

<style scoped>

</style>
