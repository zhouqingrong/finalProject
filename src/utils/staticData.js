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
        value: "自动化",
        label: "自动化",
      },
    ],
  },
]
