import {Router} from 'express';
import DB from '../db.js';
const router = Router();


router.get('/',async (req,res)=>
{
    DB.query(`select * from vendors where deleted = 0`,(err,result)=>
    {
        res.json(result);
    });
})


router.post('/',async (req,res)=>
{
    const todaydate = new Date().toISOString().slice(0,10).toString();
    DB.query(`INSERT into vendors 
            values ('','${req.body.name}','${req.body.street}','${req.body.country}','${req.body.city}','${req.body.postalcode}','${req.body.email}',
            '${req.body.phone}','${todaydate}','') ;`
            ,(err,result)=>
                {
                if(err) throw err;
                console.log('post vendors success');
                res.json('success');
                });
})

router.put('/:id',async (req,res)=>
{
    DB.query(`UPDATE vendors SET deleted = 1 where idVendors = ${req.params.id};`
                ,(err,result)=>
                {
                if(err) throw err;
                console.log('inside the updating')
                res.json('success')
                });
})



export  {router as Vendors};