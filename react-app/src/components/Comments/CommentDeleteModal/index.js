import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentDeleteConfirmation from "./CommentDelete";
import "./CommentDelete.css";

function CommentDeleteModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="comment-delete-modal">
      <i class="fa-solid fa-trash" onClick={() => setShowModal(true)}></i>
      <div onClick={() => setShowModal(true)}>Delete this comment </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentDeleteConfirmation
            onClose={() => setShowModal(false)}
            comment={comment}
          />
        </Modal>
      )}
    </div>
  );
}

export default CommentDeleteModal;
