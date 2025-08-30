<template>
  <div class="register">
    <el-form class="registration-form">

      <el-form-item label="Username" class="input">
        <el-input v-model="user_info.username" />
      </el-form-item>
      <el-form-item label="name" class="input">
        <el-input v-model="user_info.name" />
      </el-form-item>

      <el-form-item label="Email" class="input">
        <el-input type="email" v-model="user_info.email" />
      </el-form-item>

      <el-form-item label="role" class="input">
        <el-input v-model="user_info.role"></el-input>
      </el-form-item>

      <el-form-item label="password" class="input">
        <el-input v-model="user_info.password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">Register</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { registration } from '@/api/user';

export default {

  data() {
    return {
      user_info: {

      },
    }
  },

  methods: {
    register() {
      registration(this.user_info).then((response) => {
        console.log(response)
      })
    }
  },
}

</script>

<style scoped></style>
