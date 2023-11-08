let config = [{
    label: "",
    prop: "",
    showTable: true,
    tableWidth: 55,
    align: 'center',
    tableSelection: true,//设置就会显示多选操作
}, {
    label: "",
    prop: "",
    showTable: true,
    tableWidth: 55,
    align: 'center',
    tableIndex: true //设置就会显示表格的排序
},
{
    label: "姓名",
    prop: 'name',
    align: 'center',
    showTable: true
}, {
    label: "年龄",
    prop: 'age',
    align: 'center',
    showTable: true
} ,{
    label: "出生日期",
    prop: 'birthday',
    align: 'center',
    showTable: true
},{
    label: "性别",
    prop: 'gender',
    align: 'center',
    showTable: true
}, {
    label: "联系电话",
    prop: 'phone',
    align: 'center',
    showTable: true
}, {
    label: "备注",
    prop: 'remarks',
    align: 'center',
    showTable: true
}, {
    label: "操作",
    prop: '',
    align: 'center',
    showTable: true,
    tableWidth: 200,
    fixed: true,
    showOperate:true //是否显示操作行
}
]
export const columns = config.filter(item => item.showTable)