import {Route, Routes} from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage';
import UserTable from '../components/pages/UserPage/UserTable';
import UserPage from '../components/pages/UserPage/UserPage';
import AuthenticatedHomePage from '../components/pages/AuthenticatedHomePage';
import authorities from '../config/Authorities';
import GroupDetailPage from "../components/pages/GroupDetailPage";
import GroupEditPage from "../components/pages/GroupEditPage";
import CreateGroupFormPage from "../components/pages/CreateGroupFormPage";
import GroupsPage from "../components/pages/GroupsPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />

      <Route
        path={'/users'}
        element={<PrivateRoute requiredAuths={[]} element={<UserTable />} />}
      />
      <Route
        path='/useredit'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_DEACTIVATE, authorities.USER_CREATE]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/useredit/:userId'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_READ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
          path='/authenticatedHome'
          element={
              <PrivateRoute
                  requiredAuths={[]}
                  element={< AuthenticatedHomePage />}
              ></PrivateRoute>
          }
      />
        <Route
            path='/admin/groups'
            element={
                <PrivateRoute
                    requiredAuths={[authorities.GROUP_READ]}
                    element={<GroupsPage />}
                ></PrivateRoute>
            }
        />
        <Route
            path='/admin/groups/:groupId'
            element={
                <PrivateRoute
                    requiredAuths={[authorities.GROUP_READ]}
                    element={<GroupDetailPage />}
                ></PrivateRoute>
            }
        />
        <Route
            path='/admin/groups/edit/:groupId'
            element={
                <PrivateRoute
                    requiredAuths={[authorities.GROUP_MODIFY]}
                    element={<GroupEditPage />}
                ></PrivateRoute>
            }
        />
        <Route
            path='/admin/groups/create'
            element={
                <PrivateRoute
                    requiredAuths={[authorities.GROUP_MODIFY]}
                    element={<CreateGroupFormPage />}
                ></PrivateRoute>
            }
        />
        <Route
            path='/user/group'
            element={
                <PrivateRoute
                    requiredAuths={[]}
                    element={<GroupDetailPage />}
                ></PrivateRoute>
            }
        />

      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
