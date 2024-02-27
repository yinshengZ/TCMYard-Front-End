<template>
    <div>
        <el-card>
            <p>Most Quantities Used Invetories</p>
            <el-table :data="inventory_data">
                <el-table-column label="Name">
                    <template slot-scope="{row}">
                        <div>
                            <el-popover class="most-quantity-pop-over" placement="right" effect="light" trigger="hover">

                                <most-units-used-chart :id="row.inventory_id"
                                    :key="row.inventory_id"></most-units-used-chart>

                                <span class="inventory-name" slot="reference">{{ row.inventory_info[0].name }}</span>

                            </el-popover>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Quantity">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.quantity }}</span>
                        </div>
                    </template>
                </el-table-column>

            </el-table>

        </el-card>
    </div>
</template>


<script>
import { get_most_quantity_used } from '@/api/inventory';
import mostUnitsUsedChart from './charts/most-units-used-chart.vue';
export default {
    components: {
        mostUnitsUsedChart,
    },
    data() {
        return {
            inventory_data: [],
        }
    },

    mounted() {
        this.get_data()
    },

    methods: {
        async get_data() {
            get_most_quantity_used().then((response) => {
                this.inventory_data = response.data
            })
        }
    }
}

</script>


<style lang="scss" scoped></style>