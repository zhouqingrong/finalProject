/**
 * 登录注册相关请求模块
 */
import request from '@/utils/request'
//用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/web/login',
    //data 用来设置POST请求头
    data,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': "application/json;charset=utf-8",
      //属性名和值都得看接口
      //属性名：Authorization，接口要求
      //属性值：Bearer空格token数据
      //以下字符拼接还可以时`Bearer ${user.token}`
      "Authorization": '111'
    }
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
//获取班级信息  按班级名称查询校验
export const getClasses = data => {
  return request({
    method: 'POST',
    url: '/web/school/classes',
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

