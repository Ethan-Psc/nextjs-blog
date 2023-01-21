import { getUserFromReq } from 'utils/server'
import { memo } from 'react';
export const User = ({ name }) => {
    return (
        <div>{name}</div>
    )
}
export const getServerSideProps = async (ctx) => {
    const user = await getUserFromReq(ctx.req);
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    else {
        return {
            props: {
                name: user.name
            }
        }
    }
}
export default memo(User);