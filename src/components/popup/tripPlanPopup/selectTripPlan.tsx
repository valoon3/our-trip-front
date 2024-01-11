interface Prop {
  selectTripPopupOpen: boolean;
  setSelectTripPopupOpen: (isOpen: boolean) => void;
}

const SelectTripPlan = ({
  selectTripPopupOpen,
  setSelectTripPopupOpen,
}: Prop) => {
  const closePopup = () => {
    setSelectTripPopupOpen(false);
  };

  const handleInSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 바깥 클릭이 아니면 모달을 닫지 않음
    e.stopPropagation();
  };

  return selectTripPopupOpen ? (
    <div className="modal-overlay" onClick={closePopup}>
      <div className="modal-content" onClick={handleInSideClick}>
        ㅁㄴㅇㄹ
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default SelectTripPlan;
