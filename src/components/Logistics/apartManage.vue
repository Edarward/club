<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="info" @click="changeloginType" icon="el-icon-sort" circle></el-button>
      </el-form-item>
      <template v-if="loginType === '余量'">
        <el-form-item label="编号">
          <el-input v-model="amId" placeholder="请输入编号"></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="余量">
          <el-input v-model="amRemain" placeholder="请输入余量"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          type="primary"
          @click="getAprtRList"
          @dblclick.native="getAprtIList"
          @keyup.enter.native="getAprtList"
          icon="el-icon-search"
          circle
        ></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="加载中"
    >
      <el-table-column prop="amId" label="公寓编号" width="100" align="center"></el-table-column>
      <el-table-column prop="amName" label="公寓名"></el-table-column>
      <el-table-column prop="amArea" label="公寓区域"></el-table-column>
      <el-table-column prop="amRemain" label="空宿舍"></el-table-column>
      <el-table-column prop="amType" label="公寓类型"></el-table-column>
      <el-table-column prop="amStatus" label="公寓状态"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改余量</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form label-width="90px">
        <el-form-item label="公寓编号">{{aprtInfo.amId}}</el-form-item>
        <el-form-item label="公寓剩余：" prop="amRemain">
          <el-input-number v-model="amRemain" :min="0" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit(aprtInfo.amId)">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查询结果：" :visible.sync="tableVisible" :close-on-click-modal="false">
      <el-form label-width="100px">
        <el-form-item label="公寓编号：">{{aprinfo.amId}}</el-form-item>
        <el-form-item label="公寓名：">{{aprinfo.amName}}</el-form-item>
        <el-form-item label="公寓区域：">{{aprinfo.amArea}}</el-form-item>
        <el-form-item label="空宿舍：">{{aprinfo.amRemain}}</el-form-item>
        <el-form-item label="公寓类型：">{{aprinfo.amType}}</el-form-item>
        <el-form-item label="公寓状态：">{{aprinfo.amStatus}}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      editFormVisible: false,
      tableVisible: false,
      aprtInfo: {},
      aprinfo: {},
      loginType: "编号",

      amId: "",
      amRemain: ""
    };
  },
  methods: {
    getAprtIList() {
      this.tableVisible = true;
      this.$store
        .dispatch("getAprtIList", {
          amId: this.amId
        })
        .then(res => {
          if (res.code === 0) {
            this.aprinfo = res.data;
          } else this.setMessage(res);
        });
    },
    getAprtRList() {
      this.$store
        .dispatch("getAprtRList", {
          amRemain: this.amRemain
        })
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data;
          } else this.setMessage(res);
        });
    },
    changeloginType() {
      if (this.loginType == "余量") {
        this.loginType = "";
      } else {
        this.loginType = "余量";
      }
    },
    getAprtList() {
      this.loading = true;
      this.$store.dispatch("getAprtList", {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        } else this.setMessage(res);
        this.loading = false;
      });
    },

    handleEdit: function(index, row) {
      this.aprtInfo = row;
      this.amRemain = row.amRemain;
      this.editFormVisible = true;
    },

    //修改课程
    EditAprt(amId) {
      this.loading = true;
      this.$store
        .dispatch("EditAprt", {
          amId,
          amRemain: this.amRemain
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("修改成功！");
            this.getAprtList();
          } else this.setMessage(res);
        });
    },
    editSubmit(amId) {
      this.$confirm("是否确定修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.EditAprt(amId);
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
    this.getAprtList();
  }
};
</script>
