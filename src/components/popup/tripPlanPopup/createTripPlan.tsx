import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import axios from 'axios';

interface Props {
  isPopupOpen: boolean;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
}

interface TravelPlan {
  title: string; // 여행 제목
  description?: string; // 간단한 설명
  startDate?: Date | null; // 여행 시작 날짜
  endDate?: Date | null; // 여행 시작 날짜
}

const CreateTripPlan = ({ isPopupOpen, setIsPopupOpen }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [travelPlanObject, setTravelPlanObject] = useState<TravelPlan>({
    title: '',
    description: '',
    startDate: null, // 여행 시작 날짜
    endDate: null, // 여행 시작 날짜
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

    if (travelPlanObject.title === '') {
      alert('여행 제목을 입력해주세요');
      return;
    }

    if (!startDate || !endDate) {
      alert('여행 날짜를 선택해주세요');
      return;
    }

    // setTravelPlanObject((pre) => {
    //   return {
    //     ...pre,
    //     startDate,
    //     endDate,
    //   };
    // });

    console.log('여행 정보:', { ...travelPlanObject, startDate, endDate });

    // 여행 정보를 서버로 전송하는 코드를 추가하세요.
    // axios 또는 fetch를 사용하여 백엔드와 통신하는 코드를 작성해야 합니다.
    axios
      .post('/plan', travelPlanObject)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    closePopup(); // 저장 후 모달을 닫을 수 있도록
  };

  const handleDatePicker = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    console.log('info : ', start, end);

    setStartDate(start);
    setEndDate(end);
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
            <div className="input-container">
              <label className="input-label" htmlFor="travelTitle">
                여행 제목 :
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={travelPlanObject.title}
                onChange={travelObjectHandler}
                className="input-field"
              />

              <label className="input-label" htmlFor="travelTitle">
                여행 메모 :
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={travelPlanObject.description}
                onChange={travelObjectHandler}
                className="input-field"
              />

              <div>
                <DatePicker
                  selected={startDate}
                  onChange={handleDatePicker}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange={true}
                  locale={ko} // 한국어 로케일 사용
                  dateFormat="yyyy-MM-dd"
                  inline
                  monthsShown={2}
                />
              </div>
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
