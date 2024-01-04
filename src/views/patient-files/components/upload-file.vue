<template>
  <div class="upload_form">

    <el-form>

      <div class="uploader">
        <el-form-item>
          <div class="upload-container">
            <el-upload
              ref="file_upload"
              :on-success="upload_success"
              class="uploader"
              drag
              action="http://127.0.0.1:8000/api/file"
              :headers="{ 'Authorization': 'Bearer '+this.token/* , 'X-XSRF-TOKEN': this.token */ }"
              :auto-upload="false"
              :data="{
                patient_id: this.patient_id,
                user_id: this.user_id,
                description: description,
              }"
              multiple
              :file-list="fileList"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
            </el-upload>
          </div>

        </el-form-item>
      </div>

      <div class="description-box">
        <el-form-item label="Description: " label-width="120px">
          <el-input
            v-model="description"
            type="textarea"
            class="description_box"
            size="medium"
            :rows="10"
            autosize
            placeholder="description for this upload...."
          />
        </el-form-item>
      </div>

      <div class="upload-button">
        <el-form-item>
          <el-button type="primary" @click="upload">Upload</el-button>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>

import { getToken } from '@/utils/auth'
export default {
  props: ['patient_id', 'user_id'],

  data() {
    return {
      file: [],
      fileList: [],
      uploadUrl: '#',
      token: '',
      description: ''
    }
  },

  created() {
    this.get_token()
  },

  methods: {
    upload() {
      this.$refs.file_upload.submit()
    },

    upload_success() {
      this.$notify({
        title: 'Notification',
        message: 'File has been uploaded successfully!',
        type: 'success'
      })
    },

    get_token() {
      this.token = getToken()
    }
  }
}
</script>

<style scoped>

/* .upload_form {
  width: 50%;
  margin: auto;
} */
</style>
