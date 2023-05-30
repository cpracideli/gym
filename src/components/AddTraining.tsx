import { Box, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface VideoViewerProps {
  url: string;
}

const AddTraining = (props: any) => {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default AddTraining;
