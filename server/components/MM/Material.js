import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    
    DB.query(`select * from Material 
            where deleted = 0`,(err,result)=>
    {
        if(err) console.log(err);
        console.log('success');
        res.json(result);
    });
})

router.get('/lastid',async(req,res)=>
{
    DB.query(`select idMaterial as id from Material
            order by idMaterial desc limit 1`,(err,result)=>
            {
                if(err) console.log(err)
                console.log('initialize material to stock success')
                res.json(result);
            })
        
})

router.post('/',async (req,res)=>
{   
   const todaydate = new Date().toISOString().slice(0,10).toString();
    console.log(todaydate);
    DB.query(`INSERT INTO material
            values ('','${req.body.code}','${req.body.name}','${req.body.description}',${req.body.price},${req.body.weight},'${todaydate}','') ;`
            ,(err,result)=>
    {
        if(err) {console.log(err);};

        console.log('success');
        res.json(result)
    });
})


router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log(id);
    DB.query(`UPDATE material SET deleted = 1 WHERE idMaterial = ${id} ;`
            ,(err,result)=>
    {
        if(err) res.json({error:'error on adding'});
        console.log('success');
        res.json(result)
    });
})






export  {router as Material};