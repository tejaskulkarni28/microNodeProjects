const express = require('express')
const app = express();
const port = 3001;
const users = require('./MOCK_DATA.json');
console.log(users)

// for all types of client (rest api <json formatting>)
app.get('/api/users', (req, res)=>{
        res.send(users);
})

app.post('/api/users', (req, res)=>{
        // request to be completed
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
app.patch('api/users/:id', (req, res)=>{
        // request to be completed
        const id = req.params.id;
        return res.json({
                status: "pending"
        })
})
app.delete('api/users/:id', (req, res)=>{
        // request to be completed
        const id = req.params.id;
        return res.json({
                status: "pending"
        })
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