import styled from '@/styles/rightSideContent.module.scss';
import Content from '@/components/list/content/Content';

const RightSideContent = () => {
  return (
    <div className={styled.rightSideContent}>
      <div>List header</div>
      <Content />
    </div>
  );
};

export default RightSideContent;
