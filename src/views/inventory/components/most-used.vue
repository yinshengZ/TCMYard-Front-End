<template>
    <div>
        <el-card>
            <p class="card-heading">Most Frequently Used Items</p>
            <el-table :data="most_used_inventories">
                <el-table-column label="Name">
                    <template slot-scope="{row}">
                        <div>
                            <el-popover class="most-used-pop-over" placement="right" effect="light" trigger="hover">
                                <most-used-chart :id="row.inventory_id" :inventory="most_used_inventories"
                                    :key="row.inventory_id"></most-used-chart>


                                <span class="inventory-name" slot="reference">{{
                                    row.inventory_info[0].name }}</span>

                            </el-popover>

                        </div>
                    </template>
                </el-table-column>



                <el-table-column label="Used Times">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.counts }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>


<script>
import { get_most_used } from "@/api/inventory";
import MostUsedChart from "@/views/inventory/components/charts/most-used-chart.vue";


export default {
    components: {
        MostUsedChart,
    },
    data() {
        return {
            most_used_inventories: [],
            key: 0,
        }
    },

    mounted() {
        this.get_inventory()
    },

    methods: {
        get_inventory() {
            get_most_used().then((response) => {
                this.most_used_inventories = response.data
            })
        },



    }
}

</script>


<style lang="scss" scoped>
.inventory-name:hover {
    text-decoration: underline;
    cursor: pointer;
}

.most-used-pop-over {
    width: 300px;
    height: 300px;
}
</style>