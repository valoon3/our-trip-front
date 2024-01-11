import { TravelPlanI } from '@/types/TravelPlan.type';

interface Props {
  selectedTravelPlan: TravelPlanI;
}

type monthType =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';
const Month = {
  Jan: '1',
  Feb: '2',
  Mar: '3',
  Apr: '4',
  May: '5',
  Jun: '6',
  Jul: '7',
  Aug: '8',
  Sep: '9',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const PlanDetailRender = ({ selectedTravelPlan }: Props) => {
  const startTargetDate = selectedTravelPlan.startDate;
  const endTargetDate = selectedTravelPlan.endDate;

  // console.log(startTargetDate, endTargetDate);

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
    console.log(startDate, '<-');
    const result = [];
    while (startDate <= endDate) {
      console.log(startDate.toString());
      const [week, month, day, year] = startDate.toString().split(' ');
      result.push([year, month, day, week]);
      startDate.setDate(startDate.getDate() + 1);
    }
    return result;
  };

  const getMonth = (month: string): monthType => {
    // @ts-ignore
    return Month[month];
  };

  const dates = getDatesStartToLast(startDate, endDate);

  // useEffect(() => {
  //   console.log('dates : ', dates);
  // }, [dates]);

  // if (startDate && endDate) {
  return (
    <div>
      {dates.map(([year, month, day, week], index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          <hr />
          {getMonth(month)}.{day} ({week})
        </div>
      ))}
    </div>
  );
};

export default PlanDetailRender;
