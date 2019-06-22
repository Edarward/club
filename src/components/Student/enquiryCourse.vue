<template>
  <div>
    <el-form :inline="true" class="query">
      <el-form-item label="学号">
        <el-input v-model="stuId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getArrangeCourseList">查询数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
    >
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="stuclaName" label="课程名" align="center"></el-table-column>
        <el-table-column prop="stuclaWeek" label="周数" align="center"></el-table-column>
        <el-table-column prop="stuclaTime" label="节数" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
		
      tableData: [],
      selCourseInfo: {},

      //查询数据
      id: "",
      stuId: "20160001",
      stuclaName: "",
      stuclaWeek: "",
      stuclaTime: "",
    };
  },
  mounted() {
    this.getArrangeCourseList();
  },
  methods: {
	  //查询
    getArrangeCourseList() {
      this.loading = true;
      this.$store.dispatch("getArrangeCourseList", {
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
