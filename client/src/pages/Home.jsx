import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6  pt-40 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Online Property <Link to={'/search?type=sale'}><span className='text-red-600 hover:text-red-400 cursor-pointer hover:underline'>Buy </span></Link>
          <Link to={'/create-listing'}><span className='text-green-600 hover:text-green-400 cursor-pointer hover:underline'>Sell </span></Link> and <br /> <Link to={'/search?type=rent'}><span className='text-blue-600 hover:text-blue-400 cursor-pointer hover:underline'>Rent</span></Link> facilities in loralai
        
        </h1>
        <div className='text-blue-950  text-xs sm:text-sm'>
         Here are best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>

        <div className='flex flex-col absolute top-28 gap-5 right-12 justify-between'>
          <Link to={'/search?type=sale'}>
            <button className='flex items-center bg-blue-900 px-4 py-2 rounded-2xl font-bold border-2 hover:border-black shadow-2xl shadow-black text-white hover:text-black hover:bg-blue-100'>
            Go To Buy
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
          </button>
          </Link>
          <Link to={'/search?type=rent'}>
            <button className='flex items-center bg-blue-900 px-4 py-2 rounded-2xl font-bold border-2 hover:border-black shadow-2xl shadow-black text-white hover:text-black hover:bg-blue-100'>
            Find House For Rent
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
          </button>
          </Link>
          <Link to={'/create-listing'}>
            <button className='flex items-center bg-blue-900 px-4 py-2 rounded-2xl font-bold border-2 hover:border-black shadow-2xl shadow-black text-white hover:text-black hover:bg-blue-100'>
            Go To Sell
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
          </button>
          </Link>
          <Link to={'/Create-listing'}>
            <button className='flex items-center bg-blue-900 px-4 py-2 rounded-2xl font-bold border-2 hover:border-black shadow-2xl shadow-black text-white hover:text-black hover:bg-blue-100'>
            Go To Rent Your House
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
          </button>
          </Link>
          

        </div>

      </div>
      
       
      <div className='fixed top-14 left-0 right-0 z-[-1] opacity-50'>
     
              <div 
                style={{
                  background: `url(https://firebasestorage.googleapis.com/v0/b/all-pakistan-real-estate.appspot.com/o/bacha%20khan%20chowk.jpg?alt=media&token=c288d218-45ee-4412-99a5-803fa0628de0) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[600px] '
               
              ></div>
            
      </div>
     
        {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg> */}
      
      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 mt-52'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-bold text-slate-800'>Recent Packages</h2>
              <Link className='text-sm text-blue-800 font-bold hover:underline' to={'/search?offer=true'}>Show more packages</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-bold text-slate-800'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 font-bold hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-bold text-slate-800'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 font-bold hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
