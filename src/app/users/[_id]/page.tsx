import { getUserById } from "@/services/usersFetch";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import EditIcon from "@mui/icons-material/Edit";
import BackButton from "@/sections/BackButton";
import { getTodoById } from "@/services/todosFetch";

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params;
  const user = await getUserById(_id);
  const jobAssigned = await Promise.all(
    user?.jobAssigned?.map(async (jobId) => await getTodoById(jobId)) || [],
  );
  const t = await getTranslations("Users");

  if (!user) {
    return <Typography>{t("details.notFound")}</Typography>;
  }

  return (
    <Box
      sx={{
        color: "black",
        backgroundColor: "white",
        borderRadius: 4,
        p: 3,
        width: "50%",
        mx: "auto",
        mt: 4,
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

      {jobAssigned.length > 0 && (
        <Box mt={5}>
          {jobAssigned.map((job) => (
            <Box key={job?._id} mt={4}>
              <Typography variant="h5">{t("details.generalInfo")}</Typography>
              <Typography variant="h6">
                {job?.name} – {job?.description}
              </Typography>

              <Typography variant="h5" mt={3}>
                {t("details.status")}
              </Typography>

              <Box
                display="flex"
                gap={1}
                mt={1}
                justifyContent={"space-between"}
              >
                <Box>
                  {job?.tags?.map((tag) => <Chip label={tag} key={tag} />)}
                </Box>
                <Typography variant="h6">
                  {t("details.completed")}: {job?.completed ? "✅" : "❌"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
