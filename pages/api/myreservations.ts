import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET' || !req.query.userid) {
        res.status(400).send(JSON.parse(JSON.stringify({ error: `Http method ${req.method || ''} is not allowed. Please use GET and pass an userid as a url parameter` })) as JSON );
        return;
    }

    try {
        const result = await executeQuery({
            query: 'select rr.id, r.name, r.capacity, rr.start_time, rr.end_time from reservations rr, rooms r where rr.room_id = r.id and rr.user_id = ? order by rr.start_time asc',
            values: [ req.query.userid ]
        });
        res.status(200).json({ data: result })
    } catch ( error ) {
        console.log( error );
        res.status(500).send(JSON.parse(JSON.stringify({ error: `Internal server error: ${error}` })) as JSON );
    }
}
