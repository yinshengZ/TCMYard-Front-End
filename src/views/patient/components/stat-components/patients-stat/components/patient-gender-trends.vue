<template>
    <div>
        <el-tabs>
            <el-tab-pane label="By Year">
                <patients-gender-by-year></patients-gender-by-year>
            </el-tab-pane>
            <el-tab-pane label="By Month">
                <patients-gender-by-month></patients-gender-by-month>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
import PatientsGenderByMonth from './patients-gender-by-month.vue'
import PatientsGenderByYear from './patients-gender-by-year.vue'

export default {
    components: {
        PatientsGenderByMonth,
        PatientsGenderByYear
    }
}

</script>


<style lang="scss" scoped></style>