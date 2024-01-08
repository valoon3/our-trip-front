import { TravelPlanI } from '@/types/TravelPlan.type';

interface Props {
  selectedTravelPlan: TravelPlanI;
}

const PlanDetailRender = ({ selectedTravelPlan }: Props) => {
  const { startDate, endDate } = selectedTravelPlan;

  if (startDate && endDate) {
    return (
      <div>
        <div>여행 시작 날짜 : {startDate.toString()}</div>
        <div>여행 종료 날짜 : {endDate.toString()}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PlanDetailRender;
