import { LoginForm } from "components/login";
import { SignupForm } from "components/signup";
import { Logout } from "components/logout";
import Link from "components/link";
import { memo } from "react";
export const Login = () => {
    return (
        <>
            <LoginForm />
            <SignupForm />
            <Logout />
            <Link />
        
        </>
    )
}
export default memo(Login)
