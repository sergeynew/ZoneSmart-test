
class OrderModel {
    id
    create_date
    status
    is_paid
    is_shipped
    is_completed
    status
    buyer
    shipping_method
    total_price
    items

    constructor (params) {
        this.id = params.order_id
        this.create_date = params.create_date
        this.is_paid = params.is_paid
        this.is_shipped = params.is_shipped
        this.is_completed = params.is_completed
        this.buyer = params.buyer
        this.shipping_method = 'Почта России' // Just dummy. Didn't find this in API
        this.total_price = params.total_price
        this.items = params.items
        this.status = this.getStatus()
    }

    getStatus () {
        // Just dummy with part of params.
        // In orders request we have more statuses.
        let status = this.is_paid ? 'Оплачен' : 'В ожидании оплаты'
        status = this.is_shipped ? 'Отправлен' : status
        status = this.is_completed ? 'Завершен' : status
        return status
    }
}

export default OrderModel
