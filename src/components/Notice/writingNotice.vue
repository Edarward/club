<template>
	<div>
		
		<el-button type="primary" icon="el-icon-edit-outline" @click="handleAdd" round>添加公告</el-button>
		
		<el-table
			:data="tableData"
			border
			style="width: 100%"
			v-loading="loading"
			element-loading-text="拼命加载中"
		>
            <el-table-column prop="noticeId" label="编号" align="center"></el-table-column>
            <el-table-column prop="noticeType" label="类型" align="center"></el-table-column>
		      	<el-table-column prop="noticeWriter" label="撰写人"align="center"></el-table-column>
            <el-table-column prop="noticeWritetime" label="撰写时间" align="center"></el-table-column>
            <el-table-column prop="noticeReleaser" label="发布人" align="center"></el-table-column>
            <el-table-column prop="noticeReleasetime" label="发布时间" align="center"></el-table-column>
			<el-table-column prop="noticeState" label="审核状态" align="center"></el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form label-width="80px">
                <el-form-item label="编号" prop="noticeId">
					{{couInfo.noticeId}}
				</el-form-item>
				<el-form-item label="类型" prop="noticeType">
					<el-input v-model="noticeType"></el-input>
				</el-form-item>
                <el-form-item label="撰写人" prop="noticeWriter">
					<el-input v-model="noticeWriter" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="撰写时间" prop="noticeWriter">
					<el-date-picker
                        v-model="noticeWritetime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
				</el-form-item>
                <el-form-item label="发布人" prop="noticeReleaser">
					<el-input v-model="noticeReleaser" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="发布时间" prop="noticeReleasetime">
					<el-date-picker
                        v-model="noticeReleasetime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
				</el-form-item>
				<el-form-item label="审核状态">
					<el-select v-model="noticeState" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit(couInfo.noticeId)">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="编号" prop="noticeId">
					<el-input v-model="noticeId"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="noticeType">
					<el-input v-model="noticeType"></el-input>
				</el-form-item>
                <el-form-item label="撰写人" prop="noticeWriter">
					<el-input v-model="noticeWriter"></el-input>
				</el-form-item>
				<el-form-item label="撰写时间" prop="noticeWriter">
					<el-date-picker
                        v-model="noticeWritetime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
				</el-form-item>
                <el-form-item label="发布人" prop="noticeReleaser">
					<el-input v-model="noticeReleaser" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="发布时间" prop="noticeReleasetime">
					<el-date-picker
                        v-model="noticeReleasetime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
				</el-form-item>
				<el-form-item label="审核状态">
					<el-select v-model="noticeState" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addSubmit()">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
  data() {
    return {
		options: [
            {
            	value: '选项1',
                label: '已审核'
            }, 
            {
                value: '选项2',
                label: '未审核'
            }, 
            {
                value: '选项3',
                label: '正在审核'
            }
      ],
      value: '',
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
      noticeId: '',
	  noticeType: '',
	  noticeWriter: '',
	  noticeWritetime: '',
	  noticeReleaser: '',
	  noticeReleasetime: '',
	  noticeState: '',

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
