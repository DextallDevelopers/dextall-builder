<script setup lang="ts">
interface iProps {
  table: any
}
const props = defineProps<iProps>()
const { totalPrice } = useComputePrice(
  props.table.facade_area_sf[0].info,
  props.table.subtotal_price[0].info,
  props.table.tax[0].info
)
console.log(props.table)
</script>

<template>
  <div class="specifications-table-wrapper">
    <table class="specifications-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Manufacturer</th>
          <th>Technical details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="specifications-table__big-text">System</td>
          <td>{{ table.system[0].manufactuer }}</td>
          <td>
            {{ table.system[0].info_other || table.system[0].info_dropdown }}
          </td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">ENERGY PERFORMANCE</td>
          <td></td>
          <td>{{ table.energy_performance[0].info }}</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            WINDOWS (FACTORY INSTALLED)
          </td>
          <td>{{ table.windows[0].manufactuer }}</td>
          <td class="specifications-table--under-text">
            {{ table.windows[0].info_other || table.windows[0].info_dropdown }}
          </td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            CLADDING (FACTORY APPLIED)
          </td>
          <td></td>
          <td>
            {{
              table.cladding[0].info_other || table.cladding[0].info_dropdown
            }}
          </td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            EXTERIOR CLADDING FINISH
          </td>
          <td></td>
          <td>{{ table.exterior_cladding_finish[0].info }}</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">FACADE AREA (SF)</td>
          <td></td>
          <td>{{ table.facade_area_sf[0].info }}</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">SUBTOTAL PRICE</td>
          <td></td>
          <td>{{ table.subtotal_price[0].info }}</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">TAX</td>
          <td></td>
          <td>{{ table.tax[0].info }}</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            TOTAL PRICE (MATERIAL ONLY)
          </td>
          <td>BRONX</td>
          <td>${{ totalPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
