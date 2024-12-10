import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { UserList } from '../Http/api';
import { supabase } from '../Supabase';
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
    // const fetchData = async () => {
    //     let { data: items, error } = await supabase.from('users').select('*');
    //     if (error) console.error('Error fetching data:', error);
    //     else setUsers([...items]);
    // };
    // useEffect(() => {
    //     fetchData();
    // }, [])
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