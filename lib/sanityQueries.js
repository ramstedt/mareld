export const navPagesQuery = `*[_type == "page" && defined(slug.current) && (showInNavbar != false)] | order(order asc, title asc) {
  title,
  navLabel,
  "slug": slug.current
}`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  title,
  ingress,
  hero {
    text,
    backgroundAlt,
    backgroundImage
  },
  blocks[] {
    _key,
    _type,
    tagline,
    heading,
    description,
    imagePosition,
    buttons[] {
      _key,
      title,
      href,
      variant
    },
    image {
      alt,
      image
    },
    images[] {
      _key,
      alt,
      image
    },
    questions[] {
      _key,
      title,
      answer
    },
    content,
    footerHeading,
    footerDescription,
    button {
      title,
      href,
      variant
    },
    teamMembers[] {
      _key,
      name,
      jobTitle,
      description,
      email,
      facebook,
      instagram,
      button {
        title,
        href,
        variant
      },
      image {
        alt,
        image
      }
    }
  }
}`;

export const landingPageQuery = `*[_type == "landingPage"][0] {
  title,
  ingress,
  hero {
    text,
    backgroundAlt,
    backgroundImage
  },
  blocks[] {
    _key,
    _type,
    tagline,
    heading,
    description,
    imagePosition,
    buttons[] {
      _key,
      title,
      href,
      variant
    },
    image {
      alt,
      image
    },
    images[] {
      _key,
      alt,
      image
    },
    questions[] {
      _key,
      title,
      answer
    },
    content,
    footerHeading,
    footerDescription,
    button {
      title,
      href,
      variant
    },
    teamMembers[] {
      _key,
      name,
      jobTitle,
      description,
      email,
      facebook,
      instagram,
      button {
        title,
        href,
        variant
      },
      image {
        alt,
        image
      }
    }
  }
}`;

export const footerQuery = `*[_type == "footer"][0] {
  address {
    label,
    lines
  },
  contact {
    label,
    phone,
    email
  },
  socialMediaLinks[] {
    network,
    url
  }
}`;

export const settingsQuery = `*[_type == "settings"][0] {
  siteTitle,
  siteDescription,
  metaTitle,
  metaDescription,
  logo {
    alt,
    image
  },
  favicon,
  ogImage {
    alt,
    image
  }
}`;

export const tatuerareBySlugQuery = `*[_type == "tatuerare" && slug.current == $slug][0] {
  name,
  slug,
  instagram,
  facebook,
  portrait {
    alt,
    image
  },
  shortDescription,
  longDescription,
  calendarId
}`;

export const tatuerareListQuery = `*[_type == "tatuerare"] | order(name asc) {
  name,
  "slug": slug.current,
  instagram,
  facebook,
  shortDescription,
  portrait {
    alt,
    image
  }
}`;
