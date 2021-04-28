<template>
  <div class="AdminContainer">
    <section class="offset-fotm-item search">
      <div>
        <!-- 搜索栏 -->
        <el-form inline>
          <el-form-item label="搜索">
            <el-input
              clearable
              placeholder="按学院搜索"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="searchForm.departmentKeyword"
            />
          </el-form-item>
          <el-form-item label="">
            <el-input
              clearable
              placeholder="按姓名搜索"
              prefix-icon="el-icon-search"
              size="medium"
              style="width: 180px"
              v-model="searchForm.nameKeyword"
            />
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" size="medium" type="primary"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增按钮 -->
      <div style="margin-left: auto !important">
        <!--  -->
        <el-button size="medium" type="info" @click="isShowAddDialog = true"
          >新增管理员</el-button
        >
      </div>
    </section>
    <!-- admin表格 -->
    <admin-table
      :cur-page="paging.current"
      :list="adminData"
      :total="paging.total"
      @select:selected="onSelect"
      edit
      del
      class="margin-top-20 width-full"
    />
    <!-- 新增 -->
    <add-admin :visible.sync="isShowAddDialog" />
  </div>
</template>
<script>
import AdminTable from "@/components/admin/admin-table.vue";
import AddAdmin from "../../components/admin/add-admin.vue";
export default {
  name: "adminInfo",
  components: { AdminTable, AddAdmin },
  props: {},
  data() {
    return {
      searchForm: {
        departmentKeyword: "",
        nameKeyword: "",
      },
      paging: {
        current: 1,
        total: 1,
        pageCount: 1,
      },
      isShowAddDialog: false,
      adminData: [
        {
          admin_num: "1",
          admin_account: "11223344",
          admin_phone: "18822223333",
          admin_department: "信电学院",
          admin_name: "吴迪",
        },
        {
          admin_num: "2",
          admin_account: "11223344",
          admin_phone: "18822223333",
          admin_department: "信电学院",
          admin_name: "吴迪",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.search {
  display: flex;
  justify-content: flex-start;
}
</style>
