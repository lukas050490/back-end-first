import cors from 'cors'
import express from 'express'
import { v4 } from 'uuid'
const app = express()
const port = 3001;
app.use(express.json())
app.use(cors())

const users = []
const middlewareUserId = ( request, response, next) =>{
    const { id } = request.params;
    const index = users.findIndex(user => user.id === id);
    if (index < 0) {
        return response.status(404).json({ message: " user not found" })
    }
    request.userIndex = index;
    request.userId = id;

   next();
}

app.get('/users', (request, response) => {

    return response.json(users)

})
app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }
    users.push(user)
    return response.json(user)

})

app.put('/users/:id',middlewareUserId, (request, response) => {

    const index =  request.userIndex
   const id = request.userId 
    const { name, age } = request.body
    const updateuser = { id, name, age }
    users[index] = updateuser
    return response.json(updateuser)

})

app.delete('/users/:id',middlewareUserId, (request, response) => {

    const index =  request.userIndex
    users.splice(index,1)



    return response.json(users)

})







app.listen(port, () => {
    console.log(`server started on port ${port}`)
})