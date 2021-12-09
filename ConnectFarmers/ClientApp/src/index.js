
import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './layout/index';
import { LocalStorageProvider } from '../src/context'
import { BrowserRouter, useLocation, Routes, Route } from 'react-router-dom';

ReactDOM.render(
    <LocalStorageProvider>
        <BrowserRouter>
            <AppWrapper />
        </BrowserRouter>
    </LocalStorageProvider>,
    document.getElementById('root')
);

