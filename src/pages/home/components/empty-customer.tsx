import { Box, Typography } from "@mui/material";

export const EmptyCustomer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography sx={{ fontSize: "24px", fontWeight: "bold" }} variant="h2">
        No customers found
      </Typography>
    </Box>
  );
};
