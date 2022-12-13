import { getNotifyData } from "../adapters/notifyAdapter";

export async function getNotify(req, res) {
    const notification = {}
    const notify = getNotifyData();
    console.log(notify);
}