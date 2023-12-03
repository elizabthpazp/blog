interface SiteData { 
  url: string;  
  confirmEmail: boolean;
  inputFeedback?: {
    emailSuccess?: string;
    noEmailSuccess?: string;
    incorrectEmail?: string;
    error?: string;
  };
}

const siteData: SiteData = {  
  url: "https://blog-elizabthpazp.vercel.app",  
  confirmEmail: true,
};

export default siteData;
