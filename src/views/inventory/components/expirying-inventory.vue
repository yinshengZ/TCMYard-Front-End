<template>
    <div v-loading="loading">
        <el-table :data="paged_inventories" v-loading="loading">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <div>
                        <p>ID: {{ scope.row.id }}</p>
                        <p>Description: {{ scope.row.description }}</p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Name" prop="name" width="120px">

            </el-table-column>
            <el-table-column label="stock" prop="stock" width="120px"></el-table-column>
            <el-table-column label="Expiry" width="140px">

                <template slot-scope="scope">
                    <div v-if="dayjs(scope.row.expiry_date).isBefore(dayjs(new Date()))">

                        <el-tooltip :content="'expired on ' + scope.row.expiry_date" effect="dark" placement="top">
                            <span class="expired">
                                Expired!
                            </span>
                        </el-tooltip>

                    </div>
                    <div v-else>

                        <span class="expirying">
                            {{ scope.row.expiry_date }}
                        </span>
                    </div>


                </template>
            </el-table-column>

            <el-table-column>

                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" @click="load_update_inventory_form(scope.row.id)">
                            <svg-icon icon-class="edit"></svg-icon>
                            <span class="update-button-text">Update</span>
                        </el-button>
                    </div>
                </template>

            </el-table-column>
        </el-table>

        <el-pagination background layout="sizes,prev,pager,next" :page_size="page_size"
        :page-sizes="page_sizes"
        :total="expirying_inventories.length"
        @size-change="change_page_size"
        @current-change="set_page"></el-pagination>

        <el-dialog title="Update Inventory" :visible.sync="update_dialog_visible"
            :before-close="get_expirying_inventories">
            <update-inventory-form :inventory_id="inventory_id" :key="key"></update-inventory-form>
        </el-dialog>
    </div>
</template>


<script>

import { get_expirying } from '@/api/inventory';
import updateInventoryForm from './update-inventory-form.vue';
import dayjs from 'dayjs';
export default {
    components: { updateInventoryForm },
    data() {
        return {
            expirying_inventories: [],
            loading: true,
            update_dialog_visible: false,
            key: 0,
            inventory_id: '',
            page_size:5,
            page:1,
            page_sizes:[5,10,15,20,50,100]

        }
    },
    computed:{
        paged_inventories(){
            return this.expirying_inventories.slice(this.page_size*this.page - this.page_size, this.page_size*this.page)
        }
    },

    mounted() {
        this.get_expirying_inventories()
    },

    methods: {
        set_page(val){
            this.page=val
        },
        change_page_size(val){
            this.page_size = val
        },
        load_update_inventory_form(id) {
            this.update_dialog_visible = true
            this.inventory_id = id
        },
        get_expirying_inventories() {
            this.loading = true

            get_expirying().then((response) => {
                this.expirying_inventories = response.data
                this.loading = false
            })

            this.key++

            this.update_dialog_visible = false

        },
        dayjs
    }
}


</script>


<style lang="scss" scoped>
.expired {
    color: red;
    cursor: pointer;
}
</style>