<template>
  <div>
    <el-form :inline="true" class="query">
      <el-form-item label="学号">
        <el-input v-model="stuexamStuId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getExamInfoList">查询数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
    >
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="stuexamStuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="stuexamSubId" label="课程号" align="center"></el-table-column>
        <el-table-column prop="stuexamClrId" label="教室编号" align="center"></el-table-column>
        <el-table-column prop="stuexamDate" label="考试时间" align="center"></el-table-column>
        <el-table-column prop="stuexamTime" label="考试次数" align="center"></el-table-column>
        <el-table-column prop="stuexamClrName" label="考试地点" align="center"></el-table-column>
        <el-table-column prop="stuexamSubName" label="考试科目" align="center"></el-table-column>
        <el-table-column prop="stuexamYear" label="学年" align="center"></el-table-column>	
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
		
      tableData: [],
      examInfo: {},

      //查询数据
      id: "",
      
      //新增界面数据
      
      stuexamStuId: "20160001",
      stuexamSubId: "",
      stuexamClrId: "",
      stuexamDate: "",
      stuexamTime: "",
      stuexamClrName: "",
      stuexamSubName: "",
      stuexamYear: "",

      // 删除数据
      

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
    };
  },
  mounted() {
    this.getExamInfoList();
  },
  methods: {
	  //查询
    getExamInfoList() {
      this.loading = true;
      this.$store.dispatch("getExamInfoList", {
          stuexamStuId: this.stuexamStuId
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
