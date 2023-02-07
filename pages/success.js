/* eslint-disable @next/next/link-passhref */
import React, { useEffect } from 'react'
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../lib/utils';

import { useStateContext } from '../context/StateContext';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
      localStorage.clear();
      setCartItems();
      setTotalQuantities(0);
      setTotalPrice(0);
      runFireworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank You for your order</h2>
            <p className='email-msg'>Check your email inbox for the receipt.</p>
            <p className='description'>If you have any questions Please Click the Email...</p>
            <a className='email' href='mailto:onisamuelmichael@gmail.com'>
                onisamuelmichael@email.com
            </a>
            <Link href='/'>
                <button type='button' width='300px' className='btn'>
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success