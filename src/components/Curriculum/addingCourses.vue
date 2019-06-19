<template>
    <el-row>
    <el-col :span="24">
        <div v-if="Teacherform">
        <h4 class="title">教师信息</h4>
    　　　　//渲染教师信息
        <el-table :data="teacherData" border style="width: 100%" >
            <el-table-column prop="id" label="账号"></el-table-column>
            <el-table-column prop="tname" label="姓名"></el-table-column>
            <el-table-column prop="tsex" label="性别"></el-table-column>
            <el-table-column prop="tdepart" label="部门"></el-table-column>
            <el-table-column prop="class_cno" label="课程名"></el-table-column>
            <el-table-column prop="passwd" label="密码"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
        </el-table>
        </div>
        <div v-if="Studentform">
        <h4 class="title">学生信息</h4>
    　　　　//渲染学生信息
        <el-table :data="studentData" border style="width: 100%" >
            <el-table-column prop="id" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="major" label="专业"></el-table-column>
            <el-table-column prop="depart" label="院系"></el-table-column>
            <el-table-column prop="term" label="学期"></el-table-column>
            <el-table-column prop="year" label="年级"></el-table-column>
            <el-table-column prop="passwd" label="密码"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
        </el-table>
        </div>
    </el-col>
</el-row>
</template>
<script>
    export default {
        name: "person-msg",
        data(){
          return{
            teacherData:[],
            studentData:[],
            Teacherform:false,
            Studentform:false
          }
        },
        mounted(){
          this.init();   //页面初始化加载
        },
        methods:{
          init(){
            var id = sessionStorage.getItem('userId');   //获得用户登录信息的id和role
            var role = sessionStorage.getItem('userRole');
　　　　　　　　//传id和role给后台
            this.$http.get(Main.getPersonmsg(id,role)).then(res => {
             let {errCode,errMsg,dataList}= res.data;
             if(errCode==0){
　　　　　　　　　//如果是教师，显示教师信息
               if(role==1){
                 this.Teacherform = true;
                 const teacherArray=dataList;
                 this.teacherData=teacherArray;
               }else{
                 this.Studentform = true;
                 const studentArray=dataList;
                 this.studentData = studentArray;
               }
             }else{
               this.$message.error(errMsg)
             }
            }, response => {
              this.$message.error('error submit!!');
              return false;
            });
          }
       }
    }
</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>

