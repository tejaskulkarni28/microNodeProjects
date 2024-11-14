const express = require('express')
const app = express();
const port = 3001;
const fs = require('fs');
const users = require('./MOCK_DATA.json');
// for all types of client (rest api <json formatting>)
app.get('/api/users', (req, res)=>{
        res.send(users);
})
// Middleware - plugin 
app.use(express.urlencoded({extended: false}))
app.post('/api/users', (req, res)=>{
        const body = req.body; // all the data send by front-end will be in req.body
        users.push({id: users.length + 1, ...body})
        fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (error)=>{
                if(!error){
                        return res.json({
                                status: "success",
                                id: users.length
                        })
                }else{
                        return res.json({
                                status: "pending",
                                reason: error
                        })
                }
        })
        return res.json({
                status: "pending"
        })
})
// grouping the route
app.route('/api/users:id')
        .get()
        .post()
        .patch()
        .delete();
// for browser users
app.get('/api/users/:id', (req, res)=>{
        const id = Number(req.params.id)
        const user = users.find(user=>user.id===id)
        res.send(user)
})
const bodyparser = require('body-parser')
app.use(bodyparser.json()) // middleware for raw data sent from client side(postman for now) 
app.patch('/api/users/:id', (req, res)=>{
        // request to be completed
        try{
                const id = Number(req.params.id)
                const first_name = req.body.first_name; // this value needs to be updated
                const last_name = req.body.last_name; // this value needs to be updated

                // === has higher precedence than && 
                (first_name === undefined) || (last_name === undefined) ? 
                        console.log('Undefined: Value not in the scope') : console.log(first_name + ' ' + last_name) 
                const readUsers = users;
                const userIndex = readUsers.findIndex(user => user.id === id)
                userIndex < 0 ? console.log('no index found') : console.log('index found ', userIndex)

                users.at(userIndex).first_name = first_name;
                users.at(userIndex).last_name = last_name;

                fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (error)=>{
                        error? console.log(error) :  res.status(200).json({status: 'success', message: 'Data has been updated'})
                })
        }catch(error){
                res.status(404).json({
                        status: 'Error',
                        message: 'User not updated. Please check the code'
                })
        }
})
// req.query object retrieves the query parameter data
app.get('/test/path', (req, res)=>{
        console.log(req.query.name)
        console.log(req.query.age)
        res.send('something')
})
app.delete('/api/users/:id', (req, res)=>{
        const id = Number(req.params.id);
        try{
                const userIndex = users.findIndex(user => user.id === id)
                if(userIndex === -1){
                        return res.status(404).json({status: 'error', message: 'User not found'});
                }
               users.splice(userIndex, 1)
                fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (error)=>{
                         if(error){
                                console.log(error)
                        }else{
                                res.status(200).json({status: 'success', message: 'Deleted a message successfully'})
                        }
                })
                }catch(parseErr){
                        console.error(parseErr);
                        return res.status(500).json({status: 'error', message: 'Failed to parse data'});
                }
})
app.get('/users', (req, res)=>{
        const html = `
        <ul>
                ${users.map(user => `<li> ${user.first_name}</li>`)}
        </ul>
        `;
        res.send(html)
})
app.listen(port, ()=>{
        console.log('Server started on port 3001')
})