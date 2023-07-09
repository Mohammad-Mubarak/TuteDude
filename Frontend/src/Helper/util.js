import { useState } from 'react';

export const useCreateModalState = () => {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  return {
    modal,
    openModal,
    closeModal,
  };
};

export const passwordValidation = {
    passwordLengthValidation: 'Must contain at least 6 characters',
    passwordCapitalLetterValidation: 'Must contain at least one capital letter',
    passwordSmallLetterValidation: 'Must contain at least one small letter',
    passwordSpecialCharacterValidation: 'Must contain at least one special character !@#$%^&*',
    passwordDigitValidation: 'Must contain at least one digit', 
}