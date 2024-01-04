<template>
  <div>

    <files

      :patient_id="this.patient_id"
      :user_id="this.user_id"
    />

  </div>
</template>

<script>

import Files from '@/views/patient-files/index.vue'

export default {

  components: {
    Files
  },
  props: ['patient_id', 'user_id', 'user_name', 'token'],

  data() {
    return {

    }
  }
}

</script>
