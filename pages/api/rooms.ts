import { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db'

export default async (_: NextApiRequest, res: NextApiResponse) => {

    try {
        const result = await excuteQuery({
            query: 'select id, name from rooms'
        });
        res.status(200).json({ data: result })
    } catch ( error ) {
        console.log( error );
    }
}
