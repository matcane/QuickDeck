import { sign_out } from "../services/auth";


function HomePage () {

    const Logout = async (e) => {
        e.preventDefault();
        await sign_out();
        window.localStorage.clear();
        window.location.reload(false);
    };


    return (
        <>
          <h1>USER LOGGED</h1>
          <button onClick={(e) => Logout(e)}>Sign out</button>
        </>
    )
}

export default HomePage