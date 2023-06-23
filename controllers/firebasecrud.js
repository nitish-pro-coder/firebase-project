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

const resultarr=[{...logintypemap},{...userinformationmap}];


// console.log(RoomDetailsmap);

// console.log();

// console.log(resultarr);





 




const cityname = "Ooty";

// console.log(req.body);
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
res.send(matchedObjects);
// res.json({combiningarray}).send();
}

async function Update(req,res){       
  const db = getFirestore();
  console.log(req.body.id);
 // ...
const BookingRef = db.collection('Client_Management').doc(req.body.id);


// Atomically increment the population of the city by 50.


const collectionRef = db.collection('Client_Management');

const collectionSize = await collectionRef.get().then((snapshot) => snapshot.size);
   console.log(collectionSize)
      const increment = collectionSize;
const updated_at_timestamp = FieldValue.serverTimestamp()
const response = await BookingRef.update({
  CreatedDate: updated_at_timestamp,
  MOdifiedDate: updated_at_timestamp,
  Client_id:increment
})
    
  res.send({msg:"Client has been updated"});
}
async function ClientInsert(req,res){
  const db = getFirestore();
  const collectionRef = db.collection('Client_Management');
  const collectionSize = await collectionRef.get().then((snapshot) => snapshot.size);
  
  console.log(collectionSize)
  const increment = collectionSize+1;
  const updated_at_timestamp = FieldValue.serverTimestamp()
  const responserefbody={...req.body,...{
    CreatedDate: updated_at_timestamp,
    MOdifiedDate: updated_at_timestamp,
    Client_id:increment
   }}
   
const response = db.collection('Client_Management').doc().set(responserefbody)
res.send({msg:"New Client has been inserted"});
}

async function CityInsert(req,res){
  const db = getFirestore();
  try {
    let documents = req.body; // Assuming the request body contains an array of documents
    const collectionRef = db.collection('State');
 const collectionSize = await collectionRef.get().then((snapshot) => snapshot.size);
  
  console.log(collectionSize)
  const increment = collectionSize+1;
  const updated_at_timestamp = FieldValue.serverTimestamp()
  if (Array.isArray(req.body)) {

    documents = req.body.map((obj) => ({
      ...obj,
      CreatedDate: updated_at_timestamp,
      MOdifiedDate: updated_at_timestamp,
    }));
  }
  
    // Create an array to store the batched writes
    const batch = db.batch();

    // Iterate over each document and add it to the batch
    documents.forEach((document) => {
      const docRef = db.collection('State').doc(); // Generate a new document reference
      batch.set(docRef, document);
    });

    // Commit the batched writes
    await batch.commit();

    res.status(200).send('Documents inserted successfully.');
  } catch (error) {
    console.error('Error inserting documents:', error);
    res.status(500).send('Error inserting documents.');
  }

 
}


async function Bulkdelete(req,res){
  const db = getFirestore();
  
  try {
    const snapshot = await db.collection(collectionName).get();
    const batch = db.batch();

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('All documents deleted successfully.');
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
}


async function employeedetailsgather(req,res){       
  const db = getFirestore();
  try{
    const empref = db.collection('Client_Management').doc('Ev2gk6FTlDO2DeDttl6F').collection('Employee_details');
 
const employeedetailslist =await empref.get();
const employeemap=employeedetailslist.docs.map((doc)=>({id:doc.id,...doc.data()})); 
if(employeemap[0].Official_EmailId===req.body.email){
  res.status(200).send({message:"Email matched successfully",data:employeemap})
}
else{
  res.status(500).send("It is not official domain "+error)
}
}
catch(error){
  res.status(500).send("Error in fetching the employee details "+error)
}
// res.json({combiningarray}).send();
}

async function join(req,res){

}

module.exports.employeedetailsgather=employeedetailsgather;

module.exports.join=join; 
module.exports.Bulkdelete=Bulkdelete;
module.exports.CityInsert=CityInsert;
module.exports.ClientInsert=ClientInsert;
module.exports.Update=Update;
module.exports.select=select;
module.exports.insert=insert;
module.exports.stateselect=stateselect;