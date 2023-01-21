import { Button } from 'antd';
import axios from 'axios';
import { useQuery } from 'react-query';
export function Logout() {
    const onClickLogout = async () => {
        await axios.get('/api/logout');
    }
    return (
        <>
            <Button onClick={onClickLogout}>Logout</Button>
        </>
    )
}

