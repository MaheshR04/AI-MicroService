function normalizePhoneNumber(value = '') {
  return value.replace(/\D/g, '');
}

export function canTrackUser(requestingUser, trackedUser) {
  if (!requestingUser || !trackedUser) {
    return false;
  }

  if (requestingUser._id.toString() === trackedUser._id.toString()) {
    return true;
  }

  const requesterPhone = normalizePhoneNumber(requestingUser.phoneNumber);

  return trackedUser.guardianContacts.some(
    (guardian) => normalizePhoneNumber(guardian.phoneNumber) === requesterPhone,
  );
}
