<template>
  <div class="FaceContainer">
    <!-- 人脸表格 -->
    <div class="faceCardContainer">
      <el-card
        class="box-card"
        :body-style="{ padding: '5px' }"
        v-for="(item, index) in list"
        :key="index"
        v-loading="loading"
      >
        <!-- <div class="image"> -->
        <!-- 'https://www.hualigs.cn/image/5ffafc911e172.jpg' -->
        <!-- <el-image
            :src="
              item.faceUrl == null || item.faceUrl == ''
                ? require('../../assets/img/nopic.png')
                : item.faceUrl
            "
            alt="人脸图片"
            fit="contain"
        />-->
        <el-upload
          class="avatar-uploader"
          action="#"
          :data="{'studentId' : item.id}"
          :http-request="upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :disabled="item.faceUrl != ''"
        >
          <div class="image">
            <img v-if="item.faceUrl" :src="item.faceUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-upload>
        <!-- </div> -->
        <!-- <div class="itemTitle">{{ item.stuNo }}</div> -->
        <div class="itemTitle">{{ item.username }}</div>
        <div class="bottom">
          <!-- <el-tooltip content="查看/编辑信息" v-if="edit">
            <el-button
              @click="showModifyFace(item)"
              circle
              icon="el-icon-edit font-size-16"
              plain
              size="mini"
            />
          </el-tooltip>-->
          <el-tooltip content="删除人脸图片" v-if="del">
            <el-button
              @click="deleteFace(item)"
              circle
              icon="el-icon-delete font-size-16"
              plain
              size="mini"
              type="danger"
              :disabled="item.faceUrl == ''"
            />
          </el-tooltip>
        </div>
      </el-card>
    </div>
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
    <edit-face :curDetail.sync="curDetail" :visible.sync="isShowModify" @update="$emit('update')" />
  </div>
</template>
<script>
import EditFace from "@/components/face/edit-face"; //编辑
import { addFace, deleteFace } from "@/api/superAdmin";
export default {
  name: "face-table",
  components: { EditFace },
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
      curDetail: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log("look here：", this.list);
  },
  methods: {
    upload(item) {
      console.log(item);
      let data = new FormData();
      data.append("face", item.file);
      addFace(item.data.studentId, data)
        .then((res) => {
          console.log("add face res===", res);
          this.$message.success("上传成功");
          this.$emit("update");
        })
        .catch((err) => {
          this.$message.error("上传失败");
          console.log("add face error====", err);
        });
    },
    handleAvatarSuccess(res, file) {
      this.$emit("update");
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 选中班级
    selected(selected) {
      this.$emit("select:selected", selected);
    },
    // 修改信息
    showModifyFace(item) {
      console.log("修改人脸信息row：", item);
      this.curDetail = item;
      this.isShowModify = true;
    },
    // 删除
    deleteFace(item) {
      console.log("删除改行信息row", item);
      this.$confirm("永久删除该学生人脸图片，是否继续？", "提示", {
        type: "warning",
      })
        .then(() => {
          let data = {
            studentId: item.id,
          };
          deleteFace(data)
            .then((res) => {
              this.$message.success("删除成功");
              this.$emit("update");
            })
            .catch((err) => {
              this.$message.error("删除失败");
              console.log("delete face error======", err);
            });
        })
        .catch(() => {});
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 142px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
</style>

<style scoped>
.box-card {
  width: 120px;
  height: 220px;
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%; 
}
.image {
  height: 140px;
  width: 142px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.itemTitle {
  margin-top: 5px;
  font-size: 12px;
}
.bottom {
  margin-top: 12px;
}
.faceCardContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
}
.pagination {
  margin: 30px auto;
}
</style>
