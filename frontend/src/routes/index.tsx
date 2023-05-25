import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Project } from '../pages/Project';
import { Serie } from '../pages/Serie';
import { Home } from '../pages/Home';
import { Page404 } from '../pages/Page404';
import Layout from '../pages/Layout';
import { LoginPage } from '../pages/Login';
import { LoginAdmPage } from '../pages/LoginAdm';
import { RecoverPasswordPage } from '../pages/RecoverPassword';
import { Profile } from '../pages/Perfil';
import { Visitant } from '../pages/Visitant';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path='login' element={<LoginPage />} />
					<Route path='loginAdm' element={<LoginAdmPage />} />
					<Route path='RecoverPasswordPage' element={<RecoverPasswordPage />} />
					<Route path='home' element={<Home />} />
					<Route path='visitant' element={<Visitant />} />
					<Route path='profile' element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes;

