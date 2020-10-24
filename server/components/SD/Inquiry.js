import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    console.log('imhere');
    DB.query(`select * from sdDoc left join SDtype on sdDoc.Type = SDtype.Type 
                left join Customer on SDDoc.idCustomer = Customer.idCustomer
                where sdDoc.Type=1
                order by idDoc DESC    
               `,(err,result)=>
    {
        if(err)  console.log(err);
        res.json(result);
    });
})



router.get('/:id',async (req,res)=>
{
    /* get the details of requistion */
    DB.query(`SELECT SDDoc.description, material.idMaterial,sdDoc.idDoc as idDoc,request_date,valid_to,Customer.* 
    ,price, MaterialCode , MaterialName, qty , idDiscount
    FROM sdDoc inner join sdDocDetails on SDDoc.idDoc = SdDocDetails.idDoc
    inner join Material on matID = material.idMaterial
    inner join Customer on SDDoc.idcustomer = Customer.idCustomer
    where sddocdetails.idDoc = ${req.params.id}`,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result);
    });
})

router.post('/',async (req,res)=>
{   console.log(req.body);
    const {customerID , requestDate , validTo , description,idDiscount} = req.body;
    const def = null;
    DB.query(`INSERT INTO SDDoc values ('','${requestDate}','${validTo}','${description}',${idDiscount},1,1,null,'','${customerID}',null) ;`
            ,(err,result)=>
    {
        if(err) console.log(err)
        res.json(result)
    });
})

router.get('/get/lastid',async(req,res)=>
{
    DB.query(`SELECT idDoc  from SDDoc 
            where Type = 1
            order by idDoc 
            desc limit 1`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})


router.post('/detail',async(req,res)=>
{ 
    const {refid,Material} = req.body
    let sql = `INSERT INTO SdDocDetails values `
    sql += `(${refid},${Material[0].idMaterial},${Material[0].qty})`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${refid},${Material[i].idMaterial},${Material[i].qty})`
    }
    sql += ';'
    console.log(sql);
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})



router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log('bug here');
    DB.query(`UPDATE SDDoc SET Stat = 2 WHERE idDoc = ${id} ;`
            ,(err,result)=>
    {
        if(err) {console.log(err)}
        res.json(result)
    });
})
export  {router as Inquiry};