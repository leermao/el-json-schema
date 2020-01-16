export const checkJson = (value, callback) => {
  if (!value) {
    return callback({ empty: true });
  }

  try {
    const val = JSON.parse(value);
    if (Array.isArray(val) && typeof val == "object") {
      return callback({ success: true });
    } else {
      return callback({ fail: true });
    }
  } catch (e) {
    return callback({ fail: true });
  }
};
