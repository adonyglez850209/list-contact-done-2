import React from "react";
import Image from "next/image";
import NavLinks from '@/app/ui/comunes/nav-links';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { signOut } from "next-auth/react";
import Logout from "@/app/ui/acceso/button-logout";

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuItem[];
}

export default async function Header() {
  const session = await getServerSession(authOptions);  
  const islogin = session && session.user ? true : false;
  
  const handleClick = () => {
    'use client';
    signOut();
  };

  return (
    <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <NavLinks islogin={islogin} notmobile={false}/>
            </ul>
            </div>
            <Image
                width={30}
                height={30}
                src="/logo.png"
                className="w-22 md:w-21"
                alt="logo"
            />        
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white px-3">Aporta</span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="dropdown dropdown-end">
            <NavLinks islogin={islogin} notmobile={true}/>
          </div>  
        </div>
        {islogin && (
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <Image alt="" src="/user_account_profile_icon.svg" width={30} height={30}/>
                </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><a>Perfil</a></li>
                <li><Logout/></li>
            </ul>
            </div>
        )}
    </div>
  );
}