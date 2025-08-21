import { Todo } from "@/type/Todo";
import { Grid, Typography } from "@mui/material";

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
        mt: 4,
        "@media (max-width:769px)": {
          width: "80%",
        },
      }}
    >
      <Grid container>
        <Typography variant="h6" fontWeight="bold">
          {todo.name}
        </Typography>
      </Grid>
    </Grid>
  );
};
