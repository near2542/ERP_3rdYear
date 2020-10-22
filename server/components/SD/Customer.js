import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    
    DB.query(`SELECT * FROM customer 
            where deleted = 0`,(err,result)=>
    {
        if(err) throw err;
        console.log('success');
        res.json(result);
    });
})


router.post('/',async (req,res)=>
{   
   const todaydate = new Date().toISOString().slice(0,10).toString();
   const {name,street,country,city,postalcode,email,phone,member} = req.body
    console.log(req.body);
    DB.query(`INSERT INTO customer values  ('','${name}','${street}','${country}','${city}','${postalcode}','${email}','${phone}','${todaydate}',${member},'') ;`
            ,(err,result)=>
    {
        if(err) res.json(err);
        console.log(result);
        console.log('create customer success')
        res.json(result);
    });
})


router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log(id);
    DB.query(`UPDATE customer SET deleted = 1 WHERE idCustomer = ${id} ;`
            ,(err,result)=>
    {
        if(err) res.json({error:'error on adding'});
        console.log('update Customer success');
        res.send('success');
    });
})






export  {router as Customer};