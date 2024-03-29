<template>
  <div>
    <el-card>
      <el-table
        :data="table_data"

        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          label="ID"
          prop="id"
          sortable
          align="center"
          width="50"
        >
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="First Name" width="120px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.first_name | capitalize }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Last Name" min-width="120px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.last_name | capitalize }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Email" min-width="150px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Gender" min-width="80px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.gender.gender | capitalize }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Date of Birth" min-width="120" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.date_of_birth }}</span>
          </template>
        </el-table-column>

        <el-table-column label="First Visit" min-width="120" align="center">
          <template slot-scope="{ row }">
            <span>{{ convert_date(row.created_at) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Operations" min-width="200" align="center">
          <template slot-scope="{ row }">
            <div class="buttons">
              <el-button
                type="success"
                @click="patient_details(row.id)"
              >
                Details
              </el-button>
            </div>

            <div class="buttons">
              <el-popconfirm
                title="Are you sure to delete this patient?"
                confirm-button-text="Yes"
                cancel-button-text="Cancel"
                icon="el-icon-info"
                icon-color="red"
                @onConfirm="delete_patient(row.id)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                >
                  Delete
                </el-button>
              </el-popconfirm>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { searchPatient, deletePatient } from '@/api/patient'

export default {
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  props: ['form_data'],
  data() {
    return {
      table_data: [],
      search_query: {
        input: '',
        option: ''
      }
    }
  },
  mounted() {
    this.search_patient()
  },
  methods: {
    search_patient() {
      this.search_query.input = this.form_data.input
      this.search_query.option = this.form_data.option
      searchPatient(this.search_query).then(
        (response) => {
          this.table_data = response.data
        }
      )
    },
    patient_details(id) {
      this.$router.push({ path: '/patient/details/' + id })
    },

    delete_patient(id) {
      deletePatient(id).then((response) => {
        this.$notify({
          title: 'Notification',
          type: 'success',
          message: response.data
        })
      })
    },

    convert_date(value) {
      var date = new Date(value).toLocaleDateString('en-gb')
      return date
    }
  }
}
</script>

<style scoped>
.operation-buttons{
  /* display: grid;
  grid-template-columns: 1fr 1fr; */

}
.buttons{
  display:inline;
  margin-left: 1em;
}
</style>
