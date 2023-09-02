import * as admin from 'firebase-admin';

const serviceAccount = require('./cards-creator-firebase-adminsdk-dn27e-b0b1d01398.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = 'BmWmKZk7J3MmxQx1FgntqWDubJJ3';
const additionalClaims = {
  premiumAccount: true,
};

try {
  const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
  console.log(customToken);
} catch (error) {
  console.error('Error creating custom Token:', error);
}