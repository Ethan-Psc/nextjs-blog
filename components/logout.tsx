import { Button } from 'antd';
import axios from 'axios';
import { memo } from 'react';
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

export default memo(Logout);