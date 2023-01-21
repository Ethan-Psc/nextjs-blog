import { client } from 'pages/_app'
import { Button, Form, Input } from 'antd';
import { useMutation } from 'react-query';
import request from 'utils/axios';
import axios from 'axios';
const editLink = (linkId) => async ({ title, url }) => {
    await axios.put(`/api/link/${linkId}`, { title, url });
}
const deleteLink = (linkId) => async () => {
    await axios.delete(`/api/link/${linkId}`);
}
interface IProps {
    link: {
        title: string,
        url: string,
        id: string
    }
}
export const EditLink: React.FC<IProps> = (props: IProps) => {
    const { link } = props;
    const editLinkAction = useMutation(editLink(link.id), {
        onSuccess() {
            client.invalidateQueries('getLinks');
            alert('edit success');
        },
        onError() {
            alert('edit fail')
        }
    })
    const deleteLinkAction = useMutation(deleteLink(link.id), {
        onSuccess() {
            client.invalidateQueries('getLinks');
            alert('delete success');
        },
        onError() {
            alert('delete fail')
        }
    })
    const onClickEdit = (values) => {
        const { title, url } = values;
        editLinkAction.mutate({ title, url });
    }
    const onClickDelete = () => {
        deleteLinkAction.mutate();
    }
    return (
        <div>
            <Form onFinish={(values) => onClickEdit(values)}>
                <Form.Item label="Title" name="title" rules={[{ required: false, message: 'please edit title' }]}>
                    <Input defaultValue={link.title} value={link.title} onChange={(e) => { link.title = e.target.value }} />
                </Form.Item>
                <Form.Item label="Url" name="url" rules={[{ required: false, message: 'please edit url' }]}>
                    <Input defaultValue={link.url} value={link.url} onChange={(e) => { link.url = e.target.value }} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>submit</Button>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' onClick={onClickDelete}>delete</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
