'use client'
import { signIn, signOut } from 'next-auth/react';
import React from 'react';
import { Button } from './ui/button';

export const SignInButtons = () => {
    return (
        <Button onClick={() => signIn()}>Login</Button>
    );
};

export const SignOutButtons = () => {
    return (
        <Button variant='destructive' onClick={() => signOut()}>Logout</Button>
    );
};
