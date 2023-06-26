type ElementType = "text" | "datetime" | "group" | "formattedtext";

type Rendition = {
  height: number;
  source: "string";
  transform?: {
    crop: { x: number; y: number; width: number; height: number };
    scale: number;
  };
  url: string;
  width: number;
};

type Article = {
  classification: string;
  created: string;
  creatorId: string;
  description: string;
  elements: {
    author: {
      elementType: ElementType;
      value: string;
    };
    body: {
      elementType: ElementType;
      values: string[];
    };
    date: {
      elementType: ElementType;
      value: string;
    };
    heading: {
      elementType: ElementType;
      value: string;
    };
    mainImage: {
      elementType: ElementType;
      typeRef: { id: string };
      value: {
        leadImage: {
          asset: {
            altText: string;
            filename: string;
            fileSize: number;
            height: number;
            id: string;
            mediaType: string;
            resourceUri: string;
            width: number;
          };
          elementType: ElementType;
          mode: string;
          profiles: string[];
          renditions: {
            card: Rendition;
            default: Rendition;
            lead: Rendition;
            url: string;
          };
        };
        leadImageCaption: {
          elementType: ElementType;
          value: string;
        };
        leadImageCredit: {
          elementType: ElementType;
        };
      };
    };
  };
  id: string;
  keywords: string[];
  kind: string[];
  lastModified: string;
  lastModofierId: string;
  libraryId: string;
  links: {
    draft: { href: string };
    retire: { href: string };
    self: { href: string };
    thumbnail: { href: string };
    type: { href: string };
  };
  locale: string;
  name: string;
  rev: string;
  reviewHistory: string[];
  status: string;
  systemModified: string;
  tags: string[];
  thumbnail: {
    id: string;
    url: string;
  };
  type: string;
  typeId: string;
};
