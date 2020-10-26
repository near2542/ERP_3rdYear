import {Router} from 'express';
import DB from '../db.js';
const router = Router();


router.get('/',async (req,res)=>
{
    DB.query(`select ConMat.*,Material.* from ConMat 
             left join Material on idMaterial = idMat where ConMat.deleted = 0`,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result);
    });
})
router.get('/:id',async (req,res)=>
{
    DB.query(`select * from discountdetails
    where id = ${req.params.id}`,(err,result)=>
    {
        if(err) console.log(err);
        console.log(result);
        res.json(result);
    });
})


router.post('/',async (req,res)=>
{
    const todaydate = new Date().toISOString().slice(0,10).toString();
    const {materialID , description , min ,percent} = req.body
    DB.query(`INSERT into conmat (idMat,description,min,percentage,Date_added) values 
    ('${materialID}','${description}','${min}','${percent}','${todaydate}');`
            ,(err,result)=>
                {
                if(err) console.log(err);
                console.log('post condition success');
                res.json(result);
                });
})

router.put('/:id',async (req,res)=>
{
    DB.query(`UPDATE conmat SET deleted = 1 where id  = ${req.params.id};`
                ,(err,result)=>
                {
                if(err) console.log(err);
                console.log('inside the updating')
                res.json('success')
                });
})


router.post('/get/startcondition',async(req,res)=>
{
    DB.query(`INSERT INTO doc_has_discount values ();`,(err,result)=>
    {
        if (err) console.log(err)
        res.json(result)
    })
})

router.get('/get/lastconidition',async(req,res)=>
{
    DB.query(`SELECT id from doc_has_discount order by id desc limit 1;`,(err,result)=>
    {
        if (err) console.log(err)
        console.log(result);
        res.json(result)
    })
    
})

router.post('/detail',async(req,res)=>
{   console.log(req.body)
    console.log('--------------------')
    const {Discount,DisDetails} = req.body
    const {body} =req
    let sql = `INSERT INTO DiscountDetails values `
    sql += `(${Discount},'${DisDetails[0].description}','${DisDetails[0].Total}')`
    for(let i=1 ; i<DisDetails.length;i++)
    {
      sql += `,(${Discount},'${DisDetails[i].description}','${DisDetails[i].Total}')`
    }
    sql += ';'
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        console.log('success posting purchase')
        res.json(result)
    });
})

export  {router as Condition};