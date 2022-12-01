import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentCreateForm from "./CommentCreateForm";
import "./CommentCreateForm.css";

function CommentCreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="modal-button"
        id="add-comment-button"
        onClick={() => setShowModal(true)}
      >
        Add A Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentCreateForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CommentCreateFormModal;
