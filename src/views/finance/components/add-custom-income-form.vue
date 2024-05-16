<template>
    <div>
        <el-form v-model="custom_income_details" label-position="left" label-width="110px">
            <el-form-item label="Amount">
                <el-input-number v-model="custom_income_details.amount"></el-input-number>
            </el-form-item>

            <el-form-item label="Payment Type">
                <el-select v-model="custom_income_details.payment_type_id" class="capitalize">
                    <el-option class="capitalize" v-for="payment_method in payment_methods" :key="payment_method.id" :label="payment_method.payment_type" :value="payment_method.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Description" :rules="[{required:true,message:'请选择时间'}]">
                <el-input v-model="custom_income_details.description"></el-input>
            </el-form-item>
            <el-form-item label="Date">
                <el-date-picker v-model="custom_income_details.date"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="add_custom_income">Submit</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>


<script>

import { getCurrentDate } from '@/utils/date';
import { getPaymentMethods } from '@/api/finance';
export default {
    props:['patient_id','user_id'],
    data(){
        return{
           
            custom_income_details:{
                amount:0,
                payment_type_id:1,
                description:'',
                date:getCurrentDate(),
                patient_id:this.patient_id,
                user_id:this.user_id,
            },
            payment_methods:[]
        }

    },
    mounted(){
        this.get_payment_methods()
    },
    
    methods:{
        get_payment_methods(){
            getPaymentMethods().then((response)=>{
                this.payment_methods = response.data
            })
        },
        add_custom_income(){

        },
    }
}
</script>


<style scoped>
.capitalize{
    text-transform: capitalize;
}
</style>