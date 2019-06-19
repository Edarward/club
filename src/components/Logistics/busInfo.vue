<template>
  <div>
    <el-button type="primary" @click="handleAdd" round>购置车辆</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="加载中"
    >
      <el-table-column prop="bId" label="公车编号"></el-table-column>
      <el-table-column prop="bType" label="类型"></el-table-column>
      <el-table-column prop="bCapacity" label="容量"></el-table-column>
      <el-table-column prop="bTime" label="运行时间"></el-table-column>
      <el-table-column prop="bLine" label="路线"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.bStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="正常"
            inactive-text="报废"
            @change="EditBussta(scope.row.bId,scope.row.bStatus)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="公车编号" prop="bId">
          <el-input v-model="bId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="bType">
          <el-input v-model="bType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="bCapacity">
          <el-input-number v-model="bCapacity" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="运行时间" prop="bTime">
          <el-input v-model="bTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路线">
          <el-input type="textarea" v-model="bLine"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input type="textarea" v-model="bStatus"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改公车 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="公车" prop="bId">{{businfo.bId}}</el-form-item>
        <el-form-item label="类型" prop="bType">
          <el-input v-model="bType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="bCapacity">
          <el-input-number v-model="bCapacity" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="运行时间" prop="bTime">
          <el-input v-model="bTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路线">
          <el-input type="textarea" v-model="bLine"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit(businfo.bId)">提交</el-button>
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
      addFormRules: {},
      //新增截面数据

      businfo: {},
      bId: "",
      bType: "",
      bCapacity: "",
      bTime: "",
      bLine: "",
      bStatus: ""
    };
  },
  methods: {
    formatSex: function(row, column) {
      return row.bStatus == 1 ? true : row.bStatus == 0 ? false : "未知";
    },
    handleAdd: function() {
      this.addFormVisible = true;
    },
    handleEdit: function(index, row) {
      this.businfo = row;
      this.bType = row.bType;
      this.bCapacity = row.bCapacity;
      this.bTime = row.bTime;
      this.bLine = row.bLine;
      this.bStatus = row.bStatus;
      this.editFormVisible = true;
    },
    getAprtbusList() {
      this.loading = true;
      this.$store.dispatch("getAprtbusList", {}).then(res => {
        if (res.code == 0) {
          this.tableData = res.data;
        } else this.setMessage(res);
        this.loading = false;
      });
    },
    //删除公车
    deleteAprtbus(bId) {
      this.loading = true;
      this.$store
        .dispatch("deleteAprtbus", {
          bId
        })
        .then(res => {
          if (res.code == 0) {
            this.$message.success("删除成功！");
            this.getAprtbusList();
          }
        });
    },
    handleDel(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteAprtbus(row.bId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除！"
          });
        });
    },
    //添加公车
    addAprtbus() {
      this.loading = true;
      this.$store
        .dispatch("addAprtbus", {
          bId: this.bId,
          bType: this.bType,
          bCapacity: this.bCapacity,
          bTime: this.bTime,
          bLine: this.bLine,
          bStatus: this.bStatus
        })
        .then(res => {
          if (res.code == 0) {
            this.$message.success("添加成功");
            this.getAprtbusList();
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
          this.addAprtbus();
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
    updateAprtbus(bId) {
      this.loading = true;
      this.$store
        .dispatch("updateAprtbus", {
          bId,
          bType: this.bType,
          bCapacity: this.bCapacity,
          bTime: this.bTime,
          bLine: this.bLine,
          bStatus: this.bStatus
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "更新成功！"
            });
            this.getAprtbusList();
          } else this.setMessage(res);
        });
    },
    editSubmit(bId) {
      this.$confirm("确定修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateAprtbus(bId);
          this.editFormVisible = false;
          this.loading = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新"
          });
          this.reload();
        });
    },
    EditBussta(bId,bStatus) {
      this.$store
        .dispatch("EditBussta", {
          bId,
          bStatus
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "更新成功！"
            });
          } 
        });
    },
    
  },
  mounted() {
    this.getAprtbusList();
  }
};
</script>
