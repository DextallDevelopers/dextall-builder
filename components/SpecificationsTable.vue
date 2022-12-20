<script setup lang="ts">
const { facadeArea, subtotalPrice, tax, totalPrice } = useComputePrice()
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
          <td>DEXTALL</td>
          <td>D WALL 1500 (PREFAB PANELS WITH 6” MINERAL WOOL INSULATION)</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">ENERGY PERFORMANCE</td>
          <td></td>
          <td>CODE COMPLIANT FOR CLIMATE ZONE 4</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            WINDOWS (FACTORY INSTALLED)
          </td>
          <td>INTUS</td>
          <td class="specifications-table--under-text">SUPERA AW SYSTEM</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            CLADDING (FACTORY APPLIED)
          </td>
          <td></td>
          <td>ALUMINUM & THIN BRICK CLADDING</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">
            EXTERIOR CLADDING FINISH
          </td>
          <td></td>
          <td>AAMA 2605 (KYNAR)</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">FACADE AREA (SF)</td>
          <td></td>
          <td>{{ facadeArea }} SF</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">SUBTOTAL PRICE</td>
          <td></td>
          <td>${{ subtotalPrice }}/SF</td>
        </tr>
        <tr>
          <td class="specifications-table__big-text">TAX</td>
          <td></td>
          <td>{{ tax }}%</td>
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
