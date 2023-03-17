import { useState } from "react";
import { Modal } from "../../../../../tokens";



type ModalType = {
  onClose: () => void
}



export function ModalFiltro({onClose} :ModalType) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <div className="m-heading small">YAYYYYY MODAL</div>
          <div className="d-flex justify-content-end">
            <div className="m-btn" onClick={() => setShowModal(false)}>Fechar</div>
          </div>
        </Modal>
      }
    </div>
  )

}