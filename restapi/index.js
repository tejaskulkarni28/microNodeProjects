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
app.patch('/api/users/:id', (req, res)=>{
        // request to be completed
        const id = req.params.id;
        console.log(id)
        return res.json({
                status: "pending"
        })
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