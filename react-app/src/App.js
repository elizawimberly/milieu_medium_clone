import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavigationBars/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import StoryDetailsPage from "./components/Stories/StoryDetailsPage";
import StoryCreateForm from "./components/Stories/CreateStoryForm";
import StoryUpdateForm from "./components/Stories/UpdateStoryForm";
import Footer from "./components/Footer";

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

        {/* USER */}
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        {/* STORIES */}

        <Route path="/stories/upload" exact={true}>
          <StoryCreateForm />
        </Route>

        <Route path="/stories/:storyId" exact={true}>
          <StoryDetailsPage />
        </Route>

        <Route path="/stories/:storyId/edit" exact={true}>
          <StoryUpdateForm />
        </Route>

        {/* PROTECTED COMPONENTS
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <Route>Page Not Found</Route>
      </Switch>
      <Footer />
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
