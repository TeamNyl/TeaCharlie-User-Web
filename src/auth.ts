// Created by Sean L. on Aug. 9.
// Last Updated by Sean L. on Aug. 9.
// 
// TeaCharlie-User-Web
// src/auth.ts
// 
// Team Nil, 2025. All rights reserved.

import axios from 'axios';

const BASE_URL = import.meta.env['VITE_API_URL'];

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const res = await axios.get(`${BASE_URL}/auth/validate-session`, {
            withCredentials: true
        });
        console.log(res.status);
        return res.status === 200;
    } catch (e) {
        console.error("Error:", e);
        return false
    }
}