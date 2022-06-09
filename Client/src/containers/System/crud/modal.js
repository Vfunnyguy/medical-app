import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModalNew from './anotherModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 768,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'.3rem'
};

export default function ModalBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="button is-info has-icons-right is-rounded" onClick={handleOpen}>
        <span>Create new user</span>
        <span className=" ml-3 icon is-small icon-is-right">
          <i className="fas fa-plus-circle    "></i>
        </span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <p className='fw-bold is-4'> Create New User</p>
         <ModalNew/>
        </Box>
      </Modal>
    </div>
  );
}
