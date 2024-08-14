const express = require('express');

const UserService = require('./../services/users.service');

const router = express.Router();
const service = new UserService();

router.get('/', async (req,res)=>{
  const users = await service.find();
  res.json(users);
});

router.get('/:id',async (req,res)=>{
  const { id } = req.params;
  const user = await service.findOne(id);
  res.json(user);
});

router.post('/', async (req,res)=>{
  const body = req.body;
  console.log('aqui estoy');

  const user = await service.create(body);
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id',(req,res)=> {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id,
  });
});

router.delete(':id',(req,res)=>{
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id
  });
});

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
