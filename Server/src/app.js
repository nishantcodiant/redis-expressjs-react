require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { redis } = require('./Services/redis.js');
const { getAllUser, addUser } = require('./Query/users.js');
const app = express()
app.use(express.json());
app.use(cors())
const addAndUpdateDataRedis = async (columns) => {
    let data = await getAllUser(columns)
    await redis.setValue(
        'userList',
        data
    );
    return data
}

app.post('/api/add-user', async (req, res, next) => {
    try {
        await addUser(req.body)
        await addAndUpdateDataRedis(['id', 'name', 'email', 'state', 'city'])
        res.status(201).json({
            success: true,
            message: 'user created succcessfully',
        })
    } catch (error) {
        next(error)
    }
})

app.get('/api/user-list', async (req, res, next) => {
    try {
        let userList = await redis.getValue('userList');
        console.log(userList)
        if (!userList) {
            userList = await addAndUpdateDataRedis(['id', 'name', 'email', 'state', 'city'])
        }
        // const columnsToSelect = ['id', 'name', 'email','state','city'];
        // let userList = await getAllUser(columnsToSelect)
        res.status(200).json({
            success: true,
            message: 'user fetched succcessfully',
            data: userList
        })
    } catch (error) {
        next(error)
    }

})

// Global Error-Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error detected:', err.message);

    // Set a default status code if not already set
    const statusCode = err.statusCode || 500;

    // Send a JSON response with the error details
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack, // Show stack trace only in development
    });
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});