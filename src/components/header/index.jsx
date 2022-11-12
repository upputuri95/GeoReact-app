import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  return (
    <header>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}>
        <LocationOnIcon fontSize="large" />
      </Avatar>
      Geocoding Services
    </header>
  );
};

export default Header;
