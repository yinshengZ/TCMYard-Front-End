<template>
    <div>
        <most-treatments class="treatments-table"></most-treatments>
    </div>

</template>


<script>
import MostTreatments from './components/most-treatments.vue'

export default {
    components: {
        MostTreatments
    },
    data() {
        return {
            stats_select: {
                most_treatments: false,
                most_spending: false,

            },

        }
    },

    methods: {

    }
}
</script>


<style scoped lang="scss">
.treatments-table {}
</style>