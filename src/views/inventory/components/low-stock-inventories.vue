<template>
    <div>
        <el-card>
            <p>Inventory With Lowest Stocks</p>

            <el-table :data="inventory">
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
            </el-table>

        </el-card>
    </div>
</template>


<script>

import { get_lowest_stocks } from "@/api/inventory"

export default {
    data() {
        return {
            inventory: [],
        }
    },

    mounted() {
        this.get_data()
    },

    methods: {
        get_data() {
            get_lowest_stocks().then((response) => {
                this.inventory = response.data
            })
        }
    }
}

</script>



<style scoped lang="scss"></style>