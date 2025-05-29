'use client'

import Link from "next/link";
import styles from "@/styles/navbar.module.css";

export function Navbar() {
    return (
        <nav className={`${styles.navbar} `}>
            <div className={`${styles.container}`}>
                <h2 className={`${styles.title}`}>Todo App</h2>
                <div className={`${styles.innerContainer}`}>
                    <Link className={`${styles.link}`} href="/todos" >Todos</Link>
                    <Link className={`${styles.link}`} href="/users" >User</Link>
                </div>
            </div>
        </nav>
    );
}
