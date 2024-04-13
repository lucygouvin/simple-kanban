import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"

export function LandingPage() {
  return (
    <>
      <h1>Landing Page!</h1>
      <GoogleLogin 
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential)
          console.log(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

export default LandingPage;
