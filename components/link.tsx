import { memo, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { useMutation, useQuery } from 'react-query';
import request from 'utils/axios';
import { client } from 'pages/_app'
import { EditLink } from 'components/editLink'
const createLink = async ({ title, url }) => {
    await request.post('/api/link', { title, url });
}
const getLinks = async () => {
    const res = await request.get('/api/link');
    console.log(res);
    return res.data;
}
export const LinkForm = () => {
    const linkAction = useMutation(createLink, {
        onSuccess() {
            client.invalidateQueries('getLinks');
            alert('create success');
        },
        onError() {
            alert('create fail');
        }
    });
    const onClickCreateLink = (values) => {
        const { title, url } = values;
        linkAction.mutate({ title, url });
    }
    const getLinksQuery = useQuery('getLinks', getLinks);
    useEffect(() => {
        console.log(getLinksQuery);
    }, [])
    return (
        <div>
            <Form onFinish={(values) => onClickCreateLink(values)}>
                <Form.Item label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Url"
                    name="url"
                    rules={[{ required: true, message: 'Please input your url!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button className="
      py-2
      px-4
      font-semibold
      rounded-lg
      shadow-md
      text-white
      bg-green-500
      hover:bg-green-700
      border-none
      cursor-pointer
    " type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {getLinksQuery.isLoading && <div>Loading!!!</div>}
                {getLinksQuery.data && getLinksQuery.data.map((item) => {
                    return (
                        <>
                            <div>{item.title}</div>
                            <a href={item.url}>{item.url}</a>
                            <EditLink link={item} />
                        </>
                    )
                })}
            </div>
        </div>
    )
}
export default memo(LinkForm);