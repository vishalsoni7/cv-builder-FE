import { Box, Grid2, Typography } from "@mui/material";
import cvDocument from "../assets/CV Document.mp4";
import { AuthPage } from "./Auth";

const Home = () => {
  return (
    <Box
      sx={{
        padding: 2,
        height: "calc(100% - 98px)",
        background: "white",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        alignContent: "center",
      }}
    >
      <Grid2
        maxWidth="lg"
        container
        rowSpacing={{ xs: 0, sm: 2 }}
        columnSpacing={2}
        sx={{
          justifyContent: "center",
          justifySelf: "center",
        }}
      >
        <Grid2
          sx={{
            justifyContent: "center",
            paddingTop: { sx: 10, sm: 0 },
            textAlign: { xs: "center", sm: "left" },
          }}
          size={{ xs: 12, sm: 6 }}
        >
          <Typography
            sx={{
              width: "100%",
              paddingTop: { sx: 1, sm: 4 },
              marginTop: { sx: 4, sm: 0 },
              fontSize: { xs: "2rem", sm: "3rem" },
            }}
          >
            Build Your Resume
            <br /> With Rootent.
          </Typography>

          <Typography pt={4} variant="body1">
            A free and fast resume builder designed to help you craft a standout
            resume <br /> and land more interview opportunities.
          </Typography>

          <>
            <AuthPage />
          </>
        </Grid2>

        <Grid2
          sx={{
            justifyContent: "center",
            justifySelf: "center",
          }}
          size={{ xs: 12, sm: 6 }}
        >
          <video
            src={cvDocument}
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 16 / 9,
            }}
            autoPlay
            loop
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
