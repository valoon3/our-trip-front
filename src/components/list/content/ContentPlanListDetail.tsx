import { Select, SelectProps } from 'antd';
import { TravelPlanI } from '@/types/TravelPlan.type';
import { useState } from 'react';
import PlanDetailRender from '@/components/list/content/PlanDetailRender';

interface Props {
  contentList: TravelPlanI[];
}

const ContentPlanListDetail = ({ contentList }: Props) => {
  const [selectedTravelPlan, setSelectedTravelPlan] = useState<TravelPlanI>();

  const handleSelectBoxChange = (title: string, options: any) => {
    console.log(title, 'options : ', options);
    const plan = contentList[options.index];
    setSelectedTravelPlan(plan);
    console.log(plan.startDate?.getDate());
  };

  const options: SelectProps<{ value: string }>['options'] = contentList.map(
    (content, index) => ({
      value: content.title,
      label: content.description,
      index,
    })
  );

  return (
    <div>
      {/*{contentList.map((content, index) => (*/}
      {/*  <div key={index}>*/}
      {/*    <div>{content.title}</div>*/}
      {/*    <div>{content.description}</div>*/}
      {/*    <div>{content.startDate}</div>*/}
      {/*    <div>{content.endDate}</div>*/}
      {/*  </div>*/}
      {/*))}*/}
      <div style={{ marginTop: '15px' }}>
        <Select
          style={{ width: '100%' }}
          defaultValue={'일정을 선택해 주세요'}
          onChange={handleSelectBoxChange}
          optionLabelProp="label"
          options={options}
          // style={{ marginTop: '10px' }}
        />
      </div>
      <div className="planDetail">
        {selectedTravelPlan && (
          <PlanDetailRender selectedTravelPlan={selectedTravelPlan} />
        )}
      </div>
    </div>
  );
};

export default ContentPlanListDetail;
