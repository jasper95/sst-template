import { get } from 'aws-amplify/api';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import type { AuthUser } from 'aws-amplify/auth'
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { trpc } from './api/trpc';

const App = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("signup");
  const { data } = trpc.greeting.hello.useQuery({ name: 'what'});
  console.log('data: ', data);


  // Get the current logged in user info
  const getUser = async () => {
    const user = await getCurrentUser()
      .catch(() => null);
    if (user) setUser(user);
    setLoading(false);
  };

  // Logout the authenticated user
  const signOut = async () => {
    await signOut();
    setUser(null);
  };

  // Send an API call to the /public endpoint
  const publicRequest = async () => {
    const response = await get({ apiName: 'api',  path: '/public'}).response;
    alert(JSON.stringify(response));
  };

  // Send an API call to the /private endpoint with authentication details.
  const privateRequest = async () => {
    try {
      const response = await get({apiName: 'api', 'path': '/private',
      options: {
        headers: {
         Authorization: `Bearer ${(await fetchAuthSession())
           .tokens?.accessToken.toString()}`,
       },
      }
    }).response;
      alert(JSON.stringify(response.body));
    } catch (error) {
      alert(error);
    }
  };

  // Check if there's any user on mount
  useEffect(() => {
    getUser();
  }, []);



  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>SST + Cognito + React</h2>
      {user ? (
        <div className="profile">
          <p>Welcome!</p>
          <p>{user.username}</p>
          <button onClick={signOut}>logout</button>
        </div>
      ) : (
        <div>
          {screen === "signup" ? (
            <Signup setScreen={setScreen} />
          ) : (
            <Login setScreen={setScreen} setUser={setUser} />
          )}
        </div>
      )}
      <div className="api-section">
        <button onClick={publicRequest}>call /public</button>
        <button onClick={privateRequest}>call /private</button>
      </div>
    </div>
  );
};

export default App;
