<template>
    <div>

        <el-form v-model="categories">
            <el-form-item label="Category" label-width="80px">
                <el-input v-model="categories.category"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit-button" @click="add_expense_category" type="primary">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {addExpenseCategory} from '@/api/finance'

export default{
    data(){
        return {
            categories:{
                category:'',
                
            },
            all_categories:[],
            
        }
    },

    mounted(){
     
    },

    methods:{
        
        add_expense_category(){
            addExpenseCategory(this.categories).then((response)=>{
                this.$notify({
                    title:'Sucess',
                    message:"Category has been added sucessfully!",
                    type:'success'
                })
            })
            
        },

        
    }
    
}

</script>


<style scoped>
.submit-button{
    width:100%;
   
}
</style>

