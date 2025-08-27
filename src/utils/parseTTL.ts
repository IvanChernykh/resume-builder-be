export const parseTTL = (ttl: string): number => {
  const num = parseInt(ttl.slice(0, -1), 10);
  const unit = ttl.slice(-1);

  switch (unit) {
    case 'd':
      return num * 24 * 60 * 60 * 1000;
    case 'h':
      return num * 60 * 60 * 1000;
    case 'm':
      return num * 60 * 1000;
    case 's':
      return num * 1000;
    default:
      throw new Error(`Invalid TTL format: ${ttl}`);
  }
};
