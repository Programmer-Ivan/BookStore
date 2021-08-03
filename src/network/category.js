import {request} from './request';

export function getCategory() {
    return request({
        url:'/api/goods',
    })
}

export function getCategoryGoods(order, cid, page) {
    return request({
        url:'/api/goods?category_id='+cid+'&page='+page+'&'+order+'=1',
    })
}