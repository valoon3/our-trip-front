import { Select, SelectProps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';

interface Prop {
  selectTripPopupOpen: boolean;
  setSelectTripPopupOpen: (isOpen: boolean) => void;
  placeInfo: any;
  planList: any[];
}

enum MONTH {
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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

  const [selectedDate, setSelectedDate] = useState<any>();

  const [selectedTravelPlan, setSelectedTravelPlan] = useState<{
    startDate: Date;
    endDate: Date;
  }>();

  const getDatesStartToLast = (
    startDateString: Date,
    endDateString: Date
  ): string[] => {
    // console.log(startDate, '<-');
    const dateStringToDates = (date: Date) => {
      return new Date(date.toISOString());
    };

    const startDate = dateStringToDates(startDateString);
    const endDate = dateStringToDates(endDateString);

    const result: string[] = [];
    while (startDate <= endDate) {
      const isoString: string = startDate.toISOString();
      result.push(isoString);
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
    ).map((isoString) => {
      const date = new Date(isoString);
      return [isoString, `${MONTH[date.getMonth()]}. ${date.getDate()}`];
    });

    const planOptions: SelectProps<{ value: string }>['options'] = result.map(
      (content, index) => ({
        value: content[0],
        label: content[1],
        index,
      })
    );

    return planOptions;
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

  const handleSelectDateBoxChange = useCallback(
    (_: any, o: any) => {
      const date = new Date(o.value);
      setSelectedDate(date);
      console.log(selectedDate);
    },
    [selectedDate]
  );

  const handleSaveButtonClick = useCallback(async () => {
    const data = {
      selectedPlan: selectedTravelPlan,
      selectedDate,
      placeResult: placeInfo,
    };

    console.log(data);

    await axios.post('/plan/detail', data);
  }, [placeInfo, selectedDate, selectedTravelPlan]);

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
                onChange={handleSelectDateBoxChange}
                optionLabelProp="label"
                // options={selectDate}
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
