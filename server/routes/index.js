const Router = require('express');
const brandRouter = require('./brandRouter');
const goodsRouter = require('./goodsRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const router = new Router();

router.use('/user', userRouter );
router.use('/type', typeRouter );
router.use('/brand', brandRouter);
router.use('/tyres', goodsRouter );

module.exports = router;