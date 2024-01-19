import { Select, SelectProps } from 'antd';
import { TravelPlanI } from '@/types/TravelPlan.type';
import { useCallback, useState } from 'react';
import PlanDetailRender from '@/components/list/content/PlanDetailRender';

interface Props {
  contentList: TravelPlanI[];
}

const ContentPlanListDetail = ({ contentList }: Props) => {
  const [selectedTravelPlan, setSelectedTravelPlan] = useState<TravelPlanI>();

  const handleSelectBoxChange = useCallback(
    (title: string, options: any) => {
      console.log(title, 'options : ', options);
      const plan = contentList[options.index];
      setSelectedTravelPlan(plan);
    },
    [contentList]
  );

  const options: SelectProps<{ value: string }>['options'] = contentList.map(
    (content, index) => ({
      value: content.title,
      label: content.description,
      index,
    })
  );

  return (
    <div>
      <div style={{ marginTop: '15px' }}>
        <Select
          style={{ width: '100%' }}
          defaultValue={'일정을 선택해 주세요'}
          onChange={handleSelectBoxChange}
          optionLabelProp="value"
          options={options}
        />
      </div>
      <div>
        {selectedTravelPlan && (
          <PlanDetailRender selectedTravelPlan={selectedTravelPlan} />
        )}
      </div>
    </div>
  );
};

export default ContentPlanListDetail;
