"use client"

import React, { useState } from 'react';
import { useUser } from '@/utils/user_context';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/sideNav';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { editUser} from "../api/users";

const ProfilePage = () => {
  const { isLoggedIn, userData, logout } = useUser();
  const router = useRouter();
  const user = userData;
  const [edit, setEdit] = React.useState(false);

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null; // Render nothing while redirecting
  }
  const [username, setUsername] = useState(userData?.username ?? '');
  const [firstName, setFirstName] = useState(userData?.firstname ?? '');
  const [lastName, setLastName] = useState(userData?.lastname ?? '');
  const [phone, setPhone] = useState(userData?.phone ?? '');
  const [email, setEmail] = useState(userData?.email ?? '');
  const [address, setAddress] = useState(userData?.address ?? '');



  return (
    <div className="flex">

      <SideNav title={userData?.username ?? ''}/>
      <div className="ml-60 pt-2 px-4 space-y-2 bg-green-500 flex-grow pb-4 font-bold">
        {userData && (
          <div>
            <h1 className='text-white font-bold mb-4 mt-1' >Profile</h1>
            <span>
              <Button onClick={() => {
                if (edit == true) {
                  editUser(userData) // Replace 'user' with 'userId'
                }  
                setEdit(!edit)
              }}
              className= 'bg-green-500 text-white font-semibold'
              >
                {edit ? 'Save' : 'Edit'}
              </Button>
            </span>
              <div className='grid gap-4'>
                <div>
                  <Label className = 'text-white font-semibold mb-2' htmlFor="name">Prénom</Label>
                  <Input
                    id="name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                    placeholder={userData?.firstname ?? ''}
                  />
                </div>
                <div>
                  <Label className = 'text-white font-semibold mb-2' htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                    placeholder={userData?.lastname ?? ''}
                  />
                </div>
                <div>
                  <Label className = 'text-white font-semibold mb-2' htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    placeholder={userData?.email ?? ''}
                  />
                </div>
                <div>
                  <Label className = 'text-white font-semibold mb-2' htmlFor="adress">Adresse</Label>
                  <Input
                    id="adress"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                    }}
                    placeholder={userData?.address ?? ''}
                  />
                </div><div>
                  <Label className = 'text-white font-semibold mb-2' htmlFor="username">Nom d&apos;utilisateur</Label>
                  <Input
                    
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                    placeholder={userData?.username ?? ''}
                  />
                </div>
                <div style={{ paddingBottom: '3.9em' }}>
                  <Label className = 'text-white font-semibold mb-2' htmlFor="phone">Numéro de téléphone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                    }}
                    placeholder={userData?.phone?.toString() ?? '0641284558'}
                  />
                </div>
                
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;