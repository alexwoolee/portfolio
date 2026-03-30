/* Third-party libraries */
import { useParams } from "react-router"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

/* Components */
import Layout from "@/components/layout/Layout.jsx"
import Home from "@/components/home/Home.jsx"
import About from "@/components/about/About.jsx"
import Projects from "@/components/projects/Projects.jsx"
import Blog from "@/components/blog/Blog.jsx"
import BlogPage from "@/components/blog/BlogPage.jsx"
import Settings from "@/components/settings/Settings.jsx"
import Interface from "@/components/interfaces/Interface"
import BackgroundMusic from "@/components/media/BackgroudMusic"

function App() {
  let { id } = useParams()

  return (
    <>
      <BackgroundMusic />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/proj" element={<Projects />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/interface" element={<Interface />}></Route>
            <Route path="blog/:id" element={<BlogPage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App