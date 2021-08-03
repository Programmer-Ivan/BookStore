import {request} from './request';

export function getDetail(id) {
    return request({
        url:'/api/goods/'+id,
    })
}

export class detailBanner{
    constructor(goods) {
        this.cover_url = goods.cover_url
        this.stock = goods.stock
        this.price = goods.price
        this.description = goods.description
        this.title = goods.title
        this.details = goods.details
    }
}