<template>
  <div>
    <el-button style="width:100%" type="success" icon="el-icon-plus" @click="add_row">Ingredient</el-button>
    <div class="add_herbs_form">
      <el-form v-model="herb_details" label-width="80px" label-position="left">
        <el-form-item v-for="(herb_detail, index) in herb_details" :label="'Herb ' + (index + 1)">
          <!--<el-input v-model="herb_detail.name" placeholder="Name" size="medium"  style="width:300px "></el-input>-->
          <el-select v-model="herb_detail.id" filterable placeholder="select" style="width:200px">
            <el-option
              v-for="herb in herb_rtv"
              :key="herb.id"
              :label="herb.name + ' / stock: ' + herb.stock + ' / price: ' + herb.unit_price"
              :value="herb.id"
            />
          </el-select>

          <el-input-number
            v-model="herb_detail.units"
            placeholder="Units"
            style="width: 130px; margin-left:10px"
            :min="1"
          />

          <el-button style="margin-left: 10px" @click.prevent="remove_herb_row(index)">Delete</el-button>
        </el-form-item>

        <div v-if="herb_details.length">
          <el-form-item label="Quantity">
            <el-input-number v-model="quantity" :min="1" />
          </el-form-item>

          <el-form-item label="Extra Options">
            <el-checkbox v-model="with_finance">With Income</el-checkbox>
            <el-checkbox v-model="with_date">With Date</el-checkbox>
          </el-form-item>

          <div v-if="with_finance" class="finance">
            <el-form-item label="Discount">
              <el-input-number v-model="discount" :min="0" :max="100" />
            </el-form-item>

            <el-form-item label="Price">

              <el-input-number v-model="final_price" :min="0" :max="999999999" :precision="2" />
              <el-button type="primary" @click="calculate_herb_price">Calculate</el-button>
            </el-form-item>

            <el-form-item label="Original Price: £" label-width="150px">
              <span>{{ original_price }}</span>
            </el-form-item>

            <el-form-item label="Payment Type">
              <el-select v-model="payment_type">
                <el-option
                  v-for="payment_method in payment_methods"
                  :key="payment_method.id"
                  :label="uppercaseFirst(payment_method.payment_type)"
                  :value="payment_method.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="Description">
              <el-input v-model="description" />
            </el-form-item>

          </div>

          <div v-if="with_date" class="date">
            <el-form-item label="Date">

              <el-date-picker
                v-model="date"
                type="date"
                aria-placeholder="pick a date..."
                :picker-options="date_picker_options"
                value-format="yyyy-MM-dd"
              />

            </el-form-item>
          </div>

          <el-button type="primary" @click="add_herbal_packages">Submit</el-button>
        </div>
      </el-form>

    </div>

  </div>
</template>

<script>
import { get_herbs } from '@/api/inventory'
import { addHerbalPackages } from '@/api/treatment'
import { getPaymentMethods } from '@/api/finance'
import { uppercaseFirst } from '@/filters'
export default {
  props: ['patient_id', 'user_id'],
  data() {
    return {
      date_picker_options: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      herb_details: [],
      herb_rtv: [],
      quantity: '',
      treatment_details: [],
      stock: '0',
      search: '',
      herb: '',
      discount: 0,
      original_price: 0,
      final_price: 0,
      description: '',
      payment_type: '',
      payment_methods: [],
      service_id: '',
      with_finance: false,
      with_date: false,
      date: ''

    }
  },
  mounted() {
    this.get_all_herbs()
  },

  created() {
    this.get_all_payment_methods()
  },

  methods: {
    uppercaseFirst,
    calculate_herb_price() {
      this.final_price = 0
      this.original_price = 0

      if (this.herb_details.length > 0) {
        for (let i = 0; i < this.herb_details.length; i++) {
          const result = this.herb_rtv.find(item => item.id === this.herb_details[i].id)

          this.original_price += Number(result.unit_price) * this.herb_details[i].units * this.quantity
          this.final_price += Number(result.unit_price * this.herb_details[i].units * (1 - this.discount / 100) * this.quantity)
        }
      }
    },

    add_row() {
      this.herb_details.push({
        id: '',
        units: ''
      })
    },
    add_herbal_packages() {
      if (this.with_finance && !this.with_date) {
        this.treatment_details = {

          herb_details: this.herb_details,
          quantity: this.quantity,
          patient_id: this.patient_id,
          user_id: this.user_id,
          discount: this.discount,
          description: this.description,
          payment_type: this.payment_type,
          original_price: this.original_price,
          final_price: this.final_price,
          service_id: this.service_id,
          with_finance: this.with_finance

        }
      } else if (this.with_finance && this.with_date) {
        this.treatment_details = {

          herb_details: this.herb_details,
          quantity: this.quantity,
          patient_id: this.patient_id,
          user_id: this.user_id,
          discount: this.discount,
          description: this.description,
          payment_type: this.payment_type,
          original_price: this.original_price,
          final_price: this.final_price,
          service_id: this.service_id,
          with_finance: this.with_finance,
          with_date: this.with_date,
          date: this.date
        }
      } else if (!this.with_finance && !this.with_date) {
        this.treatment_details = {

          herb_details: this.herb_details,
          quantity: this.quantity,
          patient_id: this.patient_id,
          user_id: this.user_id,
          service_id: this.service_id
        }
      }

      addHerbalPackages(this.treatment_details).then((response) => {
        this.$notify({
          title: 'Notification',
          message: response.data,
          type: 'success'
        })
      }).catch(error => {
        this.$notify.error({
          title: 'Error',
          message: error.response.data.message

        })
      })
    },

    remove_herb_row(index) {
      this.herb_details.splice(index, 1)
    },

    get_all_herbs() {
      get_herbs().then((response) => {
        console.log(response)
        this.herb_rtv = response.data
        this.service_id = response.data[0].categories_id
      })
    },

    get_all_payment_methods() {
      getPaymentMethods().then((response) => {
        this.payment_methods = response.data
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.add_herbs_form {
  margin-top: 10px;
  width: fit-content;
}
</style>
