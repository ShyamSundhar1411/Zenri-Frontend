"use client"

import { useEffect, useState } from "react"
import { useLogin } from "@/hooks/auth/useLogin"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"


export default function Login(){
  const [email,setEmail] = useState("")
  const router  = useRouter();
  const [password,setPassword] = useState("")
  const {mutate:login,isPending,error} = useLogin()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  useEffect(() =>{
        
        if(isAuthenticated){
            router.replace("/home")
        }
    },[isAuthenticated,router])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({
      email,
      password
    },{
      onSuccess: () => {
        router.replace("/home")
      }
    })
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <Card className="w-[380px] shadow-md">
          <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Sign in to Zenri
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline ml-1">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}