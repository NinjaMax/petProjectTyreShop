const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const {Goods, GoodsInfo} = require('../models/models');

class GoodsController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const goods = await Goods.create({name, price, brandId, typeId, img});
            
            if(info) {
                info = JSON.parse(info);
                info.forEach(i => 
                    GoodsInfo.create({
                        title: i.title,
                        description: i.description,
                        goods: goods.id
                    }));
            }

            return res.json(goods); 
        } catch(e) {
            console.log(e);
            next(ApiError.badRequest(e.message));
        }
       
    }
    async getAll (req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        
        let goods;
        if(!brandId && !typeId) {
            goods = await Goods.findAndCountAll({limit, offset});
        }
        if(brandId && !typeId) {
            goods = await Goods.findAndCountAll({where:{brandId, limit, offset}});
        }
        if(!brandId && typeId) {
            goods = await Goods.findAndCountAll({where:{typeId, limit, offset}});
        }
        if(brandId && typeId) {
            goods = await Goods.findAndCountAll({where:{typeId, brandId, limit, offset}});
        }
        return res.json(goods);

    }
    async getOne (req, res) {
        const {id} = req.params;
        const goods = await Goods.findAll(
            {
                where: {id},
                include: [{model: GoodsInfo, as: 'info'}]
            }
        );
        return res.JSON(goods);
    }
}

module.exports = new GoodsController();