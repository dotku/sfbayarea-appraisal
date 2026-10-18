// Contact details shown on the site. Leave a field empty until it is real:
// the pages then say the channel is coming soon instead of showing a dead
// number or an address on a domain we don't own.
export const CONTACT = {
  address: ['338 N Canal St #12', 'South San Francisco, CA 94080'],
  name: 'Lijie Ma',
  email: 'mavongstep@gmail.com',
  phone: '(415) 200-6301',
  wechat: '',
};

export const hasContact = Boolean(CONTACT.email || CONTACT.phone || CONTACT.wechat);

export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address.join(', '))}`;
