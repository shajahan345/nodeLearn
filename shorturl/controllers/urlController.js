import { nanoid } from 'nanoid'
import URL from '../models/url.js';
export const handleURL = async (req, res) => {
    const body = req.body;

    try {
        if (!body.url) {
            throw new Error("url is required")
        }
        const shortID = nanoid(8);
        const url = await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitedHistory: []
        });
        console.log(url);
        return res.status(201).json({ msg: "Success", data: { id: shortID } })

    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

export const handleRedirect = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        if (!shortId) {
            throw new Error("shortId is required")
        }
        const findUrl = await URL.findOneAndUpdate(
            { shortId }, {
            $push: {
                visitedHistory: {
                    timeStamp: Date.now()
                }
            }
        }
        )
        res.redirect(findUrl.redirectUrl)
    }
    catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}