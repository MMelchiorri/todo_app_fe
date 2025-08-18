import { Todo } from "@/type/Todo";
import { Grid } from "@mui/material";

type DetailTodoProps = {
  todo: Todo;
};

export const DetailTodo = ({ todo }: DetailTodoProps) => {
  console.log(todo);

  return (
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
    ></Grid>
  );
};
