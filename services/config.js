const dotenv = require("dotenv");
dotenv.config();

const ENV_VARS = [
  "PAGE_ID",
  "APP_ID",
  "PAGE_ACCESS_TOKEN",
  "APP_SECRET",
  "VERIFY_TOKEN",
  "APP_URL",
  "SHOP_URL",
  "PORT",
];

module.exports = {
  apiDomain: "https://graph.facebook.com",
  apiVersion: "v14.0",

  PageId: process.env.PAGE_ID,
  appId: process.env.APP_ID,
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
  verifyToken: process.env.VERIFY_TOKEN,

  appUrl: process.env.APP_URL,
  shopUrl: process.env.SHOP_URL,

  personas: {},

  PORT: process.env.PORT || 3000,

  get apiUrl() {
    return `${this.apiDomain}/${this.apiVersion}`;
  },
  get newPersonas() {
    return [
      { name: "George", picture: `${this.apiUrl}/personas/sales.jpg` },
      { name: "Laura", picture: `${this.apiUrl}/personas/billing.jpg` },
      { name: "Randy", picture: `${this.apiUrl}/personas/order.jpg` },
      { name: "Daniel", picture: `${this.apiUrl}/personas/care.jpg` },
    ];
  },
  pushPersona() {
    this.personas[persona.name] = persona.id;
  },

  get personaSales() {
    let id = this.personas["George"] || process.env.PERSONA_SALES;
    return {
      name: "George",
      id: id,
    };
  },

  get personaBilling() {
    let id = this.personas["Laura"] || process.env.PERSONA_BILLING;
    return {
      name: "Laura",
      id: id,
    };
  },
  get personaOrder() {
    let id = this.personas["Randy"] || process.env.PERSONA_ORDER;
    return {
      name: "Randy",
      id: id,
    };
  },
  get personaCare() {
    let id = this.personas["Daniel"] || process.env.PERSONA_CARE;
    return {
      name: "Daniel",
      id: id,
    };
  },

  get whiteliistedDomains() {
    return [this.appUrl, this.shopUrl];
  },

  checkEnvVariables: () => {
    ENV_VARS.forEach((key) => {
      if (!process.env[key]) {
        console.warn("WARNING: Missing the environment variable " + key);
      } else {
        if (["APP_URL", "SHOP_URL"].includes(key)) {
          const url = process.env[key];
          if (!url.startsWith("https://")) {
            console.warn(
              "WARNING: Your " + key + ' does not begin with "https://"'
            );
          }
        }
      }
    });
  },
};
