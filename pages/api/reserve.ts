import { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const reservation = req.body;
    console.log('.....');
    console.log(reservation);
    const { startTime, endTime, userId, roomId } = reservation;

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO reservations(room_id, user_id, start_time, end_time) VALUES(?,?,?,?)',
            values: [roomId, userId, `STR_TO_DATE('${startTime}', '%Y-%m-%dT%T.%fZ')`, `STR_TO_DATE('${endTime}', '%Y-%m-%dT%T.%fZ')`]
        });
        res.status(200).json({ data: result })
    } catch ( error ) {
        console.log( error );
    }
}
