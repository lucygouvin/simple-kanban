import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  return (
    <>
      <header className="header">
        <h1>SimpleKanban</h1>
      </header>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          const decoded = jwtDecode(credentialResponse.credential);
          localStorage.setItem("id_token", credentialResponse.credential);
          console.log(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <button onClick={() => localStorage.removeItem("id_token")}>
        Sign Out
      </button>
    </>
  );
};

export default Header;
