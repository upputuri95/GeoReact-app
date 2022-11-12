import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const FormContent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="address"
          required
          fullWidth
          id="address"
          label="Address"
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField required fullWidth id="city" label="City" name="city" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField required fullWidth id="state" label="State" name="state" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="zipCode"
          label="Zip"
          type="zipCode"
          id="zipCode"
        />
      </Grid>
    </Grid>
  );
};

export default FormContent;
