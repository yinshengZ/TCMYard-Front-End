<template>
  <div>
    <treatments :patient_id="patient_id" :user_id="user_id" />
  </div>
</template>

<script>
import Treatments from '@/views/treatments/index.vue'

export default {
  components: { Treatments },
  props: ['patient_id', 'user_id', 'user_name'],
  data() {
    return {

    }
  }

}
</script>

<style scoped></style>
