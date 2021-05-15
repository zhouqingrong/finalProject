import request from '@/utils/request'

// 获取打卡记录
export const getRecords = data => {
  return request({
    method: 'POST',
    url: '/web/record/list',
    data
  })
}
