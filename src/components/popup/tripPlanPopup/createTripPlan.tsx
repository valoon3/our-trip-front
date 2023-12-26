interface Props {
  isPopupOpen: boolean;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
}

const CreateTripPlan = ({ isPopupOpen, setIsPopupOpen }: Props) => {
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 바깥 클릭이 아니면 모달을 닫지 않음
    e.stopPropagation();
  };

  return (
    <>
      {isPopupOpen && (
        <div className={'modal-overlay'} onClick={closePopup}>
          <div className="modal-content" onClick={handleInSideClick}>
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
