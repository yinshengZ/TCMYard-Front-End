<template>
    <div>
        <el-form v-model="payment_method">
            <el-form-item label="Payment Method">
                <el-input v-model="payment_method.method"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add_payment_method">Add</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import { addPaymentMethod } from '@/api/finance';
export default {
    data(){
        return{
            payment_method:{
                method:''
            },
        }
    },

    methods:{
        add_payment_method(){
            addPaymentMethod(this.payment_method).then((response)=>{
                this.$notify({
                    title:'Sucess',
                    message:response.data,
                    type:'success'
                })
            })
        },
    }
}
</script>


<style scoped>

</style>