import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    
    DB.query(`select VendorsName , MaterialCode , MaterialName , sources.Date_added as Date_added
            from Sources inner join Vendors on sources.idVendors = vendors.idVendors
            inner join material on material.idMaterial = sources.idMaterial 
            where sources.deleted = 0`
            ,(err,result)=>
    {
        if(err) throw err;
        console.log('success');
        res.json(result);
    });
})


router.post('/',async (req,res)=>
{   
   const todaydate = new Date().toISOString().slice(0,10).toString();
    DB.query(`INSERT INTO Sources
            values ('','${req.body.vendorsID}','${req.body.materialID}','${todaydate}','') ;`
            ,(err,result)=>
    {
        if(err) console.log(err)
        res.send('okmak')
    });
})


router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log(id);
    DB.query(`UPDATE Sources SET deleted = 1 WHERE idSources = ${id} ;`
            ,(err,result)=>
    {
        if(err) res.json({error:'error on adding'});
        console.log('success');
        res.json('add success');
    });
})
export  {router as Supply};