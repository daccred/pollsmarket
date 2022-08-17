import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  og: PropTypes.object,
  twtter: PropTypes.object,
};

const defaultProps = {
  description: "Put your money where your mouth is.",
  image: `${process.env.APP_URL}/photos/banner.png`,
};

const HeadMeta = ({ title, description, image, og, twitter, children }) => {
  return (
    <Head>
      {title && (
        <Fragment>
          <title>{title + " | BBN Polls"}</title>
          <meta name="keywords" content={title} />
          <meta content={og?.title || title} property="og:title" name="title" />
          <meta
            content={twitter?.title || og?.title || title}
            property="twitter:title"
          />
        </Fragment>
      )}

      {description && (
        <Fragment>
          <meta content={description} name="description" />
          <meta
            content={og?.description || description}
            property="og:description"
          />
          <meta
            content={twitter?.description || og?.description || description}
            property="twitter:description"
          />
        </Fragment>
      )}
      {image && (
        <Fragment>
          <meta name="image" property="og:image" content={image} />
          <meta content={og?.image || image} property="og:image" name="image" />
          <meta
            content={twitter?.image || og?.image || image}
            property="twitter:image"
          />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image:summary_photo_image:src" content={image} />
          <meta
            name="twitter:image:photo_image_full_size:src"
            content={image}
          />
          <meta name="twitter:image:thumbnail_image:src" content={image} />
        </Fragment>
      )}
      <meta property="og:type" content="website" />
      {children}
    </Head>
  );
};

HeadMeta.defaultProps = defaultProps;
HeadMeta.propTypes = propTypes;

export default HeadMeta;
