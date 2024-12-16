import React from "react";
import PropTypes from "prop-types"; 

const Modal = ({
  modalId,
  visible,
  children,
  setIsVisible,
  onModalClose,
  maxWidth,
}) => {
  let className = "modal fade ";
  let style = {};
  if (visible) {
    className += " show";
    style = { display: "block",background: 'rgba(0, 0, 0, 0.5)'};
  }

  return (
    <div
      className={className}
      id={modalId}
      style={style}
      tabIndex="-1"
      aria-labelledby={`modalLabel` + modalId}
      aria-hidden="true"
    >
      <div className="modal-dialog " style={{ maxWidth: maxWidth, height: 700, pointerEvents: 'auto', overflowY: 'scroll'  }}>
        <div className="modal-content p-0 position-relative checklistmodal">
          <span
            onClick={onModalClose}
            aria-hidden="true"
            data-dismiss="modal"
            aria-label="Close"
            className="close-btn walletclose"
            style={{alignSelf: 'flex-end', padding: 10, cursor: 'pointer'}}
          >
            <img src={'https://cdn.worldofdypians.com/wod/popupXmark.svg'} alt="" className="close-icon" />
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};
Modal.defaultProps = {
  setIsVisible: () => {},
};
Modal.propTypes = {
  modalId: PropTypes.string,
  children: PropTypes.element,
  visible: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default Modal;
