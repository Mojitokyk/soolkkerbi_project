import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomCalendar from './Calendar';




//사용한모달폼!!
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CalendarModel(props) {
    const resList = props.resList;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
 

  return (
    <div>
      <Button onClick={handleOpen}>{resList.reservationDate}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            예약날짜 변경하기
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <CustomCalendar />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
