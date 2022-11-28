import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
import SplashPage from "./components/SplashPage";
import { authenticate } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* SPLASH */}
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>

        {/* yeet both landing routes once landing is set up to auto render */}
        {/* <Route path='/landing/no-session' exact={true} >
          <LandingNoSession />
        </Route> */}

        {/* <Route path='/landing/session' exact={true} >
          <LandingSession />
        </Route> */}

        {/* USER */}
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        {/* STORIES */}
        {/* <Route path='/explore' exact={true} >
          <Explore />
        </Route> */}

        {/* <Route path="/storystream" exact={true}>
          <Storystream />
        </Route>

        <Route path="/stories/upload" exact={true}>
          <StoryCreateForm />
        </Route>

        <Route path="/stories/:storyId" exact={true}>
          <StoryDetailsPage />
        </Route>

        <Route path="/stories/:storyId/edit" exact={true}>
          <StoryUpdateForm />
        </Route> */}

        {/* PROTECTED COMPONENTS
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <Route>Page Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

// return (
//   <BrowserRouter>
//     <NavBar />
//     <Switch>
//       <Route path='/login' exact={true}>
//         <LoginForm />
//       </Route>
//       <Route path='/sign-up' exact={true}>
//         <SignUpForm />
//       </Route>
//       <ProtectedRoute path='/users' exact={true} >
//         <UsersList/>
//       </ProtectedRoute>
//       <ProtectedRoute path='/users/:userId' exact={true} >
//         <User />
//       </ProtectedRoute>
//       <Route path='/' exact={true} >
//         <h1>My Home Page</h1>
//       </Route>
//     </Switch>
//   </BrowserRouter>
// );
