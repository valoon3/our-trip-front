import { useCallback, useState } from 'react';

interface Props {
  isPopupOpen: boolean;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
}

interface TravelPlan {
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}

const CreateTripPlan = ({ isPopupOpen, setIsPopupOpen }: Props) => {
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [travelPlanObject, setTravelPlanObject] = useState<TravelPlan>({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  });
  const travelObjectHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTravelPlanObject((pre) => ({
        ...pre,
        [name]: value,
      }));
    },
    []
  );

  const handleSaveButtonClick = () => {
    // 여기에서 travelData를 서버에 전달하면 됩니다.
    // 이 부분은 실제 백엔드 통신 코드로 교체되어야 합니다.
    console.log('여행 정보:', travelPlanObject);

    // 여행 정보를 서버로 전송하는 코드를 추가하세요.
    // axios 또는 fetch를 사용하여 백엔드와 통신하는 코드를 작성해야 합니다.

    closePopup(); // 저장 후 모달을 닫을 수 있도록
  };

  const handleInSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 바깥 클릭이 아니면 모달을 닫지 않음
    e.stopPropagation();
  };

  return (
    <>
      {isPopupOpen && (
        <div className="modal-overlay" onClick={closePopup}>
          <div className="modal-content" onClick={handleInSideClick}>
            <div className="modal-input">
              <p>여행 제목 : </p>
              <input
                type="text"
                id="title"
                name="title"
                value={travelPlanObject.title}
                onChange={travelObjectHandler}
              />
              <p>여행 일정</p>
              <p></p>
            </div>

            <div className="button-container">
              <button className="save-button" onClick={handleSaveButtonClick}>
                저장
              </button>
              <button className="cancel-button" onClick={closePopup}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTripPlan;
