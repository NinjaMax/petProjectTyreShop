export type CalcDelivery = {
    citySender?: string, 
    cityReceiver?: string | null,
    warehouseSender?: string | null,
    warehouseReceiver?: string | null,
    goodsCost?: string,
    goodsType?: string,
    goodsQuantity?: string,
};