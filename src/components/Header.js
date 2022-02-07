const Header = (props) => {
  return (
    <header className='header py-3 mb-5'>
      <div className='container'>
        <h1 className='header-title'>{props.title}</h1>
      </div>
    </header>
  );
};

export default Header;
