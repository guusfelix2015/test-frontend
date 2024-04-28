import { Box } from "@mui/material";
import styles from "./styles";

interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
  return (
    <Box sx={styles.mainConstainer}>
      <Box sx={styles.container}>{children}</Box>
    </Box>
  );
};
