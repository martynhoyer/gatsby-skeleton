import config from "../../data/SiteConfig";

const localeUrlFormatter = (locale, str) => {
  if (locale === config.defaultLangKey) return str;
  return `${locale}/${str}`;
};

export default localeUrlFormatter;
