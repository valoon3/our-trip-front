import { PlaceI, PlanDetailI, TravelPlanI } from '@/types/TravelPlan.type';
import { useEffect, useState } from 'react';

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
  const [planDetail, setPlanDetail] = useState<[]>();

  const getDatesStartToLast = (startDate: Date, endDate: Date): string[][] => {
    const result = [];
    while (startDate <= endDate) {
      const [week, month, day, year] = startDate.toString().split(' ');
      result.push([year, month, day, week]);
      startDate.setDate(startDate.getDate() + 1);
    }
    return result;
  };

  const dateFormatter = (dateString: string): string => {
    const [week, month, day, year] = dateString.split(' ');

    return `${getMonth(month)}.${day} (${week})`;
  };

  const getDatesStartToLast2 = (
    startDate: Date,
    endDate: Date
    // ):  (Date | PlanDetailI[])[][] => {
  ): any => {
    const result = [];

    while (startDate <= endDate) {
      // result.push([startDate.toString(), new Array<PlanDetailI>()]);
      result.push([new Date(startDate.toString()), new Array<PlanDetailI>()]);
      startDate.setDate(startDate.getDate() + 1);
    }

    return result;
  };

  const getMonth = (month: string): monthType => {
    // @ts-ignore
    return Month[month];
  };

  useEffect(() => {
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

    const dates = getDatesStartToLast2(startDate, endDate);

    console.log('dates : ', dates);
    selectedTravelPlan.planDetail?.forEach(({ planDate, place }) => {
      const date = dates.find(
        (date: any) => date[0].getDate() === new Date(planDate).getDate()
      );

      if (date) {
        const _date = new Date(planDate);
        if (_date.getHours() !== 0 || _date.getMinutes() !== 0)
          place.time = `${_date.getHours()}:${_date.getMinutes()}`;
        date[1].push(place);
      }
    });

    setPlanDetail(dates);
  }, [selectedTravelPlan]);

  return (
    <div>
      {/*{dates.map(([year, month, day, week], index) => (*/}
      {/*  <div key={index} style={{ marginTop: '10px' }}>*/}
      {/*    <hr />*/}
      {/*    {getMonth(month)}.{day} ({week})*/}
      {/*  </div>*/}
      {/*))}*/}
      {planDetail?.map(([dateString, place]: [string, PlaceI[]], index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          <hr />
          {dateFormatter(dateString.toString())}
          <div>
            {place.map(({ name, address, time }, index) => (
              <div key={index}>
                <div>
                  {name}
                  <span style={{ textAlign: 'right' }}>{time}</span>
                </div>
                <div>{address}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanDetailRender;
