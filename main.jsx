import React from 'react';
import ReactDom from 'react-dom/client';

import QRcode from './QRcode';
import './QRcode.css'



ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <QRcode /> 

    </React.StrictMode>
);
