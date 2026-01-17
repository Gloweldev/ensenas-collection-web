"use client";

import MainLayout from "@/components/layout/MainLayout";
import { ReactNode } from "react";

export default function MainRouteLayout({ children }: { children: ReactNode }) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}
