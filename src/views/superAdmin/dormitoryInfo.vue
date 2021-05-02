<template>
  <div class="dormitoryInfoContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <section class="offset-fotm-item search">
      <div>
        <!-- 宿舍搜索栏 -->
        <el-form inline>
          <el-form-item label="搜索">
            <el-input
              clearable
              placeholder="按社区搜索"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="searchForm.communityKeyword"
            />
          </el-form-item>
          <el-form-item label>
            <el-input
              clearable
              placeholder="按宿舍搜索"
              prefix-icon="el-icon-search"
              size="medium"
              style="width: 180px"
              v-model="searchForm.roomNameKeyword"
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
        <el-button size="medium" type="info" @click="isShowAddDialog = true">新增宿舍</el-button>
      </div>
    </section>
    <!-- 宿舍表格 -->
    <dormitory-table
      :cur-page="paging.pageNo"
      :list="dormitoryData"
      :total="paging.total"
      :cur-pageSize="paging.pageSize"
      :loading="loading"
      @select:selected="onSelect"
      @current-change="curPageChange"
      @size-change="curPageSizeChange"
      @update="getData"
      edit
      del
      class="margin-top-20 width-full"
    />
    <!-- 新增 -->
    <add-dormitory :visible.sync="isShowAddDialog" @update="getData" />
  </div>
</template>
<script>
import DormitoryTable from "@/components/dormitory/dormitory-table.vue";
import AddDormitory from "../../components/dormitory/add-dormitory.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import { getDormitories } from "@/api/superAdmin";
export default {
  name: "dormitoryInfo",
  components: { DormitoryTable, AddDormitory, Breadcrumb },
  props: {},
  data() {
    return {
      loading: false,
      searchForm: {
        communityKeyword: "",
        roomNameKeyword: "",
      },
      paging: {
        pageNo: 1,
        total: 1,
        pageSize: 10,
      },
      isShowAddDialog: false,
      dormitoryData: [
        // {
        //   dormitory_num: "1",
        //   dormitory_community: "1社区",
        //   dormitory_name: "1#B510",
        // },
        // {
        //   dormitory_num: "2",
        //   dormitory_community: "1社区",
        //   dormitory_name: "1#B509",
        // },
      ],
      selected: [],
      path: {
        path: "/dormitoryInfo",
        name: "宿舍管理",
      }, //面包屑路径
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getData();
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
    // 选择
    onSelect(selected) {
      console.log("选中的班级：", selected);
      this.selected = selected;
    },
    //获取数据
    getData() {
      let data = {
        community: this.searchForm.communityKeyword,
        pageNo: this.paging.pageNo,
        pageSize: this.paging.pageSize,
        roomName: this.searchForm.roomNameKeyword,
      };
      this.loading = true;
      getDormitories(data)
        .then((res) => {
          this.dormitoryData = res.data.data.dormitories;
          this.paging.total = res.data.data.pageInfo.totalCount;
          this.loading = false;
          console.log("获取宿舍res", res);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("获取宿舍失败");
          console.log("获取宿舍err", err);
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
