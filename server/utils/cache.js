import NodeCache from 'node-cache';

// Standard TTL (Time To Live) is 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600 });

export default cache;