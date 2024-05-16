<template>
    <div class="app-container">
        <div class="expense-list">
            <expense-list class="expense-table"></expense-list>

        </div>

        
    </div>
</template>



<script>
import AddExpenseForm from "./add-expenses-form.vue"
import expenseList from './expense-list.vue'


export default {
    components: {
        AddExpenseForm,
        expenseList,
    },
    data() {
        return {

            

        }
    },

    mounted() {

    },

    methods: {

    }
}
</script>

<style scoped>
.expense-list{
    width: 100%;
    
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.expense-table{
    
}

</style>