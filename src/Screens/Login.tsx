import { useState } from "react";
import BAButton from "../Components/BAButton";
import BAInput from "../Components/BAInput";
import { Link, useNavigate } from "react-router-dom";
import { fbLogin } from "../config/firebasemethids";

export default function Login() {
    const navigate = useNavigate()
    const [model, setModel] = useState<any>({ email: '', password: ''});

    const fillModel = (key: string, val: any) => {
        model[key] = val;
        setModel({ ...model });
    };



    let LoginUser = () => {
        console.log(model);
        fbLogin(model)
             .then((user) => {
                if (user && user.role === "Admin") {
                    navigate("/adminpanel");
                } else {
                    navigate("/quiz");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen flex justify-center items-center">
                <div className="w-[500px] bg-[rgba(255,255,255,.2)] p-10 rounded-lg">
                    <div className="py-3">
                        <h1 className="text-4xl tracking-wide  font-medium text-dark  text-center">Login</h1>
                    </div>

                    <div className="py-3">
                        <BAInput
                            value={model.email}
                            onChange={(e: any) => fillModel("email", e.target.value)}
                            label="Email"
                        />
                    </div>
                    <div className="py-3">
                        <BAInput
                            value={model.password}
                            onChange={(e: any) => fillModel("password", e.target.value)}
                            label="Password"
                        />
                    </div>
                    <div className="py-3">
                        <BAButton onClick={LoginUser} label="Log In " />
                        <div style={{ float: 'right' }}>
                            <p className=" ">Have an account <Link className="p-3  text-light" to="/signup">SignUp</Link> </p>

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}