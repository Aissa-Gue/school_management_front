import { React } from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Breadcrumb({ breadcrumbList, currentPage }) {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          backgroundColor: "#ffffff",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      >
        {breadcrumbList.map((row) => {
          return (
            <Link
              key={row.name}
              underline="hover"
              color="inherit"
              href={row.path}
            >
              {row.name}
            </Link>
          );
        })}
        <Typography color="text.primary">{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
}
