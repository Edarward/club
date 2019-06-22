<template>
  <div>
    <el-button type="primary" icon="el-icon-edit-outline" @click="handleAdd" round>课程添加</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column prop="id" label="课程编号" width="100"></el-table-column>
      <el-table-column prop="name" label="课程名"></el-table-column>
      <el-table-column prop="period" label="学时"></el-table-column>
      <el-table-column prop="credit" label="学分"></el-table-column>
      <el-table-column prop="compulsory" label="必修" :formatter="formatcomp"></el-table-column>
      <el-table-column prop="offlineTeach" label="线下教学" :formatter="formatoff"></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑界面 -->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form label-width="90px">
        <el-form-item label="课程编号：">{{couInfo.id}}</el-form-item>
        <el-form-item label="课程名：" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="学时：">
          <el-input-number v-model="period" :min="0" :max="50"></el-input-number>
        </el-form-item>
        <el-form-item label="学分：">
          <el-input-number v-model="credit" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="必修：">
          <el-radio-group v-model="compulsory">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="线下教育">
          <el-radio-group v-model="offlineTeach">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit(couInfo.id)">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="课程编号" prop="id">
          <el-input v-model="id"></el-input>
        </el-form-item>
        <el-form-item label="课程名" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="学时">
          <el-input-number v-model="period" :min="0" :max="50"></el-input-number>
        </el-form-item>
        <el-form-item label="学分">
          <el-input-number v-model="credit" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="必修">
          <el-radio-group v-model="compulsory">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="线下教育">
          <el-radio-group v-model="offlineTeach">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
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
      couInfo: {},
      loading: true,
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        id: [{ required: true, message: "请输入课程编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入课程名", trigger: "blur" }]
      },
      //新增截面数据
      id: "",
      name: "",
      period: "",
      credit: "",
      compulsory: "",
      offlineTeach: "",

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入课程名", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getCouList();
  },
  methods: {
    formatcomp: function(row, column) {
      return row.compulsory == true
        ? "是"
        : row.compulsory == false
        ? "否"
        : "未知";
    },
    formatoff: function(row, column) {
      return row.offlineTeach == true
        ? "是"
        : row.offlineTeach == false
        ? "否"
        : "未知";
    },

    getCouList() {
      this.loading = true;
      this.$store.dispatch("getCouList", {}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        } else this.setMessage(res);
        this.loading = false;
      });
    },
    //新增界面
    handleAdd: function() {
      this.addFormVisible = true;
    },
    //修改界面
    handleEdit: function(index, row) {
      this.couInfo = row;
      this.editFormVisible = true;
    },

    //课程添加
    AddCou() {
      this.loading = true;
      this.$store
        .dispatch("AddCou", {
          id: this.id,
          name: this.name,
          period: this.period,
          credit: this.credit,
          compulsory: this.compulsory,
          offlineTeach: this.offlineTeach
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("添加成功！");
            this.getCouList();
          } else this.setMessage(res);
        });
    },
    addSubmit() {
      this.$confirm("确定添加该课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.AddCou();
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

    //课程删除
    deleteCourse(id) {
      this.$store
        .dispatch("deleteCou", {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("删除成功！");
            this.getCouList();
          }
        });
    },
    handleDel(row) {
      this.$confirm("是否删除该课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.deleteCourse(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    //修改课程
    EditCou(id) {
      this.loading = true;
      this.$store
        .dispatch("EditCou", {
          id,
          name: this.name,
          period: this.period,
          credit: this.credit,
          compulsory: this.compulsory,
          offlineTeach: this.offlineTeach
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("更新成功！");
            this.getCouList();
          } else this.setMessage(res);
        });
    },
    editSubmit(id) {
      this.$confirm("确定修改该课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.EditCou(id);
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
  }
};
</script>
