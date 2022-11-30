import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentUpdateForm from "./CommentUpdateForm";
// import "./CommentCreateForm.css";

function CommentUpdateFormModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>
        Edit Your Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentUpdateForm
            onClose={() => setShowModal(false)}
            comment={comment}
          />
        </Modal>
      )}
    </>
  );
}

export default CommentUpdateFormModal;
