// Contact details shown on the site. Leave a field empty until it is real:
// the pages then say the channel is coming soon instead of showing a dead
// number or an address on a domain we don't own.
export const CONTACT = {
  email: '',
  phone: '',
  wechat: '',
};

export const hasContact = Boolean(CONTACT.email || CONTACT.phone || CONTACT.wechat);
