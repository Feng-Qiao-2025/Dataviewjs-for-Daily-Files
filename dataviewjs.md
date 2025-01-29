```dataviewjs
const targetDate = "2025-01-18"; // 指定日期
const isCreate = true; // 判断条件开关，true表示筛选创建日期，false表示筛选修改日期
const undefinedPropertiesFiles = []; // 用于记录出现错误的文件名称
const currentFileFilter = true; // 当前文件筛选开关，true时不显示不缺少信息的当前文件，false时显示当前文件
let currentFilePath = ''; // 初始化当前文件路径变量

// 尝试获取当前文件路径，如果失败则设置为空字符串
try {
    currentFilePath = dv.current().file.path; // 获取当前文件路径
} catch (error) {
    console.error("无法获取当前文件路径:", error);
    currentFilePath = ''; // 设置默认值
}

const contentDisplaySwitch = true; // 内容显示开关，true显示创建时间信息，false显示修改时间信息
const conciseDisplaySwitch = true; // 简洁显示开关，true为简洁模式
const timeInfoSimplifySwitch = false; // 时间信息简化开关，true时只显示日期，false时只显示时间
const sortSwitch = true; // 排序开关，true为顺序排序，false为逆序排序
const timeSystemSwitch = false; // 时间制度开关，true为24小时制，false为12小时制
const languageSwitch = true; // 语言开关，true为中文时间描述，false为原状
const excludeTargetDateSwitch = false; // 新增开关，用于在timeInfoSimplifySwitch为true时排除targetDate这一天的文件

const tableData = []; // 用于存储表格数据
let isFound = false; // 用于记录是否找到匹配的文件

// 不检索的文件夹名称数组
const excludedFolders = ["不检索的文件夹1", "不检索的文件夹2"]; // 不检索的文件夹名称数组

// 根据开关值动态生成题目内容
const title = `**依据${isCreate ? "创建" : "修改"}日期筛选 - 显示${contentDisplaySwitch ? "创建" : "修改"}时间信息 - ${targetDate}**`;

dv.paragraph(title); // 输出题目

dv.view("DJdayfiles-1.0.0",{
    targetDate : targetDate,
    isCreate : isCreate,
    undefinedPropertiesFiles : undefinedPropertiesFiles,
    currentFileFilter : currentFileFilter,
    currentFilePath : currentFilePath,
    contentDisplaySwitch : contentDisplaySwitch,
    conciseDisplaySwitch : conciseDisplaySwitch,
    timeInfoSimplifySwitch : timeInfoSimplifySwitch,
    sortSwitch : sortSwitch,
    timeSystemSwitch : timeSystemSwitch,
    languageSwitch : languageSwitch,
    excludeTargetDateSwitch: excludeTargetDateSwitch, // 新增开关传递
    tableData : tableData,
    isFound : isFound,
    excludedFolders: excludedFolders
})
```