import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
  createHashRouter,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import DetailActivity from './img/DetailActivity/detail-activity';
import store from './store';
import { Provider } from 'react-redux'

const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:'detail/:idActivity',
    element: <DetailActivity/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
//   </Provider>
// );

root.render(
  <Provider store={store}>
    <React.StrictMode>
        <HashRouter basename='/'>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="detail/:idActivity" element={<DetailActivity />} />
          </Routes>
        </HashRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
