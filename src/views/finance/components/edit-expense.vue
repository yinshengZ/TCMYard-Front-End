<template>
    <div>
    
        <el-form>
            <el-form-item label="ID">
                <el-input v-model="expense_details.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="Amount">
                <el-input-number v-model="expense_details.amount"></el-input-number>
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="expense_details.description" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="Date">
                <el-date-picker v-model="expense_details.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="Category">
                <el-select v-model="expense_details.expense_category_id">
                    <el-option v-for="expense_category in expense_categories" :key="expense_category.id" :value="expense_category.id" :label="expense_category.category" class="capitalize"></el-option>
                </el-select>
                <el-tooltip effect="dark" placement="top" content="Add New Category">
                    <el-button @click="load_add_new_expense_category_form"> <svg-icon icon-class="add"></svg-icon> </el-button>
                </el-tooltip>
            </el-form-item>

            <el-form-item label="Payment Method">
                <el-select v-model="expense_details.payment_method_id">
                    <el-option  class="capitalize" v-for="payment_method in payment_methods" :key="payment_method.id" :value="payment_method.id" :label="payment_method.payment_type"></el-option>
                </el-select>
                <el-button @click="load_add_new_payment_method_form"> <svg-icon icon-class="add"></svg-icon> </el-button>
            </el-form-item>

            <el-form-item label="Patient">
                <el-select v-model="expense_details.patient_id" filterable>
                    <el-option v-for="patient in patients" :value="patient.id" :key="patient.id" :label="patient.first_name +' '+ patient.last_name" class="capitalize"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button @click="update_expense" type="success">Update</el-button>
            </el-form-item>

        </el-form>

        <el-dialog
        title="Add New Expense Category"
        :visible.sync="add_new_expense_category_form_loaded"
        :before-close="get_expense_categories"
        append-to-body>
            <add-expense-category-form :key="key"></add-expense-category-form>
        </el-dialog>

        <el-dialog
        title="Add New Payment Method"
        :visible.sync="add_new_payment_method_form_loaded"
        :before-close="get_payment_methods"
        append-to-body>
        <add-payment-method-form :key="key"></add-payment-method-form>
        </el-dialog>

    </div>
</template>


<script>
import { getExpenseByID, getExpenseCategories,getPaymentMethods, updateExpense } from '@/api/finance';
import { getSimplePatientList } from '@/api/patient';
import AddExpenseCategoryForm from './add-expense-category-form.vue';

import AddPaymentMethodForm from './add-payment-method-form.vue';
export default {
    props:['id'],
    components:{
        AddExpenseCategoryForm,
        AddPaymentMethodForm
    },
    data(){
        return{
            expense_id: this.id,
            expense_details:[],
            patients:[],
            expense_categories:[],
            payment_methods:[],
            add_new_expense_category_form_loaded:false,
            add_new_payment_method_form_loaded:false,
            key:0,
            loading:true,


        }
    },
    created(){
        this.get_expense_details()
        this.get_patients_list()
        this.get_expense_categories()
        this.get_payment_methods()
        this.loading = false
    },

    methods:{
        load_add_new_expense_category_form(){
            this.add_new_expense_category_form_loaded = true
            this.key +=1
        },
        load_add_new_payment_method_form(){
            this.add_new_payment_method_form_loaded = true
            this.key+=1
        },
        get_expense_categories(){
            getExpenseCategories().then((response)=>{
                this.expense_categories = response.data
                this.add_new_expense_category_form_loaded = false
            })
        },
        get_payment_methods(){
            getPaymentMethods().then((response)=>{
                this.payment_methods = response.data
                this.add_new_payment_method_form_loaded = false
            })
        },
        get_patients_list(){
            getSimplePatientList().then((response)=>{
                this.patients = response.data
                
            })
        },
        get_expense_details(){
            getExpenseByID(this.expense_id).then((response)=>{
                this.expense_details = response.data[0]
                
            })
        },

        update_expense(){
           
            updateExpense(this.expense_details).then((response)=>{
                this.$notify({
                    title:'Success',
                    message:response.data,
                    type:'success'
                })
            })
        }
    }
    
}
</script>


<style scoped>
.capitalize{
    text-transform: capitalize;
}
</style>