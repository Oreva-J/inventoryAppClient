import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { footerContent } from "../../utils/content";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import Title from "../../components/Title";

const {
  subscribe,
  protocols,
  support,
  developers,
  copyright,
  socials,
} = footerContent;

const LinkSection = React.memo(({ title, links }) => (
  <Stack spacing={2.5}>
    <Title>{title}</Title>
    {links.map(({ title }) => (
      <Typography
        key={title}
        variant="body2"
        color="text.secondary"
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "text.primary",
          },
        }}
      >
        {title}
      </Typography>
    ))}
  </Stack>
));

const Footer = () => {
  return (
    <Box bgcolor="background.default">
      <Divider sx={{ mb: 10 }} />

      <Container>
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} flexWrap="wrap-reverse">
          {/* Links */}
          <Grid item xs={12} md={6} lg={7} xl={8}>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {/* Protocols */}
              <Grid item xs={6} sm={3} md={6} lg={4}>
                <LinkSection {...protocols} />
              </Grid>
              {/* Support */}
              <Grid item xs={6} sm={3} md={6} lg={4}>
                <LinkSection {...support} />
              </Grid>
              {/* Developers */}
              <Grid item xs={6} sm={3} md={6} lg={4}>
                <LinkSection {...developers} />
              </Grid>
            </Grid>
          </Grid>

          {/* Subscribe */}
          <Grid item xs={12} md={6} lg={5} xl={4}>
            <Stack>
              <Title sx={{ mb: 1 }}>{subscribe.title}</Title>
              <Typography variant="body2" color="text.secondary">
                {subscribe.subtitle}
              </Typography>

              <OutlinedButton arrow sx={{ height: 60, my: 3 }}>
                Subscribe
              </OutlinedButton>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {socials.map((item, i) => (
                  <IconButton
                    key={i}
                    aria-label={`Follow us on ${item.title}`}
                  >
                    <item.icon />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 5 }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          sx={{ pb: 6 }}
        >
          <Typography variant="body2" color="text.secondary">
            {copyright.left}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {copyright.center}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {copyright.right}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
