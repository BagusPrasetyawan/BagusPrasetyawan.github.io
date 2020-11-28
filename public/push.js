/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BMVM4TA89eQ3QGxocMdyCuwRDSKczEVvH3l22n3_CMwDm2FdTHnS_GTyRXVLpipAFqef5pCamT7moRQe8SNTvBo',
  privateKey: 'rv8bx0YtI4KOUwebU4J7OmWuoJRgtoyfvU7xyhdynqI',
};

webPush.setVapidDetails(
  'mailto:junior.ancruk@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/c_S30PdLgCs:APA91bGFqRhlLtuuj2272EsO_emVZy61WGKEUudqgw0Bki7AzHI-UV3VyEZGhrgfq9uUSKPNRukjgUBok1Te0IE0h_n-V-fnIcw40kxBWIz1Nma1kHMAjm-EcQqJtgbPnTYOlstifYLX',
  keys: {
    p256dh: 'BAF6rt1GtU2aPGxZEQp2xSxa6oaazxr4GuLqinxPyJLzReN4EtauQpZsfcr2SZz0TPkOKsnKSv2kf0xUC0T0BBQ=',
    auth: 'hpyURwq3koi0aX9RvKpxrA==',
  },
};
const payload = 'Yak, Payloadnya akhirnya bisa karena reset chrome. Terimakasih';

const options = {
  gcmAPIKey: '642097308993',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
