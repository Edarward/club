<template>
  <div>
    <el-form :inline="true" class="query" >
      <el-form-item label="学号">
        <el-input v-model="stuId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSelectCourseList">查询数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
    >
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="clasId" label="课程号" align="center"></el-table-column>
        <el-table-column prop="applyTime" label="提交时间" align="center"></el-table-column>
        <el-table-column prop="pass" label="是否选上" align="center" :formatter="formatSex"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // query:{
      //   stuId
      // },
      tableData: [],
      selCourseInfo: {},

      //查询数据
      id: "",
      
      //新增界面数据
      
      
      clasId: "",
      stuId: "20160001",
      applyTime: "",
      pass: "",

      // 删除数据
      

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
    };
  },
  mounted() {
    this.getSelectCourseList();
  },
  methods: {
    formatSex: function(row, column) {
      return row.pass == 1 ? "是" : row.pass == 0 ? "否" : "未知";
    },

	  //查询
    getSelectCourseList() {
      this.loading = true;
      this.$store.dispatch("getSelectCourseList", {
          stuId: this.stuId
      }).then(res => {
        if (res.code === 0) {
          // var array = [res.data];
          this.tableData = res.data;
        } else this.setMessage(res);
          console.log(1);
      });
	  },
  }
};
</script>
