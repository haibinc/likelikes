import React from 'react';

async function Authenticate() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const baseUrl = 'https://likelikes-867512b88371.herokuapp.com';
            const response = await fetch(`${baseUrl}/checkToken`, {
                method: 'GET',
                headers: {
                    Authorization: `${token}`,
                },
            });
            if(response.ok) {
               return true
            } else {
               return false
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    } else {
        return false;
    }
};

export default Authenticate;