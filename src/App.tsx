import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import MainLayout from './layouts/MainLayout/MainLayout'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import BankPage from './pages/Bank/BankPage'
import SkillsMainPage from './pages/Skills/SkillsMainPage'
import AdminPage from './pages/Admin/AdminPage'
import CharacterCreationPage from './pages/CharacterCreation/CharacterCreationPage'
import CharacterSelectionPage from './pages/CharacterSelection/CharacterSelectionPage'
import CharactersProtectedRoute from './components/CharactersProtectedRoute/CharactersProtectedRoute'
import ShopPage from './pages/Shop/ShopPage'
import CombatPage from './pages/Combat/CombatPage'
import SettingsPage from './pages/Settings/SettingsPage'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css'

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/create" element={<CharacterCreationPage />} />
                    <Route path="/select" element={<CharacterSelectionPage />} />
                    <Route element={<CharactersProtectedRoute />}>
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/bank" element={<BankPage />} />
                        <Route path="/combat" element={<CombatPage />} />
                        <Route path="/skills/:skill" element={<SkillsMainPage  />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/initialize" element={<AdminPage/>} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
