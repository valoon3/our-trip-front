import { Select, SelectProps } from 'antd';
import { useCallback, useState } from 'react';

interface Prop {
  selectTripPopupOpen: boolean;
  setSelectTripPopupOpen: (isOpen: boolean) => void;
  placeInfo: any;
  planList: any[];
}

const SelectTripPlan = ({
  selectTripPopupOpen,
  setSelectTripPopupOpen,
  placeInfo,
  planList,
}: Prop) => {
  const closePopup = () => {
    setSelectTripPopupOpen(false);
  };

  console.log(planList);

  const [selectedTravelPlan, setSelectedTravelPlan] = useState();

  const options: SelectProps<{ value: string }>['options'] = planList.map(
    (content, index) => ({
      value: content.title,
      label: content.description,
      index,
    })
  );

  const handleSelectBoxChange = useCallback(
    (title: string, options: any) => {
      console.log(title, 'options : ', options);
      const plan = planList[options.index];
      setSelectedTravelPlan(plan);
    },
    [planList]
  );

  const handleSaveButtonClick = useCallback(() => {
    const data = {
      selectedPlan: selectedTravelPlan,
      placeResult: placeInfo,
    };
    // axios
  }, []);

  console.log(placeInfo, planList);

  const handleInSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 바깥 클릭이 아니면 모달을 닫지 않음
    e.stopPropagation();
  };

  return selectTripPopupOpen && planList ? (
    <div className="modal-overlay" onClick={closePopup}>
      <div className="modal-content" onClick={handleInSideClick}>
        <div className="input-container">
          <label className="input-label" htmlFor="travelTitle">
            {placeInfo.name}
          </label>
          <Select
            defaultValue={'추가될 일정을 선택해주세요.'}
            onChange={handleSelectBoxChange}
            optionLabelProp="label"
            options={options}
          />
          <label className="input-label" htmlFor="travelTitle">
            {placeInfo.formatted_address}
          </label>
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
  ) : (
    <div></div>
  );
};

export default SelectTripPlan;
