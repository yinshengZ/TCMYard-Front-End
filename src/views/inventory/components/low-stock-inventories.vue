<template>
    <div>
        <el-card>
            <p>Inventory With Lowest Stocks</p>

            <el-table :data="paged_inventory">
                <el-table-column label="Name">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.name }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Stocks">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.stock }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column>


                    <template slot-scope="{row}">
                        <div>
                            <el-button type="primary" @click="load_update_form(row.id)"> <svg-icon
                                    icon-class="edit"></svg-icon> Update</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="sizes, prev, pager, next" 
            :page-size="page_size" :page-sizes="page_sizes"
            :total="inventory.length" @size-change="change_page_size" @current-change="set_page"></el-pagination>

        </el-card>

        <el-dialog :visible.sync="update_form_loaded" :before-close="get_data">
            <update-inventory-form :key="key" :inventory_id="inventory_id"></update-inventory-form>
        </el-dialog>
    </div>
</template>


<script>

import { get_lowest_stocks } from "@/api/inventory"
import updateInventoryForm from "./update-inventory-form.vue"

export default {
    components: {
        updateInventoryForm
    },
    data() {
        return {
            inventory: [],
            key: 0,
            inventory_id: '',
            update_form_loaded: false,            
            page_size:5,
            page:1,
            page_sizes:[5,10,15,20,50,100]
        }
    },

    computed:{
        paged_inventory(){
            return this.inventory.slice(this.page_size*this.page - this.page_size, this.page_size*this.page)
        }
    },

    mounted() {
        this.get_data()
    },

    methods: {
        set_page(val){
            this.page=val
        },

        change_page_size(val){
            this.page_size=val
        },
        
        load_update_form(id) {

            this.inventory_id = id
            this.update_form_loaded = true
            this.key++
        },

        get_data() {
            get_lowest_stocks().then((response) => {
                this.inventory = response.data
            })
            this.update_form_loaded = false
        }
    }
}

</script>



<style scoped lang="scss"></style>