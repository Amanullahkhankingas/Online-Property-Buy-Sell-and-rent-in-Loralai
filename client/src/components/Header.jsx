import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-blue-950 shadow-2xl shadow-black text-white fixed top-0 right-0 left-0 z-10'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap  shadow-lg hover:text-'>
            <span className=''>Property Buy Sell and Rent  <span className=''> in Loralai </span> </span>
           
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-500 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-white' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline  hover:underline hover:bg-white hover:text-black p-2 hover:rounded-xl hover:font-bold'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline  hover:underline hover:bg-white hover:text-black p-2 hover:rounded-xl hover:font-bold'>
              About
            </li>
          </Link>
          <Link to='/profile' className='hover:scale-105'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover '
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' hover:underline '> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
