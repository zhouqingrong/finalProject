<template>
  <div>
    <el-table
      :data="list"
      :default-sort="{ prop: 'stuNo', order: 'ascending' }"
      @selection-change="selectStudent"
      border
      stripe
      v-loading="loading"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column align="center" label="学号" prop="stuNo" sortable />
      <el-table-column align="center" label="姓名" prop="username" sortable />
      <el-table-column align="center" label="学院" prop="departmentName" sortable />
      <el-table-column align="center" label="专业" prop="aclass.majorName" sortable />
      <el-table-column align="center" label="班级" prop="aclass.classNo" sortable />
      <el-table-column
        :formatter="dormConvert"
        align="center"
        label="宿舍"
        prop="dormitory"
        sortable
      />
      <el-table-column align="center" label="联系方式" prop="phone" sortable />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-tooltip content="学生信息">
            <el-button
              @click="showStudentDetail(scope.row)"
              circle
              icon="el-icon-user font-size-16"
              plain
              size="mini"
            />
          </el-tooltip>
          <el-tooltip content="编辑信息" v-if="edit">
            <el-button
              @click="showModifyStudent(scope.row)"
              circle
              icon="el-icon-edit font-size-16"
              plain
              size="mini"
            />
          </el-tooltip>
          <el-tooltip content="删除" v-if="del">
            <el-button
              @click="deleteStudent(scope.row)"
              circle
              icon="el-icon-delete font-size-16"
              plain
              size="mini"
              type="danger"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页信息 -->
    <el-pagination
      class="pagination"
      @size-change="$emit('size-change', $event)"
      @current-change="$emit('current-change', $event)"
      :current-page="curPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="curPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 学生信息 -->
    <student-detail :info="curStudentDetail" :visible.sync="isShowStudentDetail" />

    <!-- 编辑学生信息 -->
    <edit-student
      :cur-student-detail.sync="curStudentDetail"
      :visible.sync="isShowModifyStudent"
      @update="$emit('update')"
    />
  </div>
</template>

<script>
import _ from "lodash";
import EditStudent from "@/components/student/edit-student"; //编辑
import StudentDetail from "@/components/student/student-detail"; //学生详情
import { deleteStudent } from "@/api/superAdmin.js";
export default {
  name: "student-table",
  components: { StudentDetail, EditStudent },
  props: {
    list: {
      type: Array,
      defualt: () => [],
    },
    total: Number,
    curPage: Number,
    curPageSize: Number,
    edit: Boolean,
    del: Boolean,
    loading: Boolean,
  },
  data() {
    return {
      isShowStudentDetail: false,
      isShowModifyStudent: false,
      curStudentDetail: {},
      isShowAssignDorm: false,
    };
  },
  methods: {
    showStudentDetail(row) {
      console.log("展示学生信息row：", row);
      this.curStudentDetail = row;
      this.isShowStudentDetail = true;
    },
    showModifyStudent(row) {
      console.log("修改学生信息row：", row);
      this.curStudentDetail = row;
      // 把学院和班级拼接
      this.curStudentDetail["studentClass"] = [
        row.departmentName,
        row.majorName,
        row.aclass.id,
      ];
      this.isShowModifyStudent = true;
    },
    deleteStudent(row) {
      console.log("删除改行信息row", row);
      this.$confirm("此操作将永久删除该学生且无法恢复，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        let data = [row.id];
        deleteStudent(data)
          .then((res) => {
            console.log("删除学生信息res", res);
            this.$message.success("删除学生信息成功");
            this.$emit("update");
          })
          .catch((err) => {
            console.log("删除学生信息err", err);
            this.$message.error("删除学生信息失败");
          });
      });
    },
    dormConvert(row, column, v) {
      if (row.dormitory == null) {
        return "未分配寝室";
      } else {
        return row.dormitory.roomName;
      }
    },
    selectStudent(students) {
      this.$emit("select:students", students);
    },
  },
};
</script>

<style  scoped>
.pagination {
  margin: 30px auto;
}
</style>
