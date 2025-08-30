<template>
    <div>

        <div class="top-row">
            <span>
                Inventory Name: <span class="capitalize inventory-detail">{{ inventory_details.name }}</span>
            </span>
            <span>
                Inventory Category: <span class="capitalize inventory-detail"> {{ category.categories }}</span>
            </span>
        </div>



        <div class="bottom-row">
            <el-form>
                <el-form-item label="Stocks to Add" v-model="stock.stock_to_add" label-position="left">
                    <el-input-number v-model="stock.stock"></el-input-number>
                </el-form-item>
                <el-form-item label="Description" v-model="stock.description">
                    <el-input type="textarea" autosize v-model="stock.description"></el-input>
                </el-form-item>
                <el-form-item label="Date" v-model="stock.date">
                    <el-date-picker v-model="stock.date" type="date"></el-date-picker>
                </el-form-item>
                <el-button type="primary" @click="add_stock">Add Stock</el-button>
                <el-button type="warning" @click="get_inventory_stock">Get Stock</el-button>
            </el-form>
        </div>

    </div>
</template>


<script>
import { get_single, add_inventory_stock, get_stock } from '@/api/inventory';
import { getCurrentDate } from '@/utils/date';


import { mapGetters } from 'vuex';
export default {
    props: ['inventory_id'],
    data() {
        return {

            inventory_details: [],
            category: [],
            stock: {
                id: this.inventory_id,
                stock: 0,
                description: '',
                date: getCurrentDate(),

                user_id: 0,

            },
        }
    },
    computed: {
        ...mapGetters(['id'])
    },

    mounted() {
        this.get_user_id()
        this.get_inventory_detail()
    },

    methods: {

        //get user id
        get_user_id() {
            this.stock.user_id = this.id
        },

        get_inventory_detail() {
            get_single(this.inventory_id).then((response) => {
                /*  console.log(this.id)
                 console.log(response) */
                this.inventory_details = response.data
                this.category = response.data.category
            })
        },
        add_stock() {
            add_inventory_stock(this.stock).then((response) => {
                this.$notify({
                    title: 'Notification',
                    type: 'success',
                    message: response.message
                })


            })
        },
        get_inventory_stock() {
            get_stock(this.inventory_id).then((response) => {
                console.log(response)
            })
        }
    }
}

</script>

<style scoped>
.top-row {
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10%;
}

.capitalize {
    text-transform: capitalize;
}

.inventory-detail {
    font-weight: bold;
}

.inventory-detail:hover {
    text-decoration: underline;
    cursor: pointer;
}

.bottom-row {
    margin-top: 5%;
}
</style>