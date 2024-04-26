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
      <Typography variant="h6">No customers found</Typography>
    </Box>
  );
};
