<template>
    <div>

        <div class="header">
            <div class="add-button">
                <el-tooltip effect="dark" content="Add New Expense" placement="top">
                    <el-button @click="load_add_new_expense_form"> <svg-icon icon-class="add"></svg-icon>
                        New</el-button>
                </el-tooltip>

            </div>


            <div class="year-selector">
                <el-tooltip effect="dark" content="Select Year" placement="top">
                    <el-select v-model="year">
                        <el-option v-for="expense_year in expense_years" :key="expense_year.year"
                            :label="expense_year.year" :value="expense_year.year"></el-option>
                    </el-select>
                </el-tooltip>

            </div>
            <div class="refresh-button">
                <el-tooltip effect="dark" content="Refresh Data" placement="top">
                    <el-button circle> <svg-icon icon-class="refresh" @click="get_expenses"></svg-icon> </el-button>


                </el-tooltip>
            </div>
        </div>

        <el-table :data="paged_expenses" stripe height="60vh" border v-loading="loading">
            <el-table-column label="ID">
                <template slot-scope="{row}">
                    <div>
                        <span>{{ row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Amount">
                <template slot-scope="{row}">
                    <div>
                        <span>{{ row.amount }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Category">
                <template slot-scope="{row}">
                    <div>
                        <span class="capitalize">{{ row.category.category }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Payment Method">
                <template slot-scope="{row}">
                    <div>
                        <span class="capitalize">{{ row.payment_method.payment_type}}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Patient">
                <template slot-scope="{row}">
                    <div>
                        <template>

                            <el-popconfirm title="Move to the patient's profile page?" confirmButtonText="Yes"
                                cancelButtonText="Cancel" @onConfirm='redirect_to_patient(row.patient.id )'>
                                <span slot="reference" class="capitalize patient">{{ row.patient.first_name }} {{
                                    row.patient.last_name }}</span>

                            </el-popconfirm>


                        </template>

                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Date">
                <template slot-scope="{row}">
                    <div>
                        <span>{{ row.date }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column>
                <template slot-scope="{row}">
                    <div>
                        <el-tooltip effect="dark" placement="top" content="Update Expense">
                            <el-button type="primary" @click="load_update_expense_form(row.id)" circle><svg-icon icon-class="edit"></svg-icon></el-button>

                        </el-tooltip>
                        
                        <el-tooltip effect="dark" placement="top" content="Delete Expense">
                            <el-popconfirm
                        confirmButtonText="Delete"
                        cancelButtonText="Cancel"
                        icon="el-icon-info"
                        iconColor="red"
                        title="Are you sure you want to delete this?"
                        @onConfirm="delete_expense(row.id)">
                    
                        <el-button slot="reference" type="danger" circle><svg-icon class="delete-icon" icon-class="delete"></svg-icon></el-button>
                        

                    </el-popconfirm>
                        </el-tooltip>
                       

                        
                    </div>
                </template>
            </el-table-column>

            <el-table-column type="expand">
                <template slot-scope="{row}">
                    <div>
                        <span>Description: {{ row.description }}</span>
                    </div>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination background layout="sizes,prev,pager,next" :page-size="page_size" :page-sizes="page_sizes"
          :total="expenses.length" @size-change="change_page_size" @current-change="set_page" />

        <el-dialog title="Add New Expense" :visible.sync="add_new_expense_form_loaded" :before-close="get_expenses">
            <add-expense-form :key="key"></add-expense-form>
        </el-dialog>

        <el-dialog title="Edit Expense" :visible.sync="update_expense_form_loaded" :before-close="get_expenses">
            <edit-expense :id="expense_id" :key="key"></edit-expense>
        </el-dialog>

    </div>
</template>


<script>

import { getExpenseByYear, getExpenseYears, deleteExpense } from '@/api/finance';
import { getCurrentYear } from '@/utils/date';
import AddExpenseForm from './add-expenses-form.vue';
import EditExpense from './edit-expense.vue'

export default{
    components:{AddExpenseForm, EditExpense},
    data(){
        return{
            expenses:[],
            year:2023,
            expense_years:[],
            add_new_expense_form_loaded:false,
            update_expense_form_loaded:false,
            key:0,
            page_size:10,
            page:1,
            page_sizes:[10,15,20,50,100],
            loading:true,
            expense_id:0,
            
        }
    },
    mounted(){
       this.year  =  getCurrentYear()
     this.get_expenses()
        this.get_expense_years()


    },
    watch:{
        year:function(){
            this.get_expenses()
        }
    },

    computed:{
        paged_expenses(){
            return this.expenses.slice(this.page_size*this.page - this.page_size, this.page_size*this.page)
        }
    },


    methods:{

        set_page(val){
            this.page = val
        },
        change_page_size(val){
            this.page_size = val
        },


        redirect_to_patient(id){
            this.$router.push({ path: '/patient/details/' + id })
        },
        load_add_new_expense_form(){
            this.add_new_expense_form_loaded = true
            this.key+=1
        },
        load_update_expense_form(id){
            this.expense_id = id
            this.update_expense_form_loaded = true
            this.key+=1
        },
        get_expense_years(){
            
            getExpenseYears().then((response)=>{
                this.expense_years = response.data
                
            })
        },
        get_expenses(){
            this.loading=true
            getExpenseByYear(this.year).then((response)=>{
                this.expenses = response.data
                this.add_new_expense_form_loaded = false
                this.update_expense_form_loaded = false
                this.loading=false
            })
            
            
        },

        delete_expense(id){
            deleteExpense(id).then((response)=>{
                this.$notify({
                    title:'Success',
                    message:response.data,
                    type:'success'
                }),

                this.get_expenses()
            })
        }

    }
}
</script>

<style scoped>
.header{
    display: flex;
    flex-direction: row;
    gap:1%;
    margin-bottom: 1%;
}
.capitalize{
    text-transform: capitalize;
}

.patient:hover{
    cursor: pointer;
    text-decoration: underline;
}
.delete-icon{
    color:white;
    font-weight: bold;
}
</style>