<template>
    <div>
        <el-card>
            <p class="card-heading">Most Frequently Used Items</p>
            <el-table :data="most_used_inventories">
                <el-table-column label="Name">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.inventory_info[0].name }}</span>
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
import { get_most_used } from "@/api/inventory"
export default {
    data() {
        return {
            most_used_inventories: [],
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
        }
    }
}

</script>


<style lang="scss" scoped></style>