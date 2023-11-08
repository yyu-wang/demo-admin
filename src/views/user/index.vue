<template>
  <div>
    <el-form :model="searchForm" label-width="100px" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="searchFun"
          >搜索</el-button
        >
        <el-button size="mini" @click="resetFun">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button size="mini" type="primary" @click="showFormFun"
        >新增</el-button
      >
    </div>
  </div>

  <Table
    ref="tableCardRef"
    :columns="columns"
    :tableData="tableData"
    @handleSelection="handleSelection"
    :operateButtons="operateButtons"
  >
  </Table>
  <!-- 表单 -->
  <el-dialog v-model="isShowForm" :title="title" width="50%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="请选择日期"
          :size="size"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="form.gender"
          placeholder="请选择"
          size="large"
          width="100%"
        >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remarks" />
      </el-form-item>
      <el-form-item>
        <el-button @click="() => (isShowForm = false)">关闭</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import Table from "../../components/table/index.vue";
import { columns } from "./config";
import { toRaw, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
// 表格数据
let tableData = ref([
  {
    id: 0,
    name: "小明",
    age: 8,
    gender: "男",
    birthday: "2015-03-23",
    phone: "17612345677",
    remarks: "测试1",
  },
  {
    id: 1,
    name: "小红",
    age: 8,
    gender: "女",
    birthday: "2015-03-23",
    phone: "17612345677",
    remarks: "测试2",
  },
  {
    id: 2,
    name: "小军",
    age: 8,
    birthday: "2015-03-23",
    gender: "男",
    phone: "17612345677",
    remarks: "测试3",
  },
]);
const isShowForm = ref(false);
const form = ref({
  name: "",
  age: "",
  birthday: "",
  gender: "",
  phone: "",
  remarks: "",
});
const searchForm = ref({
  name: "",
});

const title = ref("");

// 编辑操作
const editFn = (e) => {
  title.value = "编辑学生信息";
  isShowForm.value = true;
  form.value = { ...e };
};
// 删除操作
const deleteFn = (e) => {
  ElMessageBox.alert("确定要删除吗？", {
    confirmButtonText: "OK",
    callback: () => {
      let list = tableData.value.filter((item) => {
        return item.id !== e.id;
      });
      tableData.value = list;
    },
  });
};
// 表格处操作按钮
const operateButtons = [
  {
    name: "编辑",
    type: "edit",
    onclick: editFn,
  },
  {
    name: "删除",
    type: "delete",
    onclick: deleteFn,
  },
];
const rowList = [];
// 选中的表格数据
const handleSelection = (arr) => {
  rowList = [];
  arr.forEach((element) => {
    rowList.push(toRaw(element));
  });
};

const showFormFun = () => {
  title.value = "新增学生信息";
  isShowForm.value = true;
  for (let key in form.value) {
    form.value[key] = "";
  }
};

const onSubmit = () => {
  if (title.value === "新增学生信息") {
    let now = new Date();
    let timestamp = now.getTime();
    form.value.id = timestamp;
    tableData.value.push(form.value);
    console.log("tableData.value", form.value);
    console.log("tableData.value", tableData.value);
  } else {
    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].id === form.value.id) {
        tableData.value[i] = form.value;
      }
    }
  }

  ElMessage({
    message: "保存成功",
    type: "success",
  });
  isShowForm.value = false;
};

let dataList = [];
// 搜索表单
const searchFun = () => {
  dataList = tableData.value;

  let list = tableData.value.filter((item) => {
    return item.name === searchForm.value.name;
  });
  tableData.value = list;
};
// 重置
const resetFun = () => {
  tableData.value = dataList;
};
</script>

<style scoped>
.btn {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
