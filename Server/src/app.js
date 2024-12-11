require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { redis } = require('./Services/redis.js');
const { getAllUser, addUser, updateNotification } = require('./Query/users.js');
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
        await updateNotification(false)
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
        await updateNotification(true)
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

app.post('/api/inqueryList', async (req, res, next) => {
    try {
        const apiUrl = "https://curiousrubik.us/dev/pmsdevapi.php?gyu=g/ab/10017";
        const apiData = {
            "body": {
                "start": 1,
                "end": 4000
            }
        }
        const response = await fetch(apiUrl, {
            method: "POST", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Specify the content type
                // Add any other headers here if required
            },
            body: JSON.stringify(apiData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the response JSON
        console.log(data.data.length)
        const redisData = await redis.getValue('inqueryList4000');
        if (!redisData) {
            await redis.setValue(
                'inqueryList4000',
                data.data
            )
            console.log('data not already in redis', )

        } else {
            const updateRecord = redisData.concat(data.data)
            await redis.setValue(
                'inqueryList',
                updateRecord
            )
            console.log('data already in redis',updateRecord.length)
        }
        // await redis.setValue(
        //     'inqueryList',
        //     data
        // )
        res.send(data);
    } catch (error) {
        console.error("Error while making POST request:", error.message);
    }
})

app.get('/api/inqueryList', async (req, res, next) => {
    try {
        const d = await redis.getValue('inqueryList4000');
        res.send(d)
    } catch (e) {
        next(e)
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