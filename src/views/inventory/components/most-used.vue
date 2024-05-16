<template>
    <div>
        <el-card v-loading="card_loading">
            <div class="card-header">
                <h4 class="card-heading">Most Frequently Used Items</h4>
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


            <el-table :data="paged_inventory">
                <el-table-column label="Name">
                    <template slot-scope="{row}">
                        <div>
                            <el-popover class="most-used-pop-over" placement="right" effect="light" trigger="hover">
                                <most-used-chart :id="row.inventory_id" :monthly_usage="row.monthly_usage"
                                    :key="row.inventory_id" :year="year"></most-used-chart>


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

            <el-pagination background layout="sizes,prev,pager,next"
            :page-size="page_size"
            :page-sizes="page_sizes"
            :total="most_used_inventories.length"
            @size-change="change_page_size"
            @current-change="set_page"></el-pagination>
        </el-card>
    </div>
</template>


<script>
import { get_most_used, get_all_inventory_used_years } from "@/api/inventory";
import MostUsedChart from "@/views/inventory/components/charts/most-used-chart.vue";
import { getCurrentYear } from "@/utils/date";

export default {
    components: {
        MostUsedChart,
    },
    data() {
        return {
            most_used_inventories: [],

            card_loading: true,
            year: 0,
            records: 10,
            years: [],
           page_size:5,
           page:1,
           page_sizes:[5,10,15,20,50,100]
        }
    },
    watch: {
        records() {
            this.get_inventory()
        }
    },
    computed:{
        paged_inventory(){
            return this.most_used_inventories.slice(
                this.page_size*this.page - this.page_size,
                this.page_size * this.page
            )
        }
    },

    mounted() {
        this.get_current_year()
        this.get_inventory_used_years()
        this.get_inventory()
    },

    methods: {
        set_page(val){
            this.page = val
        },
        change_page_size(val){
            this.page_size = val
        },
        get_current_year() {
            this.year = getCurrentYear()
        },
        get_inventory_used_years() {
            get_all_inventory_used_years().then((response) => {
                this.years = response.data
            })
        },
        get_inventory_by_year(year) {
            this.year = year
            this.get_inventory()
        },
        get_inventory() {
            this.card_loading = true
            get_most_used(this.records, this.year).then((response) => {
                this.most_used_inventories = response.data
            })

            this.card_loading = false
        },



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

.most-used-pop-over {
    width: 300px;
    height: 300px;
}
</style>