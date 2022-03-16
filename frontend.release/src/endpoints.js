const endpoint = {
  host: 'http://0.0.0.0',
  port: 3000,
};

const base = `${endpoint.host}:${endpoint.port}`;

const endpoints = {
  reservation: {
    free: (eventId) => (
      `${base}/reservation/free/${eventId}`),
    take: (eventId, isEvening) => (
      `${base}/reservation/take/${eventId}/${isEvening}`),
  },
  event: {
    upcoming: `${base}/events/upcoming`,
    post: `${base}/event`,
  },
  price: (location, row, number) => `${base}/price/${location}/${row}/${number}`,
};

export default endpoints;
