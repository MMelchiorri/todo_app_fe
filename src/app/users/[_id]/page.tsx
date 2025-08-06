import { getUserById } from "@/services/usersFetch";
import { Box, IconButton, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import EditIcon from "@mui/icons-material/Edit";
import BackButton from "@/sections/BackButton";

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params;
  const user = await getUserById(_id);
  const t = await getTranslations("Users");
  if (!user) {
    return <Typography>User non trovato</Typography>;
  }
  return (
    <Box
      sx={{
        color: "black",
        backgroundColor: "white",
        borderRadius: 4,
        p: 3,
        width: "60%",
        mx: "auto",
        mt: 4,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        justifyContent={"space-between"}
      >
        <BackButton />
        <IconButton size="small" sx={{ color: "black" }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" fontWeight="bold">
          {user?.username}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {user?.role}
        </Typography>
      </Box>
      {user.jobAssigned && (
        <Box>
          {user.jobAssigned.map((job) => (
            <Typography variant="body2" key={job._id}>
              {job.name} - {job.description}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
