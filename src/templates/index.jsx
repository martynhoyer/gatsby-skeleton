import React from "react";
import Script from "react-load-script";
import { getUserLangKey } from "ptz-i18n";
import Cookies from "universal-cookie";
import PostListing from "../components/PostListing";
import PaginatedContent from "../components/PaginatedContent";
import config from "../../data/SiteConfig";

const cookies = new Cookies();

class IndexTemplate extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      const { locales, defaultLangKey } = config;
      const cookiedLang = cookies.get("lang");
      let homeUrl;
      if (cookiedLang) {
        homeUrl = cookiedLang;
      } else {
        const langKey = getUserLangKey(locales, defaultLangKey);
        cookies.set("lang", langKey, { path: "/" });
        homeUrl = langKey;
      }

      if (
        homeUrl !== defaultLangKey &&
        !window.___history.location.pathname.includes(`/${homeUrl}/`)
      )
        // I don`t think this is the best solution
        // I would like to use Gatsby Redirects like:
        // https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redirects
        // But Gatsby Redirects are static, they need to be specified at build time,
        // This redirect is dynamic, It needs to know the user browser language.
        // Any ideias? Join the issue: https://github.com/angeloocana/gatsby-starter-default-i18n/issues/4
        window.___history.replace(`/${homeUrl}/`);
    }
  }

  render() {
    const {
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next
    } = this.props.pathContext;

    return (
      <div>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <PaginatedContent
          page={page}
          pages={pages}
          total={total}
          limit={limit}
          prev={prev}
          next={next}
        >
          {/* PostListing component renders all the posts */}
          <PostListing postEdges={nodes} />
        </PaginatedContent>
      </div>
    );
  }
}

export default IndexTemplate;
