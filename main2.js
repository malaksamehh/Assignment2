             // second part for assignment

             //add new user
             const express = require('express');
             const fs = require('fs');
             const path = require('path');
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
             
             

             //update user name, age or email
             app.patch('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User ID not found" });
    }

    const { name, age, email } = req.body;

    if (email) {
        const emailExist = users.find(u => u.email === email && u.id !== userId);
        if (emailExist) {
            return res.status(400).json({ message: "Email already exist" });
        }
    }

   if (name !== undefined) users[userIndex].name = name;
  if (age !== undefined) users[userIndex].age = age;
  if (email !== undefined) users[userIndex].email = email;

    writeUsers(users);
    res.status(200).json({ message: "User updated successfully" });
});  

//Delete userId
app.delete('/user/:id', (req, res) =>{
    const userId = parseInt(req.params.id);
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
if(userIndex === -1){
    return res.status(404).json({message:"User ID not found"});
  }
  users.splice(userIndex,1);
writeUSERS(USERS);
res.status(200).json({message:"User deleted successfully"});
}); 

//get all users
app.get('/users' ,(req, res) => {
    const users= readUsers();
    res.status(200).json(users);
});

//get users byId
app.get('/users/:id',(req,res) =>{
    const userId= parseInt(req.params.id);
    const users= readUsers();
    const user= users.find(u => u.id === userId);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(user);
});
const PORT = 3000;
             app.listen(PORT, () => {
               console.log(`Server running on http://localhost:${PORT}`);
             }); 


 



           
                
            