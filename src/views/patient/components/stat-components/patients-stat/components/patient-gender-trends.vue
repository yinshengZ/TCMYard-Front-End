<template>
    <div>
        <el-tabs>
            <el-tab-pane label="By Year" lazy>
                <patients-gender-by-year></patients-gender-by-year>
            </el-tab-pane>
            <el-tab-pane label="By Month" lazy>
                <patients-gender-by-month :patient_years="patient_years"></patients-gender-by-month>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
import PatientsGenderByMonth from './patients-gender-by-month.vue'
import PatientsGenderByYear from './patients-gender-by-year.vue'

export default {
    props: ['patient_years'],
    components: {
        PatientsGenderByMonth,
        PatientsGenderByYear
    }
}

</script>


<style lang="scss" scoped></style>