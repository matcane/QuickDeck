import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const RegisterForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const register = useAuthStore((state) => state.register);
    return (
        <form className="flex flex-col justify-center gap-4 h-screen w-3/4 mx-auto md:w-1/2 lg:w-1/3">
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="name"
                        value="Your name"
                        className="text-4xl"
                    />
                </div>
                <TextInput
                    className="text-4xl"
                    id="name"
                    type="name"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    shadow
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="password"
                        value="Your password"
                        className="text-4xl"
                    />
                </div>
                <TextInput
                    className="text-4xl"
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    shadow
                />
            </div>
            <div className="flex items-center gap-2">
                <Label htmlFor="agree" className="flex">
                    You already have account?
                </Label>
                <Link to="/acc/login">
                    <Button size="xs" color="gray" pill>
                        Log In
                    </Button>
                </Link>
            </div>
            <Button
                type="button"
                size="xl"
                onClick={() => register(username, password)}
            >
                Register new account
            </Button>
        </form>
    );
};

export default RegisterForm;