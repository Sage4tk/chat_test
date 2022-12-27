import { useEffect, useState } from "react";

interface LoginProps {
    setToken: Function
}

const Login:React.FC<LoginProps> = ({
    setToken
}) => {

    // form state
    const [form, setForm] = useState("");

    // form listener
    const formListener = (e:any) => {
        setForm(e.target.value);
    }

    // submit token
    const submitToken = (e:any) => {
        e.preventDefault();
        // check if only contains white spaces
        if (!form.replace(/\s/g, '').length) {
            alert("Only contains whitespaces");
            return;
        }

        // set token
        setToken(form);
    }

    return (
        <>
        <form onSubmit={submitToken}>
            <input type="text" value={form} onChange={formListener} />
            <input value="submit" type="submit" />
        </form>
        </>
    )
}

export default Login;