import Grid from "@mui/material/Grid";
import { CardHeader, Card, CardContent } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { Paper } from "@mui/material";

export default async function Page() {
  const t = await getTranslations("Todos");
  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      sx={{ mt: 4 }}
    >
      <Card>
        <Grid size={{ xs: 12 }}>
          <CardHeader
            title={t("Details.title")}
            sx={{
              p: 2,
              textAlign: "center",
            }}
          />
        </Grid>
        <CardContent></CardContent>
      </Card>
    </Grid>
  );
}
