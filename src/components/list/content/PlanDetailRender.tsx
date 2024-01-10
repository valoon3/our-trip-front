import { TravelPlanI } from '@/types/TravelPlan.type';

interface Props {
  selectedTravelPlan: TravelPlanI;
}

const PlanDetailRender = ({ selectedTravelPlan }: Props) => {
  const startTargetDate = selectedTravelPlan.startDate;
  const endTargetDate = selectedTravelPlan.endDate;

  const [startDate, endDate] = [
    new Date(
      startTargetDate.getFullYear(),
      startTargetDate.getMonth(),
      startTargetDate.getDate()
    ),
    new Date(
      endTargetDate.getFullYear(),
      endTargetDate.getMonth(),
      endTargetDate.getDate()
    ),
  ];

  console.log(startDate, endDate);

  const getDatesStartToLast = (startDate: Date, endDate: Date) => {
    const result = [];
    console.log(startDate, endDate);
    while (startDate <= endDate) {
      // console.log('testasdf : ', startDate.toISOString().split('T')[0]);
      result.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    console.log('result : ', result);
    return result;
  };

  // const dates = useMemo<string[]>(
  //   () => getDatesStartToLast(startDate, endDate),
  //   [endDate, startDate]
  // );

  const dates = getDatesStartToLast(startDate, endDate);

  console.log('datesdates : ', dates);

  // useEffect(() => {
  //   console.log('dates : ', dates);
  // }, [dates]);

  // if (startDate && endDate) {
  return (
    <div>
      {dates.map((date, index) => (
        <div key={index}>{date}</div>
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
