const path = require("path");
function LogFileAndDirectory(){
    const result = {File:__filename, Dir:__dirname};
    console.log(result);            //question1
    return result;
}
LogFileAndDirectory


        
let result= '/user/files/report.pdf'
console.log (path.basename(result));      //question2



let x={dir:"/folder", name:"app", ext:".js"}
console.log(path.format(x));    //question3



let y="/docs/readme.md"
console.log(path.extname(y));   //question4


let file="/home/app/main.js";
console.log(path.basename(file));
console.log(path.extname(file));      //question5


let filePath="/home/user/file.txt";
console.log(path.isAbsolute(filePath));   //question6


console.log(path.join("src","components", "App.js"));  //question7


console.log(path.resolve("./index.js"));    //question8


console.log(path.join("/folder1, folder2/file.txt"));   //question9


const fs= require("fs");
fs.unlink("./data.txt", (err) => {
    if (err) 
        return console.log(err.message);
})                                        //question10
console.log("The file.txt is deleted.")


try{
    fs.mkdirSync("./newFolder");
    console.log("success");
} catch (err) {
    console.log(err.message)    //question11
}


const {EventEmitter}= require('events');
const event = new EventEmitter();
event.on("start" , () => {
    console.log("Welcome event triggered!");
});
event.emit("start")     //question12


event.on("Login",(username) => {
    console.log(`User logged in: ${username}`);
});
event.emit("Login","Ahmed");    //question13



fs.writeFileSync("./notes.txt","This is a note")
try{
    const data= fs.readFileSync("./notes.txt","utf8")
    console.log(data);
}
catch (err){                  //question14
    console.log(err.message)
}


fs.writeFile("./async.txt" ,"Async save" ,(err) =>{
    if (err) return console.log(err.message);
    console.log("Written successfully");    //question15
});


console.log(fs.existsSync("./notes.txt"));   //question16


const os= require("os");
console.log({Platform:os.platform(), Arch:os.arch()});    //question17



function readFileInChunks(filePath){
   const readStream= fs.createReadStream(filePath, "utf8") ;
readStream.on("data", (chunk) => {
         console.log(chunk);
     });

     readStream.on("end", () => {
         console.log("Finished reading file.");
     });

     readStream.on("error", (err) => {
         console.log(err.message);               //question18
     });
 }

 readFileInChunks("./big.txt");


 function copyFile(source,destination) {
    const readStream= fs.createReadStream(source);
    const writeStream= fs.createWriteStream(destination);
    readStream.pipe(writeStream);
    writeStream.on("finish", () => {
         console.log("File copied using streams.");
     });

     writeStream.on("error", (err) => {            //question19
         console.log(err.message);
     });
 }

 copyFile("./source.txt", "./dest.txt");
 

 const zlib = require("zlib");
 const { pipeline } = require("stream");

 function compressFile(source, destination) {
     pipeline(
         fs.createReadStream(source),
         zlib.createGzip(),
         fs.createWriteStream(destination),
         (err) => {
             if (err) {
                 console.log(err.message);
             } else {
                 console.log("File compressed successfully.");   //question20
             }
                });
             }

 compressFile("./data.txt", "./data.txt.gz")   //ashan yshtghal lazm taaml comment l fs.unlink




 const express = require('express');

 
 const app= express()
 app.use(express.json());
const USERS_FILE = path.join(__dirname, 'users.json');
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
  }
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data);
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
app.post('/user', (req, res) => {
  const { name, age, email } = req.body;

  const users = readUsers();

  const emailExists = users.some(user => user.email === email);

  if (emailExists) {
    return res.status(400).json({ message: "Email already exists." });
  }

  const newUser = { name, age, email };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User added successfully." });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 