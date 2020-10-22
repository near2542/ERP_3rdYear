import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    console.log('imhere');
    DB.query(`select * from mmdocument left join MMDocType on Doctype = idDocType 
                left join Vendors on Vendors.idVendors = MMdocument.idVendors
                where DocType=1 `,(err,result)=>
    {
        if(err)  console.log(err);
        res.json(result);
    });
})



router.get('/:id',async (req,res)=>
{
    /* get the details of requistion */
    DB.query(`SELECT  mmdocument.description,material.idMaterial,mmdocument.idDoc as idDoc,request_date,ValidTo,Vendors.* , MaterialCode 
    , MaterialName, documentdetails.price as price, qty , 
    Storage.idStorage ,StorageName , StorageStreet ,StoragePostalCode,StorageCity,StorageCountry,
    ORGname , ORGStreet , ORGCountry , ORGCity , ORGPostalCode
        from mmdocument inner join documentdetails on mmdocument.idDoc = documentdetails.idDoc
        inner join material on documentdetails.idMaterial = material.idMaterial
        inner join vendors on vendors.idVendors = mmdocument.idVendors
        inner join storage on storage.idStorage = mmdocument.idStorage
        inner join org on org.idORG = storage.idORG
        where mmdocument.idDoc = ${req.params.id}`,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result);
    });
})

router.post('/',async (req,res)=>
{   
    const {vendorsID , requestDate , validTo , description, idStorage} = req.body;
    const def = null;
    DB.query(`INSERT INTO mmdocument
            values ('','${requestDate}','${validTo}','${description}',1,'${vendorsID}','${idStorage}',null,1,'') ;`
            ,(err,result)=>
    {
        if(err) console.log(err)
        res.json(result)
    });
})

router.get('/get/lastid',async(req,res)=>
{
    DB.query(`SELECT idDoc  from mmdocument 
            where DocType=1
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
    const {refid} = req.body
    console.log(req.body);
    const {Material} = req.body
    let sql = `INSERT INTO DocumentDetails values `
    sql += `(${refid},${Material[0].idMaterial},${Material[0].qty},${Material[0].price})`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${refid},${Material[i].idMaterial},${Material[i].qty},${Material[i].price})`
    }
    sql += ';'
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.send('ok')
    });
})



router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log('bug here');
    DB.query(`UPDATE mmdocument SET Stat = 2 WHERE idDoc = ${id} ;`
            ,(err,result)=>
    {
        if(err){console.log(err)}
        console.log('success');
    });
})
export  {router as requistion};