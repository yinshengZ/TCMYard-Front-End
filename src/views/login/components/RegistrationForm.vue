<template>
  <div class="register">
    <el-form class="registration-form">

      <el-form-item label="Username" class="input">
        <el-input v-model="user_info.username" class="input-field" />
      </el-form-item>

      <el-form-item label="Email" class="input">
        <el-input v-model="user_info.email" class="input-field" />
      </el-form-item>

      <el-form-item label="name" class="input">
        <el-input v-model="user_info.name" class="input-field" />
      </el-form-item>
      <el-form-item label="password" class="input">
        <el-input v-model="user_info.password" show-password class="input-field" />
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user_info: {
        username: '',
        name: '',
        email: '',
        password: ''

      }
    }
  }
}

</script>

<style scoped>

.register{
    background-color: white;
}

.input{
    background-color: white;

}
.input-field input{
   color:black;
}

</style>
