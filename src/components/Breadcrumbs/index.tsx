import Link, { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useMemo } from "react";

const breadcrumbNameMap: { [key: string]: string } = {
  "/patient": "Patients",
  "/patient/add-patient": "Add Patient",
  "/insurance": "Insurance",
};

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);
  const searchParams = new URLSearchParams(location.search);
  const vriant: "h5" | "body2" = useMemo(() => {
    return pathnames.length == 1 ? "h5" : "body2";
  }, [pathnames, location]);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        let name = null;
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        if (searchParams.has("name")) name = searchParams.get("name");

        return last ? (
          <Typography variant={vriant} color="text.secondary" key={to}>
            {name || breadcrumbNameMap[to] || value}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            <Typography variant="h5" color="text.secondary" key={to}>
              {breadcrumbNameMap[to] || value}
            </Typography>
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};
export default Breadcrumb;
