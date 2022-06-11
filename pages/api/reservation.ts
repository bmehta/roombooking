import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const reservation = req.body;
            let { startTime, endTime, userId, roomId } = reservation;
            startTime = startTime.split('.')[0] + 'Z';
            endTime = endTime.split('.')[0] + 'Z';

            const result = await executeQuery({
                query: 'INSERT INTO reservations(room_id, user_id, start_time, end_time) VALUES(?,?, STR_TO_DATE(?, \'%Y-%m-%dT%TZ\'), STR_TO_DATE(?, \'%Y-%m-%dT%TZ\'))',
                values: [roomId, userId, startTime, endTime]
            });
            res.status(200).json({ data: result });
            return;
        } catch ( error ) {
            console.log( error );
            res.status(500).send(JSON.parse(JSON.stringify({ error: `Internal server error: ${error}` })) as JSON );
            return;
        }
    } else if (req.method === 'DELETE') {
        try {
            const reservation = req.body;
            const {id} = reservation;

            const result = await executeQuery({
                query: 'DELETE from reservations where id = ?',
                values: [id]
            });
            res.status(200).json({data: result});
            return;
        } catch (error) {
            console.log( error );
            res.status(500).send(JSON.parse(JSON.stringify({ error: `Internal server error: ${error}` })) as JSON );
            return;
        }
    }
    res.status(400).send(JSON.parse(JSON.stringify({ error: `Http method ${req.method || ''} is not allowed.` })) as JSON )
}
