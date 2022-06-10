import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
    const data = ['room1', 'room2', 'room3', 'room4'];
    res.status(200).json({ data })
}
