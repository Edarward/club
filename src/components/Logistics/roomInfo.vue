<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="sName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="getAprtStuNList" @dblclick.native="getAprtStuList" icon="el-icon-search" circle></el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd" round>添加住户</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="加载中"
    >
      <el-table-column prop="sId" label="编号" width="100" align="center" sortable></el-table-column>
      <el-table-column prop="sName" label="姓名"></el-table-column>
      <el-table-column prop="sAge" label="年龄" sortable></el-table-column>
      <el-table-column prop="sSex" label="性别"></el-table-column>
      <el-table-column prop="sMajor" label="专业"></el-table-column>
      <el-table-column prop="sGrade" label="年级"></el-table-column>
      <el-table-column prop="inTime" label="入住时间"></el-table-column>
      <el-table-column prop="duration" label="入住时长"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加住户 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="编号" prop="sId">
          <el-input v-model="sId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="sName">
          <el-input v-model="sName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="sAge">
          <el-input-number v-model="sAge" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="sSex"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="sMajor">
          <el-input v-model="sMajor"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="sGrade">
          <el-input v-model="sGrade"></el-input>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="inTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="入住时长">
          <el-input v-model="duration"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="编号">{{stuInfo.sId}}</el-form-item>
        <el-form-item label="姓名" prop="sName">
          <el-input v-model="sName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="sAge">
          <el-input-number v-model="sAge" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="sSex"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="sMajor">
          <el-input v-model="sMajor"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="sGrade">
          <el-input v-model="sGrade"></el-input>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="inTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="入住时长">
          <el-input v-model="duration"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit(stuInfo.sId)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      addFormVisible: false, //新增界面是否显示
      editFormVisible: false,
      stuInfo: {},
      addFormRules: {
        sId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        sName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sAge: [{ required: true }]
      },
      //新增截面数据
      sId: "",
      sName: "",
      sAge: 0,
      sSex: "",
      sMajor: "",
      sGrade: "",
      inTime: "",
      duration: "",
      time: ""
    };
  },
  methods: {
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleAdd: function() {
      this.addFormVisible = true;
    },
    //学生住宿信息
    getAprtStuList() {
      this.loading = true;
      this.$store.dispatch("getAprtStuList", {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        } else this.setMessage(res);
        this.loading = false;
      });
    },
    //学生姓名查询
    getAprtStuNList() {
      this.$store
        .dispatch("getAprtStuNList", {
          sName:this.sName
        })
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data;
          } else this.setMessage(res);
        });
    },
    //修改界面
    handleEdit: function(index, row) {
      this.stuInfo = row;
      this.sName = row.sName;
      this.sAge = row.sAge;
      this.sSex = row.sSex;
      this.sMajor = row.sMajor;
      this.sGrade = row.sGrade;
      this.inTime = row.inTime;
      this.duration = row.duration;
      this.editFormVisible = true;
    },
    getTime(value) {
      if (value == null) {
        return "";
      } else {
        var date = new Date(value);
        var date_value =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        return date_value;
      }
    },

    //住宿信息添加
    AddAprtStu() {
      this.loading = true;
      this.$store
        .dispatch("AddAprtStu", {
          sId: this.sId,
          sName: this.sName,
          sAge: this.sAge,
          sSex: this.sSex,
          sMajor: this.sMajor,
          sGrade: this.sGrade,
          inTime: this.getTime(this.inTime),
          duration: this.duration
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("添加成功！");
            this.getAprtStuList();
          } else this.setMessage(res);
        });
    },
    addSubmit() {
      this.$confirm("确定添加?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.AddAprtStu();
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
    //修改住宿信息
    updateAprtStu(sId) {
      this.loading = true;
      this.$store
        .dispatch("updateAprtStu", {
          sId,
          sName: this.sName,
          sAge: this.sAge,
          sSex: this.sSex,
          sMajor: this.sMajor,
          sGrade: this.sGrade,
          inTime: this.getTime(this.inTime),
          duration: this.duration
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("更新成功！");
            this.getAprtStuList();
          } else this.setMessage(res);
        });
    },
    editSubmit(sId) {
      this.$confirm("确定修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.updateAprtStu(sId);
          this.editFormVisible = false;
          this.loading = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "出现错误，已取消更新"
          });
          this.reload();
        });
    },
    //信息删除
    deleteAprtStu(sId) {
      this.$store
        .dispatch("deleteAprtStu", {
          sId
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("删除成功！");
            this.getAprtStuList();
          }
        });
    },
    handleDel(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.deleteAprtStu(row.sId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  mounted() {
    this.getAprtStuList();
  }
};
</script>
