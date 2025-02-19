import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import CreateGroupFormPage from "./components/pages/CreateGroupFormPage";
import GroupDetailPage from "./components/pages/GroupDetailPage";
import GroupEditPage from "./components/pages/GroupEditPage";
import GroupUpdatePage from "./components/pages/GroupUpdatePage";
import './App.css';

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path="create" element={<CreateGroupFormPage />} />
          <Route path="detail" element={<GroupDetailPage />} />
          <Route path="edit" element={<GroupEditPage />} />
          <Route path="update" element={<GroupUpdatePage />} />
      </Routes>
  );
}

export default App;
