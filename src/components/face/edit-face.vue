<template>
  <div class="EditFaceContainer">
    <!-- 编辑face信息 -->
    <el-dialog
      append-to-body
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :title="'修改' + curDetail.username + '的信息'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="500px"
    >
      <el-form :model="info" label-width="100px" ref="form">
        <el-form-item label="人脸" size="mini">
          <!-- <el-upload
            action="https://www.hualigs.cn/api/upload"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
            :on-progress="onProgress"
            :on-success="imgSuccess"
            :on-error="imgError"
            list-type="picture"
            :on-remove="handleRemove"
            :class="{ disabled: uploadDisabled }"
            :file-list="fileList"
          >
            <img
              v-if="info.student_face"
              :src="info.student_face"
              class="avatar"
            />
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传不超过4MB的图片</div>
          </el-upload> -->

          <el-upload
            action="https://www.hualigs.cn/api/upload"
            class="avatar-uploader"
            name="image"
            :auto-upload="false"
            list-type="picture-list"
            :show-file-list="false"
            :limit="1"
          >
            <!-- action="https://www.hualigs.cn/api/upload" :show-file-list="false"
            :data="this.img.data" :on-success="handleSuccess"
            :on-error="handleFail" -->
            <img v-if="info.faceUrl" :src="info.faceUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="序号" prop="stuNo">
          <el-input :value="info.stuNo" disabled style="width: 200px" />
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input :value="info.username" disabled style="width: 200px" />
        </el-form-item>
        <!-- <el-form-item label="人脸" prop="student_face">
          <el-input :value="info.student_face" style="width: 200px" />
        </el-form-item> -->
        <section class="flex-center">
          <el-button @click="save" type="primary">保存</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </section>
      </el-form>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog
      :modal-append-to-body="false"
      :visible.sync="imgVisible"
      width="30%"
    >
      <img width="100%" :src="dialogImageUrl" alt="图片未找到" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "edit-face",
  components: {},
  props: {
    curDetail: {
      type: Object,
      default: () => {},
    },
    visible: Boolean,
  },
  data() {
    return {
      action: "", //接口网址
      info: {},
      // 是否禁用上传
      uploadDisabled: false,
      // 是否显示预览图片
      imgVisible: false,
      // 预览图片url
      dialogImageUrl: "",
      // 上传的文件列表, 例如: [{name: 'xxx.jpg', url: 'https://xxx.com/xxx.jpg'}]
      fileList: [],
      submitData: {
        // 产品图片
        productImg: "",
      },
    };
  },
  computed: {},
  watch: {
    curDetail: {
      handler(value) {
        this.info = _.cloneDeep(value);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    beforeClose(done) {
      done && done();
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.beforeClose();
    },
    // 上传图片
    beforeAvatarUpload(file) {
      let isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isLt4M;
      // return false;
    },
    // 上传中
    onProgress(event, file, fileList) {
      this.uploadDisabled = true;
    },
    // 图片上传成功
    imgSuccess(response, file, fileList) {
      this.uploadDisabled = true;
      if (response.status == 0) {
        this.submitData.productImg = response.data;
      } else if (response.status == -1) {
        this.submitData.productImg = "";
        this.fileList = [];
        this.uploadDisabled = false;
        this.$message.error(response.errorMsg);
      } else {
        this.submitData.productImg = "";
        this.fileList = [];
        this.uploadDisabled = false;
        this.$message.error(response.errorMsg);
      }
    },
    // 图片上传失败
    imgError(err, file, fileList) {
      this.$message.error("上传失败");
      this.uploadDisabled = false;
    },
    // 预览图片
    handlePictureCardPreview(e) {
      this.imgVisible = true;
      this.dialogImageUrl = e.target.currentSrc;
      this.uploadDisabled = true;
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.submitData.productImg = "";
      this.uploadDisabled = false;
    },
    // 上传图片结束
    async save() {
      try {
        await this.$refs.form.validate();
        const info = this.info;
        const form = {
          _id: info._id,
          student_num: info.student_num,
          student_name: info.student_name,
          student_face: info.student_face,
        };
        // 掉修改学生信息接口
        // this.request.post("/api/student/updateOneById", form).then((res) => {
        //   if (!res.data.errcode) {
        //     this.$alert("修改成功！", "提示", { type: "success" });
        //     this.closeDialog();
        //     this.$emit("update");
        //   } else {
        //     this.$alert(res.data.msg, "错误", { type: "error" });
        //   }
        // });
      } catch (e) {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.disabled >>> .el-upload--picture-card {
  display: none;
}
</style>
