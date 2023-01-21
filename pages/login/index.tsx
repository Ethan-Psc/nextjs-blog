import { LoginForm } from "components/login";
import { SignupForm } from "components/signup";
import { Logout } from "components/logout"
import { memo } from "react";
export const Login = () => {
    return (
        <>
            <LoginForm />
            <SignupForm />
            <Logout />
        </>
    )
}
export default memo(Login)