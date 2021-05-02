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
          <el-form-item label="">
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
          >新增宿舍</el-button
        >
      </div>
    </section>
    <!-- 宿舍表格 -->
    <dormitory-table
      :cur-page="paging.current"
      :list="dormitoryData"
      :total="paging.total"
      @select:selected="onSelect"
      edit
      del
      class="margin-top-20 width-full"
    />
    <!-- 新增 -->
    <add-dormitory :visible.sync="isShowAddDialog" />
  </div>
</template>
<script>
import DormitoryTable from "@/components/dormitory/dormitory-table.vue";
import AddDormitory from "../../components/dormitory/add-dormitory.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";

export default {
  name: "dormitoryInfo",
  components: { DormitoryTable, AddDormitory, Breadcrumb },
  props: {},
  data() {
    return {
      searchForm: {
        communityKeyword: "",
        roomNameKeyword: "",
      },
      paging: {
        current: 1,
        total: 1,
        pageCount: 1,
      },
      isShowAddDialog: false,
      dormitoryData: [
        {
          dormitory_num: "1",
          dormitory_community: "1社区",
          dormitory_name: "1#B510",
        },
        {
          dormitory_num: "2",
          dormitory_community: "1社区",
          dormitory_name: "1#B509",
        },
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
  mounted() {},
  methods: {
    // 选择
    onSelect(selected) {
      console.log("选中的班级：", selected);
      this.selected = selected;
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
