import { Route, Routes, Navigate } from "react-router"
import Home from "./pages/Home"
import IssueDetail from "./pages/IssueDetail"

export default () => {
    return <Routes>
      <Route path="/" element={<Navigate to="/issues" replace  />} />
      <Route path="issues">
        <Route index element={<Home />} />
        <Route path=":issueId" element={<IssueDetail />} />
      </Route>
    </Routes>
}