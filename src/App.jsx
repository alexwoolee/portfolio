/* CSS files */
import "./styles.css"
import "aos/dist/aos.css"
import 'simplebar-react/dist/simplebar.min.css'

/* React hooks */
import { useEffect } from "react"

/* Third-party libraries */
import { useParams } from "react-router"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AOS from "aos"
import SimpleBar from 'simplebar-react'

/* Components */
import Layout from "@/components/Layout/Layout.jsx"
import Home from "@/components/HomeSection/Home.jsx"
import About from "@/components/AboutSection/About.jsx"
import Projects from "@/components/ProjectShowcase/Projects.jsx"
import Blog from "@/components/BlogSection/Blog.jsx"
import BlogPage from "@/components/BlogSection/BlogPage.jsx"
import Settings from "@/components/SettingsSection/Settings.jsx"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])

  let { id } = useParams()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="home" element={<Home />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/proj" element={<Projects />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="blog/:id" element={<BlogPage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App