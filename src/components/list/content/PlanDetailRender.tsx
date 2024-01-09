import { TravelPlanI } from '@/types/TravelPlan.type';
import { useMemo } from 'react';

interface Props {
  selectedTravelPlan: TravelPlanI;
}

const PlanDetailRender = ({ selectedTravelPlan }: Props) => {
  const { startDate, endDate } = selectedTravelPlan;

  const getDatesStartToLast = (startDate: Date, endDate: Date) => {
    const result = [];
    while (startDate <= endDate) {
      // console.log('testasdf : ', startDate.toISOString().split('T')[0]);
      result.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
      console.log('시작 데이터 ', result);
    }
    return result;
  };

  const dates = useMemo<string[]>(
    () => getDatesStartToLast(startDate, endDate),
    [endDate, startDate]
  );

  console.log('datesdates : ', dates);

  // useEffect(() => {
  //   console.log('dates : ', dates);
  // }, [dates]);

  // if (startDate && endDate) {
  return (
    <div>
      {true ? <div>true</div> : <div>false</div>}
      {dates.length}
      {dates.map((date, index) => (
        <div key={index}>asdf</div>
      ))}
      <div>여행 시작 날짜 : {startDate.toString()}</div>
      <div>여행 종료 날짜 : {endDate.toString()}</div>
    </div>
  );
  // } else {
  //   return <div></div>;
  // }
};

export default PlanDetailRender;
