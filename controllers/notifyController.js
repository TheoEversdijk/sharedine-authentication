import { getNotify } from "../adapters/notifyAdapter";

export async function getNotify(req, res) {
    const notification = {}
    const notify = getNotify();
    console.log(notify);
}