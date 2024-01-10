<template>
  <div class="app-container">

    <div class="inventory-grid">


      <div class="expirying-invetories">
        <el-card>

          <p class="card-heading">Expirying Inventories</p>
          <expirying-inventory></expirying-inventory>
        </el-card>
      </div>


    </div>




  </div>
</template>

<script>

import InventoryList from './components/inventory-list'
import expiryingInventory from './components/expirying-inventory.vue';
export default {
  components: { InventoryList, expiryingInventory }
}
</script>

<style lang="scss" scoped>
.inventory-grid {
  .expirying-invetories {

    width: 35%;
    max-height: 600px;
    overflow: hidden;
    padding: -20px;

    .el-card__body {
      padding: 0px !important;

    }


  }

  .card-heading {

    font-size: 1.5em;
    color: hsla(26, 100%, 55%, 1);
    display: flex;
    justify-content: center;
  }




}
</style>
