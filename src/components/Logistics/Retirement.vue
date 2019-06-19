<template>
  <div>
    <el-button type="primary" @click="handleAdd" round>退宿</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="加载中"
    >
      <el-table-column prop="rId" label="退宿号"></el-table-column>
      <el-table-column prop="rName" label="退宿人"></el-table-column>
      <el-table-column prop="rTime" label="退宿时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="退宿号">
          <el-input v-model="rId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="rName">
          <el-input v-model="rName"></el-input>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="rTime"></el-date-picker>
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
        <el-form-item label="退宿号">{{retiinfo.rId}}</el-form-item>
        <el-form-item label="姓名" prop="rName">
          <el-input v-model="rName"></el-input>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="rTime"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit(retiinfo.rId)">提交</el-button>
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
      addLoading: false,
      addFormRules: {
        rId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        rName: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      retiinfo: {},

      //新增截面数据
      rId: "",
      rName: "",
      rTime: ""
    };
  },
  methods: {
    handleAdd: function() {
      this.addFormVisible = true;
    },
    getAprtretiList() {
      this.loading = true;
      this.$store.dispatch("getAprtretiList", {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        } else this.setMessage(res);
        this.loading = false;
      });
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
    //退宿信息添加
    AddAprtReti() {
      this.loading = true;
      this.$store
        .dispatch("AddAprtReti", {
          rId: this.rId,
          rName: this.rName,
          rTime: this.getTime(this.rTime)
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("添加成功！");
            this.getAprtretiList();
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
          this.AddAprtReti();
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
    handleEdit: function(index, row) {
      this.retiinfo = row;
      this.rName=row.rName;
      this.rTime=row.rTime;
      this.editFormVisible = true;
    },
    //退宿修改
    updateAprtreti(rId) {
      this.loading = true;
      this.$store
        .dispatch("updateAprtreti", {
          rId,
          rName: this.rName,
          rTime: this.getTime(this.rTime)
        })
        .then(res => {
          if (res.code == 0) {
            this.$message.success("更新成功");
            this.getAprtretiList();
          } else this.setMessage(res);
        });
    },
    editSubmit(rId) {
      this.$confirm("确认修改", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.updateAprtreti(rId);
          this.editFormVisible = false;
          this.loading = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "出现错误，取消更新"
          });
          this.reload();
        });
    }
  },
  mounted() {
    this.getAprtretiList();
  }
};
</script>
