<template>
  <div>


    <el-form v-model="treatment_detail" label-width="125px">
      <el-form-item label="Service">
        <el-select v-model="treatment_detail.inventories[0].pivot.inventory_id" filterable>
          <el-option v-for="service in all_services" :key="service.id"
            :label="service.name + ' / price: £' + service.unit_price" :value="service.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="Quantity">
        <el-input-number v-model="treatment_detail.quantity" :min="1" :step="1" />
      </el-form-item>

      <el-form-item label="Extra Options">
        <el-checkbox v-model="with_finance">Update Income</el-checkbox>
        <el-checkbox v-model="with_date">Update Date</el-checkbox>
      </el-form-item>

      <div v-if="with_finance">
        <el-form-item label="Discount">
          <el-input-number v-model="treatment_detail.incomes[0].discount" :min="0" :max="100" :step="1" />
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number v-model="treatment_detail.incomes[0].amount" :min="0" :precision="2" />
          <el-button type="primary" @click="calculate_price">Calculate</el-button>
        </el-form-item>
        <el-form-item label="Original Price(£):">
          {{ treatment_detail.incomes[0].original_amount }}
        </el-form-item>
        <el-form-item label="Payment Type">
          <el-select v-model="treatment_detail.incomes[0].payment_type_id">
            <el-option v-for="payment_method in payment_methods" :key="payment_method.id" class="capitalize"
              :label="payment_method.payment_type" :value="payment_method.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="treatment_detail.incomes[0].description" />
        </el-form-item>
      </div>

      <div v-if="with_date">
        <el-form-item label="Date">
          <el-date-picker v-model="treatment_detail.date" />
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="success" @click="update_service">Update</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>

import { get_services } from '@/api/inventory'
import { getSingleTreatment, update_service } from '@/api/treatment'
import { getPaymentMethods } from '@/api/finance'
export default {
  props: ['treatment_id', 'patient_id', 'user_id'],

  data() {
    return {
      treatment_detail: {},
      all_services: [],
      with_finance: false,
      with_date: false,
      units: '',
      discount: '',
      payment_methods: [],
      updated_service_details: {

      }

    }
  },
  mounted() {
    this.get_treatment_details(),
      this.get_all_services(),
      this.get_payment_methods()
  },

  methods: {
    get_payment_methods() {
      getPaymentMethods().then((response) => {
        this.payment_methods = response.data
      })
    },
    get_treatment_details() {
      getSingleTreatment(this.treatment_id).then((response) => {
        this.treatment_detail = response.data
        console.log(this.treatment_detail)
        this.treatment_detail.incomes[0].amount /= 100
        this.treatment_detail.incomes[0].original_amount /= 100
      })
    },

    get_all_services() {
      get_services().then((response) => {
        this.all_services = response.data
      })
    },

    update_service() {
      this.treatment_detail.with_finance = this.with_finance
      this.treatment_detail.with_date = this.with_date
      update_service(this.treatment_detail).then((response) => {
        this.$notify({
          title: 'Notification',
          message: response.data,
          type: 'success'
        })
      }).catch(error => {
        this.$notify.error({
          title: 'Error',
          message: error.resoponse.data.message
        })
      })
    },

    calculate_price() {
      console.log('method called!')
      this.treatment_detail.incomes[0].amount = 0
      this.treatment_detail.incomes[0].original_amount = 0

      if (this.treatment_detail.inventories.length > 0) {
        console.log('if clause entered!')
        const result = this.all_services.find(item => item.id === this.treatment_detail.inventories[0].pivot.inventory_id)
        console.log('result variable is: ')
        console.log(result)
        this.treatment_detail.incomes[0].original_amount += Number(result.unit_price) * this.treatment_detail.inventories[0].pivot.units * this.treatment_detail.quantity
        this.treatment_detail.incomes[0].amount += Number(result.unit_price * this.treatment_detail.inventories[0].pivot.units * (1 - this.treatment_detail.incomes[0].discount / 100) * this.treatment_detail.quantity)
      }
      console.log(this.treatment_detail)
    }
  }
}

</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
