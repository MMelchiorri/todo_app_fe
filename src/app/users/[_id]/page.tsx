import { getUserById } from "@/services/usersFetch";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import EditIcon from "@mui/icons-material/Edit";
import BackButton from "@/sections/BackButton";
import { getTodoById } from "@/services/todosFetch";
import UserJobs from "@/sections/users/SelectJob";
import { Todo } from "@/type/Todo";

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params;
  const user = await getUserById(_id);
  const jobAssigned = (
    await Promise.all(user?.jobAssigned?.map(getTodoById) || [])
  ).filter((job): job is Todo => job !== null);
  const t = await getTranslations("Users");

  if (!user) {
    return <Typography>{t("details.notFound")}</Typography>;
  }

  return (
    <Grid container>
      <Grid
        sx={{
          color: "black",
          backgroundColor: "white",
          borderRadius: 4,
          p: 3,
          width: "40%",
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
        {jobAssigned.length > 0 ? <UserJobs jobs={jobAssigned} /> : null}
      </Grid>
      <Grid
        sx={{
          color: "black",
          backgroundColor: "white",
          borderRadius: 4,
          p: 3,
          width: "40%",
          mx: "auto",
          mt: 4,
          "@media (max-width:769px)": {
            width: "60%",
          },
        }}
      >
        {jobAssigned.length > 0 ? <UserJobs jobs={jobAssigned} /> : null}
      </Grid>
    </Grid>
  );
}
