<template>
  <div class="ClassInfoContainer">
    <section class="offset-fotm-item search">
      <div>
        <!-- 班级搜索栏 -->
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
              placeholder="按专业搜索"
              prefix-icon="el-icon-search"
              size="medium"
              style="width: 180px"
              v-model="searchForm.marjorKeyword"
            />
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" size="medium" type="primary"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增班级按钮 -->
      <div style="margin-left: auto !important">
        <!--  -->
        <el-button size="medium" type="info" @click="isShowAddDialog = true"
          >新增班级</el-button
        >
      </div>
    </section>
    <!-- 班级表格 -->
    <class-table
      :cur-page="paging.current"
      :list="classData"
      :total="paging.total"
      @select:selected="onSelect"
      edit
      del
      class="margin-top-20 width-full"
    />
    <!-- 新增 -->
    <add-class :visible.sync="isShowAddDialog" />
  </div>
</template>
<script>
import ClassTable from "@/components/class/class-table.vue";
import AddClass from "../../components/class/add-class.vue";

export default {
  name: "",
  components: { ClassTable, AddClass },
  props: {},
  data() {
    return {
      searchForm: {
        departmentKeyword: "",
        marjorKeyword: "",
      },
      paging: {
        current: 1,
        total: 1,
        pageCount: 1,
      },
      isShowAddDialog: false,
      classData: [
        {
          class_num: "1",
          class_marjor: "软件工程",
          class_department: "信电学院",
          class_name: "1701",
        },
        {
          class_num: "2",
          class_marjor: "软件工程",
          class_department: "信电学院",
          class_name: "1702",
        },
      ],
      selected: [],
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
