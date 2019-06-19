<template>
  <div>
    
    <el-form :inline="true" class="query">
      <el-form-item>
        <el-input v-model="studentId" placeholder="学号" @keyup.enter.native="getClubMemberList" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getClubMemberList" >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
    >
        <el-table-column prop="studentId" label="学号" align="center"></el-table-column>
        <el-table-column prop="studentName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="clubId" label="社团编号" align="center"></el-table-column>
        <el-table-column prop="clubName" label="社团名称" align="center"></el-table-column>
        <el-table-column prop="joinTime" label="入社时间" align="center"></el-table-column>
        <el-table-column prop="exitTime" label="退社时间" align="center"></el-table-column>
        <el-table-column prop="clubPositionName" label="社团职位" align="center"></el-table-column>
        <el-table-column label="操作" align="center">

          <template scope="scope">
			        <el-button size="small"  @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>

	<!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      
    <el-form label-width="80px">
      <el-form-item label="学号：">{{clubInfo.studentId}}</el-form-item>
      <el-form-item label="姓名: " >{{clubInfo.studentName}}</el-form-item>
      <el-form-item label="社团名称" prop="clubName">
        <el-select v-model="clubNameId" size="mini" placeholder="请选择">
          <el-option v-for="item in clubN" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社团职位" prop="clubPositionName">
        <el-select v-model="clubPositionNameId" size="mini" placeholder="请选择">
          <el-option v-for="item in clubPN" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit(clubInfo.id)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
		
      tableData: [],
      clubN: [],
      clubPN: [],
      clubInfo: {},
      loading: true,
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      

      //查询数据
      id: "",
      
      //新增界面数据
      
     
      studentId: "0",
      clubPositionId: "",
      exitTime: "",
      joinTime: "",
      clubPositionName: "",
      studentName: "",
      clubName: "",
      clubId: "",
      clubStatus: 3,

      // 删除数据
      

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      
      //绑定的更新Id
      clubNameId: '',
      clubPositionNameId: ""
    };
  },
  
  mounted() {
    this.getClubMemberList();
    this.getClubNameList();
    this.getClubPositionList();
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
    getClubMemberList() {
      this.loading = true;
      this.$store.dispatch("getClubMemberList", {
          studentId: this.studentId
      }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        } else this.setMessage(res);
          this.loading = false;
      });
    },
    
    getClubNameList() {
      this.$store.dispatch("getClubNameList", {
          clubStatus: this.clubStatus
      }).then(res => {
        if (res.code === 0) {
          this.clubN = res.data;
        } else this.setMessage(res.msg);
      });
    },
    
    getClubPositionList() {
      this.$store.dispatch("getClubPositionList", {
          
      }).then(res => {
        if (res.code === 0) {
          this.clubPN = res.data;
        } else this.setMessage(res.msg);
      });
	  },
  
	//修改界面
    handleEdit: function(row) {
      this.clubInfo = row;
      var NameId = parseInt(row.clubId);
      this.clubNameId = NameId;
      var PNameId = parseInt(row.clubPositionId);
      this.clubPositionNameId = PNameId;
      this.editFormVisible = true;
    },
	
	//修改学生信息
    EditClubMemInfo(id) {
      this.loading = true;
      this.$store
        .dispatch("EditClubMemInfo", {
            id,
            clubId: this.clubNameId,
            clubPositionId: this.clubPositionNameId
        })
        .then(res => {
          if (res.code === 0) {
            this.$message.success("更新成功！");
            this.getClubMemberList();
          } else this.setMessage(res);
        });
    },
    editSubmit(id) {
      this.$confirm("确定修改该社团成员信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.EditClubMemInfo(id);
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
  }
};
</script>
