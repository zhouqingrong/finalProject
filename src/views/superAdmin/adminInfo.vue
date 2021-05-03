<template>
  <div class="AdminContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
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
          <el-form-item label>
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
            <el-button native-type="submit" size="medium" @click="getData" type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增按钮 -->
      <div style="margin-left: auto !important">
        <!--  -->
        <el-button size="medium" type="info" @click="isShowAddDialog = true">新增管理员</el-button>
      </div>
    </section>
    <!-- admin表格 -->
    <admin-table
      :cur-page="paging.pageNo"
      :cur-pageSize="paging.pageSize"
      :list="adminData"
      :total="paging.total"
      :loading="loading"
      @select:selected="onSelect"
      @current-change="curPageChange"
      @size-change="curPageSizeChange"
      @update="getData"
      edit
      del
    />
    <!-- 新增 -->
    <add-admin :visible.sync="isShowAddDialog" @update="getData" />
  </div>
</template>
<script>
import AdminTable from "@/components/admin/admin-table.vue";
import AddAdmin from "../../components/admin/add-admin.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import EventBus from "@/EventBus";
import { getAdmins } from "@/api/superAdmin";
export default {
  name: "adminInfo",
  components: { AdminTable, AddAdmin, Breadcrumb },
  props: {},
  data() {
    return {
      loading: false,
      searchForm: {
        departmentKeyword: "",
        nameKeyword: "",
      },
      paging: {
        pageNo: 1,
        total: 1,
        pageSize: 10,
      },
      isShowAddDialog: false,
      adminData: [
        // {
        //   admin_num: "1",
        //   admin_account: "11223344",
        //   admin_phone: "18822223333",
        //   admin_department: "信电学院",
        //   admin_name: "吴迪",
        // },
        // {
        //   admin_num: "2",
        //   admin_account: "11223344",
        //   admin_phone: "18822223333",
        //   admin_department: "信电学院",
        //   admin_name: "吴迪",
        // },
      ],
      path: {
        //面包屑路径
        path: "/adminInfo",
        name: "管理员管理",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getData();
    EventBus.$emit("change-route", "/adminInfo");
  },
  methods: {
    // 选择
    onSelect(selected) {
      console.log("选中的管理员：", selected);
      this.selected = selected;
    },
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
    getData() {
      let data = {
        pageNo: this.paging.pageNo,
        pageSize: this.paging.pageSize,
        adminName: this.searchForm.nameKeyword,
        department: this.searchForm.departmentKeyword,
      };
      this.loading = true;
      getAdmins(data)
        .then((res) => {
          this.adminData = res.data.data.users;
          this.paging.total = res.data.data.pageInfo.totalCount;
          console.log("获取管理员res", res);
          this.loading = false;
        })
        .catch((err) => {
          console.log("获取管理员err", err);
          this.$message.error("获取管理员列表失败");
          this.loading = false;
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
