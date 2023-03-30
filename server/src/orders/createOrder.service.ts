// async tyreStockOrder (createOrderDto: CreateOrderDto) {

// const orderId = await this.ordersRepository.findByPk(
//     createOrderDto.id_order,
//     {include: ['order_storage']}
//     //{include: {all: true}},
//   );
//   let tyreStock = await this.stockTyresService.findStockTyreById(
//     createOrderDto,
//   );
//   const storageStorage = await this.storageService.findStorageById(
//     createOrderDto,
//   );
//   const orderStorageId =
//     await this.ordersStorageService.findOrderStorageById(createOrderDto);

//   if (tyreStock) {
//     if (
//       tyreStock.remainder < createOrderDto.quantity &&
//       tyreStock.stock !== 0
//     ) {
//       const newReserve =
//         createOrderDto.quantity -
//         (createOrderDto.quantity - tyreStock.remainder);
//       await tyreStock.increment('reserve', { by: newReserve });
//       //await tyreStock.reload();
//       await orderStorageId.increment('reserve', { by: newReserve });
//       //await orderStorageId.reload();

//       await orderId.$add('order_storage', orderStorageId);
//       await storageStorage.$add('order_storage', orderStorageId);

//       await orderId.reload();

//       return orderId;
//     }

//     if (
//       tyreStock.remainder > createOrderDto.quantity &&
//       tyreStock.stock !== 0
//     ) {
//       await tyreStock.increment('reserve', { by: createOrderDto.quantity });
//       //await tyreStock.reload();
//       await orderStorageId.increment('reserve', {
//         by: createOrderDto.quantity,
//       });
//       //await orderStorageId.reload();

//       await orderId.$add('order_storage', orderStorageId);
//       await storageStorage.$add('order_storage', orderStorageId);

//       await orderId.reload();

//       return orderId;
//     }

//     if (
//       tyreStock.remainder == 0 ||
//       tyreStock.stock == 0 ||
//       tyreStock.id_storage !== createOrderDto.id_storage
//     ) {
//       return `You can not set more "reserve" 
//         because does not have remainder. "Remainder 0".
//         Or Storage specified incorrectly`;
//     }

    
//     tyreStock = null;
    
//   }

//   return orderId;
// }

// async wheelStockOrder (createOrderDto: CreateOrderDto) {

//     const orderId = await this.ordersRepository.findByPk(
//         createOrderDto.id_order,
//         {include: ['order_storage']}
//         //{include: {all: true}},
//       );
//       let wheelStock = await this.stockWheelsService.findStockWheelById(
//         createOrderDto,
//       );
//       const storageStorage = await this.storageService.findStorageById(
//         createOrderDto,
//       );
//       const orderStorageId =
//         await this.ordersStorageService.findOrderStorageById(createOrderDto);

//     if (wheelStock) {
//         if (
//           wheelStock.remainder < createOrderDto.quantity &&
//           wheelStock.stock !== 0
//         ) {
//           const newReserve =
//             createOrderDto.quantity -
//             (createOrderDto.quantity - wheelStock.remainder);
//           await wheelStock.increment('reserve', { by: newReserve });
//           //await wheelStock.reload();
//           await orderStorageId.increment('reserve', { by: newReserve });
//           //await orderStorageId.reload();

//           await orderId.$add('order_storage', orderStorageId);
//           await storageStorage.$add('order_storage', orderStorageId);

//           await orderId.reload();

//           return orderId;
//         }

//         if (
//           wheelStock.remainder > createOrderDto.quantity &&
//           wheelStock.stock !== 0
//         ) {
//           await wheelStock.increment('reserve', {
//             by: createOrderDto.quantity,
//           });
//           //await wheelStock.reload();
//           await orderStorageId.increment('reserve', {
//             by: createOrderDto.quantity,
//           });
//           //await orderStorageId.reload();

//           await orderId.$add('order_storage', orderStorageId);
//           await storageStorage.$add('order_storage', orderStorageId);

//           await orderId.reload();

//           return orderId;
//         }

