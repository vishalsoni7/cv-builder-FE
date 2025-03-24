import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../constant/styles";
import { CustomModalProps } from "../types/components";

// Custom modal component
export const CustomModal = ({
  children,
  open,
  handleClose,
}: CustomModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
};
