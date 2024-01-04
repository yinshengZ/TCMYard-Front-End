<template>
  <div>
    <el-card>
      <el-button-group>
        <el-button type="primary">
          <svg-icon icon-class="plant" />Herbs
        </el-button>
        <el-button type="primary">
          <svg-icon icon-class="service" />Services
        </el-button>
        <el-button type="primary">
          <svg-icon icon-class="retail" />Retail
        </el-button>
      </el-button-group>

      <el-card>
        <add-services-form
          :user_id="user_id"
        />
      </el-card>

      <el-card>
        <add-retails-form />
      </el-card>

    </el-card>
  </div>
</template>

<script>
import AddServicesForm from './add-services-form.vue'
import AddRetailsForm from './add-retails-form.vue'
export default {
  components: { AddServicesForm, AddRetailsForm },
  props: ['patient_id', 'user_id'],
  data() {
    return {
      patient_id: ''

    }
  },

  methods: {

  }

}
</script>

<style lang="scss" scoped>
.el-select>.el-input{
    display:block;
    padding-right:2px;
}
</style>
