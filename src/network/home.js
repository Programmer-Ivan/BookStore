import {request} from './request';

export function getHomeAllData() {
    return request({
        url:'/api/index',
    })
}

export function getHomeGoods(type, page) {
    return request({
        url:'/api/index?'+type+'=1&page='+page,
    })
}










//
// export function getHomeGoods(type,page){
//     return request({
//         url:'/home/data',
//         params: {
//             type,
//             page
//         }
//     })
// }
