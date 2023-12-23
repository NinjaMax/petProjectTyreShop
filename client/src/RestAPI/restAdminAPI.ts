import { $hostGet, $hostPost, $hostPostUpload } from "./index";
import { IRestAdminApi } from "./interfaces/restAdmin.interface";
import { CustomerCreate } from "./types/CreateCustomer.type";
import { SupplierCreate } from "./types/createSupplier.type";

const createGoodsToOrder = async (
    item:IRestAdminApi, id_order: number) => 
    await $hostPost.post('/orders/creategoods', {
    id: +item?.id!,
    full_name: item.full_name,
    order_index: id_order,
    storage_index: item.storage_index,
    quantity: item.quantity,
    price_wholesale: item.price_wholesale,
    price: item.price,
    total: item?.total,
    id_supplier: item.id_supplier,
    category: item.category,
    id_order: id_order,
    id_storage: item.id_storage,
    ref_diameter: item.ref_diameter,
    weight: item.weight,
    ref_weight: item.ref_weight,
    id_order_storage: item.id_order_storage ?? null,
    // delivery: 'Flintstone',
})
.catch(error => {
    console.log(error)
}); 


const createGoodsToOrderBasket = async (
    item:IRestAdminApi, id_order: number) => {
    const {data} = await $hostPost.post('/orders/creategoods', {
    id: +item?.id!,
    full_name: item.full_name,
    order_index: id_order,
    storage_index: +item.id_storage!,
    quantity: +item.quantity!,
    price_wholesale: +item?.price_wholesale!,
    price: +item.price!,
    total: item?.total,
    id_supplier: +item.id_supplier!,
    category: item.category,
    // id_order: id_order,
    // id_storage: item.id_storage,
    id_order_storage: item.id_order_storage ?? null,
    ref_diameter: item.ref_diameter,
    weight: item.weight,
    ref_weight: item.ref_weight,
    // delivery: 'Flintstone',
    })

    return data;
};

const createGoodsToOrderSup = async (
    item: IRestAdminApi, id_order_sup: number) =>
    await $hostPost.post('/ordersup/creategoods', 
    {
    id: +item?.id!,
    full_name: item.full_name,
    category: item.category,
    order_sup_index: id_order_sup,
    id_supplier: +item?.id_supplier!,
    storage_index: +item?.id_storage!,
    quantity: +item?.quantity!,
    id_order: +item.id_order,
    price: +item?.price!,
    price_wholesale: +item.price_wholesale!,
    id_order_sup_storage: +item?.id_order_sup_storage! ?? null,
    // delivery: 'Flintstone',
    }
)
.catch(error => {
        console.log(error)
}); 

const updateOrder = async (data: any, id_order: number) => 
await $hostPost.patch('/orders/update', {
    id_order: id_order,
    id_user: data.number,
    notes: data.notes,
    organisation: data.organisation,
    storage: data.storage,
    order_view: data.order_view,
    delivery: data.delivery,
    status_delivery: data.status_delivery,
    delivery_ttn: data.delivery_ttn,
    status: data.status,
    pay_view: data.pay_view,
    status_pay: data.status_pay,
    dop_garanty: +data.dop_garanty,
    delivery_cost: +data.delivery_cost,
    delivery_city: data.delivery_city,
    delivery_city_ref: data.delivery_city_ref,
    delivery_city_depart: data.delivery_city_depart,
    delivery_city_depart_ref: data.delivery_city_depart_ref,
    total_cost: data.total_cost,
    bonus_decrease: +data.bonus_decrease, 
    id_customer: data.id_customer,
    id_contract: data.id_contract,
}).catch(error => {
    console.log(error);
});

const updateOrderSup = async (data: any, id_order_sup: number) => 
await $hostPost.patch('/ordersup/update', {
    id_order: data.id_order,
    id_order_sup: id_order_sup,
    id_user: data.number,
    notes: data.notes,
    organisation: data.organisation,
    total_cost: data.total_cost,
    total_purchase_cost: data.total_purchase_cost,
    delivery_cost: data.delivery_cost,
    commission_cost: data.commission_cost,
    storage: data.storage,
    order_view: data.order_view,
    delivery: data.delivery,
    status_delivery: data.status_delivery,
    delivery_ttn: data.delivery_ttn,
    status: data.status,
    pay_view: data.pay_view,
    status_pay: data.status_pay,
    dop_garanty: data.dop_garanty,
    id_supplier: data.id_customer,
    id_contract: data.id_contract,
}).catch(error => {
    console.log(error);
});

const updateOrderStorage = async (data: any) => 
await $hostPost.post('/orders/update/orderstorage', data)
.catch(error => {
    console.log(error);
});
      
const responseForm = async (data: any) => 
await $hostPost.post('/orders', data)
.catch(error => {
    console.log(error);
});

const createToSaleOrder = async (data: any) => 
await $hostPost.post('/sales', data)
.catch(error => {
    console.log(error);
});