//         if (
//           wheelStock.remainder == 0 ||
//           wheelStock.stock == 0 ||
//           wheelStock.id_storage !== createOrderDto.id_storage
//         ) {
//           return `You can not set more "reserve" 
//             because does not have remainder. "Remainder 0".
//             Or Storage specified incorrectly`;
//         }

        
//           wheelStock = null;

//     }

//     return orderId;
// }

// async batteryStockOrder (createOrderDto: CreateOrderDto) {
//     const orderId = await this.ordersRepository.findByPk(
//         createOrderDto.id_order,
//         {include: ['order_storage']}
//         //{include: {all: true}},
//       );

//       let batteryStock =
//         await this.stockBatteriesService.findStockBatteryById(createOrderDto);

//       const storageStorage = await this.storageService.findStorageById(
//         createOrderDto,
//       );
//       const orderStorageId =
//         await this.ordersStorageService.findOrderStorageById(createOrderDto);

//     if (batteryStock) {
//         if (
//           batteryStock.remainder < createOrderDto.quantity &&
//           batteryStock.stock !== 0
//         ) {
//           const newReserve =
//             createOrderDto.quantity -
//             (createOrderDto.quantity - batteryStock.remainder);
//           await batteryStock.increment('reserve', { by: newReserve });
//           //await batteryStock.reload();
//           await orderStorageId.increment('reserve', { by: newReserve });
//           //await orderStorageId.reload();

//           await orderId.$add('order_storage', orderStorageId);
//           await storageStorage.$add('order_storage', orderStorageId);

//           await orderId.reload();

//           return orderId;
//         }

//         if (
//           batteryStock.remainder > createOrderDto.quantity &&
//           batteryStock.stock !== 0
//         ) {
//           await batteryStock.increment('reserve', {
//             by: createOrderDto.quantity,
//           });
//           //await batteryStock.reload();
//           await orderStorageId.increment('reserve', {
//             by: createOrderDto.quantity,
//           });
//           //await orderStorageId.reload();

//           await orderId.$add('order_storage', orderStorageId);
//           await storageStorage.$add('order_storage', orderStorageId);

//           await orderId.reload();

//           return orderId;
//         }

//         if (
//           batteryStock.remainder == 0 ||
//           batteryStock.stock == 0 ||
//           batteryStock.id_storage !== createOrderDto.id_storage
//         ) {
//           return `You can not set more "reserve" 
//             because does not have remainder. "Remainder 0".
//             Or Storage specified incorrectly`;
//         }

        
//           batteryStock = null;
      

        
//     }

//       return orderId;
//     // } catch {
//     //   throw new HttpException(
//     //     'Data is incorrect and must be uniq',
//     //     HttpStatus.NOT_FOUND,
//     //   );
//     // }
// }

// async oilStockOrder (createOrderDto: CreateOrderDto) {
//     const orderId = await this.ordersRepository.findByPk(
//         createOrderDto.id_order,
//         {include: ['order_storage']}
//         //{include: {all: true}},
//       );

//       let oilStock = await this.stockOilsService.findStockOilById(
//         createOrderDto,
//       );
//       const storageStorage = await this.storageService.findStorageById(
//         createOrderDto,
//       );
//       const orderStorageId =
//         await this.ordersStorageService.findOrderStorageById(createOrderDto);

//       if (oilStock) {
//         if (
//           oilStock.remainder < createOrderDto.quantity &&
//           oilStock.stock !== 0
//         ) {
//           const newReserve =
//             createOrderDto.quantity -
//             (createOrderDto.quantity - oilStock.remainder);
//           await oilStock.increment('reserve', { by: newReserve });
//           //await oilStock.reload();
//           await orderStorageId.increment('reserve', { by: newReserve });
//           //await orderStorageId.reload();

//           await orderId.$add('order_storage', orderStorageId);
//           await storageStorage.$add('order_storage', orderStorageId);

//           await orderId.reload();

//           return orderId;
//         }

//         if (
//           oilStock.remainder > createOrderDto.quantity &&
//           oilStock.stock !== 0
//         ) {
//           await oilStock.increment('reserve', { by: createOrderDto.quantity });
//           //await oilStock.reload();
//           await orderStorageId.increment('reserve', {
//             by: createOrderDto.quantity,
//           });
//           //await orderStorageId.reload();

