<template>
  <div class="SettingContainer">
    <!-- 面包屑 -->
    <Breadcrumb :path="path" />
    <!-- 个人信息表单 -->

    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="basic">
        <div class="basic-pane">
          <el-form
            ref="userInfo"
            label-position="left"
            :model="user"
            label-width="90px"
            class="userInfo"
            :rules="basicRules"
          >
            <el-form-item label="账号">
              <el-input v-model="user.account" disabled></el-input>
            </el-form-item>
            <el-form-item label="管理的班级" v-if="user.classes.length > 0">
              <div class="tagContainer">
                <el-tag class="tag" v-for="item in user.classes" :key="item.id">
                  {{
                  item.className
                  }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="user.adminName"></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              required
              prop="phone"
              :rules="[{pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: '请输入正确手机号'
            }]"
            >
              <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <!-- @click="updateInfo" -->
            <el-form-item class="bottom">
              <el-button type="primary" @click="updateUser" :loading="editLoading">保存</el-button>
              <el-button @click="resetForm">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="security">
        <div class="security-pane">
          <el-form
            :model="passForm"
            status-icon
            :rules="passRules"
            ref="passForm"
            label-width="80px"
          >
            <el-form-item label="旧密码" prop="oldPass">
              <el-input type="password" v-model="passForm.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
              <el-input type="password" v-model="passForm.newPass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkNewPass">
              <el-input type="password" v-model="passForm.checkNewPass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="updateUserPass" :loading="editLoading">修改</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 个人信息卡片 -->
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb/index.vue";
import EventBus from "@/EventBus";
import { updateAdmin, login } from "@/api/superAdmin";
export default {
  name: "setting",
  components: { Breadcrumb },
  props: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passForm.checkNewPass !== "") {
          this.$refs.passForm.validateField("checkNewPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      editLoading: false,
      passForm: {
        oldPass: "",
        newPass: "",
        checkNewPass: "",
      },
      basicRules: {},
      passRules: {
        oldPass: [{ required: true, message: "请输入旧密码" }],
        newPass: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{6,}$/,
            message: "密码长度至少为6位，只可包含数字字母",
          },
        ],
        checkNewPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      activeName: "basic",
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
    this.resetForm();
  },
  methods: {
    resetForm() {
      this.$refs["passForm"].resetFields();
      this.user = JSON.parse(window.localStorage.getItem("user"));
    },
    updateUser() {
      this.$refs["userInfo"].validate((valid) => {
        if (valid) {
          let data = {
            id: this.user.id,
            adminName: this.user.adminName,
            phone: this.user.phone,
          };
          this.editLoading = true;
          updateAdmin(data)
            .then((res) => {
              this.editLoading = false;
              this.$message.success("修改成功");
              console.log("update admin res: ", res);
              window.localStorage.setItem(
                "user",
                JSON.stringify(res.data.data.user)
              );
              this.$router.go(0);
            })
            .catch((err) => {
              this.editLoading = false;
              this.$message.error("修改失败");
              console.log("update admin error: ", err);
            });
        }
      });
    },
    updateUserPass() {
      this.$refs["passForm"].validate((valid) => {
        if (valid) {
          this.$confirm("修改登录密码, 是否继续?", "修改", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.editLoading = true;
              let da = {};
              da["account"] = this.user.account;
              da["password"] = this.passForm.oldPass;
              login(da)
                .then((res) => {
                  let data = {
                    id: this.user.id,
                    password: this.passForm.newPass,
                  };
                  updateAdmin(data)
                    .then((res) => {
                      this.editLoading = false;
                      var that = this;
                      this.$message({
                        type: "success",
                        message: "修改成功，请重新登录",
                        onClose: function () {
                          window.localStorage.removeItem("user");
                          that.$router.push("/");
                        },
                      });
                    })
                    .catch((err) => {
                      this.editLoading = false;
                      this.$message({
                        type: "error",
                        message: "修改失败，请重试",
                      });
                    });
                })
                .catch((err) => {
                  console.log("check old pass err, ", err);
                  this.editLoading = false;
                  this.$message({
                    type: "error",
                    message: "密码错误",
                  });
                });
            })
            .catch(() => {});
        }
      });
    },
    checkOldPass() {
      let data = {};
      data["account"] = this.user.account;
      data["password"] = this.passForm.oldPass;
      var ok = false;
      login(data)
        .then((res) => {
          ok = true;
        })
        .catch((err) => {
          console.log("check old pass err, ", err);
          ok = false;
        });
      return ok;
    },
  },
};
</script>
<style scoped>
.security-pane {
  width: 50%;
}
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
