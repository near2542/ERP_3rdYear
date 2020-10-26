import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    console.log('imhere');
    DB.query(`select * from mmdocument left join MMDocType on Doctype = idDocType 
                left join Vendors on Vendors.idVendors = MMdocument.idVendors 
                where DocType= 4 order by idDoc desc`,(err,result)=>
    {
        if(err) console.log(err)
        res.json(result);
    });
})



router.get('/:id',async (req,res)=>
{
    console.log('imhere')
    DB.query(`SELECT  mmdocument.description,material.idMaterial,idRef,mmdocument.idDoc as idDoc,request_date,ValidTo,Vendors.* , MaterialCode 
    , MaterialName, documentdetails.price as price, qty , 
    Storage.idStorage ,StorageName , StorageStreet ,StoragePostalCode,StorageCity,StorageCountry,
    ORGname , ORGStreet , ORGCountry , ORGCity , ORGPostalCode
        from mmdocument inner join documentdetails on mmdocument.idDoc = documentdetails.idDoc
        inner join material on documentdetails.idMaterial = material.idMaterial
        inner join vendors on vendors.idVendors = mmdocument.idVendors
        inner join storage on storage.idStorage = mmdocument.idStorage
        inner join org on org.idORG = storage.idORG
        where mmdocument.idDoc = ${req.params.id} and DocType = 4 `,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result);
    });
})

router.post('/',async (req,res)=>
{ 

    let requestDate = new Date().toISOString().slice(0,10).toString();
    let validTo  = new Date().toISOString().slice(0,10).toString();
    const {vendorsID  , description,refID,idStorage} = req.body;
    console.log(refID);
    const def = null;
    DB.query(`INSERT INTO mmdocument
            values ('','${requestDate}','${validTo}','${description}',4,'${vendorsID}','${idStorage}',${refID},1,'') ;`
            ,(err,result)=>
    {
        if(err) console.log(err)
        res.json(result)
    });
})

router.get('/get/lastid',async(req,res)=>
{
    console.log('im here')
    DB.query(`SELECT idDoc  from mmdocument 
            where DocType=4
            order by idDoc desc 
             limit 1;`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})


router.post('/detail',async(req,res)=>
{
    const {Material,refID} = req.body
    console.log(refID);
    let sql = `INSERT INTO DocumentDetails values `
    sql += `(${refID},${Material[0].idMaterial},${Material[0].qty},${Material[0].price})`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${refID},${Material[i].idMaterial},${Material[i].qty},${Material[i].price})`
    }
    sql += ';'
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})



router.put('/:id',async(req,res)=>
{   console.log(req.params.id)
    const {id} = req.params
    console.log('im here')
    DB.query(`UPDATE mmdocument SET stat = 2 WHERE idDoc = ${id} ;`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})
export  {router as invoices};