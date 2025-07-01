import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/queryClient'
import { AuthProvider } from './AuthContext.jsx'  // <-- import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>  {/* Wrap with AuthProvider here */}
                    <App />
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
)
