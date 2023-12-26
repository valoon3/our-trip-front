interface Props {
  isPopupOpen: boolean;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
}

const CreateTripPlan = ({ isPopupOpen, setIsPopupOpen }: Props) => {
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {isPopupOpen && (
        <div className={'modal-overlay'} onClick={closePopup}>
          <div className="modal-content">
            <p>여행 제목 : </p>
            <input type={'text'} />
            <p>여행 일정</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTripPlan;
