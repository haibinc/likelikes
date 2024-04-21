import React from 'react';

async function Authenticate() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId')
    if (token) {
        try {
            const baseUrl = 'https://3.101.36.103:8443';
            const response = await fetch(`${baseUrl}/checkToken`, {
                method: 'GET',
                headers: {
                    token: `${token}`,
                    id: `${userId}`
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