"use client"

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const NextAuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <ThemeProvider><SessionProvider>{children}</SessionProvider></ThemeProvider>
};