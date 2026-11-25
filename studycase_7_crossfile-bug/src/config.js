module.exports = {
  // Demo only. Di production JWT_SECRET wajib dari environment, tanpa fallback.
  jwtSecret: process.env.JWT_SECRET || 'DUMMY-dev-only-secret',
};
