import { Box, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface VideoViewerProps {
  url: string;
}

const AddTraining = (props: any) => {
  return (
    <Fab color="primary" aria-label="add" href="/create">
      <AddIcon />
    </Fab>
  );
};

export default AddTraining;
