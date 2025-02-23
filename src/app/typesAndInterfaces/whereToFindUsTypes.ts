export interface Location {
    address: string;
    googleMapsLink: string;
  }
  
  export interface Seller {
    title: string;
    link: string;
    images: string[];
    locations: Record<string, Location>;
  }
  
  export interface WhereToFindUsContent {
    premiumSellers: {
      title: string;
      description: string;
      sellers: Record<string, Seller>;
    };
    supplyTo: {
      title: string;
      description: string;
      sellers: Record<string, Seller>;
    };
  }