<template>
  <div>
    <el-button type="primary" icon="el-icon-edit-outline" @click="handleAdd">用电添加</el-button>
    
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
        <el-button type="primary" @click="getEleList">查询数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
    >
        <el-table-column prop="eleId" label="单号" align="center"></el-table-column>
        <el-table-column prop="elePlace" label="门牌号" align="center"></el-table-column>
        <el-table-column prop="eleQuantity" label="用电量" align="center"></el-table-column>
        <el-table-column prop="eleMonth" label="月份" align="center"></el-table-column>
        <el-table-column prop="eleYear" label="年份" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="门牌号" prop="elePlace">
          <el-input v-model="elePlace"></el-input>
        </el-form-item>
        <el-form-item label="用电量：">
          <el-input-number v-model="eleQuantity" :min="0" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="月份">
          <el-input-number v-model="eleMonth" :min="1" :max="12"></el-input-number>
        </el-form-item>
        <el-form-item label="年份">
          <el-input-number v-model="eleYear" :min="2000" :max="2019"></el-input-number>
        </el-form-item>
        <el-form-item label="地点类型">
          <el-select v-model="elePlaceType" placeholder="type">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      eleInfo: {},
      loading: true,
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      

      //查询数据
      selPlace: "",
      selMonth: "",
      selYear: "",
      selPlaceType: "",

      //新增界面数据
      elePlace: "",
      eleQuantity: "",
      eleMonth: "",
      eleYear: "",
      elePlaceType: "",

      // 删除数据
      

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
    };
  },
  mounted() {
    this.getEleList();
  },
  methods: {
    getEleList() {
      this.loading = true;
      this.$store.dispatch("getEleList", {
          elePlace: this.selPlace,
          eleMonth: this.selMonth,
          eleYear: this.selYear,
          elePlaceType: this.selPlaceType
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

    //用电添加
    AddEle() {
      this.loading = true;
      this.$store
        .dispatch("AddEle", {
          elePlace: this.elePlace,
          eleQuantity: this.eleQuantity,
          eleMonth: this.eleMonth,
          eleYear: this.eleYear,
          elePlaceType: this.elePlaceType
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("添加成功！");
            this.getEleList();
          } else this.setMessage(res);
        });
    },
    addSubmit() {
      this.$confirm("确定添加该用电?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.AddEle();
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

    //用电删除
    deleteEle(eleId) {
      this.$store
        .dispatch("deleteEle", {
          eleId
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("删除成功！");
            this.getEleList();
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
          this.deleteEle(row.eleId);
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
