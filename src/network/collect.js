import {request} from "./request";
//收藏和取消
export function collect(goods) {
   return request({
       url: `/api/collects/goods/${goods}`,
       method: 'post'
   })
}
// https://api.shop.eduwork.cn/api/index?sales=1&page=1
// https://api.shop.eduwork.cn/api/collects?page=1
// https://api.shop.eduwork.cn/api/collects/goods/16
export function mycollect(page) {
    return request({
        url: '/api/collects?page='+page
    })
}