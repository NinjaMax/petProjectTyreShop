//import { IPostTask } from "./interfaces/postTask.interface";
import { 
    //addGoodsToOrder,
    //createGoodsToOrder,
    //responseForm,
    getTyres,
    getStockTyres,
    getPriceTyres,
    getWheels,
    getStockWheel,
    getStorageAll,
    getPriceWheels,
    //getCommentData,
    getOrderData,
    getCustomers
} from "./restAdminAPI";

function yieldToMain () {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
}

async function postTask (): Promise<any> {
    // Create an array of functions to run:
    const tasks:any[] = [
        //addGoodsToOrder,
        //createGoodsToOrder,
        //responseForm,
        getTyres,
        getStockTyres,
        getPriceTyres,
        getWheels,
        getStockWheel,
        getStorageAll,
        getPriceWheels,
        //getCommentData(commentId),
        getOrderData,
        getCustomers
    ]
  
    // Loop over the tasks:
    while (tasks.length > 0) {
      // Shift the first task off the tasks array:
      const task = tasks.shift();
  
      // Run the task:
      task();
  
      // Yield to the main thread:
      await yieldToMain();
    }
  }

export {postTask, yieldToMain};