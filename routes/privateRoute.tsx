// import { Navigate } from "react-router-dom";
import { useAuthentication } from "@/context/authentication";

interface IPrivateRouteProps { 
  component: any;
  requireWorkspace?: boolean;
}

export const PrivateRoute = ({
  component: Component,
  requireWorkspace,
}:IPrivateRouteProps) => {
  const { isLogged } = useAuthentication();
  

  /**
   * @todo simplify, **especially** if we have to add another state (maybe state machine?)
   * isLogged  |  requireWorkspace  |  !!workspace  |  page
   *   TRUE             TRUE               TRUE          go
   *   TRUE             TRUE               FALSE         /workspaces
   *   TRUE             FALSE              TRUE          go
   *   TRUE             FALSE              FALSE         go
   *   FALSE            TRUE               TRUE          /sign-in
   *   FALSE            TRUE               FALSE         /sign-in
   *   FALSE            FALSE              TRUE          /sign-in
   *   FALSE            FALSE              FALSE         /sign-in
   */

  switch (true) {
    // case isLogged && requireWorkspace && !workspace:
    //   return <Navigate to="/workspaces" replace />;

    // case isLogged && requireWorkspace && !!workspace:
    case isLogged && !requireWorkspace:
      return <Component />;

    default:
      return <>link to sign-in</>
      // <Navigate to="/sign-in" replace />;
  }
};
