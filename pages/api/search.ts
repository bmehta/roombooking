import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const search = req.body;
    let { startTime } = search;
    startTime = startTime.split('.')[0] + 'Z';

    try {
        const result = await executeQuery({
            query: 'select r.id, r.name from rooms r where r.id not in ( select distinct(r.id) from rooms r, reservations rr where r.id = rr.room_id && rr.start_time=STR_TO_DATE(?, \'%Y-%m-%dT%TZ\') )',
            values: [startTime]
        });
        res.status(200).json({ data: result })
    } catch ( error ) {
        console.log( error );
        res.status(500).send(JSON.parse(JSON.stringify({ error: `Internal server error: ${error}` })) as JSON );
    }
}
