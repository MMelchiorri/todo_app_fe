"use client";

import { Autocomplete, Grid, TextField, Typography } from "@mui/material";

import { Todo } from "@/type/Todo";

export default function UserJobs({ jobs }: { jobs: Todo[] | [] }) {
  if (!jobs || jobs.length === 0) {
    return <Typography>No jobs assigned</Typography>;
  }
  return (
    <Grid size={{ xs: 8 }} sx={{ mt: 2 }}>
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label={"Job Assigned"} />
        )}
        options={jobs}
        getOptionLabel={(option) => option.name}
      />
    </Grid>
  );
}
