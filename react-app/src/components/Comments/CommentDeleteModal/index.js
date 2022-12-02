import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentDeleteConfirmation from "./CommentDelete";
import "./CommentDelete.css";

function CommentDeleteModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="comment-delete-modal">
      <button className="modal-button" id="edit-button">
        <div onClick={() => setShowModal(true)}>
          Delete this comment <i class="fa-solid fa-trash"></i>
        </div>
        {/* <i class="fa-solid fa-trash" onClick={() => setShowModal(true)}></i> */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CommentDeleteConfirmation
              onClose={() => setShowModal(false)}
              comment={comment}
            />
          </Modal>
        )}
      </button>
    </div>
  );
}

export default CommentDeleteModal;
