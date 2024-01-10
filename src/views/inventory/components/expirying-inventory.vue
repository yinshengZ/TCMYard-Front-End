<template>
    <div v-loading="loading">
        <el-table :data="expirying_inventories" v-loading="loading">
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
                                Already Expired!
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
        </el-table>
    </div>
</template>


<script>

import { get_expirying } from '@/api/inventory';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            expirying_inventories: [],
            loading: true,
        }
    },

    created() {
        this.get_expirying_inventories()
    },

    methods: {
        get_expirying_inventories() {
            this.loading = true
            get_expirying().then((response) => {
                this.expirying_inventories = response.data
                this.loading = false
            })

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