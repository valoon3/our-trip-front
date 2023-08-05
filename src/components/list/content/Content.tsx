import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';

const Content = () => {
  // SearchContent
  // BookMarkContent

  return (
    <div className={styled.content}>
      <SearchContent title={'제목'} />
      <SearchContent title={'제목'} />
      <SearchContent title={'제목'} />
    </div>
  );
};

export default Content;
