import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import BrowsePage from "./pages/BrowsePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import PostItemPage from "./pages/PostItemPage";
import MyItemsPage from "./pages/MyItemsPage";
import MyResponsesPage from "./pages/MyResponsesPage";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/post" element={
            <ProtectedRoute><PostItemPage /></ProtectedRoute>
          } />
          <Route path="/my-items" element={
            <ProtectedRoute><MyItemsPage /></ProtectedRoute>
          } />
          <Route path="/my-responses" element={
            <ProtectedRoute><MyResponsesPage /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}