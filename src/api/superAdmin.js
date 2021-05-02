/**
 * 登录注册相关请求模块
 */
import request from '@/utils/request'
import url from 'postcss-url'
//用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/web/login',
    //data 用来设置POST请求头
    data,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': "application/json;charset=utf-8",
    //   //属性名和值都得看接口
    //   //属性名：Authorization，接口要求
    //   //属性值：Bearer空格token数据
    //   //以下字符拼接还可以时`Bearer ${user.token}`
    //   "Authorization": '111'
    // }
  })
}

//用户注册
// export const register = data => {
//   return request({
//     method: 'POST',
//     url: '/user/register',
//     //data 用来设置POST请求头
//     data,
//     headers: {
//       'Content-Type': "application/json;charset=utf-8",
//       //属性名和值都得看接口
//       //属性名：Authorization，接口要求
//       //属性值：Bearer空格token数据
//       //以下字符拼接还可以时`Bearer ${user.token}`
//       "Authorization": '111'
//     }
//   })
// }

//学校信息处理
//获取学院
export const getDepartments = data => {
  return request({
    method: 'POST',
    url: '/web/school/departments',
    data
  })
}
//获取宿舍信息  按宿舍名称查询校验
export const getDormitories = data => {
  return request({
    method: 'POST',
    url: '/web/dormitories',
    data
  })
}
//添加班级
export const addClass = data => {
  return request({
    method: 'POST',
    url: '/web/school/classes',
    data
  })
}
//获取班级 搜索也用这个接口
export const getClasses = data => {
  return request({
    method: 'POST',
    url: '/web/school/classes/list',
    data
  })
}
//修改班级
export const updateClass = data => {
  return request({
    method: 'PUT',
    url: '/web/school/class/' + data.id,
    data
  })
}
// 删除班级
export const deleteClass = data => {
  return request({
    method: 'DELETE',
    url: '/web/school/class/' + data,
    data
  })
}
//获取级联班级（学生管理搜索）
export const schoolAll = () => {
  return request({
    method: 'GET',
    url: '/web/school/all'
  })
}

//学生管理
//批量增加学生
export const addStudents = data => {
  return request({
    method: 'POST',
    url: '/web/students',
    data
  })
}
// /web/students/list 获取学生列表  搜索条件为空时
export const getStudents = data => {
  return request({
    method: 'POST',
    url: '/web/students/list',
    data
  })
}
//修改学生信息
export const updateStudent = data => {
  return request({
    method: 'PUT',
    url: '/web/student/' + data.id,
    data
  })
}
//删除学生信息
export const deleteStudent = data => {
  return request({
    method: 'DELETE',
    url: '/web/students',
    data
  })
}
