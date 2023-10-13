//Layouts
import MainLayout from "../Layouts/MainLayout";
import PortalLayout from "../Layouts/PortalLayout";

//Pages
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import { renderRoutes } from "./Generate-routes";

export const routes = [
    {
        layout: MainLayout,
        routes: [
            {
                name: 'login',
                title: 'Login page',
                component: Login,
                path: '/login',
                isPublic: true,
            },
            {
                name: 'register',
                title: 'register page',
                component: Register,
                path: '/register',
                isPublic: true,
            }
        ]
    },
    {
        layout: PortalLayout,
        routes: [
            {
                name: 'home',
                title: 'Home page',
                component: Home,
                path: '/home'
            }
        ]
    }
];

export const Routes = renderRoutes(routes);
