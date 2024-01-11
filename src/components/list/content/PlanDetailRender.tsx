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

  const getDatesStartToLast = (startDate: Date, endDate: Date): string[][] => {
    const result = [];
    while (startDate <= endDate) {
      console.log(
        'testasdf : ',
        startDate.toISOString().split('T')[0].split('-')
      );
      result.push(startDate.toISOString().split('T')[0].split('-'));
      startDate.setDate(startDate.getDate() + 1);
    }
    console.log('result : ', result);
    return result;
  };

  const dates = getDatesStartToLast(startDate, endDate);

  // useEffect(() => {
  //   console.log('dates : ', dates);
  // }, [dates]);

  // if (startDate && endDate) {
  return (
    <div>
      {dates.map(([year, month, day], index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          <hr />
          {month}.{day}
        </div>
      ))}
    </div>
  );
};

export default PlanDetailRender;
