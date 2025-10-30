import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import {
  // NavbarInput,
  PageNotFound,
  SiteLogo,
  ParticlesSketch,
  Footer,
} from "../features";

const RootLayout = () => (
  <div className="h-screen w-full overflow-hidden relative">
    {/* Background particles sketch */}
    <div className="absolute inset-0">
      <ParticlesSketch />
    </div>

    {/* NAVBAR*/}
    <div className="relative h-full flex flex-col">
      <div className="flex w-full justify-between px-6 py-4 flex-shrink-0 bg-transparent">
        <SiteLogo />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden" id="root-container">
        <Outlet />
      </div>

      {/* FOOTER CONTENT */}
      <Footer />
    </div>
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: PageNotFound,
});
