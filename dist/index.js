import { CacheItem } from "./schema";
export default {
    getItem: async (key) => {
        return CacheItem.findOne({ key, expiration: { $gt: Date.now() } }).then((item) => item);
    },
    setItem: (key, value, expiration) => {
        CacheItem.deleteOne({ key }).then(() => {
            new CacheItem({ key, value, expiration: Date.now() + (expiration * 1000) }).save();
        });
    }
};
