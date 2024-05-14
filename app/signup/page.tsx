"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react";
import { query } from "@/utils/db"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  
  const Router = useRouter();

  return (
    <Card className="mx-auto max-w-sm my-5">
      <CardHeader>
        <CardTitle className="text-xl">S'inscrire</CardTitle>
        <CardDescription>
          Entrez vos informations pour créer un compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Prénom</Label>
                <Input
                  id="first-name"
                  placeholder="Rania"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Nom de famille</Label>
                <Input
                  id="last-name"
                  placeholder="Rezig"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  placeholder="rania"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+213 XXX XX XX XX"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                type="text"
                placeholder=""
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

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
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                minLength={8}
                rev="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={() => handleSignup()}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700"
            >
              Créer un compte
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte ?{" "}
          <Link href="./login" className="underline hover:font-bold">
            Connectez-vous
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  async function handleSignup(): Promise<void> {
    if (!firstName || !lastName || !username || !phone || !email || !password || !address) {
      return;
    }

    await query("INSERT INTO users(`username`, `email`, `password`, `firstname`, `lastname`, `address`, `phone`) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, email, password, firstName, lastName, address, phone]);
 
    if(!query) {
      alert("Échec de la requête");
      return;
    }
    Router.push("/home");
  }
}
