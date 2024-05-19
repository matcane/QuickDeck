import React from "react";
import { sign_in, sign_up } from "../services/auth";
import { Button, Label, TextInput } from "flowbite-react";
import { jwtDecode } from "jwt-decode";

export function Auth({type, toggle}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const clear = () => {
        setUsername("");
        setPassword("");
        window.location.reload(false);
    }

    const handleOnSubmit = async () => {
        setIsLoading(true);
        if (type === "sign up") {
            const response = await sign_up(username, password);
            type = "sign in";
        }
        if (type === "sign in") {
            const response = await sign_in(username, password);
            setIsLoading(false);
            window.localStorage.clear();
            window.localStorage.setItem('access_token', response.access);
            window.localStorage.setItem('refresh_token', response.refresh);
            window.localStorage.setItem("isLogged", true);
            window.localStorage.setItem("view", "Dashboard");
            window.localStorage.setItem("username", jwtDecode(response.access).username);
            clear();
        }
      };

    const handleToggle = () => {
        clear();
        if(type === "sign up") { toggle("sign in") }
        else { toggle("sign up") }
    }

  return (
    <form className="flex flex-col justify-center gap-4 h-screen w-3/4 mx-auto md:w-1/2 lg:w-1/3">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" className="text-4xl" />
        </div>
        <TextInput className="text-4xl" size="lg" id="name" type="name" placeholder="username" required shadow value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" className="text-4xl"/>
        </div>
        <TextInput className="text-4xl" id="password" type="password" placeholder="********" required shadow value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="agree" className="flex">
            {type === "sign up" && <>You already have account?</>}
            {type === "sign in" && <>Don't have account?</>}
        </Label>
        <Button size="xs" color="gray" onClick={() => handleToggle()} pill>
            {type === "sign up" && <>Log In</>}
            {type === "sign in" && <>Register</>}
        </Button>
      </div>
      <Button isProcessing={isLoading} type="button" size="xl" onClick={() => handleOnSubmit()}>
        {type === "sign up" && <>Register new account</>}
        {type === "sign in" && <>Login to your account</>}
        </Button>
    </form>
  );
}
