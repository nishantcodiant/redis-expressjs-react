import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { UserList } from '../Http/api';
const Home = () => {
    const [users, setUsers] = useState([])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
    ];

    const getUserList = async () => {
        const response = await UserList()
        if (response?.success) {
            setUsers([...response?.data])
        }
    }
    useEffect(() => {
    }, [])
    return (
        <>
            <Button
                onClick={getUserList}
            >Fetch Users</Button>
            <Table columns={columns} dataSource={users} />
        </>
    )
}

export default Home;