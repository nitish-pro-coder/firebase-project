const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../firebasecreds.json');
initializeApp({
    credential: cert(serviceAccount)
  });
  
async function insert(req,res){
  const db = getFirestore();
  // const response = await db.collection('cities').add(req.body);
  var batch = db.batch();
  console.log(req.body.Citylist);
  const citylistarr=req.body.Citylist
  citylistarr.forEach((doc) => {
    console.log(doc)
    var docRef = db.collection("hotels").doc(); //automatically generate unique id
    batch.set(docRef, doc);
  });

  // const doclistmap=next.docs.map((doc)=>({id:doc.id,...doc.data()}))

  batch.commit()
  res.send({ msg: "Users Added" });
}


async function select(req,res){       
          const db = getFirestore();
   const cityRef = db.collection('cities')
   const hotelRef =db.collection('hotels')

const docslist = await cityRef.get();
const hotellist = await hotelRef.get(); 


// const last = docslist.docs[docslist.docs.length - 1];

// const hotels
// const next = await cityRef.where("Cityname","==",req.body.Cityname).limit(3).get()

// if (next.empty) {
//   console.log('No matching documents.');
//   return;
// }  
  // console.log(next.docs)

  
  
 const doclistmap=docslist.docs.map((doc)=>({citieslist:{id:doc.id,...doc.data()}}))
   
 const hotellistmap=hotellist.docs.map((doc)=>({hotellist:{id:doc.id,...doc.data()}}))
 const combiningarray=[...doclistmap,...hotellistmap]
 
// let clist=combiningarray.filter(list=>list.hotellist.includes(list.citieslist))

// console.log(clist);
res.send(combiningarray);
}

async function Update(req,res){       
  const db = getFirestore();
  console.log(req.body.id)
  const cityRef = db.collection('cities').doc(req.body.id)
  const Cityname=req.body.Cityname
  const updatedvalue = await cityRef.update({Cityname});
  res.send({msg:"City has been updated"});
}

module.exports.Update=Update;
module.exports.select=select;
module.exports.insert=insert;