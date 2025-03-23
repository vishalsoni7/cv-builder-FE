import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: 400 },
  background: "white",
  boxShadow:
    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
  p: 3,
};

interface CustomModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}

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
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
