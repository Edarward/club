<template>
  <div>
    <el-button type="primary" @click="handleAdd" round>添加食堂</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="加载中"
    >
      <el-table-column prop="cId" label="食堂编号"></el-table-column>
      <el-table-column prop="cName" label="食堂名称"></el-table-column>
      <el-table-column prop="cCapacity" label="食堂容量"></el-table-column>
      <el-table-column prop="cTime" label="开门时间" ></el-table-column>
      <el-table-column prop="cClose" label="关门时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加食堂 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="食堂编号" prop="cId">
          <el-input v-model="cId"></el-input>
        </el-form-item>
        <el-form-item label="食堂名称" prop="cName">
          <el-input v-model="cName"></el-input>
        </el-form-item>
        <el-form-item label="食堂容量" prop="cCapacity">
          <el-input v-model="cCapacity"></el-input>
        </el-form-item>
        <el-form-item label="开门时间">
          <el-input v-model="cTime"></el-input>
        </el-form-item>
        <el-form-item label="关门时间" prop="sMajor">
          <el-input v-model="cClose"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改食堂 -->
    <el-dialog title="新增" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="食堂编号" prop="cId">{{caninfo.cId}}</el-form-item>
        <el-form-item label="食堂名称" prop="cName">
          <el-input v-model="cName"></el-input>
        </el-form-item>
        <el-form-item label="食堂容量" prop="cCapacity">
          <el-input v-model="cCapacity"></el-input>
        </el-form-item>
        <el-form-item label="开门时间">
          <el-input v-model="cTime"></el-input>
        </el-form-item>
        <el-form-item label="关门时间" prop="sMajor">
          <el-input v-model="cClose"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit(caninfo.cId)">提交</el-button>
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
      addFormVisible: false,
      editFormVisible: false,
      caninfo: {},

      cId: "",
      cName: "",
      cCapacity: "",
      cTime: "",
      cClose: ""
    };
  },
  methods: {
    handleAdd: function() {
      this.addFormVisible = true;
    },
    handleEdit: function(index, row) {
      this.caninfo = row;
      this.cName = row.cName;
      this.cCapacity = row.cCapacity;
      this.cTime = row.cTime;
      this.cClose = row.cClose;
      this.editFormVisible = true;
    },
    getAprtcanteenList() {
      this.loading = true;
      this.$store.dispatch("getAprtcanteenList", {}).then(res => {
        if (res.code == 0) {
          this.tableData = res.data;
        } else this.setMessage(res);
        this.loading = false;
      });
    },
    //删除食堂
    deleteAprtcan(cId) {
      this.loading = true;
      this.$store
        .dispatch("deleteAprtcan", {
          cId
        })
        .then(res => {
          if (res.code == 0) {
            this.$message.success("删除成功！");
            this.getAprtcanteenList();
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
          this.deleteAprtcan(row.cId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除！"
          });
        });
    },
    addAprtcan() {
      this.loading = true;
      this.$store
        .dispatch("addAprtcan", {
          cId: this.cId,
          cName: this.cName,
          cCapacity: this.cCapacity,
          cTime: this.cTime,
          cClose: this.cClose
        })
        .then(res => {
          if (res.code == 0) {
            this.$message.success("添加成功");
            this.getAprtcanteenList();
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
          this.addAprtcan();
          this.addFormVisible = false;
          this.loading = false;
        })
        .catch(() => {
          this.message({
            type: "info",
            message: "已取消"
          });
        });
    },
    updateAprtcan(cId) {
      this.loading = true;
      this.$store
        .dispatch("updateAprtcan", {
          cId,
          cName: this.cName,
          cCapacity: this.cCapacity,
          cTime: this.cTime,
          cClose: this.cClose
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("更新成功！");
            this.getAprtcanteenList();
          } else this.setMessage(res);
        });
    },
    editSubmit(cId) {
      this.$confirm("确定修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.updateAprtcan(cId);
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
    }
  },

  mounted() {
    this.getAprtcanteenList();
  }
};
</script>
