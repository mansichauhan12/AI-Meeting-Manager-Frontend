import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Workspace Pages
import WorkspaceList from "./pages/Workspace/WorkspaceList";
import WorkspaceDetails from "./pages/Workspace/WorkspaceDetails";
import AppLayout from "./components/AppLayout";

// Meeting Pages
import MeetingList from "./pages/Meetings/MeetingList";
import UploadMeeting from "./pages/Meetings/UploadMeeting";
import MeetingDetails from "./pages/Meetings/MeetingDetails";

// Task Pages
import ActionItemList from "./pages/ActionItems/ActionItemList";

import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/workspaces" replace />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Navigate to="/workspaces" replace />} />

          {/* Workspaces Routes */}
          <Route
            path="/workspaces"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <WorkspaceList />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workspaces/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <WorkspaceDetails />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Meeting Routes */}
          <Route
            path="/workspaces/:workspaceId/meetings"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MeetingList />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workspaces/:workspaceId/meetings/upload"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <UploadMeeting />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workspaces/:workspaceId/meetings/:meetingId"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MeetingDetails />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Task Routes */}
          <Route
            path="/workspaces/:workspaceId/tasks"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ActionItemList />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0A0A0A",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
