import { useState } from "react"

export function SignIn(){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function onsubmit(){
    e.preventDefault();
    try {
      const result = fetch("http://localhost:3000/api/signin",{
        method: POST,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(email,password)
      })
      if(!result.ok){
        throw new Error("Server Error");
      }
      const data = await result.json();
    } catch (error) {
      
    }
  }
    return (
 <div className="flex min-h-screen w-full items-center justify-center bg-white/40 px-6 py-12 lg:px-8">
<div class="backdrop-blur-md shadow-xl flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-fit h-fit  items-center">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="mx-auto h-10 w-auto" />
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action="#" method="POST" class="space-y-6" onSubmit={onsubmit}>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-black">Email address</label>
        <div class="mt-2">
          <input onChange={(e)=>setEmail(e.target.value)} id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black border-black border-2 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-black">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input onChange={(e)=> setPassword(e.target.value)} id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md border-2 border-black bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-400">
      Not a member?
      <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Register Now!</a>
    </p>
  </div>
</div>
</div>
    )

}