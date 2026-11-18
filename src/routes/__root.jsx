import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

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
