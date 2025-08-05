import { getTodoById } from "@/services/todosFetch";
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
  const todo = await getTodoById(_id);
  const t = await getTranslations("Todos");
  if (!todo) {
    return <Typography>Todo non trovato</Typography>;
  }
  return <></>;
}
