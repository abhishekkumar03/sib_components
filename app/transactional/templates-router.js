import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// Layouts
import MainLayout from './layouts/main-layout';
ReactDOM.render(
    <MainLayout />, 
    document.getElementById('content')
);
