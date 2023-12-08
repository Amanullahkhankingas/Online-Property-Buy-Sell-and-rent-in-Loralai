import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp,
  FaMobile,
  FaPhone
} from 'react-icons/fa';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <div className='flex gap-6 '>
            <div className='flex items-center gap-2'>
              < FaPhone className='text-green-800 text-lg'/> : <span>{listing.contactNo}</span>
            </div>
            <div className='flex items-center gap-2'>
              < FaWhatsapp className='text-green-800 text-lg font-bold'/> : <span>{listing.contactNo}</span>
            </div>
          </div>
          <p>
            Contact <span className='font-semibold'>Me</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span> through <span className='text-green-700 font-bold'>Email</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}
