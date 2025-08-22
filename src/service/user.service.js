import axios from 'axios';

export let getFee_Info = async Payment_id => {
   try {
      console.log('Payment_id:', Payment_id);
      if (!Payment_id) {
         throw new Error('Payment ID is required');
      }
      let res = await axios.get(
         '/api/v1/Student/getStudentBillById',
         {
            params: {
               paymentId: Payment_id,
            },
         },
      );

      console.log('Bill Data:', res.data);

      return res.data.data;
   } catch (error) {
      console.log('error', error);
      throw Error(error.message);
   }
};
