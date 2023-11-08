<template>
  <el-table
    ref="tableRef"
    :data="tableData"
    @selection-change="handleSelectionChange"
  >
    <template v-for="column in columns" :key="column.prop">
      <el-table-column
        v-if="column.tableSelection"
        type="selection"
        :align="column.align"
        :width="column.tableWidth"
      />
      <el-table-column
        v-else-if="column.tableIndex"
        type="index"
        :index="indexMethod"
        :align="column.align"
        :width="column.tableWidth"
      />
      <!-- 操作栏 -->
      <el-table-column
        v-else-if="column.showOperate"
        :align="column.align"
        :width="column.tableWidth"
        :label="column.label"
      >
        <template v-slot="scope">
          <template
            v-for="operateItem in operateButtons"
            :key="operateItem.type"
          >
            <el-button
              size="mini"
              @click="handleEdit(operateItem, scope.row)"
              >{{ operateItem.name }}</el-button
            >
          </template>
        </template></el-table-column
      >
      <el-table-column
        v-else
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :width="column.tableWidth"
      />
    </template>
  </el-table>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  tableData: {
    type: Array,
    value: [],
  },
  columns: {
    type: Array,
    value: [],
  },
  operateButtons: {
    type: Array,
    value: [],
  },
});
const emit = defineEmits(["handleSelection"]); //声明 emits
// 多选框选中操作
const handleSelectionChange = (val) => {
  emit("handleSelection", val);
};
const handleEdit = (obj, row) => {
  obj.onclick(row);
};
</script>

<style scoped></style>
