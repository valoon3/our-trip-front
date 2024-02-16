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

const HOUR = (() => {
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push(i.toString().length === 1 ? '0' + i.toString() : i.toString());
  }
  return result;
})();

const hourOption: SelectProps<{ value: string }>['options'] = HOUR.map(
  (hour, index) => ({
    value: hour,
    label: hour,
    index,
  })
);

const MINUTE = (() => {
  const result = [];
  for (let i = 0; i < 60; i++) {
    result.push(i.toString().length === 1 ? '0' + i.toString() : i.toString());
  }
  return result;
})();

const minuteOption: SelectProps<{ value: string }>['options'] = MINUTE.map(
  (minute, index) => ({
    value: minute,
    label: minute,
    index,
  })
);

const SelectTripPlan = ({
  selectTripPopupOpen,
  setSelectTripPopupOpen,
  placeInfo,
  planList,
}: Prop) => {
  const closePopup = () => {
    setSelectedTravelPlan(undefined);
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedDate('');
    setSelectedHour('');
    setSelectedMinute('');
    setSelectTripPopupOpen(false);
  };

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMinute, setSelectedMinute] = useState<string>('');

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
      return [date.toString(), `${MONTH[date.getMonth()]}. ${date.getDate()}`];
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
      setSelectedDate('');
    },
    [planList]
  );

  const handleSelectDateBoxChange = useCallback((_: any, o: any) => {
    const date = new Date(o.value);
    setSelectedYear(date.getFullYear().toString());
    setSelectedMonth((date.getMonth() + 1).toString());
    setSelectedDate(date.getDate().toString());
  }, []);

  const handleSaveButtonClick = useCallback(async () => {
    if (!selectedYear) {
      alert('여행 일정 선택은 필수입니다.');
      return;
    } else if (!selectedDate) {
      alert('방문 일자 선택은 필수입니다.');
      return;
    }

    console.log('selectedTravelPlan : ', selectedTravelPlan);
    console.log('selectedYear : ', selectedYear);
    console.log('selectedMonth : ', selectedMonth);
    console.log('selectedDate : ', selectedDate);
    console.log('selectedHour : ', selectedHour);
    console.log('selectedMinute : ', selectedMinute);

    const newDate = new Date(
      `${selectedYear}-${
        selectedMonth.length === 1 ? '0' + selectedMonth : selectedMonth
      }-${selectedDate}T${selectedHour || '00'}:${selectedMinute || '00'}:00`
    );

    const data = {
      selectedPlan: selectedTravelPlan,
      selectedDate: newDate,
      placeResult: placeInfo,
    };

    await axios.post('/plan/detail', data);
    closePopup();
  }, [
    selectedTravelPlan,
    selectedYear,
    selectedMonth,
    selectedDate,
    selectedHour,
    selectedMinute,
    placeInfo,
  ]);

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
            <Select
              defaultValue={'날짜를 선택해주세요.'}
              disabled={selectedTravelPlan ? false : true}
              onChange={handleSelectDateBoxChange}
              optionLabelProp="label"
              // options={selectDate}
              options={planDateOptions}
              style={{ width: '30%' }}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            {'방문 예정 시간 : '}
            <Select
              defaultValue={'시간을 선택해주세요.'}
              disabled={selectedDate ? false : true}
              onChange={(_, o: any) => {
                setSelectedHour(o.value);
              }}
              options={hourOption}
              style={{ width: '30%', textAlign: 'right' }}
            />
            {' : '}
            <Select
              defaultValue={minuteOption[0].value}
              disabled={selectedHour ? false : true}
              options={minuteOption}
              onChange={(_, o: any) => {
                setSelectedMinute(o.value);
              }}
              style={{ width: '30%', textAlign: 'right' }}
            />
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
