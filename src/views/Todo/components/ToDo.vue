<template>
  <div>
    <div class="to-do-list">
      <el-card>
        <div slot="header" class="clearfix card-header">
          <span>To Do List</span>
          <div class="new-task-button">
            <el-tooltip effect="dark" content="Add New Task" placement="top">
              <el-button mini type="primary" class="new-todo-button" @click="add_todo_form"><svg-icon class="icon"
                  icon-class="create" /></el-button>
            </el-tooltip>

          </div>
        </div>

        <el-table :data="todo_list.data" style="width: 100%">
          <el-table-column prop="finish_date" label="Deadline" width="100" class="table-column">
            <template slot-scope="data">
              <span>{{ date_converter(data.row.finish_date) }}</span>

            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="100">
            <template slot-scope="data">
              <div>
                <span v-if="data.row.status == 1">Finished</span>
                <span v-else-if="data.row.status == 2">Suspended</span>
                <span v-else>Unfinished</span>

              </div>
            </template>

          </el-table-column>
          <el-table-column prop="content" label="Task" width="180" />

          <el-table-column label="Operations" width="180" prop="id">
            <template slot-scope="data">
              <div class="operation-buttons">
                <el-button type="success" icon="icon-size el-icon-check" circle @click="update_todo(1, data.row.id)" />
                <el-button type="warning" circle @click="update_todo(2, data.row.id)"><svg-icon icon-class="pause"
                    class="icon-size" /></el-button>

                <el-popconfirm title="Are you sure you want to delete this? " @onConfirm="delete_todo(data.row.id)"
                  @onCancel="get_all_todo">
                  <el-button slot="reference" type="danger" icon="el-icon-close" class="icon-size" circle />
                </el-popconfirm>

              </div>
            </template>

          </el-table-column>
        </el-table>

      </el-card>

      <el-dialog title="New Task" :visible.sync="todo_form_visibility" width="50%" :before-close="get_all_todo">

        <el-form :model="todo" label-position="left" label-width="100px">
          <el-form-item label="Task">
            <el-input v-model="todo.task" />
          </el-form-item>
          <el-form-item label="Deadline">
            <el-date-picker v-model="todo.deadline" type="date" placeholder="Pick the deadline..." />
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="add_new_todo">Add</el-button>
          <el-button type="info" @click="get_all_todo">Cancel</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { add_todo, get_todo, update_todo_list, delete_todo_list } from '@/api/todo'
import { date_converter } from '@/utils/converters'

export default {
  data() {
    return {
      todo_list: [

      ],
      todo: {},
      todo_form_visibility: false
    }
  },
  computed: {
    ...mapGetters(['id', 'name'])
  },
  created() {
    this.get_user()
    this.get_all_todo()
  },
  methods: {
    date_converter,
    get_user() {
      this.todo.user_id = this.id
    },
    add_todo_form() {
      this.todo_form_visibility = true
    },
    add_new_todo() {
      add_todo(this.todo).then(response => {
        this.$notify({
          title: 'Notification',
          message: response.data,
          type: 'success'
        })
      }).catch(error => {
        this.$notify.error({
          title: 'Error',
          message: error.response.data
        })
      })
    },
    update_todo(status, id) {
      this.data = {
        todo_status: status
      }
      update_todo_list(this.data, id).then((response) => {
        this.get_all_todo()
      })
    },
    delete_todo(todo_id) {
      delete_todo_list(todo_id).then((response) => {
        this.get_all_todo()
      })
    },

    get_all_todo() {
      get_todo(this.todo.user_id).then(response => {
        this.todo_list = response.data
        console.log(this.todo_list)
      })
      this.todo_form_visibility = false
    }
  }
}
</script>

<style scoped>
.to-do-list {
  width: 100%;
  height: 150px;
  overflow-y: scroll;
  overflow-x: hidden;

  /* margin-top: 1%; */
}

.card-header {
  position: sticky;
  left: 0%;
  top: 0%;
}

.to-do-list ul {
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
}

.to-do-list ul li {
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
}

.to-do-list ul li:hover {
  background-color: #f2f2f2;
}

.to-do-list ul li:last-child {
  border-bottom: none;
}

.new-task-button {
  float: right;
}

.new-todo-button {
  padding: 10px 20px;
  border-radius: 5px;
}

.operation-buttons {
  display: inline;
}

.el-table el-table-column {
  width: 5%;
}

.icon-size {
  font-size: 1rem;
}

.table-column {
  width: 80%;
}

.icon {
  fill: rgb(255, 255, 255);
  font-size: 1.2em;
}

.clearfix {
  margin: auto auto;
}
</style>
