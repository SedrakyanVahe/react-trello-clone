import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import './assets/style/_index.scss'
import { RootScreen } from './routes/root.screen'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <RootScreen />
    </BrowserRouter>
  </Provider>
)
