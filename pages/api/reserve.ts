import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const reservation = req.body;
    let { startTime, endTime, userId, roomId } = reservation;
    startTime = startTime.split('.')[0] + 'Z';
    endTime = endTime.split('.')[0] + 'Z';

    try {
        const result = await executeQuery({
            query: 'INSERT INTO reservations(room_id, user_id, start_time, end_time) VALUES(?,?, STR_TO_DATE(?, \'%Y-%m-%dT%TZ\'), STR_TO_DATE(?, \'%Y-%m-%dT%TZ\'))',
            values: [roomId, userId, startTime, endTime]
        });
        res.status(200).json({ data: result })
    } catch ( error ) {
        console.log( error );
    }
}
