const express = require('express');

const UserService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');
const { createProductSchema } = require('../schemas/product.schema');


const router = express.Router();
const service = new UserService();

router.get('/', async (req,res)=>{
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',(req,res)=> {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id,
  });
});

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);
//   (req,res)=>{
//   const { id } = req.params;
//   res.json({
//     message: 'deleted',
//     id
//   });
// });

router.get('/filter',(req,res) => {
  res.send('Yo soy un filter');
});
// router.get('', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset,
//     });
//   } else {
//     res.send('No hay parametros');
//   }
// });

module.exports = router;
