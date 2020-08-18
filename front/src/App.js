import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import authService from './services/auth.service';



const App = () => {
    const [term, setTerm] = useState('hola');

    useEffect(() => {
        const search = async () => {
            var resp = await authService.getEvents();
            console.log('hola');
            console.log(resp);
            setTerm(resp);
        };
        search();
        
    },[]);

    return (
        <div>
           {term}
        </div>
    );
}

export default App;