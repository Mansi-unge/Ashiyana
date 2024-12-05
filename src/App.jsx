import './App.css'
import Website from './pages/Website'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './components/Layout'
import Properties from './pages/Properties'
import {QueryClient , QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
 import { ToastContainer } from 'react-toastify'
 import "react-toastify/dist/ReactToastify.css"

function App() {

  const queryClient = new QueryClient ();
  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Suspense
          fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <video autoPlay loop muted style={{ maxWidth: '100%' }}>
                <source src="/loading_animation.mp4" type="video/mp4" />
                Discover your dream home! Stay tuned for an exclusive experience. 🏡
              </video>
            </div>
          }
        >
          <Routes>
            <Route element={<Layout/>}>
            <Route path="/" element={<Website />} />
            <Route path="/Properties" element={<Properties/>} ></Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer/>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )
}

export default App
