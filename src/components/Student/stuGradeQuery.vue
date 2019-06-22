<template>
  <div>
    <el-form :inline="true" class="query">
      <el-form-item label="学号">
        <el-input v-model="gradeStuId"></el-input>
      </el-form-item>
      <el-form-item label="学年">
        <el-input v-model="gradeYear"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="gradeMajor" placeholder="类型">
          <el-option label=软件工程 value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getGradeInfoList">查询数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
    >
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="gradeStuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="gradeSubId" label="课程号" align="center"></el-table-column>
        <el-table-column prop="gradeStu" label="成绩" align="center"></el-table-column>
        <el-table-column prop="gradeSubName" label="课程名称" align="center"></el-table-column>
        <el-table-column prop="gradeLimit" label="籍贯" align="center"></el-table-column>
        <el-table-column prop="gradeJudge" label="身份证类型" align="center"></el-table-column>
        <el-table-column prop="gradeAlterTime" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="gradeViolate" label="自己电话" align="center"></el-table-column>	
        <el-table-column prop="gradeReview" label="父母电话" align="center"></el-table-column>
        <el-table-column prop="gradeMajor" label="专业" align="center"></el-table-column>
        <el-table-column prop="gradeYear" label="学年学期" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
		
      tableData: [],
      gradeInfo: {},

      //查询数据
      id: "",
      
      //新增界面数据
      gradeStuId: "",
      gradeSubId: "",
      gradeStu: "",
      gradeSubName: "",
      gradeLimit: "",
      gradeJudge: "",
      gradeAlterTime: "",
      gradeViolate: "",
      gradeReview: "",
      gradeMajor: "",
      gradeYear: "",

      // 删除数据
      

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
    };
  },
  mounted() {
    this.getGradeInfoList();
  },
  methods: {
	  //查询
    getGradeInfoList() {
      this.loading = true;
      this.$store.dispatch("getGradeInfoList", {
          gradeStuId: this.gradeStuId,
          gradeMajor: this.gradeMajor,
          gradeYear: this.gradeYear
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
