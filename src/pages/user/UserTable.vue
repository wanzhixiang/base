<template>
  <el-table
    :data="table.list"
    :border="true"
    tooltip-effect="dark"
    style="width: 100%;margin-top: 20px"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="登录账号"
      prop="userName"
    ></el-table-column>
    <el-table-column
      label="真实姓名"
      prop="trueName"
    ></el-table-column>
    <el-table-column
      label="电话号码"
      prop="phone"
    ></el-table-column>
    <el-table-column
      label="电子邮箱"
      prop="email"
    ></el-table-column>
    <el-table-column
      label="创建时间"
      prop="createDate"
      :formatter="dateFormat"
    ></el-table-column>
    <el-table-column
      label="状态"
      prop="status"
    ></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'UserTable',
    props: {
      table: {}
    },
    data() {
      return {
        multipleSelection: []
      }
    },
    methods: {
      handleEdit(index, row) {
        this.$parent.editUser(row)
      },
      handleDelete(index, row) {

      },
      dateFormat(row, column) {
        const date = new Date(row[column.property])
        return date.getFullYear() + '年' +
          date.getMonth() + '月' +
          date.getDate() + '日 ' +
          date.getHours() + ':' + date.getMinutes()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>
