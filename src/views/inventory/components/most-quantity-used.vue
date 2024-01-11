<template>
    <div>
        <el-card>
            <p>Most Quantities Used Invetories</p>
            <el-table :data="inventory_data">
                <el-table-column label="Name">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.inventory_info[0].name }}</span>
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
export default {
    data() {
        return {
            inventory_data: [],
        }
    },

    mounted() {
        this.get_data()
    },

    methods: {
        get_data() {
            get_most_quantity_used().then((response) => {
                this.inventory_data = response.data
            })
        }
    }
}

</script>


<style lang="scss" scoped></style>