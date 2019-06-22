<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
    >
        <el-table-column prop="id" label="学号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="grade" label="年级" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="birthday" label="生日" align="center"></el-table-column>
        <el-table-column prop="nativePlace" label="籍贯" align="center"></el-table-column>
        <el-table-column prop="idType" label="身份证类型" align="center"></el-table-column>
        <el-table-column prop="idNunber" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="phone" label="自己电话" align="center"></el-table-column>	
        <el-table-column prop="parentPhone" label="父母电话" align="center"></el-table-column>
        <el-table-column prop="folk" label="民族" align="center"></el-table-column>
        <el-table-column prop="politicalSt" label="政治面貌" align="center"></el-table-column>
        <el-table-column label="操作" align="center">

          <template slot-scope="scope">
			        <el-button size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>

	<!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      
    <el-form label-width="100px">
        <el-form-item label="学号：">{{stuInfo.id}}</el-form-item>
        <el-form-item label="姓名：">{{stuInfo.name}}</el-form-item>
        <el-form-item label="年级：">{{stuInfo.grade}}</el-form-item>
        <el-form-item label="性别：">{{stuInfo.sex}}</el-form-item>
        <el-form-item label="生日: " prop="birthday">
            <el-date-picker 
                type="datetime" 
                value-format="timestamp" 
                placeholder="选择日期" 
                v-model="birthday">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="籍贯: ">
          <el-input v-model="nativePlace"></el-input>
        </el-form-item>
        <el-form-item label="身份证类型: ">
          <el-input v-model="idType" ></el-input>
        </el-form-item>
        <el-form-item label="身份证号: ">
          <el-input v-model="idNunber" ></el-input>
        </el-form-item>
        <el-form-item label="自己电话: ">
          <el-input v-model="phone"></el-input>
        </el-form-item>	
        <el-form-item label="父母电话: ">
          <el-input v-model="parentPhone"></el-input>
        </el-form-item>
        <el-form-item label="民族: ">
          <el-input v-model="folk"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌: ">政治面貌:
          <el-select v-model="politicalSt" placeholder="请选择">
            <el-option label="群众" value="群众"></el-option>
            <el-option label="团员" value="团员"></el-option>
            <el-option label="党员" value="党员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit(stuInfo.id)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
		
      tableData: [],
      stuInfo: {},
      loading: true,
      

      //查询数据
      id: "",
      
      //新增界面数据
      
      name: "",
      grade: "",
      sex: "",
      birthday: "",
      nativePlace: "",
      idType: "",
      idNunber: "",
      phone: "",
      parentPhone: "",
      folk: "",
      politicalSt: "",

      // 删除数据
      

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
    };
  },
  // 当页面加载时直接通过id查询显示结果，并返回给前台在表格中显示
  mounted: {
    
  },

  methods: {
    // 解决时间问题
      getTime(value) {
        if (value == null) {
            return '';
        } else {
            var date = new Date(value);
            var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return date_value;
        }
      },

      //查询
      getStuList() {
        this.loading = true;
        this.$store.dispatch("getStuList", {
            id: this.id
        }).then(res => {
          if (res.code === 0) {
            var array = [res.data];
            this.tableData = array;
          } else this.setMessage(res);
            this.loading = false;
        });
    },
    
    //修改界面
      handleEdit: function(index, row) {
        this.stuInfo = row;
        this.editFormVisible = true;
      },
    
    //修改学生信息
      EditStu(id) {
        this.loading = true;
        this.$store
          .dispatch("EditStu", {
              id,
              name,
              grade,
              sex: this.sex,
              birthday: this.getTime(this.birthday),
              nativePlace: this.nativePlace,
              idType: this.idType,
              idNunber: this.idNunber,
              phone: this.phone,
              parentPhone: this.parentPhone,
              folk: this.folk,
              politicalSt: this.politicalSt,
              getStuList: this.getStuList
          })
          .then(res => {
            if (res.code === 0) {
              this.$message.success("更新成功！");
              this.getStuList();
            } else this.setMessage(res);
          });
      },
      editSubmit(id) {
        this.$confirm("确定修改该学生信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.EditStu(id);
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
  }
};
</script>
