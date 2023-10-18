import {
    HomePage,
    Login, SingUp, LoadMusic, Detail, Search, UsesPage, NhacCuaTui, Type
} from "../Views"




export const publicRoute = [
    { path: "/", component: <HomePage /> },
    { path: "/LoadMusic", component: <LoadMusic /> },
    { path: "/Detail/:id", component: <Detail /> },
    { path: "/Search/:keySearch", component: <Search /> },
    { path: "/UsesPage", component: <UsesPage /> },
    { path: "/NhacCuaTui", component: <NhacCuaTui /> },
    { path: "/Type/:theloai", component: <Type /> },



]


export const privateRoute = [
    { path: "/Login", component: <Login /> },
    { path: "/SingUp", component: <SingUp /> },


]