import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Auth0Provider} from  "@auth0/auth0-react"
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Auth0Provider
  domain="dev-b23vjjzdxyukot52.us.auth0.com"
  clientId="9iwwicyyJ2MDW9Jbp16rEOa6ivbqTseu"
  authorizationParams={{
    redirect_uri: "http://localhost:5173/",
  }}
  audience="http://localhost:8000" // Ensure this is correct
  scope="openid profile email"
>
  <App />
</Auth0Provider>

  </StrictMode>,
)
