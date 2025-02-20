import React from 'react'
import PaymentCard from '../components/paymenComponents/PaymentCard'

const PaymentPage = () => {
  return (
    <section className='w-full min-h-screen bg-[#F8F9FD] px-10 max-[599px]:px-4 py-20 flex items-center max-[999px]:justify-center gap-12 flex-col'>
<div className='w-full p-4 bg-white border-[#D7D7D79E] border-[0.62px] rounded-2xl'>
    <h1 className='heading text-[1.65vw] max-[599px]:text-[3.65vw]'>Secure Payment Gateway</h1>
</div>
<PaymentCard/>
    </section>
  )
}

export default PaymentPage