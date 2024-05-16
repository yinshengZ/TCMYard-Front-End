<template>
  <div>
    <p>Hello add income!</p>


    <el-checkbox v-model="with_patient">With Patient</el-checkbox>
    <!-- <el-checkbox v-model="with_treatment">With Treatment</el-checkbox>
    <el-checkbox v-model="custom">Custom</el-checkbox> -->
    
    <el-radio v-model="income_type" label="treatment">With Treatment</el-radio>
    <el-radio v-model="income_type" label="custom">Custom Amount</el-radio>

    <div class="patient" v-if="with_patient">
      <el-select v-model="patient_id" filterable>
        <el-option v-for="patient in patient_list" :value="patient.id" :label="patient.first_name +' '+patient.last_name" :key="patient.id">
          
        </el-option>
      </el-select>
    </div>

    <div class="treatment" v-if="income_type=='treatment'">

      <el-button-group>
        <el-button @click="load_add_herbs">Herb</el-button>
        <el-button @click="load_add_services">Service</el-button>
        <el-button @click="load_add_retails">Retail</el-button>
        <el-button @click="load_add_others">Other</el-button>
      </el-button-group>

      <div class="add-herbs-form" v-if="add_herbs">
        <h4>Add Herbs Treatment</h4>
        <add-herbs :patient_id = "patient_id" :key="key" :user_id = "user_id"></add-herbs>
      </div>

      <div class="add-services-form" v-if="add_services">
          <add-services :patient_id="patient_id" :key="key" :user_id="user_id"></add-services>
      </div>

      <div class="add-retail-form" v-if = "add_retails">
        <add-retail :patient_id="patient_id" :key="key" :user_id="user_id"></add-retail>
      </div>

      <div class="add-other-form" v-if="add_others">
        <add-other :patient_id="patient_id" :key="key" :user_id="user_id"></add-other>
      </div>

    </div>

    <div class="add-custom-income-form" v-if="income_type=='custom'">
      <add-custom-income-form :patient_id="patient_id" :user_id="user_id" :key="key"></add-custom-income-form>
    </div>


  </div>
</template>



<script>
import { getSimplePatientList } from '@/api/patient';
import { mapGetters } from 'vuex';
import addHerbs from '@/views/treatments/components/add-herbs.vue';
import addServices from '@/views/treatments/components/add-services.vue';
import addRetail from '@/views/treatments/components/add-retail.vue';
import addOther from '@/views/treatments/components/add-other.vue';

import addCustomIncomeForm from './add-custom-income-form.vue';
export default {
  components:{
    addHerbs,
    addServices,
    addRetail,
    addOther,
    addCustomIncomeForm,
    
  },
  data(){
    return{
      with_patient:false,
      with_treatment:false,
      custom:false,
      patient_list:[],
      patient_id:1,
      key:0,
      user_id:'',
      add_herbs:false,
      add_services:false,
      add_retails:false,
      add_others:false,
      income_type:''


    }
  },
  computed:{
    ...mapGetters([
      'id'
    ])
  },

  watch:{
    with_patient:function(){
      this.key+=1
      this.get_patients()
    },

    custom:function(){
      
      this.with_treatment=false
      this.add_others = false
      this.add_services = false
      this.add_retails = false
      this.add_herbs = false
    },

    with_treatment:function(){
      this.custom = false
    }
    
  },

  mounted(){
    this.user_id = this.id
  },

  methods:{
    load_add_herbs(){
      this.add_others = false
      this.add_services = false
      this.add_retails = false
      this.add_herbs = true
    },
    load_add_services(){
      this.add_herbs = false
      this.add_retails = false
      this.add_others = false
      this.add_services = true
    },
    load_add_retails(){
      this.add_herbs = false
      this.add_services = false
      this.add_others = false
      this.add_retails = true
    },
    load_add_others(){
      this.add_herbs= false
      this.add_services = false
      this.add_retails = false
      this.add_others=true
    },
    get_patients(){
      getSimplePatientList().then((response)=>{
        this.patient_list = response.data
      })
    },

    test_checked(){
      alert('hello?')
    }


  }
}
</script>


<style scoped>

</style>