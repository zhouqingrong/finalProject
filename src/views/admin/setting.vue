<template>
  <div class="SettingContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <!-- 个人信息表单 -->
    <el-form
      ref="userInfo"
      label-position="left"
      :model="user"
      label-width="90px"
      class="userInfo"
    >
      <el-form-item label="账号">
        <el-input v-model="user.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="管理的班级" v-if="user.classes.length > 0">
        <div class="tagContainer">
          <el-tag class="tag" v-for="item in user.classes" :key="item.id">{{
            item.className
          }}</el-tag>
          <el-tag class="tag" v-for="item in user.classes" :key="item.id">{{
            item.className
          }}</el-tag>
          <el-tag class="tag" v-for="item in user.classes" :key="item.id">{{
            item.className
          }}</el-tag>
          <el-tag class="tag" v-for="item in user.classes" :key="item.id">{{
            item.className
          }}</el-tag>
          <el-tag class="tag" v-for="item in user.classes" :key="item.id">{{
            item.className
          }}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.adminName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <!-- @click="updateInfo" -->
      <el-form-item class="bottom">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 个人信息卡片 -->
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb/index.vue";
import EventBus from "@/EventBus";
export default {
  name: "setting",
  components: { Breadcrumb },
  props: {},
  data() {
    return {
      user: JSON.parse(window.localStorage.getItem("user")), //获取当前登录的用户的信息
      path: {
        //面包屑路径
        path: "/setting",
        name: "个人设置",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    EventBus.$emit("change-route", "/setting");
  },
  methods: {},
};
</script>
<style scoped>
.userInfo {
  width: 400px;
}
.tagContainer {
  display: flex;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
}
.tag {
  margin: 5px;
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
