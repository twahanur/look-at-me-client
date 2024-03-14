/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDeleteModalVisible } from "../../redux/features/product/productSlice";
import "./ConfirmationCss.css";
import { useDeleteProductMutation } from "../../redux/features/product/productApi";

const ConfirmationModal = () => {
  const [deleteProductId] = useDeleteProductMutation();
  const dispatch = useAppDispatch();
  const { DeleteFormVisible, deleteProduct } = useAppSelector(
    (state) => state.product
  );
  const [confirmInput, setConfirmInput] = useState("");

  const handleCancel = () => {
    dispatch(setDeleteModalVisible(false));
    setConfirmInput("");
  };

  const handleConfirm = () => {
    if (deleteProduct) {
      deleteProductId(deleteProduct);
      setConfirmInput("");
      dispatch(setDeleteModalVisible(false));
    }
  };

  const onInputChange = (e: any) => {
    setConfirmInput(e.target.value);
  };

  return (
    <Modal
      title="Delete Confirmation"
      open={DeleteFormVisible}
      onCancel={handleCancel}
      footer={null}
      className="confirmation-modal">
      <div className="confirmation-content">
        <Input
          type="text"
          placeholder="Type 'confirm' to delete"
          value={confirmInput}
          onChange={onInputChange}
          className="confirmation-input"
        />
        <Button
          type="primary"
          onClick={handleConfirm}
          disabled={confirmInput.toLowerCase() !== "confirm"}
          className="confirm-button">
          Confirm Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
