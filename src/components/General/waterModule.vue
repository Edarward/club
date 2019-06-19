<template>
  <div>
    <el-button type="primary" icon="el-icon-edit-outline" @click="handleAdd">用水添加</el-button>
    
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="门牌号">
        <el-input v-model="selPlace" placeholder="门牌号"></el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-input-number v-model="selMonth" :min="1" :max="12"></el-input-number>
      </el-form-item>
      <el-form-item label="年份">
        <el-input-number v-model="selYear" :min="2000" :max="2019"></el-input-number>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="selPlaceType" placeholder="类型">
          <el-option label=宿舍 value="宿舍"></el-option>
          <el-option label="教学楼" value="教学楼"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getWatList">查询数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
    >
        <el-table-column prop="watId" label="单号" align="center"></el-table-column>
        <el-table-column prop="watPlace" label="门牌号" align="center"></el-table-column>
        <el-table-column prop="watQuantity" label="用水量" align="center"></el-table-column>
        <el-table-column prop="watMonth" label="月份" align="center"></el-table-column>
        <el-table-column prop="watYear" label="年份" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="门牌号" prop="elePlace">
          <el-input v-model="watPlace"></el-input>
        </el-form-item>
        <el-form-item label="用水量：">
          <el-input-number v-model="watQuantity" :min="0" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="月份">
          <el-input-number v-model="watMonth" :min="1" :max="12"></el-input-number>
        </el-form-item>
        <el-form-item label="年份">
          <el-input-number v-model="watYear" :min="2000" :max="2019"></el-input-number>
        </el-form-item>
        <el-form-item label="地点类型">
          <el-select v-model="watPlaceType" placeholder="type">
						<el-option label="宿舍" value="宿舍"></el-option>
						<el-option label="教学楼" value="教学楼"></el-option>
					</el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit()">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form-item label="单号：">{{watInfo.watId}}</el-form-item>
      <el-form label-width="80px">
        <el-form-item label="门牌号" prop="elePlace">
          <el-input v-model="watPlace"></el-input>
        </el-form-item>
        <el-form-item label="用水量：">
          <el-input-number v-model="watQuantity" :min="0" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="月份">
          <el-input-number v-model="watMonth" :min="1" :max="12"></el-input-number>
        </el-form-item>
        <el-form-item label="年份">
          <el-input-number v-model="watYear" :min="2000" :max="2019"></el-input-number>
        </el-form-item>
        <el-form-item label="地点类型">
          <el-select v-model="watPlaceType" placeholder="type">
						<el-option label="宿舍" value="宿舍"></el-option>
						<el-option label="教学楼" value="教学楼"></el-option>
					</el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit(watInfo.watId)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      watInfo: {},
      loading: true,
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      

      //查询数据
      selPlace: "",
      selMonth: "",
      selYear: "",
      selPlaceType: "",

      //新增界面数据
      watPlace: "",
      watQuantity: "",
      watMonth: "",
      watYear: "",
      watPlaceType: "",

      // 删除数据
      watId: "",

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
    };
  },
  mounted() {
    this.getWatList();
  },
  methods: {
    getWatList() {
      this.loading = true;
      this.$store.dispatch("getWatList", {
          watPlace: this.selPlace,
          watMonth: this.selMonth,
          watYear: this.selYear,
          watPlaceType: this.selPlaceType
      }).then(res => {
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
      this.watInfo = row;
      this.editFormVisible = true;
    },

    //用水添加
    AddWat() {
      this.loading = true;
      this.$store
        .dispatch("AddWat", {
          watPlace: this.watPlace,
          watQuantity: this.watQuantity,
          watMonth: this.watMonth,
          watYear: this.watYear,
          watPlaceType: this.watPlaceType
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("添加成功！");
            this.getWatList();
          } else this.setMessage(res);
        });
    },
    addSubmit() {
      this.$confirm("确定添加该用水条目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.AddWat();
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

//修改用水
    EditWat(watId) {
      this.loading = true;
      this.$store
        .dispatch("EditWat", {
          watId,
          watPlace: this.watPlace,
          watQuantity: this.watQuantity,
          watMonth: this.watMonth,
          watYear: this.watYear,
          watPlaceType: this.watPlaceType
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("更新成功！");
            this.getWatList();
          } else this.setMessage(res);
        });
    },
    editSubmit(watId) {
      this.$confirm("确定修改该用水条目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.EditWat(watId);
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

    //删除用水
    deleteWat(watId) {
      this.$store
        .dispatch("deleteWat", {
          watId
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("删除成功！");
            this.getWatList();
          }
        });
    },
    handleDel(row) {
      this.$confirm("是否删除该用水条目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.deleteWat(row.watId);
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
