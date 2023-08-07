import styled from '@/styles/rightSideContent.module.scss';
import ContentList from '@/components/list/content/ContentList';

const RightSideContent = () => {
  return (
    <div className={styled.rightSideContent}>
      <div>List header</div>
      <ContentList />
    </div>
  );
};

export default RightSideContent;
