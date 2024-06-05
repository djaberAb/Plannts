"use client"

import React, { useState } from 'react';
import { useUser } from '@/utils/user_context';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/sideNav';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { editUser } from '@/app/api/users'; 

const ProfilePage: React.FC = () => {
  const { isLoggedIn, userData, setUserData } = useUser();
  const router = useRouter();
  const user = userData;
  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState(userData?.username ?? '');
  const [firstName, setFirstName] = useState(userData?.firstname ?? '');
  const [lastName, setLastName] = useState(userData?.lastname ?? '');
  const [phone, setPhone] = useState(userData?.phone ?? '');
  const [email, setEmail] = useState(userData?.email ?? '');
  const [address, setAddress] = useState(userData?.address ?? '');
  const [password, setPassword] = useState(''); // Add password state for potential password change

  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const handleSave = async () => {
    const updatedUser = {
      user_id: user?.user_id,
      username,
      email,
      password: password || user?.password,
      firstname: firstName,
      lastname: lastName,
      address,
      phone,
      role: user?.role,
    };

    try {
      const updatedUser = {
        user_id: user?.user_id ?? 0,
        username,
        email,
        password: password || user?.password,
        firstname: firstName,
        lastname: lastName,
        address,
        phone,
        role: user?.role,
      };

      await editUser(updatedUser);
      setUserData(updatedUser); // Update the user data in context
      setEdit(false);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return (
    <div className="flex">
      <SideNav title={userData?.username ?? ''} />
      <div className="ml-60 pt-2 px-4 space-y-2 bg-green-500 flex-grow pb-4 font-bold">
        {userData && (
          <div>
            <h1 className="text-white font-bold mb-4 mt-1">Profile</h1>
            <span>
              <Button
                onClick={() => {
                  if (edit) {
                    handleSave();
                  } else {
                    setEdit(true);
                  }
                }}
                className="bg-green-500 text-white font-semibold"
              >
                {edit ? 'Enregistrer' : 'Modifier'}
              </Button>
            </span>
            <div className="grid gap-4">
              <div>
                <Label className="text-white font-semibold mb-2" htmlFor="firstName">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                  disabled={!edit}
                />
              </div>
              <div>
                <Label className="text-white font-semibold mb-2" htmlFor="lastName">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom"
                  disabled={!edit}
                />
              </div>
              <div>
                <Label className="text-white font-semibold mb-2" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled={!edit}
                />
              </div>
              <div>
                <Label className="text-white font-semibold mb-2" htmlFor="address">
                  Adresse
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Adresse"
                  disabled={!edit}
                />
              </div>
              <div>
                <Label className="text-white font-semibold mb-2" htmlFor="username">
                  Nom d'utilisateur
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nom d'utilisateur"
                  disabled={!edit}
                />
              </div>
              <div>
                <Label className="text-white font-semibold mb-2" htmlFor="phone">
                  Numéro de téléphone
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Numéro de téléphone"
                  disabled={!edit}
                />
              </div>
              {edit && (
                <div>
                  <Label className="text-white font-semibold mb-2" htmlFor="password">
                    Mot de passe (laisser vide pour ne pas changer)
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
