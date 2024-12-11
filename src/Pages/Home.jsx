import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { UserList } from '../Http/api';
import { supabase } from '../Supabase';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

dayjs.extend(relativeTime);
const Home = () => {
    const [refreshTime, setRefreshTime] = useState(null);
    const [users, setUsers] = useState([])
    const [seen, setSeen] = useState(true);

    const columns = [
        {
            title: 'sno',
            dataIndex: 'custrownum',
            key: 'custrownum',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'purpose',
            dataIndex: 'purpose',
            key: 'purpose',
        },

        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        // },
        {
            title: 'purposetext',
            dataIndex: 'purposetext',
            key: 'purposetext',
        },
        {
            title: 'api_statustext',
            dataIndex: 'api_statustext',
            key: 'api_statustext',
        },
    ];
    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //         render: (text) => <a>{text}</a>,
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //         key: 'email',
    //     },

    //     // {
    //     //     title: 'Age',
    //     //     dataIndex: 'age',
    //     //     key: 'age',
    //     // },
    //     {
    //         title: 'State',
    //         dataIndex: 'state',
    //         key: 'state',
    //     },
    //     {
    //         title: 'City',
    //         dataIndex: 'city',
    //         key: 'city',
    //     },
    // ];

    // const handleClick = () => {
    //     const currentTime = new Date().getTime(); // Get current time in milliseconds
    //     localStorage.setItem('pastTime', currentTime); // Store the current time in local storage
    //     console.log('Past time stored:', new Date(currentTime).toLocaleString());

    //     setTimeout(() => {
    //         const pastTime = localStorage.getItem('pastTime');
    //         if (pastTime) {
    //             const currentTime = new Date().getTime();
    //             const diffDate = new Date(currentTime - pastTime);

    //             const formattedDifference = `${diffDate.getDate()}-${diffDate.getMonth() + 1}-${diffDate.getFullYear()} ${diffDate.getHours()}:${String(diffDate.getMinutes()).padStart(2, '0')}`;

    //             console.log(`Time difference in desired format: ${formattedDifference}`);
    //             setDifference(formattedDifference);
    //         }
    //     }, 60000);
    // };
    // setInterval(() => {
    //     const diffDate = new Date(currentTime - pastTime);
    // }, 10000)



    // useEffect(() => {
    //     setDifference(new Date().toLocaleString())
    // })
    // const fetchData = async () => {
    //     let { data: items, error } = await supabase.from('users').select('*');
    //     if (error) console.error('Error fetching data:', error);
    //     else setUsers([...items]);
    // };
    // useEffect(() => {
    //     fetchData();
    // }, [])


    // useEffect(() => {
    //     // Check if the time is already stored in local storage
    //     let storedTime = localStorage.getItem("refreshTime");

    //     // If not, set the current time in local storage
    //     if (!storedTime) {
    //         storedTime = new Date().toISOString();
    //         localStorage.setItem("refreshTime", storedTime);
    //     }

    //     // Set the formatted time in state
    //     setRefreshTime(dayjs(storedTime).format("DD-MM-YYYY HH:mm"));

    //     // Update the time every minute
    //     const intervalId = setInterval(() => {
    //         const currentTime = new Date().toISOString();
    //         const storedTime = localStorage.getItem("refreshTime");

    //         const diffTime = dayjs(currentTime).diff(dayjs(storedTime), "minute"); // Difference in minutes
    //         const refreshedTime = dayjs(storedTime)
    //             .add(diffTime, "minute")
    //             .format("DD-MM-YYYY HH:mm");

    //         setRefreshTime(refreshedTime);
    //     }, 60000); // Runs every 60 seconds

    //     // Cleanup the interval on component unmount
    //     return () => clearInterval(intervalId);
    // }, []);
    const checkRefreshTime = () => {
        // Check if the time is already stored in local storage
        let storedTime = localStorage.getItem("refreshTime");

        // If not, set the current time in local storage
        if (!storedTime) {
            storedTime = new Date().toISOString();
            localStorage.setItem("refreshTime", storedTime);
        }

        // Set the initial relative time
        setRefreshTime(dayjs(storedTime).fromNow());

        // Update the relative time every minute
        const intervalId = setInterval(() => {
            const storedTime = localStorage.getItem("refreshTime");
            setRefreshTime(dayjs(storedTime).fromNow());

        }, 60000); // Update every 60 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }

    const getUserList = async () => {
        localStorage.removeItem('refreshTime');
        setSeen(true);
        checkRefreshTime();
        const response = await UserList()
        setUsers([...response])
        // if (response?.success) {
        //     setUsers([...response?.data])
        // }
    }

    useEffect(() => {
        checkRefreshTime();
    }, [refreshTime]);

    const checkNotification = async () => {
        const { data, error } = await supabase
            .from('notifications') // Replace with your table name
            .select('*');  // Select all columns

        if (error) {
            throw new Error(error.message); // Throw an error to propagate it
        }
        console.log(data, 'data');
        setSeen(data[0]?.seen);
        return data;
    }
    useEffect(() => {
        // Call the API immediately when the component mounts
        checkNotification();

        // Set an interval to call the API every 30 seconds (30000 ms)
        const intervalId = setInterval(checkNotification, 30000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once (on mount)


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Button
                    onClick={getUserList}
                >Fetch Users</Button>
                {

                }
                {
                    !seen &&    
                    <FontAwesomeIcon icon={faBell} size="1x" color='green' />
                }
            </div>
            {refreshTime ? <p>Last Updated Time: {refreshTime}</p> : <p>Initializing...</p>}
            {/* <Table columns={columns} dataSource={users} /> */}
            <Table columns={columns} dataSource={users} pagination={false} />
        </>
    )
}

export default Home;