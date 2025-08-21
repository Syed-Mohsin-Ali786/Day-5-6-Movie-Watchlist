
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import CreateContext from './createContext/CreateContext.jsx'

createRoot(document.getElementById('root')).render(
  <CreateContext>
    <App />
  </CreateContext>,
)
