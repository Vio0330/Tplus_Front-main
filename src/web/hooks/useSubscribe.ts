import { useEffect, useState } from 'react';
import { postCreditCard, requestSubscription, requestUnsubscription } from '../services/apiService';

type useSubscribeProps = {
  username?: string;
  contact?: string;
}

export default function useSubscribe({ username, contact }: useSubscribeProps = {}) {
  const [processing, setProcessing] = useState('');

  useEffect(() => {
    setProcessing('');
  }, []);

  const registerCreditCard = async () => {
    try {
      const id = (new Date()).getTime().toString();

      const Bootpay = (await import('@bootpay/client-js')).default;

      const response = await Bootpay.requestSubscription({
        application_id: process.env.NEXT_PUBLIC_BOOTPAY_KEY || '',
        pg: '페이앱',
        method: '',
        price: 0,
        tax_free: 0,
        order_name: '티플 구독',
        subscription_id: id,
        user: {
          username: username || '티플 사용자',
          phone: contact || '010-0000-0000',
        },
        extra: {
          subscribe_test_payment: true,
        },
      });

      if (response.event !== 'done') {
        throw new Error('결제 실패');
      }

      const receiptId = response.data.receipt_id;

      await postCreditCard({ receiptId });

      return true;
    } catch (error) {
      return false;
    }
  };

  const subscribe = async (code: number) => {
    try {
      setProcessing('processing');
      await requestSubscription({ code });
      setProcessing('completion');
    } catch (error) {
      setProcessing('');
      // TODO: 에러처리
    }
  };

  const unsubscribe = async () => {
    try {
      setProcessing('processing');
      await requestUnsubscription();
      setProcessing('completion');
    } catch (error) {
      setProcessing('');
      // TODO: 에러처리
    }
  };

  return {
    processing,
    registerCreditCard,
    subscribe,
    unsubscribe,
  };
}
