import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar/>
      {/* Target area where children render */}
      <Outlet /> 
      <Footer/>
      <TanStackRouterDevtools />
    </>
  ),
})
