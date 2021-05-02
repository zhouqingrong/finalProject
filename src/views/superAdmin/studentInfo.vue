<template>
  <div class="StudentConatainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <div class="page-container">
      <section class="offset-fotm-item search">
        <div>
          <!-- 学生搜索栏 -->
          <el-form inline>
            <el-form-item label="搜索">
              <el-input
                clearable
                placeholder="按学号搜索"
                prefix-icon="el-icon-search"
                size="medium"
                v-model="searchForm.studentNoKeyword"
              />
            </el-form-item>
            <el-form-item label>
              <el-input
                clearable
                placeholder="按姓名搜索"
                prefix-icon="el-icon-search"
                size="medium"
                v-model="searchForm.studentNameKeyword"
              />
            </el-form-item>
            <el-form-item label="班级">
              <el-cascader
                clearable
                v-model="searchForm.class"
                :options="options"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button native-type="submit" size="medium" type="primary" @click="getData()">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 新增学生按钮 -->
        <div style="margin-left: auto !important">
          <el-button size="medium" type="info" @click="isShowAddDialog = true">新增学生</el-button>
          <el-button size="medium" type="danger">批量删除学生</el-button>
          <el-button size="medium" type="primary">批量导入学生</el-button>
        </div>
      </section>

      <!-- 学生表格 -->
      <!--
      @current-change="curPageChange"
      @update="getData"
      -->
      <student-table
        :cur-page="paging.pageNo"
        :list="studentData"
        :total="paging.total"
        :cur-pageSize="paging.pageSize"
        :loading="loading"
        @select:students="onSelectStudents"
        @current-change="curPageChange"
        @size-change="curPageSizeChange"
        @update="getData"
        edit
        del
        class="margin-top-20 width-full"
      />

      <!-- 错误表格 -->
      <!-- <el-dialog :visible.sync="isShowdeleteFailed" title="删除失败，请查看">
        <div class="dialog-container">
          <el-table :data="deleteFailedStudents" border stripe>
            <el-table-column align="center" label="学号" prop="student_num" />
            <el-table-column align="center" label="姓名" prop="student_name" />
            <el-table-column align="center" label="宿舍" prop="dorm_num" />
            <el-table-column align="center" label="原因">
              <template #default="scope">
                <p
                  :key="index"
                  class="color-danger"
                  v-for="(item, index) in scope.row.reason"
                >
                  {{ item.msg }}
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <template #footer>
          <div class="text-center">
            <el-button @click="isShowdeleteFailed = false" type="primary"
              >确定</el-button
            >
          </div>
        </template>
      </el-dialog>-->

      <!-- 新增学生 -->
      <add-student :visible.sync="isShowAddDialog" @update="getData" />

      <!-- 批量导入学生 -->
      <!-- <bulk-import-students :visible.sync="isShowBulkImport" /> -->
    </div>
  </div>
</template>
<script>
import StudentTable from "@/components/student/student-table.vue";
import AddStudent from "@/components/student/add-student.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import { schoolAll, getStudents } from "@/api/superAdmin.js";
// import BulkImportStudents from "@/components/student/bulk-import-students";
export default {
  name: "studentInfo",
  components: { StudentTable, AddStudent, Breadcrumb },
  props: {},
  data() {
    return {
      loading: false,
      paging: {
        pageNo: 1,
        total: 1,
        pageSize: 10,
      },
      searchForm: {
        studentNameKeyword: "",
        studentNoKeyword: "",
        class: [],
      },
      options: [],
      studentData: [],
      path: {
        path: "/studentInfo",
        name: "学生管理",
      }, //面包屑路径
      selectedStudents: [], //存放选择的学生
      deleteFailedStudents: [],
      isShowdeleteFailed: false,
      isShowAddDialog: false,
      isShowBulkImport: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getData();
    this.initOptions();
  },
  methods: {
    //分页改变页数
    curPageChange(page) {
      this.paging.pageNo = page;
      this.getData();
    },
    //分页改变每页条数
    curPageSizeChange(size) {
      this.paging.pageSize = size;
      this.getData();
    },
    // 搜索的级联班级数据
    initOptions() {
      schoolAll()
        .then((res) => {
          this.options = res.data.data.options;
          console.log("搜索的级联班级数据res", res);
        })
        .catch((err) => {
          console.log("搜索的级联班级数据err", err);
        });
    },
    // 选择班级
    handleChange(value) {
      console.log(value);
    },
    // 获取数据
    getData() {
      let classId =
        this.searchForm.class.length == 0 ? "" : this.searchForm.class[2];
      let data = {
        classId: classId,
        pageNo: this.paging.pageNo,
        pageSize: this.paging.pageSize,
        studentNo: this.searchForm.studentNoKeyword,
        username: this.searchForm.studentNameKeyword,
      };
      this.loading = true;
      getStudents(data)
        .then((res) => {
          this.studentData = res.data.data.students;
          this.paging.total = res.data.data.pageInfo.totalCount;
          console.log("获取学生数据res", res);
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("获取学生失败");
          console.log("获取学生数据err", err);
          this.loading = false;
        });
    },
    // 选择学生
    onSelectStudents(students) {
      this.selectedStudents = students;
    },
    // 删除
    deleteManyStudent() {
      if (this.selectedStudents.length <= 0) {
        this.$alert("请先选择学生", "提示", { type: "warning" });
        return false;
      }
      this.$confirm(
        "此操作将永久删除所选中的学生且无法恢复，是否继续？",
        "提示",
        {
          type: "warning",
        }
      )
        .then(() => {
          const data = this.selectedStudents.map((item) => item._id);
          this.request
            .post("/api/student/removeMany", { students: data })
            .then((res) => {
              if (!res.data.errcode) {
                this.$alert("删除成功！", "提示", { type: "success" });
                this.getData();
              } else {
                this.$message.error("删除失败，请查看！");
                this.deleteFailedStudents = res.data.errorStudents.map(
                  (item) => {
                    return {
                      reason: item.errors,
                      ...item.student,
                    };
                  }
                );
                this.isShowdeleteFailed = true;
              }
            });
        })
        .catch(() => {
          return false;
        });
    },
  },
};
</script>
<style scoped>
.search {
  display: flex;
  justify-content: flex-start;
}
</style>
