import { PrivateRoute } from "./PrivateRoute";

export interface RouteWrapper {
  titleId?: string;
  auth?: boolean;
  element: () => JSX.Element;
}

const RouteWrapperComponent = ({ titleId, auth, element }: RouteWrapper) => {
  const WhichRoute = element;
  if (titleId) {
    document.title = titleId;
  }
  return auth ? <PrivateRoute /> : <WhichRoute />;
};

export default RouteWrapperComponent;
