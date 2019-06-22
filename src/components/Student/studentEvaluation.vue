<template>
  <div>
    <el-button type="primary" icon="el-icon-edit-outline" @click="handleAdd" round>评价信息添加</el-button>
    
    <el-form :inline="true" class="query">
      <el-form-item>
        <el-input v-model="id" placeholder="学号" @keyup.enter.native="getQuestionInfoList" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getQuestionInfoList" >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
    >
        <el-table-column prop="id" label="评价编号" align="center"></el-table-column>
        <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="stuCourseid" label="课程号" align="center"></el-table-column>
        <el-table-column prop="stuQuestionid" label="学生问题编号" align="center"></el-table-column>
        <el-table-column prop="stuType" label="类型" align="center"></el-table-column>
        <el-table-column prop="stuContent" label="问题内容" align="center"></el-table-column>
        <el-table-column prop="questionId" label="问题编号" align="center"></el-table-column>
        <el-table-column prop="stuQuestion" label="问题" align="center"></el-table-column>
        </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="评价编号">
          <el-input v-model="id"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="stuId">
          <el-input v-model="stuId"></el-input>
        </el-form-item>
        <el-form-item label="课程号">
          <el-input v-model="stuCourseid"></el-input>
        </el-form-item>
        <el-form-item label="学生问题编号">
          <el-input v-model="stuQuestionid"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="stuType"></el-input>
        </el-form-item>
        <el-form-item label="问题内容">
          <el-input v-model="stuContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
		
      tableData: [],
      stuEvaInfo: {},
      loading: true,
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      
      id: "",
      stuId: "",
      stuCourseid: "",
      stuQuestionid: "",
      stuType: "",
      stuContent: "",
      questionId: "",
      stuQuestion: "",

      // 删除数据
      
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
    };
  },
  mounted() {
    this.getQuestionInfoList();
  },
  methods: {
    
	  //查询
    getQuestionInfoList() {
      this.loading = true;
      this.$store.dispatch("getQuestionInfoList", {
          
      }).then(res => {
        if (res.code === 0) {
          this.questionId = res.id;
          this.tableData = res.data;
        } else this.setMessage(res);
          this.loading = false;
      });
	},
	
    //新增界面
    handleAdd: function() {
      this.addFormVisible = true;
  },
  
    //学生信息添加
    AddContent() {
      this.loading = true;
      this.$store
        .dispatch("AddContent", {
          	id: this.id,
            stuId: this.stuId,
            stuCourseid: this.stuCourseid,
            stuQuestionid: this.stuQuestionid,
            stuType: this.stuType,
            stuContent: this.stuContent
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("添加成功！");
            this.getQuestionInfoList();
          } else this.setMessage(res);
        });
    },
    addSubmit() {
      this.$confirm("确定添加该学生信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.AddContent();
          this.addFormVisible = false;
          this.loading = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
	  },
  }
};
</script>
