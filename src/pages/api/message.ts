
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from 'firebase-admin';
import serviceAccount from '../../../assets/prj0001-4f046-firebase-adminsdk-3ivlr-81d3dd461e.json';

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount as firebaseAdmin.ServiceAccount)
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { token, title, body, data } = JSON.parse(req.body)

    try {

        if (token) {

            await firebaseAdmin.messaging().send({
                notification: {
                    title,
                    body,
                },
                token,
                data: {
                    message: JSON.stringify(data)
                }
            });

        } else {
            console.warn('token is undefined')
        }

        //console.log('SUCCESS', token)

    } catch (error) {
        console.error(token, title, body, error)
    }

    res.status(200).end()
};