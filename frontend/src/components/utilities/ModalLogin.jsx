import './modalLogin.scss'
import React from 'react'
import Login from '../../features/auth/Login';


const ModalLogin = ({setOpenModal}) => {

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

          <Login/>
        </div>
      </div>
    // </div>
  );
}

export default ModalLogin