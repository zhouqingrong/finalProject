export const resideStatusMap = new Map([
  [-1, '未入寝'],
  [1, '在住'],
  [2, '已退寝'],
]);

export const studyStatusMap = new Map([
  [-1, '未报到'],
  [1, '在读'],
  [2, '毕业'],
]);

// 学院与专业
export const departmentMajorsMap = new Map([
  ['信电学院', ['软件工程', '计算机科学与技术']],
]);

export const departmentMajors = [
  {
    value: "信电学院",
    label: "信电学院",
    children: [
      {
        value: "软件工程",
        label: "软件工程",
      },
      {
        value: "计算机科学与技术",
        label: "计算机科学与技术",
      },
      {
        value: "物联网工程",
        label: "物联网工程",
      },
      {
        value: "电气工程及其自动化",
        label: "电气工程及其自动化",
      },
      {
        value: "自动化",
        label: "自动化",
      },
      {
        value: "电子信息工程",
        label: "电子信息工程",
      },
      {
        value: "通信工程",
        label: "通信工程",
      },
    ],
  },
  {
    value: "文法学院",
    label: "文法学院",
    children: [
      {
        value: "法学",
        label: "法学",
      },
      {
        value: "英语",
        label: "英语",
      },
      {
        value: "文物与博物馆学",
        label: "文物与博物馆学",
      },
    ],
  },
  {
    value: "数理学院",
    label: "数理学院",
    children: [
      {
        value: "信息与计算科学",
        label: "信息与计算科学",
      },
      {
        value: "应用物理学",
        label: "应用物理学",
      },
      {
        value: "光电信息科学与工程",
        label: "文物与博光电信息科学与工程物馆学",
      },
      {
        value: "数据科学与大数据技术",
        label: "数据科学与大数据技术",
      },
      {
        value: "应用统计学",
        label: "应用统计学",
      },
    ],
  },
]
