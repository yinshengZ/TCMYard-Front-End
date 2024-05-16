<template>
    <div class="form" >
       
        <el-form :model="form_data" v-loading="loading">
            <el-form-item label="Amount" label-width="120px">
                <el-input-number v-model="form_data.amount"></el-input-number>
            </el-form-item>
            <el-form-item label="Description" label-width="120px" :rules="[{required:true, message:'test test', trigger:'blur'}]">
                <el-input class="input-textarea" type="textarea" v-model="form_data.description" >
                </el-input>
            </el-form-item>
            <el-form-item label="Payment Type" label-width="120px">
                <el-select v-model="form_data.payment_type">
                    <el-option class="capitalize" v-for="payment_method in payment_methods"
                        :label="payment_method.payment_type" :value="payment_method.id"
                        :key="payment_method.id"></el-option>
                </el-select>
                <el-tooltip effect="dark" content="Add New Payment Type" placement="top">
                    <el-button class="dialog-button" @click="load_add_new_payment_method_form"> <svg-icon icon-class="add"></svg-icon> </el-button>

                </el-tooltip>
            </el-form-item>

            <el-form-item label="Category" label-width="120px">
                <el-select v-model="form_data.expense_category">
                    <el-option v-for="category in expense_categories"
                    :label="category.category"
                    :value="category.id"
                    :key="category.id"></el-option>
                </el-select>
                <el-tooltip effect="dark" placement="top" content="Add new category">
                    <el-button class="dialog-button" @click="load_add_new_expense_category_form"> <svg-icon icon-class="add"></svg-icon> </el-button>

                </el-tooltip>


            </el-form-item>

            <el-form-item label-width="120px">
                <el-checkbox class="add-expense-checkbox" v-model="with_patient">With Patient</el-checkbox>
                <el-checkbox class="add-expense-checkbox" v-model="with_date">With Date</el-checkbox>

            </el-form-item>
            
            <el-form-item v-if="with_patient" label="Patient:" label-width="120px">
                <el-select v-model="form_data.patient_id" filterable>
                   
                        <el-option class="capitalize option-hover" v-for="patient in patients" :label="patient.first_name +' '+ patient.last_name+' / '+patient.email" :value="patient.id"
                    :key = "patient.id" ></el-option>
                  
                    
                </el-select>
            </el-form-item>

            <el-form-item v-if="with_date" label="Date:" label-width="120px">
                <el-date-picker v-model="form_data.date"></el-date-picker>
            </el-form-item>

            <el-form-item label-width="120px">
                <el-button type="primary" @click="add_expense">Submit</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
        title="Add New Category"
        :visible.sync="add_new_category_dialog_loaded"
        :before-close="get_expense_categories"
        append-to-body
        width="30%">
            <add-expense-category-form :key="key"></add-expense-category-form>
        </el-dialog>

        <el-dialog
        title="Add New Payment Method"
        :visible.sync="add_new_payment_method_form_loaded"
        :before-close="get_payment_methods"
        append-to-body
        width="30%">
        <add-payment-method-form :key="key"></add-payment-method-form>

        </el-dialog>

        
    </div>
</template>


<script>
import { getPaymentMethods,  getExpenseCategories, addExpense } from "@/api/finance.js"
import { getSimplePatientList } from "@/api/patient"
import { getCurrentDate } from "@/utils/date"

import addExpenseCategoryForm from './add-expense-category-form.vue'
import addPaymentMethodForm from "./add-payment-method-form.vue"
export default {
    components:{
        addExpenseCategoryForm,
        addPaymentMethodForm
    },
    data() {
        return {
            form_data: {
                amount:0,
                description:'',
                payment_type:1,
                expense_category:1,
                patient_id:1,
                date:getCurrentDate(),
            },
            payment_methods: [],
            with_patient: false,
            with_date:false,
            patients:[],
            add_new_category_dialog_loaded:false,
            add_new_payment_method_form_loaded:false,
            expense_categories:[],
            key:0,
            loading:true,


        }
    },

    mounted() {
        this.load_data()
        this.get_payment_methods()
        this.get_simple_patient_list()
        this.get_expense_categories()
        this.load_complete()
        
    },

    methods: {
        load_data(){
            this.loading = true
        },
        load_complete(){
            this.loading = false
        },
        load_add_new_expense_category_form(){
            this.key+=1
            this.add_new_category_dialog_loaded = true
        },
        load_add_new_payment_method_form(){
            this.key+=1
            this.add_new_payment_method_form_loaded = true
        },
      
        get_simple_patient_list(){
            getSimplePatientList().then((response)=>{
                this.patients = response.data
            })
        },
        get_expense_categories(){
            getExpenseCategories().then((response)=>{
                this.expense_categories = response.data
                this.add_new_category_dialog_loaded = false
                
            })
        },
        get_payment_methods() {
            getPaymentMethods().then((response) => {
                this.payment_methods = response.data
                this.add_new_payment_method_form_loaded = false
            })
        },

        add_expense(){
            addExpense(this.form_data).then((response)=>{
                this.$notify({
                    title:'Sucess',
                    message:response.data,
                    type:'success'
                })
            })
        }
    },

}
</script>


<style lang="scss" scoped>
.form{
    padding: 3%;
}
.input-textarea{
    width: 50%;
}
.with-patient-checkbox{
    margin-left: 3%;
}
.dialog-button{
    margin-left:3%;
}
.capitalize {
    text-transform: capitalize
}

</style>