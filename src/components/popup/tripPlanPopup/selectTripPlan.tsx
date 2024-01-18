import { Select, SelectProps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';

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

  const [selectedTravelPlan, setSelectedTravelPlan] = useState<{
    startDate: String;
    endDate: String;
  }>();

  const getDatesStartToLast = (
    startDateString: String,
    endDateString: String
  ): string[][] => {
    // console.log(startDate, '<-');
    const dateStringToDates = (dateString: String) => {
      const [year, month, day] = dateString.split('-');
      return new Date(Number(year), Number(month) - 1, Number(day));
    };

    const startDate = dateStringToDates(startDateString);
    const endDate = dateStringToDates(endDateString);

    const result = [];
    while (startDate <= endDate) {
      console.log(startDate.toString());
      const [week, month, day, year] = startDate.toString().split(' ');
      result.push([year, month, day, week]);
      startDate.setDate(startDate.getDate() + 1);
    }
    return result;
  };

  const planOptions: SelectProps<{ value: string }>['options'] = planList.map(
    (content, index) => ({
      value: content.title,
      label: content.description,
      index,
    })
  );

  const planDateOptions = useMemo(() => {
    if (!selectedTravelPlan) return [];

    const result = getDatesStartToLast(
      selectedTravelPlan.startDate,
      selectedTravelPlan.endDate
    );

    console.log('result : ', result);
    return [];
  }, [selectedTravelPlan]);

  const handleSelectBoxChange = useCallback(
    (title: string, options: any) => {
      console.log(title, 'options : ', options);
      const plan = planList[options.index];
      console.log('selectedPlan : ', plan);
      setSelectedTravelPlan(plan);
    },
    [planList]
  );

  const handleSaveButtonClick = useCallback(async () => {
    const data = {
      selectedPlan: selectedTravelPlan,
      placeResult: placeInfo,
    };

    await axios.post('/plan/detail', data);
  }, [selectedTravelPlan]);

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
          <div>
            <Select
              defaultValue={'추가될 일정을 선택해주세요.'}
              onChange={handleSelectBoxChange}
              optionLabelProp="label"
              options={planOptions}
              style={{ width: '70%' }}
            />
            {!selectedTravelPlan ? (
              <Select
                disabled={true}
                defaultValue={'날짜를 선택해주세요.'}
                onChange={handleSelectBoxChange}
                optionLabelProp="label"
                options={planDateOptions}
                style={{ width: '30%' }}
              />
            ) : (
              <Select
                defaultValue={'날짜를 선택해주세요.'}
                onChange={handleSelectBoxChange}
                optionLabelProp="label"
                options={planDateOptions}
                style={{ width: '30%' }}
              />
            )}
          </div>
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
