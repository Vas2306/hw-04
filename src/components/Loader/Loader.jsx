import { Hourglass } from 'react-loader-spinner';
const Loader = ({ isVisible }) => {
  return (
    <Hourglass
      visible={isVisible}
      height="40"
      width="40"
      ariaLabel="hourglass-loading"
      wrapperClass=""
      colors={['#306cce', '#72a1ed']}
    />
  );
};

export default Loader;
