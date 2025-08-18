import { Box, Grid, IconButton, Typography } from "@mui/material";
import BackButton from "@/sections/BackButton";
import EditIcon from "@mui/icons-material/Edit";
import UserJobs from "@/sections/users/SelectJob";
import { User } from "@/type/Users";

type Props = {
  user: User;
};
export const DetailUser = ({ user }: Props) => (
  <Grid
    size={{ xs: 6 }}
    sx={{
      color: "black",
      backgroundColor: "white",
      borderRadius: 4,
      p: 3,
      mx: "auto",
      mt: 4,
      "@media (max-width:769px)": {
        width: "60%",
      },
    }}
  >
    <Box
      display="flex"
      alignItems="center"
      mb={2}
      justifyContent="space-between"
    >
      <BackButton />
      <IconButton size="small" sx={{ color: "black" }}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>

    <Box display="flex" justifyContent="space-between">
      <Typography variant="h6" fontWeight="bold">
        {user.username}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {user.role}
      </Typography>
    </Box>
    {user.jobAssigned?.length <= 0 ? null : (
      <UserJobs jobs={user.jobAssigned} />
    )}
  </Grid>
);
