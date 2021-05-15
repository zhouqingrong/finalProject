<template>
  <div>
    <el-table
      :data="list"
      :default-sort="{ prop: 'stuNo', order: 'ascending' }"
      border
      stripe
      v-loading="loading"
    >
      <el-table-column
        align="center"
        label="状态"
        prop="recordStatus"
        sortable
        width="75"
      >
        <template #default="scope">
          <i
            class="fa fa-close"
            v-if="scope.row.recordStatus == false"
            style="color: red"
          ></i>
          <i class="fa fa-check" v-else style="color: green"></i>

          <!-- <i v-if="scope.row.recordStatus == true" class="el-icon-check"></i>
          <i v-else class="el-icon-close" style="color: red" size="medium"></i> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="学号" prop="stuNo" sortable />
      <el-table-column align="center" label="姓名" prop="username" />
      <el-table-column align="center" label="班级" prop="aclass.className" />
      <el-table-column
        :formatter="dormConvert"
        align="center"
        label="宿舍"
        prop="dormitory"
        sortable
      />
      <el-table-column align="center" label="联系方式" prop="phone" />
      <el-table-column
        :formatter="timeConvert"
        align="center"
        label="打卡时间"
        prop="recordStatus"
        sortable
      />
      <el-table-column align="center" label="历史记录" prop="records" sortable>
        <template #default="scope">
          <el-tooltip content="历史记录">
            <div @click="showRecordsDetail(scope.row)" style="color: blue">
              详情
            </div>
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

    <record-detail :info="curRecordDetail" :visible.sync="isShowRecordDetail" />
  </div>
</template>

<script>
import _ from "lodash";
import RecordDetail from "@/components/record/records-detail"; //历史详情
import { deleteStudent } from "@/api/superAdmin.js";
export default {
  name: "record-table",
  components: { RecordDetail },
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
      isShowRecordDetail: false, //是否展示历史记录
      isShowModifyStudent: false,
      curRecordDetail: {}, //历史记录
      isShowAssignDorm: false,
      identity: JSON.parse(window.localStorage.getItem("user")).role,
    };
  },
  methods: {
    showRecordsDetail(row) {
      console.log("展示该行信息row：", row);
      this.curRecordDetail = row;
      this.isShowRecordDetail = true;
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
    timeConvert(row, column, v) {
      if (row.recordStatus == false) {
        return "未打卡";
      } else {
        return row.records[0].recordTimeFormat;
      }
    },
  },
};
</script>

<style  scoped>
.pagination {
  margin: 30px auto;
}
</style>
