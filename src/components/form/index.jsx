import { useMemo, useState } from "react";

import {
  Button,
  Backdrop,
  CircularProgress,
  Box,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";

import FormContent from "./formContent";
import QuaddrantDetails from "./quadrantDetails";

const baseURL = "https://geocoding.geo.census.gov";

const Form = () => {
  const [result, setResult] = useState(null);
  const [oneLineaddress, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
    const data = new FormData(event.currentTarget);

    const address = data.get("address");
    const city = data.get("city");
    const state = data.get("state");
    const zipCode = data.get("zipCode");

    const fullAddress = `${address} ${city} ${state} ${zipCode}`;
    setAddress(fullAddress);

    axios
      .get(
        `${baseURL}/geocoder/locations/onelineaddress?address=${fullAddress}&benchmark=2020&format=json`
      )
      .then((response) => {
        setResult(response.data);
        setOpen(false);
      });
  };

  const quadrant = useMemo(() => {
    if (result) {
      try {
        const {
          result: {
            addressMatches: [
              {
                coordinates: { x, y },
              },
            ],
          },
        } = result;

        const centralLatUSA = 44.967243;
        const centralLongUSA = -103.771556;

        if (y > centralLatUSA) {
          return x > centralLongUSA ? "NorthEast" : "NorthWest";
        }
        if (y < centralLatUSA) {
          return x > centralLongUSA ? "SouthEast" : "SouthWest";
        }
      } catch (e) {
        return "error";
      }
    }
  }, [result]);

  console.log("quadrant", quadrant);

  const quadrantColor = useMemo(() => {
    switch (quadrant) {
      case "NorthEast":
        return "#99507F";
      case "NorthWest":
        return "#6A6C34";
      case "SouthEast":
        return "#4294B5";
      case "SouthWest":
        return "#B16238";
      default:
        return "";
    }
  }, [quadrant]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          <i> Enter Details</i>
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          className="boxContainer"
        >
          <FormContent />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
        {result ? (
          <QuaddrantDetails
            quadrantColor={quadrantColor}
            quadrant={quadrant}
            oneLineaddress={oneLineaddress}
          />
        ) : (
          ""
        )}

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {quadrant === "error" ? (
          <Typography component="h1" variant="h5" className="error">
            <i> Please enter valid details</i>
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
};

export default Form;
