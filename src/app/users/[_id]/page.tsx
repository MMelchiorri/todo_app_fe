import { getUserById } from "@/services/usersFetch";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
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
      </Box>
    </Box>
  );
}
