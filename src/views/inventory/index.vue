<template>
  <div class="app-container">

    <div class="inventory-grid">


      <el-tabs tab-position="left">

        <el-tab-pane label="Expirying" lazy>
          <div class="expirying-invetories">
            <el-card>

              <p class="card-heading">Expirying Inventories</p>
              <expirying-inventory :key="key"></expirying-inventory>
            </el-card>
          </div>

        </el-tab-pane>

        <el-tab-pane label="Frequently Used" lazy>
          <div>
            <component is="most-used"></component>
            <!--             <most-used :key="key"></most-used>
 -->
          </div>

        </el-tab-pane>

        <el-tab-pane label="Quantities Used" lazy>

          <div>
            <most-quantity-used :key="key"></most-quantity-used>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Low Stocks" lazy>
          <div>
            <low-stock-inventories :key="key"></low-stock-inventories>
          </div>

        </el-tab-pane>

      </el-tabs>








    </div>




  </div>
</template>

<script>

import InventoryList from './components/inventory-list'
import expiryingInventory from './components/expirying-inventory.vue';
import mostUsed from './components/most-used.vue';
import mostQuantityUsed from './components/most-quantity-used.vue';
import lowStockInventories from './components/low-stock-inventories.vue';
export default {
  components: { InventoryList, expiryingInventory, mostUsed, mostQuantityUsed, lowStockInventories },

  data() {
    return {
      key: 0
    }
  },

  methods: {
    reload_tab_content() {
      this.key += 1
    }
  }

}
</script>

<style lang="scss" scoped>
.inventory-grid {
  .expirying-invetories {

    width: 100%;
    /*     max-height: 600px;
 */
    overflow: hidden;
    /* padding: -20px; */

    /*     .el-card__body {
      padding: 0px !important;

    } */


  }

  .card-heading {

    font-size: 1.5em;
    color: hsla(26, 100%, 55%, 1);
    display: flex;
    justify-content: center;
  }




}
</style>