//           await orderId.$add('order_storage', orderStorageId);
//           await storageStorage.$add('order_storage', orderStorageId);

//           await orderId.reload();

//           return orderId;
//         }

//         if (
//           oilStock.remainder == 0 ||
//           oilStock.stock == 0 ||
//           oilStock.id_storage !== createOrderDto.id_storage
//         ) {
//           return `You can not set more "reserve" 
//             because does not have remainder. "Remainder 0".
//             Or Storage specified incorrectly`;
//         }

//           oilStock = null;

//       return orderId;
//     // } catch {
//     //   throw new HttpException(
//     //     'Data is incorrect and must be uniq',
//     //     HttpStatus.NOT_FOUND,
//     //   );
//     // }
//   }
// }

export function yieldToMain () {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
  }


  async addGoodsToOrder(createOrderDto: CreateOrderDto) {
    const orderId = await this.ordersRepository.findByPk(createOrderDto.id_order, { include: ['order_storage'] });
    const orderStorageId = await this.ordersStorageService.findOrderStorageById(createOrderDto);
    const storageStorage = await this.storageService.findStorageById(createOrderDto);
  
    const [tyreStock, wheelStock, batteryStock, oilStock] = await Promise.all([
      this.stockTyresService.findStockTyreById(createOrderDto),
      this.stockWheelsService.findStockWheelById(createOrderDto),
      this.stockBatteriesService.findStockBatteryById(createOrderDto),
      this.stockOilsService.findStockOilById(createOrderDto)
    ]);
  
    let stock = null;
    let newReserve = 0;
  
    if (tyreStock) {
      if (tyreStock.remainder < createOrderDto.quantity && tyreStock.stock !== 0) {
        newReserve = createOrderDto.quantity - (createOrderDto.quantity - tyreStock.remainder);
        stock = tyreStock;
      } else if (tyreStock.remainder > createOrderDto.quantity && tyreStock.stock !== 0) {
        stock = tyreStock;
      } else {
        return `You cannot set more "reserve" because there is no remainder ("Remainder 0") or the specified storage is incorrect.`;
      }
    } else if (wheelStock) {
      if (wheelStock.remainder < createOrderDto.quantity && wheelStock.stock !== 0) {
        newReserve = createOrderDto.quantity - (createOrderDto.quantity - wheelStock.remainder);
        stock = wheelStock;
      } else if (wheelStock.remainder > createOrderDto.quantity && wheelStock.stock !== 0) {
        stock = wheelStock;
      } else {
        return `You cannot set more "reserve" because there is no remainder ("Remainder 0") or the specified storage is incorrect.`;
      }
    } else if (batteryStock) {
      if (batteryStock.remainder < createOrderDto.quantity && batteryStock.stock !== 0) {
        newReserve = createOrderDto.quantity - (createOrderDto.quantity - batteryStock.remainder);
        stock = batteryStock;
      } else if (batteryStock.remainder > createOrderDto.quantity && batteryStock.stock !== 0) {
        stock = batteryStock;
      } else {
        return `You cannot set more "reserve" because there is no remainder ("Remainder 0") or the specified storage is incorrect.`;
      }
    } else if (oilStock) {
      if (oilStock.remainder < createOrderDto.quantity && oilStock.stock !== 0) {
        newReserve = createOrderDto.quantity - (createOrderDto.quantity - oilStock.remainder);
        stock = oilStock;
      } else if (oilStock.remainder > createOrderDto.quantity && oilStock.stock !== 0) {
        stock = oilStock;
      } else {
        return `You cannot set more "reserve" because there is no remainder ("Remainder 0") or the specified storage is incorrect.`;
      }
    }
  
    if (stock) {
      await stock.increment('reserve', { by: newReserve || createOrderDto.quantity });
      await stock.reload();
      await orderStorageId.increment('reserve', { by: newReserve || createOrderDto.quantity });
      await orderStorageId.reload();
      await orderId.$add('order_storage', orderStorageId);
      await storageStorage.$add('order_storage', orderStorageId);
      await orderId.reload();
    }
  
    return orderId;
  }
  
