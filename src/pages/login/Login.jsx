import { useEffect, useState } from "react";
import usePostApi from "../../hooks/usePostApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [showSignUp, setShowSignUp] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loginFn = async (e) => {
    e.preventDefault();
    const body = {
      userId: userId,
      password: password,
      userName: userName,
      userEmail: userEmail,
      userType: userType,
    };
    let data = await usePostApi("/crm/api/v1/auth/signin", body);
    if (data.accessToken) {
      localStorage.setItem("CrmToken", data.accessToken);
      localStorage.setItem("CrmUserName", data.name);
      localStorage.setItem("CrmUserType", data.userTypes);
      setMessage("Success");
      console.log("Data is " + JSON.stringify(data));
      navigate(`/${data.userTypes}`);
    } else {
      setMessage("login fail");
    }
  };

  const signupFn = async (e) => {
    e.preventDefault();
    const body = {
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: password,
      // userStatus: "APPROVED",
    };
    let data = await usePostApi("/crm/api/v1/auth/signup", body);
    setMessage("Success");
    setShowSignUp(false);
    console.log("Data is " + JSON.stringify(data));
  };

  useEffect(() => {
    let token = localStorage.getItem("CrmToken");
    if (token) {
    }
  }, []);

  return (
    <div>
      <div className="bg-info d-flex justify-content-center align-items-center vh-100">
        <div className="card card-signin m-5 p-5 shadow-lg rounded-4">
          <div className="row m-2">
            <div>
              <h4 className="text-center">
                {showSignUp ? "Sign Up" : "Login"}
              </h4>
              <form onSubmit={showSignUp ? signupFn : loginFn}>
                <div className="input-group m-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Id"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control m-1"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {showSignUp && (
                  <>
                    <div className="input-group m-1">
                      <input
                        type="userName"
                        className="form-control"
                        placeholder="User Name"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group m-1">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        id="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group m-1">
                      <select
                        className="form-control"
                        defaultValue={"CUSTOMER"}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        {["CUSTOMER", "ENGINEER", "ADMIN"].map((option, i) =>
                          option == "CUSTOMER" ? (
                            <option
                              key={i}
                              defaultValue={"CUSTOMER"}
                              value={option}
                            >
                              {option}
                            </option>
                          ) : (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </>
                )}
                <div className="input-group my-2 ms-1">
                  <input
                    type="submit"
                    className="form-control btn btn-primary"
                    value={showSignUp ? "Sign Up" : "Login"}
                  />
                </div>
                <div
                  className="input-group h6 text-primary "
                  onClick={(e) => setShowSignUp(!showSignUp)}
                >
                  <ins>
                    {showSignUp
                      ? "Already have an account? Login"
                      : "Don't have an account? sign up"}
                  </ins>
                </div>
                <div className="h4  text-success">{message}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
