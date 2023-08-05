import styled from '@/styles/rightSideContent.module.scss';

type Props = {
  title: string;
};

const SearchContent = ({ title }: Props) => {
  return (
    <div className={styled.searchContent}>
      <div>{title}</div>
      <div>내용</div>
    </div>
  );
};

export default SearchContent;
