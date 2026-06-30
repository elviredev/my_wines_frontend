import { Routes, Route } from "react-router-dom"

import DashboardLayout from "@/layouts/DashboardLayout"
import MainLayout from "@/layouts/MainLayout"

import { Home, Login, NotFound, WineDetails, Dashboard, ManageWines, CreateWine, EditWine, ManageCategories, CreateCategory, EditCategory, Profile } from "@/pages"


const AppRoutes = () => {
  return (
    <>
      <Routes>

        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Site public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wine/:slug" element={<WineDetails />} />
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/profile" element={<Profile />} />

          <Route path="/dashboard/wines" element={<ManageWines />} />
          <Route path="/dashboard/wines/create" element={<CreateWine />} />
          <Route path="/dashboard/wines/:id/edit" element={<EditWine />} />

          <Route path="/dashboard/categories" element={<ManageCategories />} />
          <Route path="/dashboard/categories/create" element={<CreateCategory />} />
          <Route path="/dashboard/categories/:id/edit" element={<EditCategory />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default AppRoutes