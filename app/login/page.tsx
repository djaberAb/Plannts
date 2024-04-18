"use client"

import Image from "next/image"
import Link from "next/link"
import loginIMG from "@/public/login_image.jpg"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { query } from "@/utils/db"
import { useRouter } from "next/navigation"



export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const Router = useRouter();

  async function handleLogin(): Promise<void> {
    await query("SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?", [email, email, password])
    if (!query) {
      console.log("User not found")
      return
    }
    console.log("User found")
    Router.push("/")
    
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-700"
              onClick={() => handleLogin()}
              >
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="./signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src= {loginIMG}
          alt="Image"
          width="1920"
          height="1080"
          className="max-h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
