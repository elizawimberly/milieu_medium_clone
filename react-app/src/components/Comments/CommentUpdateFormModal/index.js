import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentUpdateForm from "./CommentUpdateForm";
import "./CommentCreateForm.css";

function TagCreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>
        Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentUpdateForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default TagCreateFormModal;
