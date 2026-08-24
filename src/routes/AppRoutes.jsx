import { Routes, Route } from "react-router-dom"

import DashboardLayout from "@/layouts/DashboardLayout"
import MainLayout from "@/layouts/MainLayout"

import ProtectedRoute from "./ProtectedRoute"

import { Home, Login, NotFound, WineDetails, Dashboard, ManageWines, CreateWine, EditWine, EditProfile } from "@/pages"
import GuestRoute from "./GuestRoute"


const AppRoutes = () => {
  return (
    <>
      <Routes>

        {/* Pages accessibles uniquement aux visiteurs */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Site public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wines/:slug" element={<WineDetails />} />
        </Route>

        {/* Dashboard protégé */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/dashboard/edit-profile" element={<EditProfile />} />

            <Route path="/dashboard/wines" element={<ManageWines />} />
            <Route path="/dashboard/wines/create" element={<CreateWine />} />
            <Route path="/dashboard/wines/:slug/edit" element={<EditWine />} />

          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default AppRoutes