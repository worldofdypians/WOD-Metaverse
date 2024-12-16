import React from "react";
import PropTypes from "prop-types";


const Modal = ({
  modalId,
  visible,
  children,
  width,
  onModalClose,
  maxWidth,
  title,
}) => {
  let className = "modal fade ";
  let style = {};
  if (visible === true) {
    className += " show";
    style = { display: "block", background: "rgba(0, 0, 0, 0.5)" };
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
      <div className="modal-dialog" style={{ maxWidth: maxWidth }}>
        <div
          className="modal-content p-0 position-relative"
          style={{ width: title ? width : "" }}
        >
          {(title === "stats" || title === "withdraw") && (
            <div className="d-flex align-items-center ps-4 pt-4 gap-2">
              <img src={title === "stats" ? "https://cdn.worldofdypians.com/wod/statsIconModal.svg" : title === "withdraw" ? "https://cdn.worldofdypians.com/wod/withdrawIcon.svg" : null} height={25} width={25} alt="" />

              <h6
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#f7f7fc",
                }}
                className="m-0"
              >
                {title === "stats"
                  ? "Pool Details"
                  : title === "proposal"
                  ? "New proposal"
                  : title === "withdraw"
                  ? "Withdraw"
                  : title === "calculator"
                  ? "Calculator"
                  : ""}
              </h6>
            </div>
          )}
          <span
            onClick={onModalClose}
            aria-hidden="true"
            data-dismiss="modal"
            aria-label="Close"
            className="close-btn walletclose"
          >
            <img src={"https://cdn.worldofdypians.com/wod/xMark.svg"} alt="" className="close-icon" />
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
