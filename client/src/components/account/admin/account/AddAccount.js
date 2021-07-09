import React from 'react';
import SubscribeForm from '../../../login/SubscribeForm';
import { subscribeAdmin } from '../../../../server/login';
export default function AddAccount() {
    return (
        <SubscribeForm
            subscribeFunc={subscribeAdmin}
            partOflogin={false}
        />
    )
}
