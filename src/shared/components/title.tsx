import { Typography } from "@mui/material";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return (
    <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "32px" }}>
      {title}
    </Typography>
  );
};
