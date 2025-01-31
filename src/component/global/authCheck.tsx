"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

const AuthCheck = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const publicPaths = ["/"] 

    if (!token && !publicPaths.includes(pathname)) {
      router.replace("/")
    } else if (token && pathname === "/join") {
      router.replace("/")
    }
  }, [router, pathname])

  return null
}

export default AuthCheck

