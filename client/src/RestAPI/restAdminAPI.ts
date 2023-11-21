// //React Axios Post Request:
//import axios from "axios";
import { $hostGet, $hostPost, $hostPostUpload } from "./index";
import { IRestAdminApi } from "./interfaces/restAdmin.interface";

const createGoodsToOrder = async (
    item:IRestAdminApi, id_order: number) =>
    await $hostPost.post('/orders/creategoods', {
    id: +item?.id!,
    full_name: item.full_name,
    category: item.category?.category,
    order_index: id_order,
    id_supplier: +item.price?.id_supplier!,
    storage_index: +item.price?.id_storage!,
    quantity: +item.price?.quantity!,
    price: +item.price?.price!,
    id_order_storage: item.id_order_storage ?? null,
    // delivery: 'Flintstone',
})
.catch(error => {
        console.log(error)
}); 

const createGoodsToOrderBasket = async (
    item:IRestAdminApi, id_order: number) =>
    await $hostPost.post('/orders/creategoods', {
    id: +item?.id!,
    full_name: item.full_name,
    category: item.category,
    order_index: id_order,
    id_supplier: +item.id_supplier!,
    storage_index: +item.id_storage!,
    quantity: +item.quantity!,
    price: +item.price!,
    id_order_storage: item.id_order_storage ?? null,
    ref_diameter: item.ref_diameter,
    weight: item.weight,
    ref_weight: item.ref_weight,
    // delivery: 'Flintstone',
})
.catch(error => {
        console.log(error)
});  

const createGoodsToOrderSup = async (
    item: IRestAdminApi, id_order_sup: number) =>
    await $hostPost.post('/ordersup/creategoods', 
    {
    id: +item?.id!,
    full_name: item.full_name,
    category: item.category?.category,
    order_sup_index: id_order_sup,
    id_supplier: +item.price?.id_supplier!,
    storage_index: +item.price?.id_storage!,
    quantity: +item.price?.quantity!,
    price: +item.price?.price!,
    price_wholesale: +item.price_wholesale?.price_wholesale!,
    id_order_storage_sup: item.id_order_storage ?? null,
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
    dop_garanty: data.dop_garanty,
    id_customer: data.id_customer,
    id_contract: data.id_contract,
}).catch(error => {
    console.log(error);
});

const updateOrderSup = async (data: any, id_order_sup: number) => 
await $hostPost.patch('/ordersup/update', {
    id_order: id_order_sup,
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

const createOrderSupForm = async (data: any) => 
await $hostPost.post('/ordersup', data)
.catch(error => {
    console.log(error);
});
   
const addGoodsToOrder = async (value: IRestAdminApi) => 
await $hostPost.post('/orders/add', {
    id_order_storage: value?.id_order_storage,
    id: value.id,
    id_supplier: value.id_supplier,
    id_order: value.order_index,
    id_storage: value.storage_index,
    quantity: value.quantity,
    price: value.price
})
.catch(error => {
    console.log(
    'Не вистачає залишків, або не вірно вказані дані',
    error)
});

const addGoodsToOrderSup = async (value: IRestAdminApi) => 
await $hostPost.post('/ordersup/add', 
{
    id_order_sup_storage: value?.id_order_sup_storage,
    id: value.id,
    id_supplier: value.id_supplier,
    id_order: value.order_sup_index,
    id_storage: value.storage_index,
    quantity: value.quantity,
    price: value.price,
    price_wholesale: value.price_wholesale
}
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
    'Не вистачає залишків, або не вірно вказані дані',
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

// const getTyresById = async (id:string) => 
// await $hostGet.get('/tyres/id', {
//     params: {
//         id: id
//     }
// })
// .catch(error => {
//     console.log(error)
// });

// const getStockTyres = async () => 
// await $hostGet.get('/stock/tyres/all')
// .catch(error => {
//     console.log(error)
// });

const getAdminStockTyresByIdtyre = async (id: string) => {
    const {data}: any = await $hostGet.get('/stock/tyres/idtyre', { 
        params: { id_tyre: id}
    })
    .catch(error => {
        console.log(error)
    });
    return data;
};

// const getPriceTyres = async () => 
// await $hostGet.get('/price/tyres/all')
// .catch(error => {
//     console.log(error)
// });

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

// const getStockWheel = async () =>
// await $hostGet.get('/stock/wheels/all')
// .catch(error => {
//     console.log(error)
// });

const getAdminStockWheelByIdWheel = async (id: string) => {
    const {data}: any = await $hostGet.get('/stock/wheels/idwheel', 
    {params: {id_wheel: id}})
    .catch(error => {
        console.log(error)
    });
    return data;
};

// const getPriceWheels = async () =>
// await $hostGet.get('/price/wheels/all')
// .catch(error => {
//     console.log(error)
// });

const getAdminPriceWheelsById = async (id: string) => {
    const {data}: any = await $hostGet.get('/price/wheels/idwheel', {params: {id_wheel: id}})
    .catch(error => {
        console.log(error)
    });
    return data;
};

// const getStorageAll = async () => 
// await $hostGet.get('/storage/all')
// .catch(error => {
//     console.log(error)
// });

const getCommentOrderData = async (orderId: number) =>
await $hostGet.get('/comments/byorderid', {params: {id_order: orderId ?? 0}})
.catch(error => {
    console.log('ORDERID: ', orderId)
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

const getSuppliers = async () => 
await $hostGet.get('/suppliers/all')
.catch(error => {
    console.log(error)
});

const addCommentsToOrder = async (
    id_user: number,
    id_order: number | null | undefined, 
    comments: string | undefined) => 
await $hostPost.post('/comments', {
    id_order: id_order,
    id_user: id_user,
    comments: comments,
})
.catch(error => {
    console.log(
    'Заказ не створено (не існує), або не вірно вказані дані',
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
    createGoodsToOrderBasket
};
