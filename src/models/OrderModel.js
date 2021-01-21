
class OrderModel {
    id
    createDate
    status
    isPaid
    isShipped
    isCompleted
    status
    buyer
    shippingMethod
    totalPrice
    partialItems

    constructor (params) {
        this.id = params.order_id
        this.createDate = params.create_date
        this.isPaid = params.is_paid
        this.isShipped = params.is_shipped
        this.isCompleted = params.is_completed
        this.buyer = params.buyer
        this.shippingMethod = 'Почта России' // Just dummy. Didn't find this in API
        this.totalPrice = params.total_price
        this.partialItems = params.items
        this.status = this.getStatus()
    }

    getStatus () {
        // Just dummy with part of params.
        let status = this.isPaid ? 'Оплачен' : 'В ожидании оплаты'
        status = this.isShipped ? 'Отправлен' : status
        status = this.isCompleted ? 'Завершен' : status
        return status
    }
}

export default OrderModel
