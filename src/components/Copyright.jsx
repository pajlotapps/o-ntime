import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Copyright = () => {
  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center">
        <Box sx={{ my: 4 }}>
          <Typography variant="caption" display="block" gutterBottom>
            {"< />"} w/ ⚡️ for 🚁 & 🛩
          </Typography>

          <Typography variant="caption" color="text.secondary" align="center">
            {"© "}
            <Link color="inherit" href="https://github.com/pajlotapps">
              PajlotApps
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Grid>
    </Container>
  );
};

export default Copyright;
