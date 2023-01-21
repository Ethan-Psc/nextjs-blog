// 使用jwt 登陆凭证
// 使用 prisma 创建数据库访问接口
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useMutation } from 'react-query';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const loginAccount = async ({ username, password }) => {
    await axios.post('/api/login', { username, password });
}
export const LoginForm = (props) => {
    const loginAction = useMutation(loginAccount, {
        onSuccess() {
            alert('success');
        }
    });
    const onClickLogin = (values) => {
        const { username, password } = values
        loginAction.mutate({ username, password });
    }
    return (
        <>
            <Form onFinish={(values) => onClickLogin(values)} onFinishFailed={onFinishFailed}>
                <Form.Item label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
