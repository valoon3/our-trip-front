import styled from '@/styles/rightSideContent.module.scss';
import ContentList from '@/components/list/content/ContentList';
import ListSelectBox from '@/components/list/content/ListSelectBox';

const RightSideContent = () => {
  return (
    <div className={styled.rightSideContent}>
      <ListSelectBox />
      <ContentList />
    </div>
  );
};

export default RightSideContent;
