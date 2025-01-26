import React from 'react'
import { Helmet } from 'react-helmet-async';
import AdmissionForm from '../components/admissionComponents/AdmissionForm'

const Admission = () => {
  return (
    <div className='py-20'>
          <Helmet>
                <title>
                  Admission - CIITM Dhanbad
                </title>
                <meta
                  name='description'
                  content='Admission Form'
                />
              </Helmet>
        <AdmissionForm />
    </div>
  )
}

export default Admission