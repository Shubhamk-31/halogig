import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
  process.env.razorpayApiKey,
);
export default {
  app: {
    siteName: process.env.APP_NAME,
    cronEnv: process.env.CRON_ENV,
    siteEmail: '',
    mediaStorage: process.env.MEDIA_STORAGE, // local,s3
    mediaUploadSizeLimit: 1024 * 1024 * 25,
    baseUrl: process.env.BASE_URL,
    adminUrl: process.env.ADMIN_URL,
    environment: process.env.NODE_ENV,
    swaggerHost: process.env.SWAGGER_HOST,
    cryptrSecretKey: process.env.CRYPTR_SECRET,
    languages: ['en'],
    setBaseUrl(url) {
      this.baseUrl = url;
    },
  },
  database: {
    mysql: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      db: process.env.DB_NAME,
      timezone: '+00:00',
    },
  },
  mail: {
    smtp: {
      // pool: true,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_HOST_PORT,
      // secure: true, // use TLS
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      // tls: { rejectUnauthorized: false }
    },
    fromName: process.env.SMTP_EMAIL_FROM_NAME,
    fromEmail: process.env.SMTP_EMAIL_FROM_EMAIL,
  },
  sms: {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      fromNumber: process.env.TWILIO_FROM_NUMBER,
    },
  },
  winston: {
    maxSize: process.env.LOGGER_MAX_SIZE,
    maxFiles: process.env.LOGGER_MAX_FILES,
  },
  notification: {
    ios: {
      token: {
        key: path.join(__dirname, 'ios-token', 'AuthKey_SJQTVZK57P.p8'),
        keyId: '',
        teamId: '',
      },
      production: true,
    },
    android: {
      fcm: {
        server_key: '',
      },
    },
  },
  media: {
    staticMediaUrl: process.env.AWS_S3_BUCKET_URL,
  },
  region: {
    countryPhoneCode: process.env.COUNTRY_PHONE_CODE,
    currencySymbol: process.env.CURRENCY_ABBR,
  },
  aws: {
    bucketPrefix: process.env.AWS_BUCKET_PREFIX,
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketUrl: process.env.AWS_S3_BUCKET_URL,
    region: process.env.AWS_REGION,
  },

  firebase: {
    domainUriPrefix: process.env.DOMAIN_URI_PREFIX,
    dynamicLink: process.env.DYNAMIC_LINK,
    androidPackageName: process.env.ANDROID_PACKAGE_NAME,
    androidFallbackLink: process.env.ANDROID_FALLBACK_LINK,
    iosBundleId: process.env.IOS_BUNDLE_ID,
    // desktopFallbackLink: process.env.DESKTOP_FALLBACK_LINK,
    passwordToken: process.env.RESET_PASSWORD_TOKEN,
  },

  sendGrid: {
    skdSendGrid: process.env.SEND_GRID_SKD,
    email: process.env.SEND_GRID_FROM_EMAIL,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireIn: process.env.JWT_EXPIRE_IN,
  supportEmail: process.env.SUPPORT_EMAIL,
  supportContactNumber: process.env.SUPPORT_CONTACT_NUMBER,
  stripe: {
    secretKey: process.env.SECRETKEY,
    publishKey: process.env.PUBLISHKEY,
    webHookSecret: process.env.WEBHOOK_SECRET,
  },

  socialMediaLogin: {
    googleClientIdIos: process.env.GOOGLE_CLIENT_ID_IOS,
    googleClientIdAndroid: process.env.GOOGLE_CLIENT_ID_ANDROID,
    appleAudience: process.env.APPLE_AUDIENCE,
  },
  currencyExchange: {
    apiKey: process.env.CURRENCY_API_KEY,
  },
  shippingApiKey: {
    username: process.env.SHIPPING_USERNAME,
    password: process.env.SHIPPING_PASSWORD,
    asendiaKey: process.env.SHIPPING_ASENDIA_KEY,
    accountNumber: process.env.ACCOUNT_NUMBER,
    shippingChargeUrl: process.env.SHIPPING_URL,
    shippingApiUrl: process.env.SHIPPING_API_URL,
    trackingUrl: process.env.TRACKING_URL,
    shippingPhone: process.env.SHIPPING_PHONE,
    shippingEmail: process.env.SHIPPING_EMAIL,
    shippingCity: process.env.SHIPPING_CITY,
    shippingState: process.env.SHIPPING_STATE,
    shippingZipCode: process.env.SHIPPING_ZIP_CODE,
    shippingAddress: process.env.SHIPPING_ADDRESS,
    trackUrl: process.env.TRACK_URL,
  },
  paytmApiKey: {
    merchantKey: process.env.PAYTM_MERCHANT_KEY,
    mid: process.env.PAYTM_MID,
    callbackUrl: process.env.CALLBACK_URL,
    paytmHost: process.env.PAYTM_HOST,
    paytmWeb: process.env.PAYTMWEB,
  },
};
