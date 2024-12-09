require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { redis } = require('./Services/redis.js');
const { supabase } = require('./Services/supabase.js');
const { getAllUser, addUser } = require('./Query/users.js');
const app = express()
app.use(express.json());
app.use(cors())

const getUserList = () => {
    // const data = [
    //     {
    //         "id": 1,
    //         "name": "John Doe",
    //         "email": "john.doe@example.com",
    //         "age": 28,
    //         "street": "123 Main St",
    //         "city": "New York",
    //         "state": "NY",
    //         "zip": "10001",
    //         "isActive": true,
    //         "roles": ["admin", "editor"]
    //     },
    //     {
    //         "id": 2,
    //         "name": "Jane Smith",
    //         "email": "jane.smith@example.com",
    //         "age": 34,
    //         "street": "456 Oak Ave",
    //         "city": "Los Angeles",
    //         "state": "CA",
    //         "zip": "90001",
    //         "isActive": false,
    //         "roles": ["viewer"]
    //     },
    //     {
    //         "id": 3,
    //         "name": "Sam Johnson",
    //         "email": "sam.johnson@example.com",
    //         "age": 30,
    //         "street": "789 Pine Rd",
    //         "city": "Chicago",
    //         "state": "IL",
    //         "zip": "60601",
    //         "isActive": true,
    //         "roles": ["editor"]
    //     },
    //     {
    //         "id": 4,
    //         "name": "Emily Davis",
    //         "email": "emily.davis@example.com",
    //         "age": 25,
    //         "street": "321 Elm St",
    //         "city": "Houston",
    //         "state": "TX",
    //         "zip": "77001",
    //         "isActive": true,
    //         "roles": ["admin"]
    //     },
    //     {
    //         "id": 5,
    //         "name": "Michael Brown",
    //         "email": "michael.brown@example.com",
    //         "age": 40,
    //         "street": "654 Cedar St",
    //         "city": "Phoenix",
    //         "state": "AZ",
    //         "zip": "85001",
    //         "isActive": false,
    //         "roles": ["viewer", "editor"]
    //     },
    //     {
    //         "id": 6,
    //         "name": "Laura Wilson",
    //         "email": "laura.wilson@example.com",
    //         "age": 29,
    //         "street": "987 Maple Rd",
    //         "city": "Philadelphia",
    //         "state": "PA",
    //         "zip": "19019",
    //         "isActive": true,
    //         "roles": ["editor"]
    //     },
    //     {
    //         "id": 7,
    //         "name": "Chris Martinez",
    //         "email": "chris.martinez@example.com",
    //         "age": 33,
    //         "street": "159 Oak Cir",
    //         "city": "San Antonio",
    //         "state": "TX",
    //         "zip": "78201",
    //         "isActive": false,
    //         "roles": ["viewer"]
    //     },
    //     {
    //         "id": 8,
    //         "name": "Sophia Garcia",
    //         "email": "sophia.garcia@example.com",
    //         "age": 27,
    //         "street": "753 Willow Ln",
    //         "city": "San Diego",
    //         "state": "CA",
    //         "zip": "92101",
    //         "isActive": true,
    //         "roles": ["admin"]
    //     },
    //     {
    //         "id": 9,
    //         "name": "James Rodriguez",
    //         "email": "james.rodriguez@example.com",
    //         "age": 35,
    //         "street": "246 Birch Dr",
    //         "city": "Dallas",
    //         "state": "TX",
    //         "zip": "75201",
    //         "isActive": false,
    //         "roles": ["editor"]
    //     },
    //     {
    //         "id": 10,
    //         "name": "Olivia Hernandez",
    //         "email": "olivia.hernandez@example.com",
    //         "age": 24,
    //         "street": "369 Aspen Way",
    //         "city": "San Jose",
    //         "state": "CA",
    //         "zip": "95101",
    //         "isActive": true,
    //         "roles": ["viewer", "editor"]
    //     },
    //     {
    //         "id": 11,
    //         "name": "Daniel Lopez",
    //         "email": "daniel.lopez@example.com",
    //         "age": 31,
    //         "street": "852 Spruce Ln",
    //         "city": "Austin",
    //         "state": "TX",
    //         "zip": "73301",
    //         "isActive": true,
    //         "roles": ["admin"]
    //     },
    //     {
    //         "id": 12,
    //         "name": "Isabella Gonzalez",
    //         "email": "isabella.gonzalez@example.com",
    //         "age": 22,
    //         "street": "147 Poplar Ct",
    //         "city": "Jacksonville",
    //         "state": "FL",
    //         "zip": "32099",
    //         "isActive": false,
    //         "roles": ["editor"]
    //     },
    //     {
    //         "id": 13,
    //         "name": "David Lee",
    //         "email": "david.lee@example.com",
    //         "age": 45,
    //         "street": "369 Walnut St",
    //         "city": "Fort Worth",
    //         "state": "TX",
    //         "zip": "76101",
    //         "isActive": true,
    //         "roles": ["viewer"]
    //     },
    //     {
    //         "id": 14,
    //         "name": "Mia Perez",
    //         "email": "mia.perez@example.com",
    //         "age": 26,
    //         "street": "753 Chestnut Blvd",
    //         "city": "Columbus",
    //         "state": "OH",
    //         "zip": "43201",
    //         "isActive": true,
    //         "roles": ["admin", "editor"]
    //     },
    //     {
    //         "id": 15,
    //         "name": "Ethan White",
    //         "email": "ethan.white@example.com",
    //         "age": 38,
    //         "street": "951 Sycamore St",
    //         "city": "Indianapolis",
    //         "state": "IN",
    //         "zip": "46201",
    //         "isActive": false,
    //         "roles": ["viewer"]
    //     },
    //     {
    //         "id": 16,
    //         "name": "Amelia Harris",
    //         "email": "amelia.harris@example.com",
    //         "age": 32,
    //         "street": "123 Redwood Ave",
    //         "city": "Charlotte",
    //         "state": "NC",
    //         "zip": "28201",
    //         "isActive": true,
    //         "roles": ["editor"]
    //     },
    //     {
    //         "id": 17,
    //         "name": "Alexander Clark",
    //         "email": "alexander.clark@example.com",
    //         "age": 29,
    //         "street": "789 Willow St",
    //         "city": "San Francisco",
    //         "state": "CA",
    //         "zip": "94101",
    //         "isActive": true,
    //         "roles": ["admin"]
    //     },
    //     {
    //         "id": 18,
    //         "name": "Ella Lewis",
    //         "email": "ella.lewis@example.com",
    //         "age": 23,
    //         "street": "369 Magnolia Ln",
    //         "city": "Seattle",
    //         "state": "WA",
    //         "zip": "98101",
    //         "isActive": false,
    //         "roles": ["viewer", "editor"]
    //     },
    //     {
    //         "id": 19,
    //         "name": "William Walker",
    //         "email": "william.walker@example.com",
    //         "age": 37,
    //         "street": "456 Cypress Blvd",
    //         "city": "Denver",
    //         "state": "CO",
    //         "zip": "80201",
    //         "isActive": true,
    //         "roles": ["admin"]
    //     },
    //     {
    //         "id": 20,
    //         "name": "Charlotte Robinson",
    //         "email": "charlotte.robinson@example.com",
    //         "age": 21,
    //         "street": "654 Dogwood Ln",
    //         "city": "Boston",
    //         "state": "MA",
    //         "zip": "02101",
    //         "isActive": false,
    //         "roles": ["editor"]
    //     }
    // ]

    // return data
}

app.post('/api/add-user', async (req, res) => {
    try {
        await addUser(req.body)
        res.status(200).json({
            success: true,
            message: 'user added succcessfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error
        })
    }

})

app.get('/api/user-list', async (req, res) => {
    try {
        let userList = await redis.getValue('userList');
        if (!userList) {
            userList = await getAllUser()
            await redis.setValueWithExpireTime(
                'userList',
                '60',
                userList
            );
        }
        res.status(200).json({
            success: true,
            message: 'user fetched succcessfully',
            data: userList
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error
        })
    }


    // const { data, error } = await supabase
    //     .from('users') // Replace with your table name
    //     .select('*');            // Select all columns

    // if (error) {
    //     console.error('Error fetching data:', error);
    // } else {
    //     res.send(data);
    // }
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});