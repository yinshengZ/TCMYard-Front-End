<template>
    <div>
        <el-card>


            <div class="card-header">
                <h4 class="card-heading">Most Quantities Used Invetories</h4>
                <span>Showing Data From <span class="header-year">{{ year }}</span></span>

                <div class="year-selector">
                    <div v-for="year in years">
                        <el-link @click="get_inventory_by_year(year.year)"><span>{{ year.year }}</span></el-link>
                        <el-divider direction="vertical"></el-divider>
                    </div>
                </div>

                <div class="number-of-records-selector">
                    <span>No. of Records To Display: </span>
                    <el-select v-model="records" placeholder="No. of Records">
                        <el-option v-for="number in number_of_records" :key="number.value" :label="number.label"
                            :value="number.value"></el-option>
                    </el-select>
                </div>
            </div>


            <el-table :data="inventory_data">
                <el-table-column label="Name">
                    <template slot-scope="{row}">
                        <div>
                            <el-popover class="most-quantity-pop-over" placement="right" effect="light" trigger="hover">

                                <most-units-used-chart :id="row.inventory_id" :monthly_usage="row.monthly_usage"
                                    :key="row.inventory_id" :year="year"></most-units-used-chart>

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
import { get_most_quantity_used, get_all_inventory_used_years, get_inventory_used_years } from '@/api/inventory';
import mostUnitsUsedChart from './charts/most-units-used-chart.vue';
import { getCurrentYear } from '@/utils/date'
export default {
    components: {
        mostUnitsUsedChart,
    },
    data() {
        return {
            inventory_data: [],
            records: 10,
            year: 0,
            years: [],
            number_of_records: [
                {
                    label: '5',
                    value: 5
                },
                {
                    label: '10',
                    value: 10
                },
                {
                    label: '15',
                    value: 15
                },
                {
                    label: '20',
                    value: 20
                }
            ],
        }
    },

    watch: {
        records() {
            this.get_inventory()
        }
    },

    mounted() {
        this.get_inventory_used_years()
        this.get_current_year()
        this.get_inventory()

    },

    methods: {

        get_inventory_by_year(year) {
            this.year = year
            this.get_inventory()
        },
        get_inventory_used_years() {
            get_all_inventory_used_years().then((response) => {
                this.years = response.data
            })
        },
        get_inventory() {
            get_most_quantity_used(this.records, this.year).then((response) => {
                this.inventory_data = response.data
            })
        },
        get_current_year() {
            this.year = getCurrentYear()
        }
    }
}

</script>


<style lang="scss" scoped>
.inventory-name:hover {
    text-decoration: underline;
    cursor: pointer;
}

.card-header {
    margin-bottom: 1%;
}

.header-year {
    font-weight: bold;
    color: rgba($color: #0e0e0ef3, $alpha: 0.6);
}

.header-year:hover {
    color: rgba($color: #000000, $alpha: 1.0);
    cursor: pointer;
}

.year-selector {
    grid-area: top;
    margin-bottom: 2%;
    margin-top: 1%;
    display: flex;
    flex-direction: row;

}
</style>