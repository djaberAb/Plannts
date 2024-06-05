"use client"

import Image from "next/image"
import loginIMG from "@/public/login_image.jpg"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from '@/utils/user_context';

import { query } from "@/utils/db"
import { User } from "@/utils/interfaces"


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { isLoggedIn, login, logout } = useUser();


  const Router = useRouter();

  async function handleLogin(): Promise<any> {
    const result = await query(
      "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?",
      [email, email, password]
    ) as User[];
    if (!Array.isArray(result) || result.length === 0) {
      alert("Utilisateur non trouvé");
      return ;
    }
    console.log("Utilisateur trouvé");
    const user = result[0];
    if (user.role === "admin") {
      login(user)
      Router.push("/admin");
    }
    else if (user.role === "client") {
      login(user)
      Router.push("/");
    }
  };


  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-balance text-muted-foreground">
              Entrez votre email ci-dessous pour vous connecter à votre compte
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Adresse Email</Label>
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
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié ?
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
              Connexion
            </Button>
            <Button variant="outline" className="w-full">
              Connexion avec Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous n&apos;avez pas de compte ?{" "}
            <Link href="./signup" className="underline hover:font-bold">
              S&apos;inscrire
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

