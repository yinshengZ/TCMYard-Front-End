<template>
    <div>
        <p>
            {{ this.inventory_usage_units }}

            id: {{ inventory_id }}
        </p>
    </div>
</template>


<script>

import { get_inventoy_usage_units } from '@/api/inventory';
import echart from 'echarts';
require('echarts/theme/macarons')

export default {
    props: ['id'],
    data() {
        return {
            inventory_usage_units: [],
            inventory_id: this.id,
            year: 2023,
            data_xAxis: [],
            data_yAxis: [],
            loading: true,
        }
    },

    mounted() {
        this.get_inventory_usage_units_history()
    },
    methods: {
        get_inventory_usage_units_history() {
            get_inventoy_usage_units(this.id, this.year)
                .then((response) => {
                    this.inventory_usage_units = response.data
                    console.log(this.inventory_usage_units)
                })
        }
    }
}

</script>



<style scoped></style>