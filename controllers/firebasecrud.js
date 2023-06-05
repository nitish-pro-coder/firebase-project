const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../firebasecreds.json');


initializeApp({
    credential: cert(serviceAccount)
  });
  

async function insert(req,res){
  const db = getFirestore();
  var batch = db.batch();
  // console.log(req.body.Bookinglist);
  // const bookinglistarr=req.body.Bookinglist;
  // let lastInsertedbookingId="";
  // let newPostRef = postsRef.push();
  // console.log('Added document with ID: ', res.id);
 
  // bookinglistarr.forEach(async(doc) => {
  //   console.log(doc)
  //   var BookingRef = db.collection("Bookingdetails").doc(); //automatically generate unique id
  //   batch.set(BookingRef, doc);
  //   lastInsertedbookingId= BookingRef.id;
  // });
  // await batch.commit();
  // let travellerlist=req.body.travelerlist;
  // let RoomDetailslist=req.body.RoomDetails;
  // console.log(lastInsertedbookingId);
  // var TravelerdetailsRef = db.collection("Travelerdetails").doc(); //automatically generate unique id"
  // travellerlist.boookingid=lastInsertedbookingId;
  // travellerlist.uniqueid=newPostRef.key;
  // RoomDetailslist.uniqueid=newPostRef.key;
  // var RoomDetailsRef = db.collection("RoomDetails").doc(); //automatically generate unique id"
  // console.log(travellerlist);
  // console.log(RoomDetailsRef);


  var hbstateref = db.collection("HBState").doc(); //automatically generate unique id"
  hbstateref.set(req.body.HBState);
  // TravelerdetailsRef.set(travellerlist);
  // RoomDetailsRef.set(RoomDetailslist);
   
  res.send({ msg: "Users Added" });
}

async function stateselect(req,res){

  const db = getFirestore();
  const stateref=db.collection('HBState');
  const statelist =await stateref.get();
  const statemap=statelist.docs.map((doc)=>({id:doc.id,...doc.data()}));
  res.send(statemap);

}


async function select(req,res){       
   const db = getFirestore();
   const logintyperef=db.collection('logintype');
   const userinformationref=db.collection('userinformation')
   const tripdetails=db.collection('Bookingdetails')
   const RoomDetails=db.collection('RoomDetails')
   

const logintypelist =await logintyperef.get();
const userinformationlist=await userinformationref.get();
const tripdetailslist=await tripdetails.get();
const RoomDetailslist=await RoomDetails.get();






const logintypemap=logintypelist.docs.map((doc)=>({id:doc.id,...doc.data()}));
const userinformationmap=userinformationlist.docs.map((doc)=>({id:doc.id,...doc.data()}));
const tripdetailsmap=tripdetailslist.docs.map((doc)=>({id:doc.id,...doc.data()}));
const RoomDetailsmap=RoomDetailslist.docs.map((doc)=>({id:doc.id,...doc.data()}));

// const resultarr=[{...logintypemap},{...userinformationmap}];


console.log(RoomDetailsmap);

// console.log();

console.log(resultarr);





 




const cityname = "Ooty";

console.log(req.body);
const matchedObjects = [];

if (resultarr[0]) {
  const objectsInData0 = Object.values(resultarr[0]).filter(obj => obj.logintype === req.body.logintype);
  matchedObjects.push(...objectsInData0);
}

if (resultarr[1]) {
  const objectsInData1 = Object.values(resultarr[1]).filter(obj => obj.logintype === req.body.logintype );
  matchedObjects.push(...objectsInData1);
}

console.log(matchedObjects);
res.send(RoomDetailsmap);
// res.json({combiningarray}).send();
}

async function Update(req,res){       
  const db = getFirestore();
  console.log(req.body.id);
 // ...
const BookingRef = db.collection('TP_Booking').doc(req.body.id);
const timestamp = Timestamp.now();

// Atomically increment the population of the city by 50.

const updated_at_timestamp = FieldValue.serverTimestamp()
const response = await BookingRef.update({
  CreatedDate: updated_at_timestamp,
  MOdifiedDate: updated_at_timestamp,
})
  res.send({msg:"Booking has been updated"});
}

module.exports.Update=Update;
module.exports.select=select;
module.exports.insert=insert;
module.exports.stateselect=stateselect;