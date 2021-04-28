<template>
  <div class="DormitoryContainer">
    <!-- 宿舍表格 -->
    <el-table
      :data="list"
      :default-sort="{ prop: 'dormitory_num', order: 'ascending' }"
      @selection-change="selected"
      border
      stripe
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="center"
        label="序号"
        prop="dormitory_num"
        sortable
      />
      <el-table-column
        align="center"
        label="社区"
        prop="dormitory_community"
        sortable
      />
      <el-table-column
        align="center"
        label="宿舍"
        prop="dormitory_name"
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
              @click="deleteDormitory(scope.row)"
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
    <!-- <el-pagination
      :current-page="curPage"
      :total="total"
      @current-change="$emit('current-change', $event)"
      background
      class="margin-top-20"
      layout="total, prev, pager, next"
      style="text-align: right"
    >
    </el-pagination> -->
    <!--  编辑/查看-->
    <edit-dormitory
      :curDetail.sync="curDetail"
      :visible.sync="isShowModify"
      @update="$emit('update')"
    />
  </div>
</template>
<script>
import EditDormitory from "@/components/dormitory/edit-dormitory"; //编辑
export default {
  name: "dormitory-table",
  components: { EditDormitory },
  props: {
    list: {
      type: Array,
      defualt: () => [],
    },
    total: Number,
    curPage: Number,
    edit: Boolean,
    del: Boolean,
  },
  data() {
    return {
      isShowModify: false,
      curDetail: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
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
    deleteDormitory(row) {
      console.log("删除该行信息row", row);
      this.$confirm("此操作将永久删除该学生且无法恢复，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        this.request
          .post("/api/student/removeOneById", { _id: row._id })
          .then((res) => {
            if (!res.data.errcode) {
              this.$alert("删除成功！", "提示", { type: "success" });
              this.$emit("update");
            } else {
              this.$alert(res.data.msg, "错误", { type: "error" });
            }
          });
      });
    },
  },
};
</script>
<style scoped>
</style>
