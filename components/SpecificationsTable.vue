<script setup lang="ts">
interface iProps {
  table: any
}
defineProps<iProps>()

// const totalPrice = computed(() => {
//   const { totalPrice } = useComputePrice(
//     props.table?.facade_area_sf[0]?.info,
//     props.table?.subtotal_price[0]?.info,
//     props.table?.tax[0]?.info
//   )
//   return totalPrice.value || '0'
// })
</script>

<template>
  <div v-editable="table" class="specifications-table-wrapper">
    <table class="specifications-table">
      <thead>
        <tr>
          <th>Dextall System</th>
          <th></th>
          <th>Performance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="table?.system[0]" v-editable="table?.system[0]">
          <td class="specifications-table__big-text">System</td>
          <td>
            {{ table?.system[0]?.manufactuer }}
          </td>
          <td
            v-if="
              table?.system[0]?.info_other || table?.system[0]?.info_dropdown
            "
          >
            {{ table.system[0]?.info_other || table.system[0].info_dropdown }}
          </td>
        </tr>
        <tr
          v-if="table?.energy_performance[0]"
          v-editable="table?.energy_performance[0]"
        >
          <td class="specifications-table__big-text">ENERGY PERFORMANCE</td>
          <td></td>
          <td v-if="table?.energy_performance[0]?.info">
            {{ table.energy_performance[0].info }}
          </td>
        </tr>
        <tr v-if="table?.windows[0]" v-editable="table?.windows[0]">
          <td class="specifications-table__big-text">
            WINDOWS (FACTORY INSTALLED)
          </td>
          <td>
            {{ table?.windows[0]?.manufactuer }}
          </td>
          <td
            v-if="
              table?.windows[0]?.info_other || table?.windows[0]?.info_dropdown
            "
            class="specifications-table--under-text"
          >
            <a
              :href="table?.windows[0]?.inline_table.filename"
              download
              target="_blank"
              rel="noreferer noopener"
            >
              {{
                table.windows[0].info_other || table.windows[0].info_dropdown
              }}
            </a>
          </td>
        </tr>
        <tr v-if="table?.cladding[0]" v-editable="table?.cladding[0]">
          <td class="specifications-table__big-text">
            CLADDING (FACTORY APPLIED)
          </td>
          <td></td>
          <td
            v-if="
              table?.cladding[0]?.info_other ||
              table?.cladding[0]?.info_dropdown
            "
          >
            {{
              table.cladding[0].info_other || table.cladding[0].info_dropdown
            }}
          </td>
        </tr>
        <tr
          v-if="table?.exterior_cladding_finish[0]"
          v-editable="table?.exterior_cladding_finish[0]"
        >
          <td class="specifications-table__big-text">
            EXTERIOR CLADDING FINISH
          </td>
          <td></td>
          <td v-if="table?.exterior_cladding_finish[0]?.info">
            {{ table.exterior_cladding_finish[0].info }}
          </td>
        </tr>
        <tr
          v-if="table?.facade_area_sf[0]"
          v-editable="table?.facade_area_sf[0]"
        >
          <td class="specifications-table__big-text">FACADE AREA (SF)</td>
          <td></td>
          <td v-if="table?.facade_area_sf[0]?.info">
            {{ table.facade_area_sf[0].info }}
          </td>
        </tr>
        <!-- <tr
          v-if="table?.subtotal_price[0]"
          v-editable="table?.subtotal_price[0]"
        >
          <td class="specifications-table__big-text">SUBTOTAL PRICE</td>
          <td></td>
          <td v-if="table?.subtotal_price[0]?.info">
            {{ table.subtotal_price[0].info }}
          </td>
        </tr>
        <tr v-if="table?.tax[0]" v-editable="table?.tax[0]">
          <td class="specifications-table__big-text">TAX</td>
          <td></td>
          <td v-if="table?.tax[0]?.info">{{ table.tax[0].info }}</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            TOTAL PRICE (MATERIAL ONLY)
          </td>
          <td></td>
          <td v-if="totalPrice">{{ totalPrice }}</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