const createSupplier = async (data: SupplierCreate) => 
await $hostPost.post('/suppliers', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const createCustomer = async (data: CustomerCreate) => 
await $hostPost.post('/customers/form', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const updateCustomer = async (data: CustomerCreate) => 
await $hostPost.patch(`/customers/${data.id_customer}`, data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const updateSupplier = async (data: SupplierCreate) => 
await $hostPost.patch('/suppliers/update', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const createContract = async (data: any) => 
await $hostPost.post('/contract/new', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const createCashbox = async (data: {
    cashbox: string;
    organisation: string;
    cashboxType: string;
}) => 
await $hostPost.post('/cashbox', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const updateCashbox = async (data: {
    id_cashbox: number;
    cashbox: string;
    organisation: string;
    cashboxType: string;
    funds: string;
}) => 
await $hostPost.patch('/cashbox/update', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const getCashboxAll = async () => 
await $hostGet.get('/cashbox/all')
.catch(error => {
    console.log(error)
});

const createPayment = async (data: any) => 
await $hostPost.post('/paynment', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const updatePayment = async (data: any) => 
await $hostPost.patch('/paynment/update', data)
.catch((error: any) => {
    console.log('Помилка не вірно вказанні данні або інша помилка',error);
});

const getAllIncomesPay = async () => 
await $hostGet.get('/paynment/all-incomes')
.catch(error => {
    console.log(error)
});

const getAllExpensesPay = async () => 
await $hostGet.get('/paynment/all-expenses')
.catch(error => {
    console.log(error)
});

const getAllPayTypes = async () => 
await $hostGet.get('/paytypes/all')
.catch(error => {
    console.log(error)
});

const getAllPayViews = async () => 
await $hostGet.get('/payviews/all')
.catch(error => {
    console.log(error)
});

const addGoodsToSaleOrder = async (data: any) => 
await $hostPost.post('/sales/add', data)
.catch(error => {
    console.log(error);
});

const createOrderSupForm = async (data: any) => 
await $hostPost.post('/ordersup', data)
.catch(error => {
    console.log(error);
});
   
const addGoodsToOrder = async (value: IRestAdminApi) => 
await $hostPost.post('/orders/add', {
    id_order_storage: value?.id_order_storage,
    id: value.id,
    full_name:value?.full_name,
    category: value?.category,
    price_wholesale: value?.price_wholesale,
    id_supplier: value.id_supplier,
    id_order: value?.order_index,
    id_storage: value.storage_index,
    quantity: value.quantity,
    price: value.price,
    ref_diameter: value?.ref_diameter,
    ref_weight: value?.ref_weight,
})
.catch(error => {
    console.log(
    'Не вистачає залишків, або не вірно вказані дані',
    error)
});

const requestToSupplier = async (item: { textMesssage: string,
    userReceiver: string}) => 
await $hostPost.post('/telegram-api/send-message', 
{
    textMesssage: item?.textMesssage,
    userReceiver: item.userReceiver,
}
)
.catch(error => {
    console.log(error)
});

const addGoodsToOrderSup = async (value: IRestAdminApi) => 
await $hostPost.post('/ordersup/add', value
// {
//     id_order_sup_storage: value?.id_order_sup_storage,
//     id: value.id,
//     id_supplier: value.id_supplier,
//     id_order: value.order_sup_index,
//     id_storage: value.storage_index,
//     quantity: value.quantity,
//     price: value.price,
//     price_wholesale: value.price_wholesale,
// }
)
.catch(error => {
    console.log(
    'Не вистачає залишків, або не вірно вказані дані',
    error)
});

const addGoodsOrderSupToStock = async (value: IRestAdminApi) => 
await $hostPost.post('/ordersup/add/stock', value
// {
//     id_order_storage: value?.id_order_storage,
//     id: value.id,
//     id_supplier: value.id_supplier,
//     id_order: value.order_index,
//     id_storage: value.storage_index,
//     quantity: value.quantity,
//     price: value.price
// }
)
.catch(error => {
    console.log(
    'Не виконано, не вірно вказані дані або інша помилка.',
    error)
});

const deleteGoodsFromOrderSup = async (value: any) => 
await $hostPost.delete('/ordersup/remove/ordersupstorage', value
)
.catch(error => {
    console.log(
    'Не вистачає залишків, або не вірно вказані дані',
    error)
});

const getTyresAdmin = async () => 
await $hostGet.get('/tyres/all-admin')
.catch(error => {
    console.log(error)
});

const getAdminStockTyresByIdtyre = async (id: string) => {
    const {data}: any = await $hostGet.get('/stock/tyres/idtyre', { 
        params: { id_tyre: id}
    })
    .catch(error => {
        console.log(error)
    });
    return data;
};

const getAdminPriceTyresById = async (id: string) => {
    const {data}: any = await $hostGet.get('/price/tyres/idtyre', { 
        params: { id_tyre: id}
    })
    .catch(error => {
        console.log(error)
    });
    return data
};

const getWheelsAdmin = async () =>
await $hostGet.get('/wheels/all-admin')
.catch((error) => {
    console.log(error)
});

const getAdminStockWheelByIdWheel = async (id: string) => {
    const {data}: any = await $hostGet.get('/stock/wheels/idwheel', 
    {params: {id_wheel: id}})
    .catch(error => {
        console.log(error)
    });
    return data;
};

const getAdminPriceWheelsById = async (id: string) => {
    const {data}: any = await $hostGet.get('/price/wheels/idwheel', {params: {id_wheel: id}})
    .catch(error => {
        console.log(error)
    });
    return data;
};

const getStorageAll = async () => 
await $hostGet.get('/storage/all')
.catch(error => {
    console.log(error)
});

const getCommentOrderData = async (orderId: number) =>
await $hostGet.get('/comments/byorderid', {params: {id_order: orderId ?? 0}})
.catch(error => {
    //console.log('ORDERID: ', orderId)
    console.log(error)
});

const getCommentOrderSupData = async (orderSupId: number) =>
await $hostGet.get('/comments/byordersupid', {params: {id_order_sup: orderSupId ?? 0}})
.catch(error => {
    console.log('ORDER_SUP_ID: ', orderSupId);
    console.log(error);
});

const getOrderData = async () => 
await $hostGet.get('/orders/all')
.catch(error => {
    console.log(error)
});

const getOrderSupData = async () => 
await $hostGet.get('/ordersup/all')
.catch(error => {
    console.log(error)
});

const getUsers = async () => 
await $hostGet.get('/users/all')
.catch(error => {
    console.log(error)
});

const getCustomers = async () => 
await $hostGet.get('/customers/all')
.catch(error => {
    console.log(error)
});

const getCustomersById = async (id: string) => {
const {data}: any = await $hostGet.get(`/customers/by-id/${id}`)
    .catch(error => {
        console.log(error)
    });
    return data;
};

const getSuppliers = async () => 
await $hostGet.get('/suppliers/all')
.catch(error => {
    console.log(error)
});

const addCommentsToOrder = async (
    item : {
        id_user: number,
        comments: string | undefined,
        id_order?: number | null,
        id_order_sup?: number | null, 
    }
    ) => 
await $hostPost.post('/comments', {
    id_user: item.id_user,
    comments: item.comments,
    id_order: item.id_order,
    id_order_sup: item.id_order_sup,
})
.catch(error => {
    console.log(
    'Коментар не створено, помилка або не вірно вказані дані',
    error)
});

const uploadPriceTyreForm = async (file: any, onUploadProgress: any) => {
    let formData = new FormData();
  
    formData.append("file", file);

    return await $hostPostUpload.post('/uploader/tyres', formData,{
        headers: {
            "Content-Type": "multipart/form-data; charset=utf-8",
        },
        onUploadProgress,
    })
    .catch(error => {
    console.log(error);
    });
};

const uploadPriceWheelForm = async (file: any, onUploadProgress: any) => {
    let formData = new FormData();
  
    formData.append("file", file);

    return await $hostPostUpload.post('/uploader/wheels', formData,{
        headers: {
            "Content-Type": "multipart/form-data; charset=utf-8",
        },
        onUploadProgress,
    })
    .catch(error => {
    console.log(error);
    });
}

const getFiles = async () => 
await $hostGet.get('/files')
.catch(error => {
    console.log(error)
});
    
export {
    addGoodsToOrder,
    addGoodsToOrderSup,
    createGoodsToOrder,
    createOrderSupForm,
    uploadPriceTyreForm,
    uploadPriceWheelForm,
    deleteGoodsFromOrderSup,
    addGoodsOrderSupToStock,
    createGoodsToOrderSup,
    getFiles,
    responseForm,
    updateOrder,
    updateOrderSup,
    updateOrderStorage,
    getCommentOrderSupData,
    getTyresAdmin, 
    getAdminStockTyresByIdtyre,
    getAdminPriceTyresById,
    getWheelsAdmin,
    getAdminStockWheelByIdWheel,
    getAdminPriceWheelsById,
    getCommentOrderData,
    getOrderData,
    getOrderSupData,
    getCustomers,
    getSuppliers,
    getUsers,
    addCommentsToOrder,
    createGoodsToOrderBasket,
    getCustomersById,
    getStorageAll,
    requestToSupplier,
    createToSaleOrder,
    addGoodsToSaleOrder,
    createSupplier,
    createContract,
    updateSupplier,
    createCustomer,
    updateCustomer,
    createCashbox,
    updateCashbox,
    getCashboxAll,
    createPayment,
    updatePayment,
    getAllIncomesPay,
    getAllExpensesPay,
    getAllPayTypes,
    getAllPayViews
};
