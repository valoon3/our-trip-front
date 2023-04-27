import HeaderComponent from '@/components/home/HeaderComponent';

type Props = {
  children: React.ReactChild;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <HeaderComponent />
      { children}
    </>
  )
}