<template>
  <div class="DormitoryContainer">
    <!-- 宿舍表格 -->
    <el-table
      :data="list"
      :default-sort="{ prop: 'dormitory_num', order: 'ascending' }"
      @selection-change="selected"
      border
      stripe
      v-loading="loading"
    >
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.students">
            <el-table-column
              align="center"
              label="学号"
              prop="stuNo"
            ></el-table-column>
            <el-table-column
              align="center"
              label="姓名"
              prop="username"
            ></el-table-column>
            <el-table-column align="center" label="操作">
              <template #default="scope">
                <el-tooltip content="删除" v-if="del">
                  <el-button
                    @click="deleteDormStu(props.row, scope.row)"
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
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="序号"
        prop="id"
        sortable
        width="80"
      />
      <el-table-column align="center" label="社区" prop="community" sortable />
      <el-table-column align="center" label="楼栋" prop="building" sortable />
      <el-table-column align="center" label="宿舍" prop="roomName" sortable />
      <el-table-column
        :formatter="capacityConvert"
        align="center"
        label="住宿情况"
        prop="capacity"
        sortable
      />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-tooltip content="查看/编辑信息" v-if="edit">
            <el-button
              @click="showModify(scope.row)"
              circle
              icon="el-icon-edit font-size-16"
              plain
              size="mini"
            />
          </el-tooltip>
          <el-tooltip content="删除" v-if="del">
            <el-button
              @click="showDeleteDormitory(scope.row)"
              circle
              icon="el-icon-delete font-size-16"
              plain
              size="mini"
              type="danger"
            />
          </el-tooltip>
          <el-tooltip content="添加学生" v-if="edit">
            <el-button
              @click="showAddDormStu(scope.row)"
              circle
              :disabled="scope.row.students.length >= scope.row.capacity"
              icon="el-icon-user font-size-16"
              primary
              size="mini"
              type="success"
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
    <!--  编辑/查看-->
    <edit-dormitory
      :curDetail.sync="curDetail"
      :visible.sync="isShowModify"
      @update="$emit('update')"
    />
    <edit-dormitory-student
      :info="curDetail"
      :visible.sync="isShowStudentDetail"
      @update="$emit('update')"
    />
  </div>
</template>
<script>
import EditDormitory from "@/components/dormitory/edit-dormitory"; //编辑
import EditDormitoryStudent from "@/components/dormitory/edit-dormitory-student";
import { deleteDormitory, delDormStu } from "@/api/superAdmin";
export default {
  name: "dormitory-table",
  components: { EditDormitory, EditDormitoryStudent },
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
      isShowModify: false,
      isShowStudentDetail: false,
      curDetail: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //添加宿舍学生
    showAddDormStu(dormitory) {
      this.curDetail = dormitory;
      this.isShowStudentDetail = true;
    },
    //删除宿舍学生
    deleteDormStu(dormitory, student) {
      this.$confirm("此操作将学生移除该宿舍，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        let data = {
          dormitoryId: dormitory.id,
          studentId: student.id,
        };
        delDormStu(data)
          .then((res) => {
            this.$message.success("移除学生成功");
            this.$emit("update");
          })
          .catch((err) => {
            this.$message.error("移除学生失败");
            console.log("移除宿舍学生err", err);
          });
      });
    },
    //宿舍容量转换
    capacityConvert(row, column, v) {
      if (!row.students) {
        return "0/" + v;
      }
      return row.students.length + "/" + v;
    },
    // 选中宿舍
    selected(selected) {
      this.$emit("select:selected", selected);
    },
    // 修改信息
    showModify(row) {
      console.log("修改宿舍信息row：", row);
      this.curDetail = row;
      this.isShowModify = true;
    },
    // 删除宿舍
    showDeleteDormitory(row) {
      console.log("删除该行信息row", row);
      this.$confirm("此操作将永久删除该学生且无法恢复，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        let data = {
          id: row.id,
        };
        deleteDormitory(data)
          .then((res) => {
            this.$message.success("删除宿舍成功");
            this.$emit("update");
          })
          .catch((err) => {
            this.$message.error("删除宿舍失败");
          });
      });
    },
  },
};
</script>
<style scoped>
.pagination {
  margin: 30px auto;
}
</style>
